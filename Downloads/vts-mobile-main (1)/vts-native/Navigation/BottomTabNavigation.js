import React, { lazy, Fragment, useState, useEffect } from 'react';
import { useRoute, useIsFocused } from '@react-navigation/native';
import Loadable from '../Suspense_Component/Loadable';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator, Text, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Center } from 'native-base';
import { useHeader } from '../ApiHeader';

const HomeScreen = Loadable(lazy(() => import('../MainScreen/HomeScreen')))
const TrackScreen = Loadable(lazy(() => import('../MainScreen/TrackScreen')))
const MangeScreen = Loadable(lazy(() => import('../MainScreen/MangeScreen')))
const MessageScreen = Loadable(lazy(() => import('../MainScreen/MessageScreen')))
const AccountScreen = Loadable(lazy(() => import('../MainScreen/AccountScreen')))

const Tab = createBottomTabNavigator();

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const BottomTabNavigation = () => {
  const location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [getRole, setGetRole] = useState();
  const [totalMessage, setTotalMessage] = useState(0);

  const SessionRoleData = async () => {
    const result = await AsyncStorage.getItem('userRoleData');
    const obj = JSON.parse(result)
    setGetRole(obj)
  };
  useEffect(() => {
    SessionRoleData();
  }, [])

  const FormDate = `${new Date().toISOString()}`.split('T')[0] + "T" + '00:00:00Z';
  const ToDate = `${new Date().toISOString()}`.split('T')[0] + "T" + '23:59:59Z';
  useEffect(() => {
    const getMessageCount = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      await ApiRequestAuthorizationHook.get(`/notifications/bydate/logs?from=${FormDate}&to=${ToDate}`, { signal: signal })
        .then((result) => {
          if (result.status === 200) {
            setTotalMessage(result?.data?.noRecords);

          }
        }).catch((err) => {
          console.log('getMessageCount', err)
        });

      return () => {
        controller.abort();
      };
    }
    getMessageCount();
  }, [])

  return (
    <Fragment>
      {getRole === undefined ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBEBFD' }}>
          <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor="#EBEBFD" />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 5, padding: 15, elevation: 12 }}>
            <ActivityIndicator animating={true} color={'#63CE78'} size={'large'} />
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', paddingLeft: 8, fontSize: 14 }}>Processing, Please wait</Text>
          </View>
        </View>
        :
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarInactiveTintColor: '#67748E',
            tabBarActiveTintColor: '#4646F2',
            tabBarStyle: { borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 10, paddingBottom: 10, height: 65, backgroundColor: '#FFFFFF', },
            tabBarHideOnKeyboard: true,
            tabBarVisible: true,
            safeAreaInset: {
              bottom: "always"
            },
          }}
        >

          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            initialParams={{ userRole: getRole, userToken: location?.params?.userToken, userId: location?.params?.userId }}
            options={{
              tabBarLabelStyle: {
                fontFamily: 'OpenSans-Regular', fontSize: 12
              },
              tabBarLabel: 'Home',
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Octicons name="home" color={color} size={20} />
              ),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate('HomeScreen')
                if (!navigation.canGoBack()) {
                  e.preventDefault();
                }
              },
            })}
          />

          <Tab.Screen
            name="TrackScreen"
            component={TrackScreen}
            initialParams={{ userRole: getRole, userToken: location?.params?.userToken, userId: location?.params?.userId }}
            options={{
              tabBarLabelStyle: {
                fontFamily: 'OpenSans-Regular', fontSize: 12
              },
              tabBarLabel: 'Track',
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Center>
                  <MaterialCommunityIcons name="map-marker-outline" color={color} size={20} />
                  <Octicons name='dash' color={color} size={20} style={{ position: 'absolute', top: 12 }} />
                </Center>
              ),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate('TrackScreen')
                if (!navigation.canGoBack()) {
                  e.preventDefault();
                }
              },
            })}
          />

          <Tab.Screen
            name="MangeScreen"
            component={MangeScreen}
            initialParams={{ userRole: getRole, userToken: location?.params?.userToken, userId: location?.params?.userId }}
            options={{
              tabBarLabelStyle: {
                fontFamily: 'OpenSans-Regular', fontSize: 12
              },
              tabBarLabel: 'Assets',
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="settings-input-component" color={color} size={20} />
              ),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate('MangeScreen')
                if (!navigation.canGoBack()) {
                  e.preventDefault();
                }
              },
            })}
          />

          <Tab.Screen
            name="MessageScreen"
            component={MessageScreen}
            initialParams={{ userRole: getRole, userToken: location?.params?.userToken, userId: location?.params?.userId }}
            options={{
              tabBarLabelStyle: {
                fontFamily: 'OpenSans-Regular', fontSize: 12
              },
              tabBarLabel: 'Message',
              headerShown: false,
              tabBarBadge: totalMessage >= 99 ? '99+' : totalMessage,
              tabBarIcon: ({ color }) => (
                <Icon name="notifications-outline" color={color} size={20} />
              ),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate('MessageScreen')
                if (!navigation.canGoBack()) {
                  e.preventDefault();
                }
              },
            })}
          />
          <Tab.Screen
            name="AccountScreen"
            component={AccountScreen}
            initialParams={{ userRole: getRole, userToken: location?.params?.userToken, userId: location?.params?.userId }}
            options={{
              tabBarLabelStyle: {
                fontFamily: 'OpenSans-Regular', fontSize: 12
              },
              tabBarLabel: 'Account',
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <AntDesign name="user" color={color} size={20} />
              ),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate('AccountScreen')
                if (!navigation.canGoBack()) {
                  e.preventDefault();
                }
              },
            })}
          />
        </Tab.Navigator>
      }
    </Fragment>
  )
}



export default BottomTabNavigation;
