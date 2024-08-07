import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { RadioButton } from 'react-native-paper';
import TrackingAnimationActivity from './TrackingAnimationActivity';
import { useHeader } from '../../../ApiHeader';

const PlayTrails = ({ setMapLayers, mapLayers, onOpen, onResetFunc, itemObject, }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [valueLine, setValueLine] = useState({ line: true });
  const [isAnimate, setIsAnimate] = useState(false);
  const [routeCoord, setRouteCoord] = useState(null)
  const [isSpeed, setIsSpeed] = useState(0.002);
  const [isLoading, setIsLoading] = useState(true);
  const [routeGraph, setRouteGraph] = useState([])

  const onToggle = () => {
    setIsAnimate(!isAnimate)
  }

  useEffect(() => {
    if (itemObject) {
      const controller = new AbortController();
      const signal = controller.signal;
      ApiRequestAuthorizationHook.get(`/reports/route?deviceId=${itemObject?.deviceId}&from=${new Date(itemObject?.startTime)?.toISOString()}&to=${new Date(itemObject?.endTime)?.toISOString()}`, { signal: signal })
        .then((result) => {
          if (result?.status === 200) {
            if (result?.data?.data.length > 0) {
              setRouteGraph(result?.data?.data)
              setRouteCoord({
                startLon: result?.data?.data[0]?.longitude,
                startLat: result?.data?.data[0]?.latitude,
                endLon: result?.data?.data[result?.data?.data.length - 1]?.longitude,
                endLat: result?.data?.data[result?.data?.data.length - 1]?.latitude
              })
            }
          }
        }).catch((err) => {
          console.log('err', err)
        })
        .finally(() => {
          setIsLoading(false)
        })

      return () => {
        controller.abort();
      };
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <ActivityIndicator color={'#63ce78'} size={'large'} />
      </View>
    )
  }

  return (
    <View style={{ paddingBottom: 270 }}>
      <View style={{ paddingHorizontal: 15, paddingTop: 8 }}>
        <View style={{ backgroundColor: '#ffffff', borderRadius: 5, paddingTop: 15, paddingBottom: 15, paddingLeft: 8, paddingRight: 8, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text numberOfLines={1} style={{ width: '80%', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#000000' }}>{itemObject?.vehicleNo === null ? '-' : itemObject?.vehicleNo}</Text>

          <Pressable onPress={() => onResetFunc()} /* onPress={() => { setTrailsMapShow(false); setApiLoad(false); setValue({ ...value, Trail: '', Device: '', Date: '' }); setTrailsCount('0'); setTrailsData([]); setItemObject(null), setPage(1) }} */ style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '20%' }}>
            <Text style={{ fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#67748E' }}>Reset</Text>
            <Fontisto name="spinner-refresh" color={'#67748E'} size={16} style={{ paddingLeft: 10 }} />
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <RadioButton
              value={valueLine.line}
              status={valueLine.line === true ? 'checked' : 'unchecked'}
              onPress={() => setValueLine({ ...valueLine, line: true })}
              uncheckedColor={'#000000'}
              color={'#4646f2'}
            />
            <Text style={{ paddingLeft: 5, color: '#000000', fontFamily: 'OpenSans-Regular', fontSize: 16 }}>Line</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <RadioButton
              value={valueLine.line}
              status={valueLine.line === false ? 'checked' : 'unchecked'}
              onPress={() => setValueLine({ ...valueLine, line: false })}
              uncheckedColor={'#000000'}
              color={'#4646f2'}
            />
            <Text style={{ paddingLeft: 5, color: '#000000', fontFamily: 'OpenSans-Regular', fontSize: 16 }}>Point</Text>
          </View>
        </View>
      </View>

      <TrackingAnimationActivity
        isAnimate={isAnimate}
        onToggle={onToggle}
        valueLine={valueLine}
        onResetFunc={onResetFunc}
        itemObject={itemObject}
        isSpeed={isSpeed}
        setIsSpeed={setIsSpeed}
        mapLayers={mapLayers}
        onOpen={onOpen}
        routeCoord={routeCoord}
        setMapLayers={setMapLayers}
        setIsAnimate={setIsAnimate}
        routeGraph={routeGraph}
      />
    </View>
  )
}

export default PlayTrails;