import React, { Fragment, useRef } from 'react'
import { Image, LogBox } from 'react-native'
import MapplsGL from 'mappls-map-react-native';
import { MapplsMapIcon, MapplsMapLocalIcon } from './MapplsMapIcon';
import MapplsInfoWindo from './MapplsInfoWindo';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const MapplsMarker = ({ AllItemsData, iconSize }) => {
  const PointAnnotationRef = useRef();

  return (
    <Fragment>
      {AllItemsData?.map((value, index) => (
        <MapplsGL.PointAnnotation
          key={index}
          id={"markerId_" + index.toString()}
          title="Marker"
          onSelected={() => { }}
          onDeselected={() => { }}
          ref={PointAnnotationRef}
          coordinate={[value?.position?.longitude, value?.position?.latitude]}
        >
          <MapplsInfoWindo valueInfo={value} />
          <Image
            onLoad={() => { PointAnnotationRef?.current?.refresh() }}
            source={{ uri: MapplsMapIcon(value?.device) }}
            // source={MapplsMapLocalIcon(value?.device)}
            resizeMode={'contain'}
            style={{ width: iconSize, height: iconSize, }}
          />
        </MapplsGL.PointAnnotation>
      ))}
    </Fragment>
  );
};

export default MapplsMarker