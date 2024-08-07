import React, { Fragment, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Dimensions, Modal, LayoutAnimation, UIManager, Platform, ActivityIndicator, } from 'react-native';
import { Text } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Row, Col } from 'react-native-responsive-grid-system';
import MapView, { Circle } from 'react-native-maps';
import { Center, Input, TextArea } from 'native-base';
import { Checkbox } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getCurrentLocation, locationPermission } from '../../helper/helperFunction';
import { useHeader } from '../../ApiHeader';
import { useNavigation, useRoute } from '@react-navigation/native';


if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const EditGeofence = () => {
  let location = useRoute();
  let navigation = useNavigation()
  const mapRef = useRef()
  const { ApiRequestAuthorizationHook } = useHeader();
  const [loader, setLoader] = useState(false);
  const [mapMaximize, setMapMaximize] = useState(false);
  const [toggleMap, setToggleMap] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState('Fill all required fields')
  const [alertVisible, setAlertVisible] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [getCoordinate, setGetCoordinate] = useState({ latitude: null, longitude: null });

  const [value, setValue] = useState({
    id: '',
    geofence_name: '',
    user_latitude: '',
    user_longitude: '',
    user_area_type: '',
    radius: '',
    description: '',
    loading_point: '',
    unloading_point: '',
    user_max_speed: '',
    createdon: ''
  });
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
  })

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

  const onShowMap = () => {
    setState({ ...state, latitude: parseFloat(getCoordinate.latitude), longitude: parseFloat(getCoordinate.longitude) })
    setToggleMap(true)
  }

  const onPressMapCood = (event) => {
    const coorLat = event?.latitude.toFixed(6)
    const coorLong = event?.longitude.toFixed(6)
    setState({ ...state, latitude: parseFloat(coorLat), longitude: parseFloat(coorLong) })
    setGetCoordinate({ ...getCoordinate, latitude: coorLat, longitude: coorLong })
    setValue({ ...value, user_latitude: coorLat, user_longitude: coorLong, });
  }

  const onChangeGeofence_name = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, geofence_name: Text, });
    } else {
      setValue({ ...value, geofence_name: Text, });
    }
  }
  const onChangeUser_latitude = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, user_latitude: Text, });
    } else {
      setValue({ ...value, user_latitude: Text, });
    }
  }
  const onChangeUser_longitude = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, user_longitude: Text, });
    } else {
      setValue({ ...value, user_longitude: Text, });
    }
  }
  const onChangeUser_area_type = (Text) => {
    if (Text.length !== 0) {
      setValue({ ...value, user_area_type: Text, });
    } else {
      setValue({ ...value, user_area_type: Text, });
    }
  }
  const onChangeDescription = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, description: Text, });
    } else {
      setValue({ ...value, description: Text, });
    }
  }
  const onChangeUser_max_speed = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, user_max_speed: Text, });
    } else {
      setValue({ ...value, user_max_speed: Text, });
    }
  }

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };
  var validation = '';
  const validate = () => {
    if (checkStringNullEmpty(value.geofence_name)) {
      validation += '<li>-</li>';
    }
    if (checkStringNullEmpty(value.user_latitude)) {
      validation += '<li>-</li>';
    }
    if (checkStringNullEmpty(value.user_longitude)) {
      validation += '<li>-</li>';
    }
    if (checkStringNullEmpty(value.user_area_type)) {
      validation += '<li>-</li>';
    }
    if (checkStringNullEmpty(value.description)) {
      validation += '<li>-</li>';
    }
    if (checkStringNullEmpty(value.loading_point)) {
      validation += '<li>-</li>';
    }
    if (checkStringNullEmpty(value.unloading_point)) {
      validation += '<li>-</li>';
    }
    if (checkStringNullEmpty(value.user_max_speed)) {
      validation += '<li>-</li>';
    }
  }

  let timeout = null;
  const showAlert = () => {
    LayoutAnimation.easeInEaseOut()
    setAlertVisible(true)
    if (timeout) { clearTimeout(timeout) }
    timeout = setTimeout(() => {
      LayoutAnimation.easeInEaseOut()
      setAlertVisible(false)
    }, 3000);
  }

  var geofenceObj = JSON.stringify({
    id: value?.id,
    name: value?.geofence_name,
    attributes: {
      File: "",
      speedLimit: value?.user_max_speed,
      loadingPoint: value?.loading_point,
      unloadingPoint: value?.unloading_point,
    },
    description: value?.description,
    area: `${value?.user_area_type}(${value?.user_latitude} ${value?.user_longitude},${value?.radius})`,
    createdon: value?.createdon,
    lastupdate: new Date(),
  })

  const onSubmit = async () => {
    validate();
    if (validation === '') {
      setLoader(true)
      await ApiRequestAuthorizationHook.put(`/geofences/${value?.id}`, geofenceObj)
        .then(function (ress) {
          if (ress.status === 200) {
            setLoader(false)
            setCustomModal({ ...customModal, modal: true, message: 'Geofence Updated Successfully', status: 1 })
          }
        })
        .catch(function (err) {
          console.log('create geofence', err)
          setLoader(false)
          setCustomModal({ ...customModal, modal: true, message: 'Geofence Updated failed', status: 0 })
        })
    } else {
      showAlert();
    }
  }


  const getGeoData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true)
    await ApiRequestAuthorizationHook.get(`/geofences/${location?.params?.edit_id}`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          const myArray1 = ress?.data?.area.match(/[^()]+/g)[0];
          const myArray = ress?.data?.area.split(",")[1].match(/[^()]+/g)
          const strData = ress?.data?.area.match(/[^()]+/g);
          const str1 = strData[1].split(",")
          const coord = str1[0].split(" ");

          setValue({
            id: ress?.data?.id,
            geofence_name: ress?.data?.name,
            user_latitude: coord[0],
            user_longitude: coord[1],
            user_area_type: myArray1,
            radius: myArray[0],
            description: ress?.data?.description,
            loading_point: ress?.data?.attributes?.loadingPoint,
            unloading_point: ress?.data?.attributes?.unloadingPoint,
            user_max_speed: ress?.data?.attributes?.speedLimit,
            createdon: ress?.data?.createdon
          });

          setGetCoordinate({
            latitude: coord[0],
            longitude: coord[1]
          })
        }
      })
      .catch(function (err) {
        console.log('editGeo', err)
      })
      .finally(function () {
        setLoader(false)
      })
    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    getGeoData();
  }, [])

  const onRoute = () => {
    navigation.goBack()
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission()
    if (locPermissionDenied) {
      const { latitude, longitude } = await getCurrentLocation();
      setState({ ...state, latitude: latitude, longitude: longitude })
      setToggleMap(true)
    } else {

    }
  }

  return (
    <Fragment>
      <Modal visible={customModal.modal} transparent={true}>
        <View style={{ flex: 1, backgroundColor: '#0000ff4d', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>TrackoLet</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={loader} transparent={true}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#ebebfdab' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>
      <View style={[styles.alert, !alertVisible && { height: 0, marginTop: -1 }]}>
        <Text style={styles.msg} numberOfLines={5}>{errorMsg}</Text>
      </View>

      <View style={{ marginBottom: 20, marginHorizontal: 15 }}>
        <View style={{ marginTop: 10, backgroundColor: '#FFFFFF', elevation: 5, /* height: 600, */ borderRadius: 5, paddingHorizontal: 10, paddingBottom: 15 }}>
          <Text style={{ marginTop: 15, fontSize: 14, fontFamily: 'OpenSans-Bold' }}>Geofence Configuration</Text>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Geofence Name</Text>
            <Input onChangeText={(text) => onChangeGeofence_name(text)} value={value.geofence_name} variant={'unstyled'} placeholderTextColor={"#7D8EAB"} style={{ backgroundColor: '#ededff', color: '#252F40', borderRadius: 5, height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, marginTop: 6 }} placeholder="Enter Name" />
          </View>

          <View>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Latitude</Text>
                  <Input variant={'unstyled'} placeholderTextColor={"#7D8EAB"} value={value?.user_latitude} onChangeText={(text) => { onChangeUser_latitude(text); setGetCoordinate({ ...getCoordinate, latitude: text.toString() }) }} keyboardType='numeric' style={{ backgroundColor: '#ededff', color: '#252F40', borderRadius: 5, height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, marginTop: 6 }} placeholder="Enter Latitude" />
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Longitude</Text>
                  <Input variant={'unstyled'} placeholderTextColor={"#7D8EAB"} value={value?.user_longitude} onChangeText={(text) => { onChangeUser_longitude(text); setGetCoordinate({ ...getCoordinate, longitude: text.toString() }) }} keyboardType='numeric' style={{ backgroundColor: '#ededff', color: '#252F40', borderRadius: 5, height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, marginTop: 6 }} placeholder="Enter Longitude" />
                </View>
              </Col>
            </Row>
          </View>

          <View>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', marginTop: 20 }}>Choose Area Type (Select On Map)</Text>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 15 }}>
              <Pressable onPress={() => onChangeUser_area_type('CIRCLE')} style={{ paddingLeft: 5, }}>
                <Center style={{ width: 80, borderWidth: value.user_area_type === 'CIRCLE' ? 1 : 0.1, borderColor: '#4646F2', borderRadius: value.user_area_type === 'CIRCLE' ? 3 : 1, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                  <Octicons name='dot-fill' color={value.user_area_type === 'CIRCLE' ? '#4646F2' : '#554F60'} size={25} />
                  <Text style={{ color: value.user_area_type === 'CIRCLE' ? '#4646F2' : '#554F60', fontSize: 10, fontFamily: 'OpenSans-Regular', marginLeft: 10 }}>Circle</Text>
                </Center>
              </Pressable>
              <Pressable onPress={() => onChangeUser_area_type('POINTER')} style={{ paddingLeft: 5, }}>
                <Center style={{ width: 80, borderWidth: value.user_area_type === 'POINTER' ? 1 : 0.1, borderColor: '#4646F2', borderRadius: value.user_area_type === 'POINTER' ? 3 : 1, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                  <Entypo name='location-pin' color={value.user_area_type === 'POINTER' ? '#4646F2' : '#554F60'} size={25} />
                  <Text style={{ color: value.user_area_type === 'POINTER' ? '#4646F2' : '#554F60', fontSize: 10, fontFamily: 'OpenSans-Regular', marginLeft: 10 }}>Pointer</Text>
                </Center>
              </Pressable>
              <Pressable onPress={() => onChangeUser_area_type('POLYGON')} style={{ paddingLeft: 5, }}>
                <Center style={{ width: 80, borderWidth: value.user_area_type === 'POLYGON' ? 1 : 0.1, borderColor: '#4646F2', borderRadius: value.user_area_type === 'POLYGON' ? 3 : 1, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                  <MaterialCommunityIcons name='shape-polygon-plus' color={value.user_area_type === 'POLYGON' ? '#4646F2' : '#554F60'} size={25} />
                  <Text style={{ color: value.user_area_type === 'POLYGON' ? '#4646F2' : '#554F60', fontSize: 10, fontFamily: 'OpenSans-Regular', marginLeft: 10 }}>Polygon</Text>
                </Center>
              </Pressable>
            </View>
          </View>

          {value.user_area_type === "CIRCLE" ?
            <View style={{ marginTop: 20 }}>
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Radius</Text>
              <Input onChangeText={(text) => setValue({ ...value, radius: text })} keyboardType='number-pad' value={value.radius} variant={'unstyled'} placeholderTextColor={"#7D8EAB"} style={{ backgroundColor: '#ededff', color: '#252F40', borderRadius: 5, height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, marginTop: 6 }} placeholder="Enter Radius" />
            </View>
            :
            null
          }

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Description</Text>
            <TextArea onChangeText={(text) => onChangeDescription(text)} value={value.description} variant={'unstyled'} placeholderTextColor={"#7D8EAB"} style={{ backgroundColor: '#ededff', color: '#252F40', borderRadius: 5, fontFamily: 'OpenSans-Regular', fontSize: 14, marginTop: 6 }} placeholder="Description" />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Choose Area Type</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <Checkbox
                status={value.loading_point === true ? 'checked' : 'unchecked'}
                onPress={() => setValue({ ...value, loading_point: true, unloading_point: false })}
              />
              <Text style={{ color: '#554F60', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>Loading point</Text>
              <Checkbox
                status={value.unloading_point === true ? 'checked' : 'unchecked'}
                onPress={() => setValue({ ...value, unloading_point: true, loading_point: false })}
              />
              <Text style={{ color: '#554F60', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>Unloading point</Text>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Max Speed (Km)</Text>
            <Input keyboardType='number-pad' onChangeText={(text) => onChangeUser_max_speed(text)} value={value.user_max_speed} variant={'unstyled'} placeholderTextColor={"#7D8EAB"} style={{ marginTop: 6, backgroundColor: '#ededff', color: '#252F40', borderRadius: 5, height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, }} placeholder="Enter Value" />
          </View>
        </View>


        {toggleMap ?
          <View style={styles.container}>
            <MapView
              ref={mapRef}
              customMapStyle={mapDarkStyle}
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(state?.latitude),
                longitude: parseFloat(state?.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              scrollEnabled={true}
              zoomControlEnabled={false}
              onPress={(event) => onPressMapCood(event?.nativeEvent?.coordinate)}
              loadingEnabled={true}
              showsCompass={false}
            >
              {value?.radius === '' ?
                null
                :
                <Circle
                  center={{
                    latitude: parseFloat(state?.latitude),
                    longitude: parseFloat(state?.longitude),
                  }}
                  radius={parseFloat(value?.radius)}
                  strokeWidth={2}
                  strokeColor="#4646F2"
                  fillColor="#6d6d6c"
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
                <SimpleLineIcons name='size-fullscreen' size={17} color={'#67748e'} />
              </Pressable>
            </View>
          </View>
          : null}

        {toggleMap ?
          null :
          <View style={{ paddingTop: 20 }}>
            <Row style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Pressable onPress={() => value?.user_latitude === '' || value?.user_longitude === '' ? getLiveLocation() : onShowMap()} style={{ backgroundColor: 'transparent', height: 40, justifyContent: 'center', marginTop: 5, borderRadius: 8, borderWidth: 1, borderColor: '#4646F2' }}>
                  <Text style={{ color: '#4646F2', textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Show On Map</Text>
                </Pressable>
              </Col>

              <Col xs={6} sm={6} md={6} lg={6}>
                <Pressable onPress={() => onSubmit()} style={{ backgroundColor: '#4646F2', height: 40, justifyContent: 'center', marginTop: 5, borderRadius: 8 }}>
                  <Text style={{ color: '#FFFFFF', textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Edit</Text>
                </Pressable>
              </Col>
            </Row>
          </View>
        }

        {toggleMap ?
          <Pressable onPress={() => onSubmit()} style={{ backgroundColor: '#4646F2', height: 40, justifyContent: 'center', marginTop: 5, borderRadius: 8 }}>
            <Text style={{ color: '#FFFFFF', textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Edit</Text>
          </Pressable>
          : null}
      </View >

      <Modal
        animationType="slide"
        visible={mapMaximize}
        transparent={true}
        onRequestClose={() => {
          setMapMaximize(mapMaximize => !mapMaximize);
        }}
      >
        <View style={{ flex: 1, }}>
          <MapView
            ref={mapRef}
            customMapStyle={mapDarkStyle}
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(state?.latitude),
              longitude: parseFloat(state?.longitude),
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            scrollEnabled={true}
            zoomControlEnabled={false}
            onPress={(event) => onPressMapCood(event?.nativeEvent?.coordinate)}
            loadingEnabled={true}
            showsCompass={false}
          >
            {value?.radius === '' ?
              null
              :
              <Circle
                center={{
                  latitude: parseFloat(state?.latitude),
                  longitude: parseFloat(state?.longitude),
                }}
                radius={parseFloat(value?.radius)}
                strokeWidth={2}
                strokeColor="#4646F2"
                fillColor="#6d6d6c"
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
              <SimpleLineIcons name='size-fullscreen' size={17} color={'#67748e'} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </Fragment >
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 500,
    //height: Dimensions.get('screen').height,
    width: '100%',
    marginTop: 10,
    marginBottom: 25,
    borderRadius: 10,
    overflow: 'hidden'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    //height: 400,
    borderRadius: 20
  },
  alert: {
    // position: 'absolute',
    top: 0,
    backgroundColor: '#4646f2',
    width: '100%',
    overflow: 'hidden',
    zIndex: 999
  },
  msg: {
    margin: 10,
    marginHorizontal: 20,
    color: '#fff'
  }
});

export default EditGeofence;

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
        visibility: "on",
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