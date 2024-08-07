import React, { useRef, useState } from 'react';
import { FlatList, View, Text, Pressable, Dimensions, ScrollView, LogBox, TouchableOpacity } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MapplsGL from 'mappls-map-react-native';
import { useDisclose } from 'native-base';
import PlayTrails from './PlayTrails';
import MapLayersSheet from './MapLayersSheet';
import RenderList from './RenderList';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const MapViewCom = ({ onResetFunc, itemObject, setItemObject, trailsData }) => {
  const mapRef = useRef();
  const [mapLayers, setMapLayers] = useState('standard_day');
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      {itemObject === null ?
        <View style={{ paddingBottom: 200, }}>
          <View style={{ paddingHorizontal: 15, paddingTop: 8 }}>
            <View style={{ marginBottom: 10, backgroundColor: '#ffffff', borderRadius: 5, paddingTop: 15, paddingBottom: 15, paddingLeft: 8, paddingRight: 8, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#000000', width: '80%' }}>{trailsData?.length === 0 ? 'NO RECORDS' : trailsData[0]?.vehicleNo}</Text>
              <Pressable onPress={() => onResetFunc()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '20%', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#67748E' }}>Reset</Text>
                <Fontisto name="spinner-refresh" color={'#67748E'} size={16} style={{ paddingLeft: 10 }} />
              </Pressable>
            </View>

            {/* {trailsData[0]?.startLat === undefined || trailsData[0]?.startLon === undefined ?
              <View style={{ justifyContent: 'center', alignItems: 'center', height: 400, width: '100%', marginTop: 8, marginBottom: 25, borderRadius: 10, overflow: 'hidden', }}>
                <MapplsGL.MapView mapplsStyle={mapLayers} compassEnabled={false} style={{ height: 400, width: '100%', borderRadius: 10, overflow: 'hidden' }}>
                  <MapplsGL.Camera
                    ref={mapRef}
                    zoomLevel={13}
                    centerCoordinate={[81.6296, 21.2514]}
                  />
                </MapplsGL.MapView>
                <View style={{ position: 'absolute', top: 10, right: 10, }}>
                  <TouchableOpacity onPress={() => onOpen()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5, overflow: 'hidden' }}>
                    <Feather name='layers' size={20} color={'#252F40'} />
                  </TouchableOpacity>
                </View>
              </View>
              : */}
            <View style={{ borderRadius: 10, overflow: 'hidden', height: 400, width: '100%', }}>
              <MapplsGL.MapView
                zoomEnabled={true}
                compassEnabled={false}
                mapplsStyle={mapLayers}
                style={{ borderRadius: 10, overflow: 'hidden', height: 400, width: '100%', }}
              >
                <MapplsGL.Camera
                  zoomLevel={13}
                  ref={mapRef}
                  centerCoordinate={[81.6296, 21.2514]}/* [trailsData[0]?.startLon, trailsData[0]?.startLat] */
                />
              </MapplsGL.MapView>
              <View style={{ position: 'absolute', top: 10, right: 10, }}>
                <TouchableOpacity onPress={() => onOpen()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5, overflow: 'hidden' }}>
                  <Feather name='layers' size={20} color={'#252F40'} />
                </TouchableOpacity>
              </View>
            </View>
            {/* } */}
          </View>

          <View style={{ height: 700, borderRadius: 10, position: 'relative', top: -90, marginHorizontal: 15, backgroundColor: '#F5F6FA' }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 400 }} />
                )
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 470 }}>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
                  </View>
                )
              }}
              horizontal={false}
              data={trailsData}
              renderItem={({ item, index }) => {
                return (
                  <RenderList item={item} index={index} setItemObject={setItemObject} />
                )
              }}
              keyExtractor={(item, index) => index?.toString()}
            />
          </View>
        </View>
        :
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ height: Dimensions.get('screen').height }}>
          <PlayTrails setMapLayers={setMapLayers} mapLayers={mapLayers} onOpen={onOpen} itemObject={itemObject} onResetFunc={onResetFunc} />
        </ScrollView>
      }
      <MapLayersSheet  mapLayers={mapLayers} setMapLayers={setMapLayers} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  )
}

export default MapViewCom;