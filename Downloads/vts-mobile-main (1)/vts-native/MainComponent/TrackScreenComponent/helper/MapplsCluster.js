import React, { Fragment } from 'react';
import MapplsGL from 'mappls-map-react-native';
import { LogBox } from 'react-native';
import { ClusterIconFunc } from './ClusterIconFunc';
import { ClusterTextFunc } from './ClusterTextFunc';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const layerStyles = {
  singlePoint: {
    iconImage: ['get', 'iconImage'],
    iconAllowOverlap: true,
    iconSize: 0.7,
    iconAnchor: 'bottom',
    iconPitchAlignment: 'map',
    iconRotate: ["get", "iconRotate"],
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',

    circleColor: [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      100,
      '#f1f075',
      750,
      '#f28cb1',
    ],

    circleRadius: ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
};

const MapplsCluster = ({ setGetInfo, AllItemsData }) => {
  function uniqByKeepLast(data, key) {
    return [...new Map(data?.map(x => [key(x), x]))?.values()]
  }

  const ImageElement = uniqByKeepLast(AllItemsData, it => it?.device?.id)?.map((value, index) => (ClusterIconFunc(value?.device)));

  return (
    <Fragment>
      {ImageElement}
      <MapplsGL.ShapeSource
        id="earthquakes"
        cluster={true}
        clusterRadius={50}

        shape={{
          type: 'FeatureCollection',
          features: uniqByKeepLast(AllItemsData, it => it?.device?.id)?.map((value, index) => ({
            type: 'Feature',
            properties: {
              id: value?.device?.id,
              Vehicle_Number: value?.device?.name,
              Permit_Holder_Name: value?.device?.permit_holder,
              Contact_Number: value?.device?.contact,
              Chassis_Number: value?.device?.chasisno,
              IMEI_Number: value?.device?.uniqueId,
              RTO_Code: value?.device?.rto_code,
              Company_Name: value?.device?.vltd_make,
              iconImage: ClusterTextFunc(value?.device),
              iconRotate: parseFloat(value?.position?.course)
            },
            geometry: {
              type: 'Point',
              coordinates: [value?.position?.longitude, value?.position?.latitude],
            },
          }
          )),
        }}
        onPress={e => setGetInfo(e?.features[0]?.properties)}
      >
        <MapplsGL.SymbolLayer
          id="pointCount"
          style={layerStyles.clusterCount}
        />

        <MapplsGL.CircleLayer
          id="clusteredPoints"
          belowLayerID="pointCount"
          filter={['has', 'point_count']}
          style={layerStyles.clusteredPoints}
        />
        <MapplsGL.SymbolLayer
          id="singlePoint"
          filter={['!', ['has', 'point_count']]}
          style={layerStyles.singlePoint}
        />
      </MapplsGL.ShapeSource >
    </Fragment>
  )
}

export default MapplsCluster