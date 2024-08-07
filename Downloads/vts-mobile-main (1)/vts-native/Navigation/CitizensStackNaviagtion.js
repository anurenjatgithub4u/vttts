import React, { lazy, useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StatusBar } from 'react-native';
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Loadable from '../Suspense_Component/Loadable';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const CitizensHomeScreen = Loadable(lazy(() => import('../CitizensScrees/CitizensHomeScreen')));

const CitizensReportEmergencyScreen = Loadable(lazy(() => import('../CitizensScrees/CitizensReportEmergencyScreen')));
const CitizensReportPermitViolationScreen = Loadable(lazy(() => import('../CitizensScrees/CitizensReportPermitViolationScreen')));
const CitizensAccountScreen = Loadable(lazy(() => import('../CitizensScrees/CitizensAccountScreen')));
const CitizensHistory = Loadable(lazy(() => import('../CitizensScrees/CitizensHistory')));
const UpdateCitizensOtpVerifyScreen = Loadable(lazy(() => import('../CitizensScrees/UpdateCitizensOtpVerifyScreen')));

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const CitizensStackNaviagtion = () => {
  const [getUser, setGetUser] = useState();
  const [getRole, setGetRole] = useState();

  const getSessionUserData = async () => {
    const result = await AsyncStorage.getItem('userLoginData');
    const obj = JSON.parse(result)
    setGetUser(obj)
  };
  useEffect(() => {
    getSessionUserData();
  }, [])
  const SessionRoleData = async () => {
    const result = await AsyncStorage.getItem('userRoleData');
    const obj = JSON.parse(result)
    setGetRole(obj)
  };
  useEffect(() => {
    SessionRoleData();
  }, [])

  return (
    <>
      {getUser?.email === undefined || getUser?.password === undefined ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBEBFD' }}>
          <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor="#EBEBFD" />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 5, padding: 15, elevation: 12 }}>
            <ActivityIndicator animating={true} color={'#63CE78'} size={'large'} />
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', paddingLeft: 8, fontSize: 14 }}>Processing, Please wait</Text>
          </View>
        </View>
        :
        <Stack.Navigator>
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='CitizensHomeScreen' component={CitizensHomeScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='CitizensReportEmergencyScreen' component={CitizensReportEmergencyScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='CitizensReportPermitViolationScreen' component={CitizensReportPermitViolationScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='CitizensAccountScreen' component={CitizensAccountScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='CitizensHistory' component={CitizensHistory} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='UpdateCitizensOtpVerifyScreen' component={UpdateCitizensOtpVerifyScreen} />
        </Stack.Navigator>
      }
    </>
  )
}

export default CitizensStackNaviagtion