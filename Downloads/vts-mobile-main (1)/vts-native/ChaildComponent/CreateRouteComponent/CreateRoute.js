import React, { Fragment, useRef } from 'react';
import { useState } from 'react';
import { View, Text, LayoutAnimation, UIManager, Platform, Pressable, ActivityIndicator, Modal, ScrollView, Dimensions, StyleSheet, ToastAndroid, Vibration } from 'react-native';
import { Select, CheckIcon, Input, TextArea, Actionsheet, useDisclose } from 'native-base';
import { useHeader } from '../../ApiHeader';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Dash from 'react-native-dash';
import { Col, Row } from 'react-native-responsive-grid-system';
import MapView, { Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_KEY } from '../../constants/googleMapKey';
import { getCurrentLocation, locationPermission } from '../../helper/helperFunction';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const screen = Dimensions.get('window');
const ASPECT_RATIO = (screen.width / screen.height);
const LATITUDE_DELTA = 3.400;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CreateRoute = () => {
  let Navigation = useNavigation();
  const mapRef = useRef()
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = useState();
  const [dataSet, setDataSet] = useState('');
  const [useEntry, setUseEntry] = useState(0);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null });
  const [mapMaximize, setMapMaximize] = useState(false);
  const [loaderRoute, setLoaderRoute] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [loader, setLoader] = useState(false);
  const [routeData, setRouteData] = useState([]);

  const [routeName, setRouteName] = useState(false);
  const [stopType, setStopType] = useState(false);
  const [routeType, setRouteType] = useState(false);
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
  })
  const [value, setValue] = useState({
    RouteName: '',
    StopType: '',
    RouteType: '',
    Description: '',
    Stops: '',
  })
  const [latitude, setLatitude] = useState(false)
  const [longitude, setLongitude] = useState(false)
  const [latitudeIsValid, setLatitudeIsValid] = useState(null)
  const [longitudeIsValid, setLongitudeIsValid] = useState(null)
  const [arrIndex, setArrIndex] = useState('')
  const [locationValue, setLocationValue] = useState({
    Name: '',
    Latitude: '',
    Longitude: '',
    Radius: 200
  })
  const [locationAdd, setLocationAdd] = useState([]);

  const onChangeRouteName = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, RouteName: Text });
      setRouteName(false)
    } else {
      setValue({ ...value, RouteName: Text });
      setRouteName(false)
    }
  }
  const onChangeStoptype = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, StopType: Text });
      setStopType(false)
    } else {
      setValue({ ...value, StopType: Text });
      setStopType(false)
    }
  }
  const onChangeRouteType = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, RouteType: Text });
      setRouteType(false)
    } else {
      setValue({ ...value, RouteType: Text });
      setRouteType(false)
    }
  }
  const onChangeDescription = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, Description: Text });
    } else {
      setValue({ ...value, Description: Text });
    }
  }
  const onChangeStops = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, Stops: Text });
      //setDescription(false)
    } else {
      setValue({ ...value, Stops: Text });
      //setDescription(false)
    }
  }

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };
  var validationuser = '';
  const validateuser = () => {
    if (checkStringNullEmpty(value.RouteName)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setRouteName(true)
    }
    if (checkStringNullEmpty(value.StopType)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setStopType(true)
    }
    if (checkStringNullEmpty(value.RouteType)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setRouteType(true)
    }
  }

  const createRouteData = JSON.stringify({
    name: value?.RouteName,
    points: locationAdd?.map((value) => ({ name: value?.Name, latitude: value?.Latitude, longitude: value?.Longitude, radius: value?.Radius })),
    stopType: value?.StopType,
    routeType: value?.RouteType,
    description: value?.Description,
    createdOn: new Date(),
  });

  const onSubmit = async () => {
    validateuser();
    if (validationuser === '') {
      if (locationAdd?.length !== 1) {
        setLoader(true)
        await ApiRequestAuthorizationHook.post(`/routes`, createRouteData)
          .then(function (ress) {
            if (ress.status === 200) {
              setLoader(false)
              setCustomModal({ ...customModal, modal: true, message: 'Create Route Successfully', status: 1 })
            }
          })
          .catch(function (err) {
            console.log('routes', err)
            setLoader(false)
            setCustomModal({ ...customModal, modal: true, message: 'Create Route failed', status: 0 })
          })
      } else {
        Vibration.vibrate(2 * 100)
        ToastAndroid.showWithGravity(
          "Select or Enter two location!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      }
    }
  }

  const getDataRoute = async () => {
    setLoaderRoute(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/geofences`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setRouteData(ress?.data?.data)
          setLoaderRoute(false)
        }
      })
      .catch(function (err) {
        console.log('setRouteData', err)
        setLoaderRoute(false)
      })

    return () => {
      controller.abort();
    };
  }

  const onRoute = () => {
    Navigation.navigate('RouteScreen')
    setValue({ ...value, type: '', always: false, Vehicle: '', AlarmDescription: '' })
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  const getLocalData = () => {
    if (locationAdd) {
      return locationAdd;
    } else {
      return [];
    }
  };
  React.useEffect(() => {
    setLocationAdd(getLocalData())
  })

  const onGetRouteData = routeData.find(x => x?.id === parseInt(value?.Stops))
  useEffect(() => {
    if (onGetRouteData?.area !== undefined) {
      setLocationAdd([...locationAdd, { Name: onGetRouteData?.name, Latitude: parseFloat(onGetRouteData?.area?.match(/[^()]+/g)[1]?.split(",")[0]?.split(" ")[0]), Longitude: parseFloat(onGetRouteData?.area?.match(/[^()]+/g)[1]?.split(",")[0]?.split(" ")[1]), Radius: parseInt(onGetRouteData?.area?.match(/[^()]+/g)[1]?.split(",")[1]) }])
    }
  }, [onGetRouteData])

  const onZoomInPress = () => {
    mapRef?.current?.getCamera().then((cam) => {
      cam.zoom += 1;
      mapRef?.current?.animateCamera(cam);
    });
  };
  const onZoomOutPress = () => {
    mapRef?.current?.getCamera().then((cam) => {
      cam.zoom -= 1;
      mapRef?.current?.animateCamera(cam);
    });
  };

  const handlePress = async (event) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(event?.id)
    await ApiRequestAuthorizationHook.get(`/server/geocode?latitude=${event?.lat}&longitude=${event?.long}`)
      .then(function (response) {
        if (response?.status === 200) {
          setDataSet(response?.data)
        }
      })
      .catch(function (error) {
        console.log(error);
        setDataSet('Address not found')
      });
  };

  const onChangeLatitude = (Text) => {
    validLatitude(Text)
    if (Text.trim().length !== 0) {
      setLocationValue({ ...locationValue, Latitude: Text });
      setLatitude(false)
    } else {
      setLocationValue({ ...locationValue, Latitude: Text });
      setLatitude(false)
    }
  }
  const validLatitude = (Text) => {
    var regexLat = new RegExp('^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$');
    if (regexLat?.test(Text) === false) {
      setLatitudeIsValid(false)
      // console.log("Latitude is Not Correct");
      return false;
    } else {
      setLatitudeIsValid(true)
      // console.log("Latitude is Correct");
    }
  }

  const onChangeLongitude = (Text) => {
    validLongitude(Text)
    if (Text.trim().length !== 0) {
      setLocationValue({ ...locationValue, Longitude: Text });
      setLongitude(false)
    } else {
      setLocationValue({ ...locationValue, Longitude: Text });
      setLongitude(false)
    }
  }
  const validLongitude = (Text) => {
    var regexLong = new RegExp('^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$');
    if (regexLong?.test(Text) === false) {
      setLongitudeIsValid(false)
      // console.log("Longitude is Not Correct");
      return false;
    } else {
      setLongitudeIsValid(true)
      // console.log("Longitude is Correct");
    }
  }

  var validationLocation = '';
  const validateLocation = () => {
    if (checkStringNullEmpty(locationValue.Latitude)) {
      validationLocation += '<li>Enter Your Confrim Password</li>';
      setLatitude(true)
    }
    if (checkStringNullEmpty(locationValue.Longitude)) {
      validationLocation += '<li>Enter Your Confrim Password</li>';
      setLongitude(true)
    }
    /* if (checkStringNullEmpty(locationValue.Radius)) {
      validationLocation += '<li>Enter Your Confrim Password</li>';
      setRadius(true)
    } */
  }

  const locationObjLocal = {
    Name: `USER_ENTRY_${useEntry}`,
    Latitude: parseFloat(locationValue?.Latitude),
    Longitude: parseFloat(locationValue?.Longitude),
    Radius: 200,
    user_entry: true
  }

  const onAddLocation = () => {
    validateLocation();
    if (validationLocation === '') {
      if (latitudeIsValid === true && longitudeIsValid === true) {
        setUseEntry(useEntry + 1);
        setLocationAdd([...locationAdd, locationObjLocal])
        setLocationValue({ ...locationValue, Name: '', Latitude: '', Longitude: '', Radius: '' })
      }
    }
  }
  const removeData = (index) => {
    setLocationAdd([
      ...locationAdd.slice(0, index),
      ...locationAdd.slice(index + 1, locationAdd.length)
    ]);
  }
  const editData = (index) => {
    setArrIndex(index)
    setLocationValue({ Latitude: locationAdd[index]?.Latitude?.toString(), Longitude: locationAdd[index]?.Longitude?.toString(), })
  }
  const onEditLocation = () => {
    validateLocation();
    if (validationLocation === '') {
      if (latitudeIsValid === true && longitudeIsValid === true) {
        const obj = locationAdd.findIndex(((obj, index) => index == arrIndex));
        locationAdd[obj].Latitude = locationValue?.Latitude.toString();
        locationAdd[obj].Longitude = locationValue?.Longitude.toString();
        setArrIndex('');
        setLocationValue({ ...locationValue, Name: '', Latitude: '', Longitude: '', Radius: '' });
      }
    }
  }

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission()
    if (locPermissionDenied) {
      const { latitude, longitude } = await getCurrentLocation();
      setState({ ...state, latitude: latitude, longitude: longitude })
    } else {

    }
  }

  useEffect(() => {
    getLiveLocation()
  }, [])

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Fragment>
      <Modal visible={customModal.modal} transparent={true}>
        <View style={{ flex: 1, backgroundColor: '#0000ff4d', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>TrackoLet</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={loader} transparent>
        <View style={{ flex: 1, backgroundColor: '#ededfcab', justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#ffffff', borderRadius: 4, padding: 10, marginBottom: 20, marginHorizontal: 20, marginTop: 20, elevation: 12 }}>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold' }}>Create new Route</Text>

          <View style={{ marginTop: 15 }}>
            <View>
              <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', }}>Route Name</Text>
              <Input value={value?.RouteName} onChangeText={(Text) => onChangeRouteName(Text)} variant={'unstyled'} placeholder='Route Name' placeholderTextColor={'#7D8EAB'} style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} />
            </View>
            {routeName ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Route Name is required</Text>
              </View>
              : null
            }
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', }}>Stop Type</Text>
            <View style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}>
              <Select placeholderTextColor={'#7D8EAB'} borderWidth={0} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40 }} selectedValue={value?.StopType} minWidth="200" placeholder="Select" _selectedItem={{
                endIcon: <CheckIcon size="5" />
              }} onValueChange={itemValue => onChangeStoptype(itemValue)}>
                <Select.Item label={'Start Exit, Rest Entry'} value={'Start Exit, Rest Entry'} />
              </Select>
            </View>
            {stopType ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Stop Type is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', }}>Route Type</Text>
            <View style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}>
              <Select placeholderTextColor={'#7D8EAB'} borderWidth={0} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40 }} selectedValue={value?.RouteType} minWidth="200" placeholder="Select" _selectedItem={{
                endIcon: <CheckIcon size="5" />
              }} onValueChange={itemValue => onChangeRouteType(itemValue)}>
                <Select.Item label={'Pick'} value={'Pick'} />
                <Select.Item label={'Drop'} value={'Drop'} />
              </Select>
            </View>
            {routeType ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Route Type is required</Text>
              </View>
              : null
            }
          </View>

          <View style={{ marginTop: 15 }}>
            <View>
              <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', }}>Description</Text>
              <TextArea value={value?.Description} onChangeText={(Text) => onChangeDescription(Text)} variant={'unstyled'} numberOfLines={6} placeholderTextColor={"#7D8EAB"} placeholder="Write Here…" style={{ backgroundColor: '#e2e2fd', borderRadius: 5, /* height: 40, */ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#ffffff', borderRadius: 4, padding: 10, marginBottom: 20, marginHorizontal: 20, marginTop: 5, elevation: 12 }}>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold' }}>Enter location</Text>

          <View style={{ marginTop: 15 }}>
            <View>
              <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', }}>Latitude</Text>
              <Input keyboardType={'numeric'} value={locationValue?.Latitude} onChangeText={(Text) => onChangeLatitude(Text)} variant={'unstyled'} placeholder='Enter' placeholderTextColor={'#7D8EAB'} style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} />
            </View>
            {latitude ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Latitude is required</Text>
              </View>
              : null
            }
            {latitudeIsValid === false ?
              <View>
                <Text style={{ color: 'red', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Invalid Latitude</Text>
              </View>
              : null
            }
          </View>
          <View style={{ marginTop: 15 }}>
            <View>
              <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', }}>Longitude</Text>
              <Input keyboardType={'numeric'} value={locationValue?.Longitude} onChangeText={(Text) => onChangeLongitude(Text)} variant={'unstyled'} placeholder='Enter' placeholderTextColor={'#7D8EAB'} style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} />
            </View>
            {longitude ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Longitude is required</Text>
              </View>
              : null
            }
            {longitudeIsValid === false ?
              <View>
                <Text style={{ color: 'red', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>Invalid Longitude</Text>
              </View>
              : null
            }
          </View>

          <Row>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ marginTop: 15 }}>

              </View>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ marginTop: 15 }}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', }}></Text>
                <Pressable onPress={() => { arrIndex === '' ? onAddLocation() : onEditLocation() }} style={{ backgroundColor: '#63CE78', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, }}>
                  <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#ffffff' }}>{arrIndex === '' ? 'Add' : 'Edit'}</Text>
                </Pressable>
              </View>
            </Col>
          </Row>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 20 }}>
            <Dash dashColor='#707070' dashThickness={1} dashLength={5} dashGap={3} style={{ width: 130, flexDirection: 'row', }} />
            <Text style={{ fontFamily: 'OpenSans-Regular', color: '#67748E', fontSize: 14, paddingRight: 10, paddingLeft: 10 }}>or</Text>
            <Dash dashColor='#707070' dashThickness={1} dashLength={5} dashGap={3} style={{ width: 130, flexDirection: 'row', }} />
          </View>

          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold' }}>Select existing stop</Text>
          <View style={{ marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', }}>Stops</Text>
            <View style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}>
              <Select onOpen={() => routeData?.length === 0 ? getDataRoute() : null} borderWidth={0} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40 }} selectedValue={value?.Stops} placeholderTextColor={'#7D8EAB'} minWidth="200" placeholder="Select Route" _selectedItem={{
                endIcon: <CheckIcon size="5" />
              }}
                onValueChange={itemValue => onChangeStops(itemValue)}
                _actionSheetBody={{
                  ListHeaderComponent:
                    <View>
                      {loaderRoute === true ?
                        <ActivityIndicator color={'#63ce78'} size={'large'} />
                        :
                        <View></View>
                      }
                    </View>,
                  ListEmptyComponent:
                    <View>
                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                    </View>,
                }}
              >
                {loaderRoute ?
                  <View>
                    <ActivityIndicator color={'#63CE78'} size={'large'} />
                  </View>
                  :
                  routeData?.filter(valueType => { return (valueType.area.toLowerCase().includes("CIRCLE".toLowerCase())) }).map((value, index) => (
                    <Select.Item key={index} label={value?.name} value={value?.id?.toString()} />
                  ))
                }
              </Select>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10, }}>
            <Pressable onPress={onOpen} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: '#F5F6FA', paddingTop: 7, paddingBottom: 7, paddingRight: 12, paddingLeft: 12, borderRadius: 5 }}>
              <Ionicons name={'location-sharp'} color={'#67748E'} size={18} />
              <Text style={{ color: '#67748E', fontFamily: 'OpenSans-Regular', fontSize: 14, textAlign: 'center', paddingLeft: 10 }}>Show on map</Text>
            </Pressable>
          </View>
        </View>

        {locationAdd.map((value, index) => (
          <View key={index} style={{ backgroundColor: '#FFFFFF', borderRadius: 5, margin: 5, paddingLeft: 8, paddingRight: 8, paddingTop: 20, paddingBottom: 20, marginHorizontal: 15, elevation: 12 }}>
            <Pressable onPress={() => expanded === index ? handlePress({ id: '', lat: value?.Latitude, long: value?.Longitude }) : handlePress({ id: index, lat: value?.Latitude, long: value?.Longitude })} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 18, marginRight: 5, height: 18, borderColor: 'gray', borderWidth: 1, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'gray', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>{index + 1}</Text>
              </View>
              <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-Bold' }}>{value?.Name}</Text>
              <View style={{ flexGrow: 1 }} />
              {/* <Pressable onPress={() => removeData(index)}>
                <MaterialCommunityIcons name='delete-outline' size={20} color={'blue'} />
              </Pressable> */}
              <Pressable>
                <AntDesign name='pluscircleo' size={20} color={'blue'} style={{ paddingLeft: 8 }} />
              </Pressable>
            </Pressable>

            {expanded === index ?
              <View style={{ paddingHorizontal: 20, }}>
                <Text style={{ fontSize: 12, fontFamily: 'OpenSans-SemiBold', color: '#2E2C33', paddingTop: 5 }}>{dataSet}</Text>
                <View style={{ margin: 5, paddingTop: 15 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                      <FontAwesome5 name='route' size={16.8} color={'#63ce78'} style={{ paddingRight: 10 }} />
                      <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Rgular', color: '#252F40' }}>Distance (KM)</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontFamily: 'OpenSans-SemiBold', color: '#2E2C33' }}>0.00 Km</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%', paddingTop: 13, paddingBottom: 13 }}>
                      <MaterialCommunityIcons name='clock-time-four-outline' size={16.8} color={'#FA9826'} style={{ paddingRight: 10 }} />
                      <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Rgular', color: '#252F40' }}>Planned Time</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontFamily: 'OpenSans-SemiBold', color: '#2E2C33' }}>{`${new Date()?.getDate()?.toString()?.padStart(2, "0")} ${months[new Date()?.getMonth()]} ${new Date().getFullYear()}`}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                      <MaterialCommunityIcons name='map-marker-radius-outline' size={16.8} color={'#6E26FA'} style={{ paddingRight: 10 }} />
                      <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Rgular', color: '#252F40' }}>Point type</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontFamily: 'OpenSans-SemiBold', color: '#2E2C33' }}>12/09/22 02:11:58</Text>
                  </View>
                </View>
                <View style={{ display: value?.user_entry === true ? 'flex' : 'none' }}>
                  <Pressable onPress={() => { editData(index) }} style={{ alignSelf: 'flex-start', backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                    <FontAwesome5 name='edit' size={15} color={'#ffffff'} />
                    <Text style={{ paddingLeft: 5, color: '#FFFFFF', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>Edit</Text>
                  </Pressable>
                </View>
              </View>
              : null}
          </View>
        ))}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 5, paddingHorizontal: 15, paddingBottom: 15 }}>
          <Pressable onPress={onSubmit} style={{ width: '100%', backgroundColor: 'blue', paddingTop: 7, paddingBottom: 7, paddingRight: 12, paddingLeft: 12, borderRadius: 5 }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Regular', fontSize: 14, textAlign: 'center' }}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        {state?.latitude === null || state?.latitude === null ?
          <View style={{ height: 450, backgroundColor: '#ffffff', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View style={{ height: 450, backgroundColor: '#ffffff', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
            <MapView
              ref={mapRef}
              customMapStyle={mapDarkStyle}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: locationAdd[0] === undefined ? state?.latitude : parseFloat(locationAdd[0]?.Latitude),
                longitude: locationAdd[0] === undefined ? state?.longitude : parseFloat(locationAdd[0]?.Longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              zoom={3}
              loadingEnabled={true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              showsCompass={false}
              userInterfaceStyle="dark"
              scrollEnabled={true}
              zoomEnabled={true}
              rotateEnabled={true}
              zoomControlEnabled={false}
              minZoomLevel={1}
              maxZoomLevel={100}
              fullscreenControl={false}
              maxDelta={0.02}
            >
              {locationAdd[0] === undefined ?
                null
                :
                locationAdd?.map((value, index) => (
                  <Marker key={index} coordinate={{ latitude: parseFloat(value?.Latitude), longitude: parseFloat(value?.Longitude) }}>
                    <View style={{ width: 35, height: 35, borderRadius: 50, elevation: 12, backgroundColor: '#1A2136', alignItems: 'center', justifyContent: 'center', }}>
                      <SimpleLineIcons name={'location-pin'} color={index === 0 ? '#8AC37D' : index === locationAdd.length - 1 ? '#F25555' : '#FA9826'} size={30} />
                      <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: '#1A2136', width: 17, height: 17, top: 8, borderRadius: 50, zIndex: 999 }}>
                        <Text style={{ position: 'absolute', borderRadius: 50, top: -3.5, color: index === 0 ? '#8AC37D' : index === locationAdd.length - 1 ? '#F25555' : '#FA9826' }}>{index + 1}</Text>
                      </View>
                    </View>
                  </Marker>
                ))
              }

              {locationAdd[0] === undefined ?
                null
                :
                <MapViewDirections
                  origin={{ latitude: parseFloat(locationAdd[0]?.Latitude), longitude: parseFloat(locationAdd[0]?.Longitude) }}
                  destination={{ latitude: parseFloat(locationAdd[locationAdd?.length - 1]?.Latitude), longitude: parseFloat(locationAdd[locationAdd?.length - 1]?.Longitude), }}
                  //waypoints={[{ latitude: 20.1003, longitude: 79.1146 }, { latitude: 19.9615, longitude: 79.2961 }, { latitude: 19.8516, longitude: 79.3499 }, { latitude: 20.0652, longitude: 79.6752, }, { latitude: 19.9405, longitude: 79.8913, }]}
                  waypoints={locationAdd?.map((value) => ({ latitude: parseFloat(value?.Latitude), longitude: parseFloat(value?.Longitude) }))}
                  apikey={GOOGLE_MAP_KEY}
                  strokeWidth={3}
                  strokeColor={'red'}
                  mode={'DRIVING'}
                  onReady={result => {
                    console.log(`Distance: ${result.distance} km`)
                    console.log(`Duration: ${result.duration} min.`)
                  }}
                />
              }
            </MapView>

            <View style={{ position: 'absolute', bottom: 30, right: 15, }}>
              <Pressable onPress={() => onZoomInPress()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
                <AntDesign name='plus' size={17} color={'#67748e'} />
              </Pressable>
              <Pressable onPress={() => onZoomOutPress()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
                <AntDesign name='minus' size={17} color={'#67748e'} />
              </Pressable>
              <Pressable onPress={() => setMapMaximize(mapMaximize => !mapMaximize)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
                <Ionicons name='md-expand-outline' size={17} color={'#67748e'} />
              </Pressable>
            </View>
          </View>
        }
      </Actionsheet>
      <Modal
        animationType="slide"
        visible={mapMaximize}
        transparent={true}
        onRequestClose={() => {
          setMapMaximize(mapMaximize => !mapMaximize);
        }}
      >
        {state?.latitude === null || state?.latitude === null ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View style={{ flex: 1, }}>
            <MapView
              ref={mapRef}
              customMapStyle={mapDarkStyle}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: locationAdd[0] === undefined ? state?.latitude : parseFloat(locationAdd[0]?.Latitude),
                longitude: locationAdd[0] === undefined ? state?.longitude : parseFloat(locationAdd[0]?.Longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              zoom={3}
              loadingEnabled={true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              showsCompass={false}
              userInterfaceStyle="dark"
              scrollEnabled={true}
              zoomEnabled={true}
              rotateEnabled={true}
              zoomControlEnabled={false}
              minZoomLevel={1}
              maxZoomLevel={100}
              fullscreenControl={false}
              maxDelta={0.02}
            >
              {locationAdd[0] === undefined ?
                null
                :
                locationAdd?.map((value, index) => (
                  <Marker key={index} coordinate={{ latitude: parseFloat(value?.Latitude), longitude: parseFloat(value?.Longitude) }}>
                    <View style={{ width: 35, height: 35, borderRadius: 50, elevation: 12, backgroundColor: '#1A2136', alignItems: 'center', justifyContent: 'center', }}>
                      <SimpleLineIcons name={'location-pin'} color={index === 0 ? '#8AC37D' : index === locationAdd.length - 1 ? '#F25555' : '#FA9826'} size={30} />
                      <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: '#1A2136', width: 17, height: 17, top: 8, borderRadius: 50, zIndex: 999 }}>
                        <Text style={{ position: 'absolute', borderRadius: 50, top: -3.5, color: index === 0 ? '#8AC37D' : index === locationAdd.length - 1 ? '#F25555' : '#FA9826' }}>{index + 1}</Text>
                      </View>
                    </View>
                  </Marker>
                ))
              }

              {locationAdd[0] === undefined ?
                null
                :
                <MapViewDirections
                  origin={{ latitude: parseFloat(locationAdd[0]?.Latitude), longitude: parseFloat(locationAdd[0]?.Longitude) }}
                  destination={{ latitude: parseFloat(locationAdd[locationAdd?.length - 1]?.Latitude), longitude: parseFloat(locationAdd[locationAdd?.length - 1]?.Longitude), }}
                  //waypoints={[{ latitude: 20.1003, longitude: 79.1146 }, { latitude: 19.9615, longitude: 79.2961 }, { latitude: 19.8516, longitude: 79.3499 }, { latitude: 20.0652, longitude: 79.6752, }, { latitude: 19.9405, longitude: 79.8913, }]}
                  waypoints={locationAdd?.map((value) => ({ latitude: parseFloat(value?.Latitude), longitude: parseFloat(value?.Longitude) }))}
                  apikey={GOOGLE_MAP_KEY}
                  strokeWidth={3}
                  strokeColor={'red'}
                  mode={'DRIVING'}
                  onReady={result => {
                    console.log(`Distance: ${result.distance} km`)
                    console.log(`Duration: ${result.duration} min.`)
                  }}
                />
              }
            </MapView>

            <View style={{ position: 'absolute', bottom: 30, right: 15, }}>
              <Pressable onPress={() => onZoomInPress()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
                <AntDesign name='plus' size={17} color={'#67748e'} />
              </Pressable>
              <Pressable onPress={() => onZoomOutPress()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
                <AntDesign name='minus' size={17} color={'#67748e'} />
              </Pressable>
              <Pressable onPress={() => setMapMaximize(mapMaximize => !mapMaximize)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 25, height: 25, marginTop: 5 }}>
                <Ionicons name='md-expand-outline' size={17} color={'#67748e'} />
              </Pressable>
            </View>
          </View>
        }
      </Modal>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 500,
    width: '100%',
    marginTop: 6,
    marginBottom: 25,
    borderRadius: 6,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CreateRoute;

const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];