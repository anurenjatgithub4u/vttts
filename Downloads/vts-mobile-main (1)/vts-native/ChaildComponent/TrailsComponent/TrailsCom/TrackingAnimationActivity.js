import React, { Component, Fragment } from 'react';
import MapplsGL from 'mappls-map-react-native';
import { View, ActivityIndicator, TouchableOpacity, LogBox, Text } from 'react-native';
import { point } from '@turf/helpers';
import carIcon from '../../../assets/images/VTS/GRCar.png';
import Feather from 'react-native-vector-icons/Feather';
import RouteSimulator from '../../../helper/RouteSimulator';
import bearing from '@turf/bearing';
import bbox from '@turf/bbox';
import Polyline from 'mappls-polyline';
import ViewOrigin from './PointView/ViewOrigin';
import AnimatePointView from './AnimateView/AnimatePointView';
import AnimateProgressLine from './AnimateView/AnimateProgressLine';
import TrailsDataList from './TrailsDataList';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

let routeSimulator;
class TrackingAnimationActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: null,
      currentPoint: null,
      routeSimulator: null,
      bearing: 0,
      center: [79.299486, 19.968309],
      sourceCoordinates: '77.202432,28.594475',
      destinationCoordinates: '77.186982,28.554676',
      routeCoordinates: [],
      isMounted: false,
      isDisable: false,
      isStartButton: false,
      totalLenght: 0,
      isDailyLimit: true
    };

    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.sliderHandler = this.sliderHandler.bind(this);
    this.onPause = this.onPause.bind(this)
  }

  async componentDidMount() {
    this.callApi();
    this.setState({
      isMounted: true
    })
  }

  callApi() {
    MapplsGL.RestApi.direction({
      origin: `${this?.props?.itemObject?.startLon},${this?.props?.itemObject?.startLat}`, destination: `${this?.props?.itemObject?.endLon},${this?.props?.itemObject?.endLat}`, resource: 'route_eta', profile: 'driving', overview: 'simplified',
    }).then(response => {
      this.setState({
        route: Polyline.toGeoJSON(response.routes[0].geometry, 6),
        routeCoordinates: Polyline.toGeoJSON(response.routes[0].geometry, 6).coordinates,
        currentPoint: point(Polyline.toGeoJSON(response.routes[0].geometry, 6).coordinates[0], { nearestIndex: 0 }),
        center: Polyline.toGeoJSON(response.routes[0].geometry, 6).coordinates[0],
        totalLenght: Polyline.toGeoJSON(response.routes[0].geometry, 6)?.coordinates?.length > 0 ? ((Polyline.toGeoJSON(response.routes[0].geometry, 6)?.coordinates?.length) - 1) : 0,
      });
      let routeSim = new RouteSimulator(Polyline.toGeoJSON(response.routes[0].geometry, 6), this?.props?.isSpeed, this.state.isMounted)
      routeSim.addListener(currentPoint => {
        if (this.state.currentPoint && this.state.isMounted == true) {
          let prevPoint = this.state.currentPoint;
          if (prevPoint.coordinates != currentPoint.coordinates) {

            let bear = bearing(currentPoint, prevPoint);
            currentPoint.properties.bearing = bear;
            this.setState({ bearing: bear })
          } else {
            currentPoint.properties.bearing = this.state.bearing;
          }
        }
        this.setState({ currentPoint });
      });
      this.setState({ routeSimulator: routeSim })
    }).catch(e => {
      this.setState({ isDailyLimit: false })
      console.log(e)
    });

  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
    if (this.state.routeSimulator) {
      this.state.routeSimulator.stop();
      this?.props?.setIsAnimate(false)
    }
  }

  onStop() {
    if (this.state.routeSimulator) {
      this.state.routeSimulator.stop();
      this?.props?.setIsAnimate(false);
    }
  }

  onPause() {    
    if (this.state.routeSimulator) {
      this.state.routeSimulator.pause();
    }
  }

  onStart() {
    this.state.isStartButton = true;
    const bounds = bbox(this.state.route);
    this.camera.fitBounds(
      [bounds[0], bounds[1]],
      [bounds[2], bounds[3]],
      0,
      40,
    );
    if (!this.state.routeSimulator) {
      routeSimulator = new RouteSimulator(this.state.route, this?.props?.isSpeed, this.state.isMounted);
      routeSimulator.addListener(currentPoint => {
        if (this.state.currentPoint && this.state.isMounted == true) {
          let prevPoint = this.state.currentPoint;
          let bear = bearing(currentPoint, prevPoint);
          currentPoint.properties.bearing = bear;
          this.setState({ bearing: bear })
        }
        this.setState({ currentPoint });
      });
      routeSimulator.start();
      this.setState({ routeSimulator: routeSimulator });
    } else {
      new RouteSimulator(this.state.route, this?.props?.isSpeed, this.state.isMounted);
      this.state.routeSimulator.addListener(currentPoint => {
        if (this.state.currentPoint && this.state.isMounted == true) {
          let prevPoint = this.state.currentPoint;
          let bear = bearing(currentPoint, prevPoint);
          currentPoint.properties.bearing = bear;
        }
        this.setState({ currentPoint });
      });
      this.state.routeSimulator.resume(this?.props?.isSpeed);
    }
  }

  sliderHandler(val) {
    if (this.state.routeSimulator) {
      this.state.routeSimulator.setTrackingProgressIndex(val)
    }
  }

  renderCurrentPoint() {
    if (!this.state.currentPoint) {
      return;
    }

    return (
      <MapplsGL.ShapeSource
        id="symbolLocationSource"
        shape={this.state.currentPoint}>
        <MapplsGL.SymbolLayer
          id="symbolLocationSymbols"
          minZoomLevel={1}
          style={{
            iconRotationAlignment: 'map',
            iconImage: carIcon,
            iconIgnorePlacement: true,
            iconAllowOverlap: true,
            iconAnchor: 'center',
            iconRotate: ["get", "bearing"],
            iconSize: 0.8,
          }}
        />
      </MapplsGL.ShapeSource>
    );
  }

  render() {
    if (!this?.state?.route) {
      return (
        <Fragment>
          {this?.state?.isDailyLimit ?
            <View style={{ flex: 1, marginTop: 20 }}>
              <ActivityIndicator color={'#63ce78'} size={'large'} />
            </View>
            :
            <View style={{ flex: 1, }}>
              <View style={{ borderRadius: 10, overflow: 'hidden', height: 500, width: '100%', paddingHorizontal: 15 }}>
                <MapplsGL.MapView
                  style={{ height: 500, borderRadius: 10, overflow: 'hidden', }}
                  compassEnabled={false}
                  rotateEnabled={false}
                  mapplsStyle={this?.props?.mapLayers}
                >
                  <MapplsGL.Camera
                    zoomLevel={14}
                    centerCoordinate={[79.299486, 19.968309]}
                  />
                </MapplsGL.MapView>
              </View>
              <Text style={{ color: '#252F40', textAlign: 'center', fontSize: 16, paddingTop: 10, fontFamily: "OpenSans-SemiBold" }}>Daily Limit Expired</Text>
            </View>
          }
        </Fragment>
      );
    }

    return (
      <Fragment>
        <View style={{ borderRadius: 10, overflow: 'hidden', height: 500, width: '100%', paddingHorizontal: 15 }}>
          {this?.props?.valueLine?.line ?
            <MapplsGL.MapView
              style={{ height: 500, borderRadius: 10, overflow: 'hidden', }}
              compassEnabled={false}
              rotateEnabled={false}
              mapplsStyle={this?.props?.mapLayers}
            >
              <MapplsGL.Camera
                zoomLevel={14}
                ref={c => (this.camera = c)}
                centerCoordinate={this?.state?.center}
              />
              <AnimateProgressLine currentPoint={this?.state?.currentPoint} route={this.state.route} />
              <AnimatePointView route={this.state.route} currentPoint={this?.state?.currentPoint} routeCoordinates={this.state.routeCoordinates} />
              {this.renderCurrentPoint()}
            </MapplsGL.MapView>
            :
            <MapplsGL.MapView
              style={{ height: 500, borderRadius: 10, overflow: 'hidden', }}
              compassEnabled={false}
              rotateEnabled={false}
              mapplsStyle={this?.props?.mapLayers}
            >
              <MapplsGL.Camera
                zoomLevel={14}
                centerCoordinate={this?.state?.center}
              />
              <ViewOrigin route={this.state.route} routeCoordinates={this.state.routeCoordinates} />
            </MapplsGL.MapView>
          }
          <View style={{ position: 'absolute', top: 15, right: 30, }}>
            <TouchableOpacity onPress={() => this?.props?.onOpen()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5, overflow: 'hidden' }}>
              <Feather name='layers' size={20} color={'#252F40'} />
            </TouchableOpacity>
          </View>
        </View>
        <TrailsDataList setIsAnimate={this?.props?.setIsAnimate} CurrentPoint={this?.state?.currentPoint} sliderHandler={this.sliderHandler} totalLenght={this.state.totalLenght} isSpeed={this?.props?.isSpeed} setIsSpeed={this?.props?.setIsSpeed} onToggle={this?.props?.onToggle} onStop={this.onStop} onStart={this.onStart} onPause={this.onPause} isAnimate={this?.props?.isAnimate} itemObject={this?.props?.itemObject} />
      </Fragment>
    );
  }
}

export default TrackingAnimationActivity;
