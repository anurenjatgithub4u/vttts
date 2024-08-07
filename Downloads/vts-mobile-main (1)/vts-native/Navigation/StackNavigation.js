import React, { lazy, useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StatusBar } from 'react-native';
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Loadable from '../Suspense_Component/Loadable';
import BottomTabNavigation from './BottomTabNavigation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AddEntityScreen = Loadable(lazy(() => import('../ChaildScreeen/AddEntityScreen')));

const RouteScreen = Loadable(lazy(() => import('../ChaildScreeen/RouteScreen')));
const GeofenceScreen = Loadable(lazy(() => import('../ChaildScreeen/GeofenceScreen')));
const AlarmScreen = Loadable(lazy(() => import('../ChaildScreeen/AlarmScreen')));
const UserRoleScreen = Loadable(lazy(() => import('../ChaildScreeen/UserRoleScreen')));
const TrailsScreen = Loadable(lazy(() => import('../ChaildScreeen/TrailsScreen')));
const PanicScreen = Loadable(lazy(() => import('../ChaildScreeen/PanicScreen')));
const ReportScreen = Loadable(lazy(() => import('../ChaildScreeen/ReportScreen')));
const ScheduleReportScreen = Loadable(lazy(() => import('../ChaildScreeen/ScheduleReportScreen')));
const CreateGeofenceScreen = Loadable(lazy(() => import('../ChaildScreeen/CreateGeofenceScreen')));
const CreateAlarmScreen = Loadable(lazy(() => import('../ChaildScreeen/CreateAlarmScreen')));
const AddUserScreen = Loadable(lazy(() => import('../ChaildScreeen/AddUserScreen')));
const AddRouteAsignScreen = Loadable(lazy(() => import('../ChaildScreeen/AddRouteAsignScreen')));
const CreateRouteScreen = Loadable(lazy(() => import('../ChaildScreeen/CreateRouteScreen')));
const OTPGenerator = Loadable(lazy(() => import('../ChaildScreeen/OTPGenerator')));
const UploadBulkScreen = Loadable(lazy(() => import('../ChaildScreeen/UploadBulkScreen')));

const PermitViolationScreen = Loadable(lazy(() => import('../ChaildScreeen/PermitViolationScreen')));

const AddEntityGroupScreen = Loadable(lazy(() => import('../ChaildScreeen/AddEntityGroupScreen')));
const AddUserRoleScreen = Loadable(lazy(() => import('../ChaildScreeen/AddUserRoleScreen')));
const EntityVerifyScreen = Loadable(lazy(() => import('../ChaildScreeen/EntityVerifyScreen')));


const EditPanicScreen = Loadable(lazy(() => import('../ChaildScreeen/EditPanicScreen')));
const EditUserScreen = Loadable(lazy(() => import('../ChaildScreeen/EditUserScreen')));
const EditAlarmScreen = Loadable(lazy(() => import('../ChaildScreeen/EditAlarmScreen')));
const EditGeofenceScreen = Loadable(lazy(() => import('../ChaildScreeen/EditGeofenceScreen')));
const EditScheduleReportScreen = Loadable(lazy(() => import('../ChaildScreeen/EditScheduleReportScreen')));
const EditRouteAsignScreen = Loadable(lazy(() => import('../ChaildScreeen/EditRouteAsignScreen')));
const EditEntityScreen = Loadable(lazy(() => import('../ChaildScreeen/EditEntityScreen')));
const EditEntityGroupScreen = Loadable(lazy(() => import('../ChaildScreeen/EditEntityGroupScreen')));
const EditUserRoleScreen = Loadable(lazy(() => import('../ChaildScreeen/EditUserRoleScreen')));

const EditDriverNameContactScreen = Loadable(lazy(() => import('../ChaildScreeen/EditDriverNameContactScreen')));

