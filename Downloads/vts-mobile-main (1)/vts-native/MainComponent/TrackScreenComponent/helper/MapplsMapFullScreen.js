import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { View, Modal, LogBox } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MapplsGL from 'mappls-map-react-native';
import MapplsCluster from './MapplsCluster';
import MapplsMarker from './MapplsMarker';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const MapplsMapFullScreen = ({ setGetInfo, mapLayers, onOpen, AllItemsData, OneItemsData, mapMaximize, setMapMaximize }) => {
  const mapRef = useRef()
  const ScrollRef = useRef()
  const [zoomLevel, setZoomLevel] = useState(7)
  const [mapIsLoading, setmapIsLoading] = useState(false);
  const [iconSize, setIconSize] = useState(1)



  useEffect(() => {
    ScrollRef.current?.scrollTo({ y: 0, animated: true });
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
      {AllItemsData?.length === 0 ?
        <View style={{ flex: 1 }}>
          <MapplsGL.MapView onDidFinishLoadingMap={() => setmapIsLoading(true)} mapplsStyle={mapLayers} compassEnabled={false} style={{ flex: 1 }}>
            <MapplsGL.Camera
              ref={mapRef}
              zoomLevel={zoomLevel}
              centerCoordinate={[81.6296, 21.2514]}
            />
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
        :
        <View style={{ flex: 1, }}>
          <MapplsGL.MapView onDidFinishLoadingMap={() => { setmapIsLoading(true); setIconSize(35) }} mapplsStyle={mapLayers} compassEnabled={false} style={{ flex: 1, }}>
            <MapplsGL.Camera
              ref={mapRef}
              zoomLevel={zoomLevel}
              centerCoordinate={[
                OneItemsData === null ? AllItemsData[0]?.position?.longitude : OneItemsData?.position?.longitude,
                OneItemsData === null ? AllItemsData[0]?.position?.latitude : OneItemsData?.position?.latitude
              ]}
            />

            <MapplsCluster setGetInfo={setGetInfo} AllItemsData={AllItemsData} />

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
      }
    </Modal>
  )
}

export default MapplsMapFullScreen