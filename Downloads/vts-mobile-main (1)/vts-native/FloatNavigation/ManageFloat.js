import React, { Fragment, useState, useEffect } from 'react';
import { View, Dimensions, Pressable, } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Stagger, IconButton, Icon, } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation } from '@react-navigation/native';

const ManageFloat = ({ toggleView = true }) => {
  let location = useRoute();
  let navigation = useNavigation();
  const [isOpenStagger, setIsOpenStagger] = useState(false);

  const onPressStagger = () => {
    setIsOpenStagger(isOpenStagger => !isOpenStagger)
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      setIsOpenStagger(false)
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Fragment>
      <Box alignItems="center" style={{ position: 'absolute', bottom: 50, right: 10, zIndex: 99999, display: isOpenStagger ? 'flex' : 'none' }}>
        <Stagger visible={isOpenStagger} initial={{ opacity: 0, scale: 0, translateY: 34 }} animate={{ translateY: 0, scale: 1, opacity: 1, transition: { type: "spring", mass: 0.8, stagger: { offset: 30, reverse: true } } }} exit={{ translateY: 34, scale: 0.5, opacity: 0, transition: { duration: 100, stagger: { offset: 30, reverse: true } } }}>

          {location?.params?.userRole?.view?.entity === 1 || location?.params?.userRole?.view?.group === 1 ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, }}>
              <View style={{ width: 140, }}>
                <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Group/Assets</Text>
              </View>
              <Pressable onPress={() => { navigation.navigate('MangeScreen'); onPressStagger() }}>
                <Center style={{ backgroundColor: location.name === 'MangeScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                  <Icon as={SimpleLineIcons} color={location.name === 'MangeScreen' ? '#ffffff' : '#67748E'} size="6" name="people" />
                </Center>
              </Pressable>
            </View>
            : <View style={{ paddingTop: 10, }} />}

          {/* {location?.params?.userRole?.view?.route_list === 1 || location?.params?.userRole?.view?.route_assign === 1 ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, }}>
              <View style={{ width: 140, }}>
                <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Route</Text>
              </View>
              <Pressable onPress={() => { navigation.navigate('RouteScreen'); onPressStagger() }}>
                <Center style={{ backgroundColor: location.name === 'RouteScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                  <Icon as={FontAwesome5} color={location.name === 'RouteScreen' ? '#ffffff' : '#67748E'} size="6" name='route' />
                </Center>
              </Pressable>
            </View>
            : <View style={{ paddingTop: 10, }} />} */}

          {/* {location?.params?.userRole?.view?.geofence_configuration === 1 ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, }}>
              <View style={{ width: 140, }}>
                <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Geofence</Text>
              </View>
              <Pressable onPress={() => { navigation.navigate('GeofenceScreen'); onPressStagger() }}>
                <Center style={{ backgroundColor: location.name === 'GeofenceScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                  <Icon as={Fontisto} color={location.name === 'GeofenceScreen' ? '#ffffff' : '#67748E'} size="6" name="compass-alt" />
                </Center>
              </Pressable>
            </View>
            : <View style={{ paddingTop: 10, }} />} */}

          {/* {location?.params?.userRole?.view?.alarm_configuration === 1 || location?.params?.userRole?.view?.alarm_log === 1 ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, }}>
              <View style={{ width: 140, }}>
                <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Alarm</Text>
              </View>
              <Pressable onPress={() => { navigation.navigate('AlarmScreen'); onPressStagger() }}>
                <Center style={{ backgroundColor: location.name === 'AlarmScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                  <Icon as={Ionicons} color={location.name === 'AlarmScreen' ? '#ffffff' : '#67748E'} size="6" name="md-notifications-outline" />
                </Center>
              </Pressable>
            </View>
            : <View style={{ paddingTop: 10, }} />} */}

          {/* {location?.params?.userRole?.view?.user === 1 || location?.params?.userRole?.view?.role === 1 ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, }}>
              <View style={{ width: 140, }}>
                <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>User/Roles</Text>
              </View>
              <Pressable onPress={() => { navigation.navigate('UserRoleScreen'); onPressStagger() }}>
                <Center style={{ backgroundColor: location.name === 'UserRoleScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                  <Icon as={FontAwesome} color={location.name === 'UserRoleScreen' ? '#ffffff' : '#67748E'} size="6" name="user-o" />
                </Center>
              </Pressable>
            </View>
            : <View style={{ paddingTop: 10, }} />} */}

          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, paddingBottom: 15 }}>
            <View style={{ width: 140, }}>
              <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Permit Violation</Text>
            </View>
            <Pressable onPress={() => { navigation.navigate('PermitViolationScreen'); onPressStagger() }}>
              <Center style={{ backgroundColor: location.name === 'PermitViolationScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                <Icon as={MaterialCommunityIcons} color={location.name === 'PermitViolationScreen' ? '#ffffff' : '#67748E'} size="6" name="car-info" />
              </Center>
            </Pressable>
          </View>

        </Stagger>
      </Box>

      {location?.params?.userRole?.view?.user === 1 || location?.params?.userRole?.view?.role === 1 || location?.params?.userRole?.view?.alarm_configuration === 1 || location?.params?.userRole?.view?.alarm_log === 1 || location?.params?.userRole?.view?.geofence_configuration === 1 || location?.params?.userRole?.view?.route_list === 1 || location?.params?.userRole?.view?.route_assign === 1 || location?.params?.userRole?.view?.entity === 1 || location?.params?.userRole?.view?.group === 1 ?
        location?.params?.userRole?.view?.user === 1 || location?.params?.userRole?.view?.role === 1 || location?.params?.userRole?.view?.alarm_configuration === 1 || location?.params?.userRole?.view?.alarm_log === 1 || location?.params?.userRole?.view?.geofence_configuration === 1 || location?.params?.userRole?.view?.route_list === 1 || location?.params?.userRole?.view?.route_assign === 1 ?
          <>
            {toggleView === true ?
              <Pressable onPress={() => onPressStagger()} style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 99999 }} >
                <IconButton onPress={() => onPressStagger()} variant="solid" _pressed={{ bg: isOpenStagger ? "#ffffff" : "#63ce78" }} borderRadius="full" size="lg" bg={isOpenStagger ? "#ffffff" : "#63ce78"} icon={<Icon as={MaterialIcons} color={isOpenStagger ? "#67748E" : "#ffffff"} size="6" name={isOpenStagger ? "close" : "alt-route"} />} />
              </Pressable>
              : null}
          </>
          : null : null}

      {isOpenStagger ?
        <Pressable onPress={() => onPressStagger()} style={{ backgroundColor: '#575d6a8c', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, position: 'absolute', }}></Pressable>
        : null}
    </Fragment>
  )
}

export default ManageFloat