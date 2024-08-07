import React, { Fragment, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Image, ElevationDispla } from 'react-native';
import { View, LogBox, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useDisclose } from "native-base";
import MapplsGL from 'mappls-map-react-native';
import MapplsCluster from './MapplsCluster';
import MapLayersSheet from './MapLayersSheet';
import InfoSheet from './InfoSheet';
import MapplsMarker from './MapplsMarker';
import MapplsMapFullScreen from './MapplsMapFullScreen';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const MapplsMarkerActivity = ({ AllItemsData, OneItemsData }) => {
  const mapRef = useRef()
  const ScrollRef = useRef()
  const [getInfo, setGetInfo] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclose();
  const [zoomLevel, setZoomLevel] = useState(20)
  const [mapMaximize, setMapMaximize] = useState(false)
  const [mapIsLoading, setmapIsLoading] = useState(false);
  const [mapLayers, setMapLayers] = useState('standard_day');
  const [getMapStyle, setGetMapStyle] = useState([])
  // const [ele,setEle] = useState(0)
  // const ElevationDisplay = ({ elevation }) => {
  

  useEffect(() => {
    ScrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [OneItemsData, mapIsLoading]);

//   useEffect(() => {
//     const fetchElevation = async () => {
//       console.log(ele)
       
//         const response = await fetch(
//           `https://maps.googleapis.com/maps/api/elevation/json?locations=40.714728,-73.998672&key=YOUR_API_KEY
//           `
//       );
//       const data = await response.json();
//       console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
//       console.log(data)
//       if (data.results && data.results.length > 0) {
//          console.log(data.results)
//           setEle(data.results[0].elevation);
//       }
   
//     }
//     fetchElevation();
//     console.log(ele)
// }, [zoomLevel]);

//   console.log("HEREREERERERRRR")

  return (
    <Fragment>
       {/* {ele !== null && <View><Text>Elevation: {ele} meters</Text></View>} */}
      {AllItemsData?.length === 0 ?
        <View style={{ height: 430, width: '100%', borderRadius: 10, overflow: 'hidden' }}>
          <MapplsGL.MapView onDidFinishLoadingMap={() => setmapIsLoading(true)} mapplsStyle={mapLayers} compassEnabled={false} style={{ height: 430, width: '100%', borderRadius: 10, overflow: 'hidden' }}>
            <MapplsGL.Camera
              ref={mapRef}
              zoomLevel={zoomLevel}
              centerCoordinate={[81.6296, 21.2514]}
            />
          </MapplsGL.MapView>
          <View style={{ position: 'absolute', bottom: 30, right: 15, }}>
            <TouchableOpacity onPress={() => { setZoomLevel(zoomLevel + 30) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
              <AntDesign name='plus' size={17} color={'#67748e'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setZoomLevel(zoomLevel - 1) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
              <AntDesign name='minus' size={17} color={'#67748e'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMapMaximize(mapMaximize => !mapMaximize)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
              <Ionicons name='md-expand-outline' size={17} color={'#67748e'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onOpen()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5, overflow: 'hidden' }}>
              <Feather name='layers' size={20} color={'#252F40'} />
            </TouchableOpacity>
            {/* <Text>Elevation: {elevation} meters</Text> */}
          </View>
        </View>
        :
        <View style={{ height: 430, width: '100%', borderRadius: 10, overflow: 'hidden' }}>
          <MapplsGL.MapView didLoadedMapplsMapsStyles={(data) => setGetMapStyle(data)} onDidFinishLoadingMap={() => { setmapIsLoading(true); }} mapplsStyle={mapLayers} compassEnabled={false} style={{ height: 430, width: '100%', borderRadius: 10, overflow: 'hidden' }}>{/* standard_night,  standard_day*/}
            <MapplsGL.Camera
              ref={mapRef}
              zoomLevel={zoomLevel}
              maxZoomLevel={100}
              centerCoordinate={[
                OneItemsData === null ? AllItemsData[0]?.position?.longitude : OneItemsData?.position?.longitude,
                OneItemsData === null ? AllItemsData[0]?.position?.latitude : OneItemsData?.position?.latitude
              ]}
            />
            <MapplsCluster setGetInfo={setGetInfo} AllItemsData={AllItemsData} />
            {/* <MapplsMarker iconSize={iconSize} AllItemsData={AllItemsData} /> */}
          </MapplsGL.MapView>
          <View style={{ position: 'absolute', bottom: 30, right: 15, }}>
            <TouchableOpacity onPress={() => { setZoomLevel(zoomLevel + 1) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
              <AntDesign name='plus' size={17} color={'#67748e'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setZoomLevel(zoomLevel - 1) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
              <AntDesign name='minus' size={17} color={'#67748e'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMapMaximize(mapMaximize => !mapMaximize)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
              <Ionicons name='md-expand-outline' size={17} color={'#67748e'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onOpen()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5, overflow: 'hidden' }}>
              <Feather name='layers' size={20} color={'#252F40'} />
            </TouchableOpacity>
            {/* <Text>Elevation: {elevation} meters</Text> */}
          </View>
        </View>
      }

      <MapplsMapFullScreen setGetInfo={setGetInfo} mapLayers={mapLayers} onOpen={onOpen} setMapMaximize={setMapMaximize} mapMaximize={mapMaximize} AllItemsData={AllItemsData} OneItemsData={OneItemsData} />
      <MapLayersSheet getMapStyle={getMapStyle} mapLayers={mapLayers} setMapLayers={setMapLayers} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <InfoSheet getInfo={getInfo} setGetInfo={setGetInfo} />
    </Fragment>
  )
}

export default MapplsMarkerActivity