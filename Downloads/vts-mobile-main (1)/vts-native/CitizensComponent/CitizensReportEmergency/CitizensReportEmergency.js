import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable, } from 'react-native';
import { useHeader } from '../../ApiHeader';
import ReportEmergencySent from './ReportEmergencySent';

const CitizensReportEmergency = ({ state }) => {
  let Naviagte = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [time, setTime] = useState(5);
  const timerRef = useRef(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef?.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const data = JSON.stringify({
    latitude: state?.latitude,
    longitude: state?.longitude
  });

  const onSetEmergency = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.post(`/sos_services`, data, { signal: signal })
      .then(function name(params) {
        if (params?.status === 200) {
          console.log(params?.status)
        }
      })
      .catch(function name(params) {
        console.log(params)
      })

    return () => {
      controller.abort();
    };
  };

  useEffect(() => {
    if (time === 1) {
      onSetEmergency();
    }
  }, [time])

  return (
    <Fragment>
      {time === 0 ?
        <ReportEmergencySent />
        :
        <View style={{ flex: 1, backgroundColor: '#F25555' }}>
          <View style={{ marginTop: 50, }}>
            <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Bold', fontSize: 23, color: '#F5F6FA' }}>You are about to call</Text>
            <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Bold', fontSize: 23, color: '#F5F6FA', paddingTop: 5 }}>emergency</Text>
          </View>
          <View style={{ marginTop: 30, }}>
            <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: '#F5F6FA' }}>The call will start automatically in</Text>
          </View>

          <View style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 220, height: 220, backgroundColor: '#FFFFFF', borderRadius: 120, alignItems: 'center', justifyContent: 'center' }} >
              <Text style={{ fontSize: 120, color: '#F25555', fontFamily: 'OpenSans-SemiBold' }}>{time}</Text>
            </View>
          </View>

          <Pressable style={{ position: 'absolute', bottom: 20, left: 0, right: 0, zIndex: 99, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25 }}>
            <TouchableOpacity onPress={() => Naviagte.goBack()} activeOpacity={0.70} style={{ backgroundColor: '#102952de', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 42 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </View>
      }
    </Fragment>
  )
}

export default CitizensReportEmergency