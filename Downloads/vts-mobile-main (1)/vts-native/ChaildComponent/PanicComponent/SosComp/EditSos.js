import React, { Fragment, useState, } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator } from 'react-native';
import { Col, Row } from 'react-native-responsive-grid-system';
import { Select, CheckIcon, TextArea } from 'native-base'
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { useHeader } from '../../../ApiHeader'
import { useEffect } from 'react';
import BlurViewScreen from '../../../BlurViewScreen';


const EditSos = () => {
  let location = useRoute();
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [address, setAddress] = useState(null)
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [loader, setLoader] = useState(false);
  const [sosType, setSosType] = useState(false);
  const [status, setStatus] = useState(false);
  const [remark, setRemark] = useState(false);
  const [value, setValue] = useState({
    Id: "",
    Alarm: "",
    UserId: "",
    Email: "",
    DeviceId: "",
    Type: "",
    EventTime: "",
    PositionId: "",
    GeofenceId: "",
    MaintenanceId: "",
    Action: "",
    Remark: "",
    Status: "",
    Location: "",
    VehicleNo: "",
    Latitude: "",
    Longitude: "",
    PermitHolder: "",
    PermitHolderPhone: ""
  });

  const onChangeSosType = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Action: Text });
      setSosType(false);
    } else {
      setValue({ ...value, Action: Text });
      setSosType(false)
    };
  }
  const onChangeStatus = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Status: Text });
      setStatus(false);
    } else {
      setValue({ ...value, Status: Text });
      setStatus(false)
    };
  }
  const onChangeRemark = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Remark: Text });
      setRemark(false);
    } else {
      setValue({ ...value, Remark: Text });
      setRemark(false)
    };
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
    if (checkStringNullEmpty(value.Action)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSosType(true)
    }
    if (checkStringNullEmpty(value.Status)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setStatus(true)
    }
    if (checkStringNullEmpty(value.Remark)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setRemark(true)
    }
  };

  var data = JSON.stringify({
    id: value?.Id,
    attributes: {
      alarm: value?.Alarm,
      userId: value?.UserId,
      email: value?.Email
    },
    deviceId: value?.DeviceId,
    type: value?.Type,
    eventTime: value?.EventTime,
    positionId: value?.PositionId,
    geofenceId: value?.GeofenceId,
    maintenanceId: value?.MaintenanceId,
    action: value?.Action,
    remark: value?.Remark,
    status: value?.Status,
    location: address,
    vehicleNo: value?.VehicleNo,
    latitude: value?.Latitude,
    longitude: value?.Longitude,
    permitHolderPhone: value?.PermitHolderPhone,
    permitHolder: value?.PermitHolder,
    updateOn: new Date()
  })

  const onSubmit = async () => {
    validate();
    if (validation === '') {
      setLoader(true)
      await ApiRequestAuthorizationHook.put(`/sos_services/${value?.Id}`, data)
        .then(function (ress) {
          if (ress.status === 200) {
            setLoader(false);
            setCustomModal({ ...customModal, modal: true, message: 'Panic updated successfully', status: 1 })
          }
        })
        .catch(function (err) {
          console.log('update sos', err)
          setLoader(false)
          setCustomModal({ ...customModal, modal: true, message: 'Panic updated failed', status: 0 })
        })
    }
  }

  useEffect(() => {
    setLoader(true)
    const getData = async () => {
      await AsyncStorage.getItem('sos_data')
        .then(function name(params) {
          const JSONObj = JSON.parse(params)
          setValue({
            Id: JSONObj?.id,
            Alarm: JSONObj?.attributes?.alarm,
            UserId: JSONObj?.attributes?.userId,
            Email: JSONObj?.attributes?.email,
            DeviceId: JSONObj?.deviceId,
            Type: JSONObj?.type,
            EventTime: JSONObj?.eventTime,
            PositionId: JSONObj?.positionId,
            GeofenceId: JSONObj?.geofenceId,
            MaintenanceId: JSONObj?.maintenanceId,
            Action: JSONObj?.action,
            Remark: JSONObj?.remark,
            Status: JSONObj?.status,
            Location: JSONObj?.location,
            UpdateOn: JSONObj?.updateOn,
            VehicleNo: JSONObj?.vehicleNo,
            Latitude: JSONObj?.latitude,
            Longitude: JSONObj?.longitude,
            PermitHolder: JSONObj?.permitHolder,
            PermitHolderPhone: JSONObj?.permitHolderPhone,
          })
          setLoader(false)
        })
        .catch(function (params) {
          console.log(params)
        })
        .finally(function () {
          console.log('finally')
          setLoader(false)
        })
    }
    getData();
  }, [])

  const onRoute = () => {
    Navigation.goBack();
    setCustomModal({ ...customModal, modal: false, message: 'Panic updated successfully', status: null })
  }

  const getAddress = async () => {
    await ApiRequestAuthorizationHook.get(`/server/geocode?latitude=${value?.Latitude}&longitude=${value?.Longitude}`)
      .then(function (params) {
        if (params?.status === 200) {
          setAddress(params.data)
        }
      })
      .catch(function (error) {
        console.log('sos address', error)
        setAddress(null)
      })
  }
  useEffect(() => {
    getAddress();
  }, [address, value?.Latitude]);


  var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return (
    <Fragment>
      <Modal visible={customModal.modal} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>CGVTS</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


      <Modal visible={loader} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <View>
          <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10, borderColor: '#8080804f', borderWidth: 1, elevation: 24 }}>
            <View style={{ backgroundColor: '#f4f4fd', marginTop: 10, borderRadius: 5, padding: 10 }}>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ paddingTop: 14 }}>
                    <Text style={{ color: '#67748E', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>Serial No</Text>
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{value?.Id}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ paddingTop: 14 }}>
                    <Text style={{ color: '#67748E', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>Vehicle No</Text>
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{value?.VehicleNo}</Text>
                  </View>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ paddingTop: 14 }}>
                    <Text style={{ color: '#67748E', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>Time</Text>
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{new Date(value?.EventTime)?.getDate()} {mS[new Date(value?.EventTime)?.getMonth()]} {new Date(value?.EventTime)?.getFullYear()} {moment(value?.EventTime)?.format('LT')}</Text>
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ paddingTop: 14 }}>
                    <Text style={{ color: '#67748E', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>Location</Text>
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>
                      {address === null ? 'Address not found' : address}
                    </Text>
                  </View>
                </Col>

                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ paddingTop: 14 }}>
                    <Text style={{ color: '#67748E', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>Lat. Long</Text>
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{value?.Latitude}{", "}{value?.Longitude}</Text>
                  </View>
                </Col>
              </Row>
            </View>

            <View style={{ paddingTop: 12 }}>
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Action</Text>
              <Select style={{ height: 40, backgroundColor: '#f4f4fd', fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} placeholderTextColor={'#7D8EAB'} borderWidth={0} selectedValue={value.Action} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
                bg: "#f4f4fd",
                endIcon: <CheckIcon size="5" />
              }} _light={{
                bg: "#f4f4fd"
              }} _dark={{
                bg: "coolGray.800"
              }} onValueChange={itemValue => onChangeSosType(itemValue)}>
                <Select.Item shadow={2} label="False Alarm" value="False Alarm" />
                <Select.Item shadow={2} label="Forwarded To ERSS" value="Forwarded To ERSS" />
                <Select.Item shadow={2} label="Test" value="Test" />
                <Select.Item shadow={2} label="Test" value="No Action" />
              </Select>
              {sosType ?
                <View>
                  <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>SOS Type is required</Text>
                </View>
                : null
              }
            </View>
            <View style={{ paddingTop: 12 }}>
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Status</Text>
              <Select style={{ height: 40, backgroundColor: '#f4f4fd', fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} placeholderTextColor={'#7D8EAB'} borderWidth={0} selectedValue={value.Status} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
                bg: "#f4f4fd",
                endIcon: <CheckIcon size="5" />
              }} _light={{
                bg: "#f4f4fd"
              }} _dark={{
                bg: "coolGray.800"
              }} onValueChange={itemValue => onChangeStatus(itemValue)}>
                <Select.Item shadow={2} label="Pending" value="pending" />
                <Select.Item shadow={2} label="Resolved" value="resolved" />
                <Select.Item shadow={2} label="Cancelled" value="cancelled" />
                <Select.Item shadow={2} label="Acknowledged" value="acknowledged" />
              </Select>
              {status ?
                <View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Status is required</Text>
                </View>
                : null
              }
            </View>
            <View style={{ paddingTop: 12 }}>
              <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Remarks</Text>
              <TextArea value={value.Remark} placeholderTextColor={'#7D8EAB'} onChangeText={(Text) => onChangeRemark(Text)} borderWidth={0} style={{ backgroundColor: '#f4f4fd', fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} placeholder="Write Comments" w="100%" />
              {remark ?
                <View>
                  <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Remark is required</Text>
                </View>
                : null
              }
            </View>
          </View>

          <Pressable onPress={() => onSubmit()} style={{ backgroundColor: '#4646F2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15 }}>
            <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Update SOS</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Fragment>
  )
}

export default EditSos