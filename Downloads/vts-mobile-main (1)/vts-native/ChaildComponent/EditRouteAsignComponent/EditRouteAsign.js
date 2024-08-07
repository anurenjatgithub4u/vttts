import React, { Fragment, useRef } from 'react';
import { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Modal, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Actionsheet, useDisclose, Icon } from 'native-base';
import { Select, CheckIcon, Input, TextArea, Divider } from 'native-base';
import { useHeader } from '../../ApiHeader';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import { GOOGLE_MAP_KEY } from '../../constants/googleMapKey';
import MapViewDirections from 'react-native-maps-directions';

const screen = Dimensions.get('window');
const ASPECT_RATIO = (screen.width / screen.height);
const LATITUDE_DELTA = 3.400;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = GOOGLE_MAP_KEY;

const EditRouteAsign = () => {
  const mapRef = useRef()
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [searchValue, setSearchValue] = useState('')
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [mapMaximize, setMapMaximize] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclose();
  const [routeDropDownLoader, setRouteDropDownLoader] = useState(true);
  const [vehicleDropDownLoader, setVehicleDropDownLoader] = useState(true);
  const [driversDropDownLoader, setDriversDropDownLoader] = useState(true);
  const [loader, setLoader] = useState(false)
  const [routeData, setRouteData] = useState([])
  const [vehicleData, setVehicleData] = useState([])
  const [deriverData, setDeriverData] = useState([])
  const [routeName, setRouteName] = useState(false)
  const [vehicleName, setVehicleName] = useState(false)
  const [driverName, setDriverName] = useState(false)
  const [initialOdometer, setInitialOdometer] = useState(false)
  const [closingOdometer, setClosingOdometer] = useState(false)
  const [value, setValue] = useState({
    id: '',
    RouteName: '',
    VehicleName: '',
    DriverName: '',
    InitialOdometer: '',
    ClosingOdometer: '',
    Remarks: '',
    ClosureTypeField: '',
    AssignedTime: '',

    LegId: '',
    Status: '',
    StartTime: '',
    EndTime: '',
    TripDelayed: '',
    Deviated: '',
    AssignedBy: '',
    ModifiedBy: '',
    TripLegs: ''
  })

  const onChangeRouteName = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, RouteName: Text, });
      setRouteName(false)
    } else {
      setValue({ ...value, RouteName: Text, });
      setRouteName(false)
    }
  }
  const onChangeVehicleName = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, VehicleName: Text, });
      setVehicleName(false)
    } else {
      setValue({ ...value, VehicleName: Text, });
      setVehicleName(false)
    }
  }
  const onChangeDriverName = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, DriverName: Text, });
      setDriverName(false)
    } else {
      setValue({ ...value, DriverName: Text, });
      setDriverName(false)
    }
  }
  const onChangeInitialOdometer = (Text) => {
    const sText = Text?.toString();
    if (sText.trim().length !== 0) {
      setValue({ ...value, InitialOdometer: sText, });
      setInitialOdometer(false)
    } else {
      setValue({ ...value, InitialOdometer: sText, });
      setInitialOdometer(false)
    }
  }
  const onChangeClosingOdometer = (Text) => {
    const sText = Text?.toString();
    if (sText.trim().length !== 0) {
      setValue({ ...value, ClosingOdometer: sText, });
      setClosingOdometer(false)
    } else {
      setValue({ ...value, ClosingOdometer: sText, });
      setClosingOdometer(false)
    }
  }
  const onChangeRemarks = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, Remarks: Text, });
    } else {
      setValue({ ...value, Remarks: Text, });
    }
  }
  const onChangeClosureTypeField = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, ClosureTypeField: Text, });
    } else {
      setValue({ ...value, ClosureTypeField: Text, });
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
    if (checkStringNullEmpty(value.VehicleName)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setVehicleName(true)
    }
    if (checkStringNullEmpty(value.DriverName)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setDriverName(true)
    }
    if (checkStringNullEmpty(value.InitialOdometer)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setInitialOdometer(true)
    }
    if (checkStringNullEmpty(value.ClosingOdometer)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setClosingOdometer(true)
    }
  }

  const asigndata = JSON.stringify({
    id: value?.id,
    routeId: value?.RouteName,
    deviceId: value?.VehicleName,
    assignedTime: new Date(value?.AssignedTime),
    initialOdometer: value?.InitialOdometer,
    closingOdometer: value?.ClosingOdometer,
    remarks: value?.Remarks,
    closingType: value?.ClosureTypeField,
    legId: value?.LegId,
    status: value?.Status,
    startTime: value?.StartTime,
    endTime: value?.EndTime,
    tripDelayed: value?.TripDelayed,
    deviated: value?.Deviated,
    assignedBy: value?.AssignedBy,
    modifiedBy: value?.ModifiedBy,
    tripLegs: value?.TripLegs
  })
  console.log(asigndata)
  const onSubmit = async () => {
    validateuser();
    if (validationuser === '') {
      setLoader(true)
      await ApiRequestAuthorizationHook.put(`/trips/${location?.params?.asign_id}`, asigndata)
        .then(function (ress) {
          if (ress.status === 200) {
            setLoader(false)
            setCustomModal({ ...customModal, modal: true, message: 'Route Assign Update Successfully', status: 1 })
          }
        })
        .catch(function (err) {
          console.log('asign trips', err)
          setLoader(false)
          setCustomModal({ ...customModal, modal: true, message: 'Route Assign Update failed', status: 0 })
        })
    }
  }

  const getAssignRoute = async () => {
    setLoader(true)

    await ApiRequestAuthorizationHook.get(`/trips/${location?.params?.asign_id}`)
      .then(function (ress) {
        if (ress.status === 200) {
          setValue({
            id: ress?.data?.trip?.id,
            RouteName: ress?.data?.trip?.routeId,
            VehicleName: ress?.data?.trip?.deviceId,
            DriverName: 5,
            InitialOdometer: ress?.data?.trip?.initialOdometer.toString(),
            ClosingOdometer: ress?.data?.trip?.closingOdometer.toString(),
            Remarks: ress?.data?.trip?.remarks,
            ClosureTypeField: ress?.data?.trip?.closingType,
            AssignedTime: ress?.data?.trip?.assignedTime === null ? new Date() : ress?.data?.trip?.assignedTime,
            LegId: ress?.data?.trip?.legId,
            Status: ress?.data?.trip?.status,
            StartTime: ress?.data?.trip?.startTime,
            EndTime: ress?.data?.trip?.endTime,
            TripDelayed: ress?.data?.trip?.tripDelayed,
            Deviated: ress?.data?.trip?.deviated,
            AssignedBy: ress?.data?.trip?.assignedBy,
            ModifiedBy: ress?.data?.trip?.modifiedBy,
            TripLegs: ress?.data?.trip?.tripLegs
          })
          setLoader(false)
        }
      })
      .catch(function (err) {
        console.log('setRouteData', err)
        setLoader(true)
      })
  }

  const getDataRoute = async () => {
    setRouteDropDownLoader(true);
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/routes`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setRouteData(ress?.data?.data)
        }
      })
      .catch(function (err) {
        console.log('setRouteData', err)
      })
      .finally(function () {
        setRouteDropDownLoader(false)
      })

    return () => {
      controller.abort();
    };
  }
  const getDataVehicle = async () => {
    setVehicleDropDownLoader(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/devices/vehicle`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setVehicleData(ress?.data?.data)
        }
      })
      .catch(function (err) {
        console.log('setVehicleData', err)
      })
      .finally(function () {
        setVehicleDropDownLoader(false)
      })

    return () => {
      controller.abort();
    };
  }
  const getDataDrivers = async () => {
    setDriversDropDownLoader(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/drivers?all=true`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setDeriverData(ress?.data?.data)
        }
      })
      .catch(function (err) {
        console.log('getDataDrivers', err)
      })
      .finally(function () {
        setDriversDropDownLoader(false)
      })

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    getAssignRoute()
  }, [])
  useEffect(() => {
    getDataRoute()
  }, [])
  useEffect(() => {
    getDataVehicle()
  }, [])
  useEffect(() => {
    getDataDrivers()
  }, [])

  const onRoute = () => {
    Navigation.navigate('RouteScreen')
    setValue({ RouteName: '', VehicleName: '', DriverName: '', InitialOdometer: '', ClosingOdometer: '', Remarks: '', ClosureTypeField: '', })
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  const onGetRouteData = routeData?.find(x => x?.id === parseInt(value?.RouteName))?.legs

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

  const routesName = routeData.filter(itemInArray => itemInArray?.id === value?.RouteName)[0]?.name
  const vahicleName = vehicleData.filter(itemInArray => itemInArray?.device?.id === value?.VehicleName)[0]?.device?.name
  const driversName = deriverData.filter(itemInArray => itemInArray?.id === 5)[0]?.name

  const selectRoutesName = routesName === undefined ? 'Select' : routesName
  const selectVahicleName = vahicleName === undefined ? 'Select' : vahicleName
  const selectDriversName = driversName === undefined ? 'Select' : driversName

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const onReset = () => {
    setValue({
      RouteName: '',
      VehicleName: '',
      DriverName: '',
      InitialOdometer: '',
      ClosingOdometer: '',
      Remarks: '',
      ClosureTypeField: '',
    })
  }


  const searchRouteData = routeData?.filter(
    RouteItem => {
      return (
        RouteItem
          .name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
  );

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
        <View style={{ backgroundColor: '#ffffff', borderRadius: 4, padding: 10, marginBottom: 20, marginHorizontal: 20, marginTop: 20, elevation: 5 }}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold' }}>Edit Assign Route</Text>
            <View style={{ flexGrow: 1 }} />
            <Pressable onPress={() => onReset()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons name={'refresh'} color={'#67748E'} size={20} />
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Reset</Text>
            </Pressable>
          </Pressable>

          <View style={{ marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', }}>Route</Text>
            <View style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}>
              <Select onOpen={() => searchRouteData?.length === 0 ? getDataRoute() : null} borderWidth={0} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40 }} defaultValue={routesName} selectedValue={value?.RouteName} placeholderTextColor={routesName === undefined ? '#7D8EAB' : '#252F40'} minWidth="200" placeholder={selectRoutesName} _selectedItem={{
                endIcon: <CheckIcon size="5" />
              }}
                onValueChange={itemValue => onChangeRouteName(itemValue)}
                _actionSheetBody={{
                  ListHeaderComponent:
                    <View>
                      {routeDropDownLoader === true ?
                        <ActivityIndicator color={'#63ce78'} size={'large'} />
                        :
                        <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#7D8EAB' }}>
                          <Input
                            value={searchValue}
                            placeholder="Search here"
                            type='text'
                            onChangeText={(value) => {
                              setSearchValue(value);
                            }}
                            variant={'unstyled'}
                            InputRightElement={<Icon as={<MaterialIcons name="clear" onPress={() => setSearchValue('')} />} size={6} mr="2" color="#7D8EAB" />}
                            placeholderTextColor={'#7D8EAB'}
                            style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }}
                          />
                        </Pressable>
                      }
                    </View>,
                  ListEmptyComponent:
                    <View>
                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                    </View>,
                }}
              >
                {routeDropDownLoader ?
                  <View>
                    <ActivityIndicator color={'#63CE78'} size={'large'} />
                  </View>
                  :
                  searchRouteData?.map((value, index) => (
                    <Select.Item key={index} label={value?.name} value={value?.id?.toString()} />
                  ))
                }
              </Select>
            </View>
            {routeName ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Route is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', }}>Vehicle</Text>
            <View style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}>
              <Select onOpen={() => vehicleData?.length === 0 ? getDataVehicle() : null} borderWidth={0} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40 }} defaultValue={vahicleName} selectedValue={value?.VehicleName} minWidth="200" placeholderTextColor={vahicleName === undefined ? '#7D8EAB' : '#252F40'} placeholder={selectVahicleName} _selectedItem={{
                endIcon: <CheckIcon size="5" />
              }}
                onValueChange={itemValue => onChangeVehicleName(itemValue)}
                _actionSheetBody={{
                  ListHeaderComponent:
                    <View>
                      {vehicleDropDownLoader === true ?
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
                {vehicleDropDownLoader ?
                  <View>
                    <ActivityIndicator color={'#63CE78'} size={'large'} />
                  </View>
                  :
                  vehicleData?.map((value, index) => (
                    <Select.Item key={index} label={value?.device?.name} value={value?.device?.id?.toString()} />
                  ))
                }
              </Select>
            </View>
            {vehicleName ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Vehicle is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', }}>Driver</Text>
            <View style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}>
              <Select onOpen={() => deriverData?.length === 0 ? getDataDrivers() : null} borderWidth={0} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40 }} defaultValue={driversName} selectedValue={value?.DriverName} minWidth="200" placeholderTextColor={driverName === undefined ? '#7D8EAB' : '#252F40'} placeholder={selectDriversName} _selectedItem={{
                endIcon: <CheckIcon size="5" />
              }}
                onValueChange={itemValue => onChangeDriverName(itemValue)}
                _actionSheetBody={{
                  ListHeaderComponent:
                    <View>
                      {driversDropDownLoader === true ?
                        <ActivityIndicator color={'#63ce78'} size={'large'} />
                        :
                        <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#7D8EAB' }}>
                          <Input
                            value={searchValue}
                            placeholder="Search here"
                            type='text'
                            onChangeText={(value) => {
                              setSearchValue(value);
                            }}
                            variant={'unstyled'}
                            InputRightElement={<Icon as={<MaterialIcons name="clear" onPress={() => setSearchValue('')} />} size={6} mr="2" color="#7D8EAB" />}
                            placeholderTextColor={'#7D8EAB'}
                            style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }}
                          />
                        </Pressable>
                      }
                    </View>,
                  ListEmptyComponent:
                    <View>
                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                    </View>,
                }}
              >
                {driversDropDownLoader === true ?
                  <View>
                    <ActivityIndicator color={'#63CE78'} size={'large'} />
                  </View>
                  :
                  deriverData?.map((value, index) => (
                    <Select.Item key={index} label={value?.name} value={value?.id?.toString()} />
                  ))
                }
              </Select>
            </View>
            {driverName ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Driver is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ marginTop: 15 }}>
            <View>
              <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', }}>Initial Odometer</Text>
              <Input value={value?.InitialOdometer} onChangeText={(Text) => onChangeInitialOdometer(Text)} variant={'unstyled'} placeholder='Enter' placeholderTextColor={'#7D8EAB'} style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} />
            </View>
            {initialOdometer ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Initial Odometer is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ marginTop: 15 }}>
            <View>
              <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', }}>Closing Odometer</Text>
              <Input value={value?.ClosingOdometer} onChangeText={(Text) => onChangeClosingOdometer(Text)} variant={'unstyled'} placeholder='Enter' placeholderTextColor={'#7D8EAB'} style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} />
            </View>
            {closingOdometer ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Closing Odometer is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ marginTop: 15 }}>
            <View>
              <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', }}>Remarks</Text>
              <TextArea value={value?.Remarks} onChangeText={(Text) => onChangeRemarks(Text)} variant={'unstyled'} numberOfLines={6} placeholderTextColor={"#7D8EAB"} placeholder="Remarks" style={{ backgroundColor: '#e2e2fd', borderRadius: 5, /* height: 40, */ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} />
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ marginBottom: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', }}>Closure Type Field</Text>
            <View style={{ backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}>
              <Select borderWidth={0} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40 }} selectedValue={value?.ClosureTypeField} placeholder={'Select'} placeholderTextColor={'#7D8EAB'} minWidth="200" _selectedItem={{
                endIcon: <CheckIcon size="5" />
              }} onValueChange={itemValue => onChangeClosureTypeField(itemValue)}>
                <Select.Item label="Only If All Stops Reached" value="Only If All Stops Reached" />
              </Select>
            </View>
          </View>

          {onGetRouteData === undefined ?
            null
            :
            onGetRouteData[0]?.estDistanceFromOrigin === undefined ?
              null
              :
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10, }}>
                <Pressable onPress={onOpen} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: '#ecfcef', paddingTop: 7, paddingBottom: 7, paddingRight: 12, paddingLeft: 12, borderRadius: 5 }}>
                  <Ionicons name={'location-sharp'} color={'#63ce78'} size={18} />
                  <Text style={{ color: '#63ce78', fontFamily: 'OpenSans-Regular', fontSize: 14, textAlign: 'center', paddingLeft: 10 }}>Show on map</Text>
                </Pressable>
              </View>
          }
        </View>

        {onGetRouteData === undefined ?
          null
          :
          onGetRouteData[0]?.estDistanceFromOrigin === undefined ?
            null
            :
            <View style={{ backgroundColor: '#ffffff', borderRadius: 4, padding: 10, marginHorizontal: 20, elevation: 12 }}>
              {onGetRouteData?.map((value, index) => (
                <View key={index} style={{ flexDirection: 'row', }}>
                  <View>
                    <View style={{ borderRadius: 50, backgroundColor: '#ffffff', zIndex: 999, borderWidth: 1, borderColor: 'gray', width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: 'OpenSans-Rgular', color: 'gray' }}>{index + 1}</Text>
                    </View>
                    <Divider orientation="vertical" style={{ backgroundColor: 'gray', position: 'absolute', left: 12 }} />
                  </View>
                  <View style={{ margin: 5, paddingBottom: 15, paddingTop: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                        <FontAwesome5 name='route' size={15} color={'#63ce78'} style={{ paddingRight: 10 }} />
                        <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Rgular', color: 'gray' }}>Distance (KM)</Text>
                      </View>
                      <Text style={{ fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#000000' }}>{(value?.estDistanceFromOrigin / 1000)?.toFixed(2)} Km</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%', paddingTop: 13, paddingBottom: 13 }}>
                        <MaterialCommunityIcons name='clock-time-four-outline' size={15} color={'#FA9826'} style={{ paddingRight: 10 }} />
                        <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Rgular', color: 'gray' }}>Planned Time</Text>
                      </View>
                      <Text style={{ fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#000000' }}>{`${new Date()?.getDate()?.toString()?.padStart(2, "0")} ${months[new Date()?.getMonth()]} ${new Date().getFullYear()}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                        <MaterialCommunityIcons name='clock-time-four-outline' size={15} color={'#FA9826'} style={{ paddingRight: 10 }} />
                        <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Rgular', color: 'gray' }}>Planned ETA</Text>
                      </View>
                      <Text style={{ fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#000000' }}>{new Date(value?.estDurationFromOrigin * 1000)?.toISOString()?.substr(11, 8)}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
        }
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 20, paddingHorizontal: 20 }}>
          <Pressable onPress={onSubmit} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', height: 40, width: '100%', borderRadius: 5 }}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Edit</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        {onGetRouteData === undefined ?
          <View style={{ height: 450, backgroundColor: '#ffffff', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'#63CE78'} size="large" />
          </View>
          :
          onGetRouteData[0]?.latitudeFrom === undefined || onGetRouteData[0]?.longitudeFrom === undefined ?
            <View style={{ height: 450, backgroundColor: '#ffffff', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color={'#63CE78'} size="large" />
            </View>
            :
            <View style={{ height: 450, backgroundColor: '#ffffff', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
              <MapView
                ref={mapRef}
                customMapStyle={mapDarkStyle}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude: onGetRouteData[0]?.latitudeFrom,
                  longitude: onGetRouteData[0]?.longitudeFrom,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                zoom={3}
                loadingEnabled={false}
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
                {onGetRouteData?.map((value, index) => (
                  <Marker key={index} coordinate={{ latitude: value?.latitudeFrom, longitude: value?.longitudeFrom }}>
                    <View style={{ width: 35, height: 35, borderRadius: 50, elevation: 12, backgroundColor: '#1A2136', alignItems: 'center', justifyContent: 'center', }}>
                      <SimpleLineIcons name={'location-pin'} color={index === 0 ? '#8AC37D' : '#FA9826'} size={30} />
                      <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: '#1A2136', width: 17, height: 17, top: 8, borderRadius: 50, zIndex: 999 }}>
                        <Text style={{ position: 'absolute', borderRadius: 50, top: -3.5, color: index === 0 ? '#8AC37D' : '#FA9826' }}>{index + 1}</Text>
                      </View>
                    </View>
                  </Marker>
                ))}

                {onGetRouteData?.map((value, index) => (
                  <Marker key={index} coordinate={{ latitude: onGetRouteData[onGetRouteData?.length - 1]?.latitudeTo, longitude: onGetRouteData[onGetRouteData?.length - 1]?.longitudeTo }}>
                    <View style={{ width: 35, height: 35, borderRadius: 50, elevation: 12, backgroundColor: '#1A2136', alignItems: 'center', justifyContent: 'center', }}>
                      <SimpleLineIcons name={'location-pin'} color={'#F25555'} size={30} />
                      <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: '#1A2136', width: 17, height: 17, top: 8, borderRadius: 50, zIndex: 999 }}>
                        <Text style={{ position: 'absolute', borderRadius: 50, top: -3.5, color: '#F25555', fontFamily: 'OpenSans-Regular' }}>{onGetRouteData?.length + 1}</Text>
                      </View>
                    </View>
                  </Marker>
                ))}

                {onGetRouteData?.map((value, index) => (
                  <MapViewDirections
                    key={index}
                    origin={{ latitude: onGetRouteData[0]?.latitudeFrom, longitude: onGetRouteData[0]?.longitudeFrom }}
                    destination={{ latitude: onGetRouteData[onGetRouteData?.length - 1]?.latitudeTo, longitude: onGetRouteData[onGetRouteData?.length - 1]?.longitudeTo }}
                    // waypoints={[{ latitude: 20.1003, longitude: 79.1146 }, { latitude: 19.9615, longitude: 79.2961 }, { latitude: 19.8516, longitude: 79.3499 }, { latitude: 20.0652, longitude: 79.6752, }, { latitude: 19.9405, longitude: 79.8913, }]}
                    waypoints={onGetRouteData?.map((value) => ({ latitude: value?.latitudeFrom, longitude: value?.longitudeFrom }))}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="#8AC37D"
                  />
                ))}
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
        {onGetRouteData === undefined ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'#63CE78'} size="large" />
          </View>
          :
          onGetRouteData[0]?.latitudeFrom === undefined || onGetRouteData[0]?.longitudeFrom === undefined ?
            <View style={{ flex: 1, backgroundColor: '#ffffff', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color={'#63CE78'} size="large" />
            </View>
            :
            <View style={{ flex: 1, }}>
              <MapView
                ref={mapRef}
                customMapStyle={mapDarkStyle}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude: onGetRouteData[0]?.latitudeFrom,
                  longitude: onGetRouteData[0]?.longitudeFrom,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                zoom={3}
                loadingEnabled={false}
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
                {onGetRouteData === undefined ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Location not found</Text>
                  </View>
                  :
                  onGetRouteData?.map((value, index) => (
                    <Marker key={index} coordinate={{ latitude: value?.latitudeFrom, longitude: value?.longitudeFrom }}>
                      <View style={{ width: 35, height: 35, borderRadius: 50, elevation: 12, backgroundColor: '#1A2136', alignItems: 'center', justifyContent: 'center', }}>
                        <SimpleLineIcons name={'location-pin'} color={index === 0 ? '#8AC37D' : '#FA9826'} size={30} />
                        <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: '#1A2136', width: 17, height: 17, top: 8, borderRadius: 50, zIndex: 999 }}>
                          <Text style={{ position: 'absolute', borderRadius: 50, top: -3.5, color: index === 0 ? '#8AC37D' : '#FA9826' }}>{index + 1}</Text>
                        </View>
                      </View>
                    </Marker>
                  ))}
                {onGetRouteData === undefined ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Location not found</Text>
                  </View>
                  :
                  onGetRouteData?.map((value, index) => (
                    <Marker key={index} coordinate={{ latitude: onGetRouteData[onGetRouteData?.length - 1]?.latitudeTo, longitude: onGetRouteData[onGetRouteData?.length - 1]?.longitudeTo }}>
                      <View style={{ width: 35, height: 35, borderRadius: 50, elevation: 12, backgroundColor: '#1A2136', alignItems: 'center', justifyContent: 'center', }}>
                        <SimpleLineIcons name={'location-pin'} color={'#F25555'} size={30} />
                        <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', backgroundColor: '#1A2136', width: 17, height: 17, top: 8, borderRadius: 50, zIndex: 999 }}>
                          <Text style={{ position: 'absolute', borderRadius: 50, top: -3.5, color: '#F25555', fontFamily: 'OpenSans-Regular' }}>{onGetRouteData?.length + 1}</Text>
                        </View>
                      </View>
                    </Marker>
                  ))}


                {onGetRouteData === undefined ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Location not found</Text>
                  </View>
                  :
                  onGetRouteData?.map((value, index) => (
                    <MapViewDirections
                      key={index}
                      origin={{ latitude: value?.latitudeFrom, longitude: value?.longitudeFrom }}
                      destination={{ latitude: value?.latitudeTo, longitude: value?.longitudeTo }}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={3}
                      strokeColor="#8AC37D"
                    />
                  ))}

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
    </Fragment >
  )
}

export default EditRouteAsign;

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