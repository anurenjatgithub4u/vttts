import React, { Fragment, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportEmergencySent = () => {
  let Naviagte = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0))?.current

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])

  useEffect(() => {
    setTimeout(() => {
      Naviagte.goBack();
    }, 5000);
  }, []);


  return (
    <Fragment>
      <View style={{ flex: 1, backgroundColor: '#F25555' }}>
        <View style={{ marginTop: 50, }}>
          <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Bold', fontSize: 23, color: '#F5F6FA' }}>emergency request sent !</Text>
        </View>
        <View style={{ marginTop: 30, }}>
          <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: '#F5F6FA' }}>you will receive a call from control room</Text>
          <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: '#F5F6FA' }}>Please stay calm help will reachout</Text>
          <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: '#F5F6FA' }}>to you soon</Text>
        </View>

        <View style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
          <Animated.View style={{ opacity: fadeAnim, width: 240, height: 250, backgroundColor: '#E38527', borderRadius: 130, alignItems: 'center', justifyContent: 'center' }} >
            <View style={{ width: 200, height: 200, backgroundColor: '#F08080', borderRadius: 120, alignItems: 'center', justifyContent: 'center' }} >
              <View style={{ width: 160, height: 160, backgroundColor: '#F25555', borderRadius: 120, alignItems: 'center', justifyContent: 'center' }} >
                <MaterialCommunityIcons name={'map-marker-account'} color={'#FFFFFF'} size={70} />
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </Fragment>
  )
}

export default ReportEmergencySent