const SearchUserScreen = Loadable(lazy(() => import('../SearchComponent/SearchUserScreen')));
const SearchRoleScreen = Loadable(lazy(() => import('../SearchComponent/SearchRoleScreen')));
const SearchAlarmConfigurationScreen = Loadable(lazy(() => import('../SearchComponent/SearchAlarmConfigurationScreen')));
const SearchAlarmLogScreen = Loadable(lazy(() => import('../SearchComponent/SearchAlarmLogScreen')));
const SearchRoutesScreen = Loadable(lazy(() => import('../SearchComponent/SearchRoutesScreen')));
const SearchRoutesAssignScreen = Loadable(lazy(() => import('../SearchComponent/SearchRoutesAssignScreen')));
const SearchSosScreen = Loadable(lazy(() => import('../SearchComponent/SearchSosScreen')));
const SearchEntityScreen = Loadable(lazy(() => import('../SearchComponent/SearchEntityScreen')));
const SearchGroupScreen = Loadable(lazy(() => import('../SearchComponent/SearchGroupScreen')));
const SearchGeofenceScreen = Loadable(lazy(() => import('../SearchComponent/SearchGeofenceScreen')));
const SearchScheduleReportScreen = Loadable(lazy(() => import('../SearchComponent/SearchScheduleReportScreen')));
const SearchAuditTrailsReportScreen = Loadable(lazy(() => import('../SearchComponent/SearchAuditTrailsReportScreen')));
 

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const StackNavigation = () => {
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
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='Root' component={BottomTabNavigation} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='AddEntityScreen' component={AddEntityScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='RouteScreen' component={RouteScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='GeofenceScreen' component={GeofenceScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='AlarmScreen' component={AlarmScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='UserRoleScreen' component={UserRoleScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='TrailsScreen' component={TrailsScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='PanicScreen' component={PanicScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='ReportScreen' component={ReportScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='ScheduleReportScreen' component={ScheduleReportScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='CreateGeofenceScreen' component={CreateGeofenceScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='CreateAlarmScreen' component={CreateAlarmScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='AddUserScreen' component={AddUserScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='AddRouteAsignScreen' component={AddRouteAsignScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='CreateRouteScreen' component={CreateRouteScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='OTPGenerator' component={OTPGenerator} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditPanicScreen' component={EditPanicScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditUserScreen' component={EditUserScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditAlarmScreen' component={EditAlarmScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditGeofenceScreen' component={EditGeofenceScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditScheduleReportScreen' component={EditScheduleReportScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditRouteAsignScreen' component={EditRouteAsignScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditEntityScreen' component={EditEntityScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='PermitViolationScreen' component={PermitViolationScreen} />

          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchUserScreen' component={SearchUserScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchRoleScreen' component={SearchRoleScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchAlarmConfigurationScreen' component={SearchAlarmConfigurationScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchAlarmLogScreen' component={SearchAlarmLogScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchRoutesScreen' component={SearchRoutesScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchRoutesAssignScreen' component={SearchRoutesAssignScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchSosScreen' component={SearchSosScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchEntityScreen' component={SearchEntityScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchGroupScreen' component={SearchGroupScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchGeofenceScreen' component={SearchGeofenceScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchScheduleReportScreen' component={SearchScheduleReportScreen} />
          <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='SearchAuditTrailsReportScreen' component={SearchAuditTrailsReportScreen} />

          <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
            <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='AddEntityGroupScreen' component={AddEntityGroupScreen} />
            <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='AddUserRoleScreen' component={AddUserRoleScreen} />
            <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditEntityGroupScreen' component={EditEntityGroupScreen} />
            <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditUserRoleScreen' component={EditUserRoleScreen} />
            <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='UploadBulkScreen' component={UploadBulkScreen} />
            <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EntityVerifyScreen' component={EntityVerifyScreen} />
            <Stack.Screen initialParams={{ userRole: getRole, userId: getUser?.userId, userToken: base64.encode(`${getUser?.email}` + ':' + `${getUser?.password}`) }} options={{ headerShown: false }} name='EditDriverNameContactScreen' component={EditDriverNameContactScreen} />
          </Stack.Group>

        </Stack.Navigator>
      }
    </>
  )
}

export default StackNavigation