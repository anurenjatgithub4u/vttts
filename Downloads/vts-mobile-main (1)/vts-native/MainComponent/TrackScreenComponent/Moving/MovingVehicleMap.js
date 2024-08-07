import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, } from 'react-native';
import { View, LogBox, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useDisclose } from "native-base";
import MapplsGL from 'mappls-map-react-native';
import MapLayersSheet from '../helper/MapLayersSheet';
import MovingVehicleCluster from './MovingVehicleCluster';
import MapplsMapFullScreen from './MapplsMapFullScreen';
import MovingVehicleInfoSheet from './MovingVehicleInfoSheet';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const MovingVehicleMap = ({ socketData, AllItemsData, OneItemsData }) => {
  const mapRef = useRef()
  const ScrollRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclose();
  const [getInfo, setGetInfo] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(16)
  const [mapMaximize, setMapMaximize] = useState(false)
  const [mapIsLoading, setmapIsLoading] = useState(false);
  const [mapLayers, setMapLayers] = useState('standard_day');

  useEffect(() => {
    ScrollRef.current?.scrollTo({ y: 0, animated: true });
    // if (OneItemsData !== null) {
    //   mapRef?.current?.setCamera({
    //     centerCoordinate: [OneItemsData.position?.longitude, OneItemsData.position?.latitude],
    //     zoomLevel: 80,
    //     animationDuration: 2000,
    //   })
    // }
  }, [OneItemsData, mapIsLoading]);

  return (
    <View style={{ height: 430, width: '100%', borderRadius: 10, overflow: 'hidden' }}>
      <MapplsGL.MapView onDidFinishLoadingMap={() => setmapIsLoading(true)} mapplsStyle={mapLayers} compassEnabled={false} style={{ height: 430, width: '100%', borderRadius: 10, overflow: 'hidden' }}>{/* standard_night,  standard_day*/}
        <MapplsGL.Camera
          maxZoomLevel={100}
          zoomLevel={zoomLevel}
          centerCoordinate={[
            socketData?.longitude,
            socketData?.latitude
          ]}
        />

        <MovingVehicleCluster setGetInfo={setGetInfo} AllItemsData={AllItemsData} socketData={socketData} />
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
      </View>

      <MapplsMapFullScreen setGetInfo={setGetInfo} socketData={socketData} mapLayers={mapLayers} onOpen={onOpen} setMapMaximize={setMapMaximize} mapMaximize={mapMaximize} AllItemsData={AllItemsData} OneItemsData={OneItemsData} />
      <MapLayersSheet mapLayers={mapLayers} setMapLayers={setMapLayers} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <MovingVehicleInfoSheet getInfo={getInfo} setGetInfo={setGetInfo} />
    </View>
  )
}

export default MovingVehicleMap