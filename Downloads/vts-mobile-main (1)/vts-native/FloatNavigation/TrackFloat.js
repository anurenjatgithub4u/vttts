import React, { Fragment, useState, useEffect } from 'react';
import { View, Dimensions, Pressable, } from 'react-native';
import { Box, Text, Center } from 'native-base';
import { Stagger, IconButton, Icon, } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

function TrackFloat() {
  let location = useRoute();
  let navigation = useNavigation();
  const [isOpenStagger, setIsOpenStagger] = useState(false);

  const onPressStagger = () => {
    setIsOpenStagger(isOpenStagger => !isOpenStagger)
  };

  //  console.log('location',location?.params?.userRole?.view)

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
          {location?.params?.userRole?.view?.trails === 1 || location?.params?.userRole?.view?.trip_trail === 1 ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, }}>
              <View style={{ width: 90 }}>
                <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Trials</Text>
              </View>
              <Pressable onPress={() => { navigation.navigate('TrailsScreen'); onPressStagger() }}>
                <Center style={{ backgroundColor: location.name === 'TrailsScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                  <Icon as={FontAwesome5} color={location.name === 'TrailsScreen' ? '#ffffff' : '#67748E'} size="6" name="route" />
                </Center>
              </Pressable>
            </View>
            : <View style={{ paddingTop: 10, }} />}

          {location?.params?.userRole?.view?.panic_status === 1 || location?.params?.userRole?.view?.panic_sos === 1 ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, }}>
              <View style={{ width: 90 }}>
                <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Panic</Text>
              </View>
              <Pressable onPress={() => { navigation.navigate('PanicScreen'); onPressStagger() }}>
                <Center style={{ backgroundColor: location.name === 'PanicScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                  <Icon as={Ionicons} color={location.name === 'PanicScreen' ? '#ffffff' : '#67748E'} size="6" name='warning-outline' />
                </Center>
              </Pressable>
            </View>
            : <View style={{ paddingTop: 10, }} />}

          {location?.params?.userRole?.view?.vehicle_list === 1 || location?.params?.userRole?.view?.vehicle_map === 1 ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, }}>
              <View style={{ width: 90 }}>
                <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Vehicle</Text>
              </View>
              <Pressable onPress={() => { navigation.navigate('TrackScreen'); onPressStagger() }}>
                <Center style={{ backgroundColor: location.name === 'TrackScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                  <Icon as={MaterialCommunityIcons} color={location.name === 'TrackScreen' ? '#ffffff' : '#67748E'} size="6" name="truck-outline" />
                </Center>
              </Pressable>
            </View>
            : <View style={{ paddingTop: 10, }} />}

          {location?.params?.userRole?.view?.by_vehicle === 1 || location?.params?.userRole?.view?.by_group === 1 || location?.params?.userRole?.view?.schedule === 1 || location?.params?.userRole?.view?.audit_trail === 1 ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10, paddingBottom: 15 }}>
              <View style={{ width: 90 }}>
                <Text style={{ color: '#ffffff', textAlign: 'right', paddingRight: 10, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Reports</Text>
              </View>
              <Pressable onPress={() => { navigation.navigate('ReportScreen'); onPressStagger() }}>
                <Center style={{ backgroundColor: location.name === 'ReportScreen' ? "#4646f2" : '#ffffff', width: 40, height: 40, borderRadius: 50 }}>
                  <Icon as={MaterialCommunityIcons} color={location.name === 'ReportScreen' ? '#ffffff' : '#67748E'} size="6" name="file-clock-outline" />
                </Center>
              </Pressable>
            </View>
            : <View style={{ paddingTop: 10, }} />}

        </Stagger>
      </Box>
      {location?.params?.userRole?.view?.by_vehicle === 1 || location?.params?.userRole?.view?.by_group === 1 || location?.params?.userRole?.view?.panic_status === 1 || location?.params?.userRole?.view?.panic_sos === 1 || location?.params?.userRole?.view?.trails === 1 || location?.params?.userRole?.view?.trip_trail === 1 || location?.params?.userRole?.view?.vehicle_list === 1 || location?.params?.userRole?.view?.vehicle_map === 1 ?
        location?.params?.userRole?.view?.by_vehicle === 1 || location?.params?.userRole?.view?.by_group === 1 || location?.params?.userRole?.view?.panic_status === 1 || location?.params?.userRole?.view?.panic_sos === 1 || location?.params?.userRole?.view?.trails === 1 || location?.params?.userRole?.view?.trip_trail === 1 ?
          <Pressable onPress={() => onPressStagger()} style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 99999 }} >
            <IconButton onPress={() => onPressStagger()} variant="solid" _pressed={{ bg: isOpenStagger ? "#ffffff" : "#63ce78" }} borderRadius="full" size="lg" bg={isOpenStagger ? "#ffffff" : "#63ce78"} icon={<Icon as={MaterialIcons} color={isOpenStagger ? "#67748E" : "#ffffff"} size="6" name={isOpenStagger ? "close" : "alt-route"} />} />
          </Pressable>
          : null : null}
      {/* <Pressable onPress={() => onPressStagger()} style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 99999 }} >
        <IconButton onPress={() => onPressStagger()} variant="solid" _pressed={{ bg: isOpenStagger ? "#ffffff" : "#63ce78" }} borderRadius="full" size="lg" bg={isOpenStagger ? "#ffffff" : "#63ce78"} icon={<Icon as={MaterialIcons} color={isOpenStagger ? "#67748E" : "#ffffff"} size="6" name={isOpenStagger ? "close" : "alt-route"} />} />
      </Pressable> */}

      {isOpenStagger ?
        <Pressable onPress={() => onPressStagger()} style={{ backgroundColor: '#575d6a8c', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, position: 'absolute', }}></Pressable>
        : null}
    </Fragment>
  )
}

export default TrackFloat