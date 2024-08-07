import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Modal, LogBox } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MapplsGL from 'mappls-map-react-native';
import MovingVehicleCluster from './MovingVehicleCluster';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const MapplsMapFullScreen = ({ setGetInfo, socketData, mapLayers, onOpen, AllItemsData, OneItemsData, mapMaximize, setMapMaximize }) => {
  const mapRef = useRef()
  const ScrollRef = useRef()
  const [zoomLevel, setZoomLevel] = useState(16)
  const [mapIsLoading, setmapIsLoading] = useState(false);

  useEffect(() => {
    ScrollRef.current?.scrollTo({ y: 0, animated: true });
    // if (OneItemsData !== null) {
    //   mapRef?.current?.setCamera({
    //     centerCoordinate: [socketData?.longitude, socketData?.latitude],
    //     zoomLevel: 16,
    //     animationDuration: 2000,
    //   })
    // }
  }, [OneItemsData, mapIsLoading]);

  return (
    <Modal
      animationType="slide"
      visible={mapMaximize}
      transparent={true}
      onRequestClose={() => {
        setMapMaximize(mapMaximize => !mapMaximize);
      }}
    >
      <View style={{ flex: 1, }}>
        <MapplsGL.MapView onDidFinishLoadingMap={() => { setmapIsLoading(true) }} mapplsStyle={mapLayers} compassEnabled={false} style={{ flex: 1, }}>
          <MapplsGL.Camera
            ref={mapRef}
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
      </View>
    </Modal>
  )
}

export default MapplsMapFullScreen