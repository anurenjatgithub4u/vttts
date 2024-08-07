import React, { Fragment } from 'react';
import MapplsGL from 'mappls-map-react-native';
import { LogBox } from 'react-native';
import { ClusterIconFunc } from './ClusterIconFunc';
import { ClusterTextFunc } from './ClusterTextFunc';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const MovingVehicleCluster = ({ setGetInfo, socketData, AllItemsData }) => {
  function uniqByKeepLast(data, key) {
    return [...new Map(data?.map(x => [key(x), x]))?.values()]
  }

  const ImageElement = uniqByKeepLast(AllItemsData, it => it?.device?.id)?.map((value, index) => (ClusterIconFunc(value?.device)));

  // console.log(AllItemsData[0]?.device?.category)
  return (
    <Fragment>
      {ImageElement}

      <MapplsGL.ShapeSource
        id="earthquakes"
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
              iconRotate: parseFloat(socketData?.course)
            },
            geometry: {
              type: 'Point',
              coordinates: [socketData?.longitude, socketData?.latitude],
            },
          }
          )),
        }}
        onPress={e => setGetInfo(e?.features[0]?.properties)}
      >

        <MapplsGL.SymbolLayer
          id="singlePoint"
          filter={['!', ['has', 'point_count']]}
          style={{
            iconImage: ['get', 'iconImage'],
            iconAllowOverlap: true,
            iconSize: 0.7,
            iconAnchor: 'bottom',
            iconPitchAlignment: 'map',
            iconRotate: ["get", "iconRotate"],
          }}
        />
      </MapplsGL.ShapeSource >
    </Fragment>
  )
}

export default MovingVehicleCluster