import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, Modal, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input } from 'native-base';
import { Col, Row } from 'react-native-responsive-grid-system';
import { useRoute } from '@react-navigation/native';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';

const EditPermitHolder = ({ setDeviceDetailsColor, setSimDetailsColor, setVehicleDetailsColor, setPermitHolderColor, setDeviceDetailsView, setSimDetailsView, setVehicleDetailsView, setPermitHolderView, navigation, }) => {
  const { ApiRequestAuthorizationHook, } = useHeader();
  const location = useRoute();
  const [loader, setLoader] = useState(false)
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [nameOfPermitHolder, setNameOfPermitHolder] = useState(false);
  const [contact, setContact] = useState(false);
  const [point_Of_Contact_Name, setPoint_Of_Contact_Name] = useState(false);
  const [point_Of_Contact_Number, setPoint_Of_Contact_Number] = useState(false);

  const [holderNumber, setHolderNumber] = useState(false);
  const [driverNumber, setDriverNumber] = useState(false);

  const [deviceDetails, setDeviceDetails] = useState({})
  const [simDetails, setSimDetails] = useState({})
  const [vehicleDetails, setVehicleDetails] = useState({})
  const [value, setValue] = useState({
    NameOfPermitHolder: '',
    Contact: '',
    Point_Of_Contact_Name: '',
    Point_Of_Contact_Number: '',
  });

  const onChangeNameOfPermitHolder = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, NameOfPermitHolder: Text });
      setNameOfPermitHolder(false);
    } else {
      setValue({ ...value, NameOfPermitHolder: Text });
      setNameOfPermitHolder(false)
    };
  };
  const onChangeContact = (Text) => {
    if (Text.trim().length >= 10) {
      setValue({ ...value, Contact: Text });
      setContact(false);
      setHolderNumber(false)
    } else {
      setValue({ ...value, Contact: Text });
      setContact(false)
      setHolderNumber(true)
    };
  };
  const onChangePoint_Of_Contact_Name = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Point_Of_Contact_Name: Text });
      setPoint_Of_Contact_Name(false);
    } else {
      setValue({ ...value, Point_Of_Contact_Name: Text });
      setPoint_Of_Contact_Name(false)
    };
  };
  const onChangePoint_Of_Contact_Number = (Text) => {
    if (Text.trim().length >= 10) {
      setValue({ ...value, Point_Of_Contact_Number: Text });
      setPoint_Of_Contact_Number(false);
      setDriverNumber(false);
    } else {
      setValue({ ...value, Point_Of_Contact_Number: Text });
      setPoint_Of_Contact_Number(false)
      setDriverNumber(true)
    };
  };

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };
  var validation = '';
  const validate = () => {
    if (checkStringNullEmpty(value?.NameOfPermitHolder)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setNameOfPermitHolder(true)
    }
    if (checkStringNullEmpty(value?.Contact)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setContact(true)
    }
    if (checkStringNullEmpty(value?.Point_Of_Contact_Name)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setPoint_Of_Contact_Name(true)
    }
    if (checkStringNullEmpty(value?.Point_Of_Contact_Number)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setPoint_Of_Contact_Number(true)
    }
  };

  useEffect(() => {
    DeviceDetails();
    SimDetails();
    VehicleDetails();
  }, [])
  const DeviceDetails = async () => {
    const DeviceDetails_result = await AsyncStorage.getItem('DeviceDetails')
    const obj = JSON.parse(DeviceDetails_result)
    setDeviceDetails(obj)
    setValue({
      NameOfPermitHolder: obj?.permit_holder,
      Contact: obj?.contact?.toString(),
      Point_Of_Contact_Name: obj?.altContactPerson,
      Point_Of_Contact_Number: obj?.altPhone?.toString(),
    })
  }
  const SimDetails = async () => {
    const SimDetails_result = await AsyncStorage.getItem('Sim_Details')
    const obj = JSON.parse(SimDetails_result)
    setSimDetails(obj)
  }
  const VehicleDetails = async () => {
    const VehicleDetails_result = await AsyncStorage.getItem('VehicleDetails')
    const obj = JSON.parse(VehicleDetails_result)
    setVehicleDetails(obj)
  }

  var data = JSON.stringify({
    id: location?.params?.entity_id,
    attributes: deviceDetails?.attributes,
    groupId: deviceDetails?.groupId,
    name: vehicleDetails?.Name,
    uniqueId: deviceDetails?.uniqueId,
    status: deviceDetails?.status,
    lastUpdate: new Date(),
    positionId: deviceDetails?.positionId,
    geofenceIds: deviceDetails?.geofenceIds,
    phone: deviceDetails?.phone,
    vehicleModel: deviceDetails?.vehicleModel,
    contact: value?.Contact,
    category: vehicleDetails?.VehicleCategory,
    disabled: deviceDetails?.disabled,
    vltdmodel: deviceDetails?.vltdmodel,
    serialNo: deviceDetails?.serialNo,
    iccid: deviceDetails?.iccid,
    createdon: new Date(deviceDetails?.createdon),
    vltd_make: vehicleDetails?.Make,
    simno1: simDetails?.SimNumber1,
    network1: simDetails?.Network1,
    sim1_expiry: new Date(simDetails?.Sim1Expiry),
    simno2: simDetails?.SimNumber2,
    network2: simDetails?.Network2,
    sim2_expiry: new Date(simDetails?.Sim2Expiry),
    vstate: vehicleDetails?.State,
    rto_code: vehicleDetails?.RTOCode,
    vehicleMake: deviceDetails?.vehicleMake,
    chasisno: vehicleDetails?.ChasisNo,
    engineno: vehicleDetails?.EngineNo,
    manufacture_year: vehicleDetails?.ManufacturingYear,
    permit_holder: value?.NameOfPermitHolder,
    sos_status: deviceDetails?.sos_status,
    sos_eventid: deviceDetails?.sos_eventid,
    otpverified: deviceDetails?.otpverified,
    altContactPerson: value?.Point_Of_Contact_Name,
    altPhone: value?.Point_Of_Contact_Number,
    groupName: deviceDetails?.groupName,
    deviceActivationStatus: deviceDetails?.deviceActivationStatus,
    iccIdValidUpto: new Date(deviceDetails?.iccIdValidUpto),
    activationRcptNo: deviceDetails?.activationRcptNo,
    deviceActivatedUpto: new Date(deviceDetails?.deviceActivatedUpto),
    deviceActivationDate: new Date(deviceDetails?.deviceActivationDate),
    createdBy: deviceDetails?.createdBy
  });

  const onNexnt = async () => {
    validate();
    if (validation === '') {
      if (holderNumber === false && driverNumber === false) {
        setLoader(true)
        await ApiRequestAuthorizationHook.put(`/devices/${location?.params?.entity_id}`, data)
          .then(function (ress) {
            if (ress.status === 200) {
              setLoader(false);
              setCustomModal({ ...customModal, modal: true, message: 'Successfully Updated Entity', status: 1 })
            }
          })
          .catch(function (err) {
            console.log('Entity Updated Err', err)
            setLoader(false);
            setCustomModal({ ...customModal, modal: true, message: 'Unable To Update Entity', status: 0 })
          })
      }
    }
  };

  const onRoute = () => {
    AsyncStorage.removeItem('DeviceDetails')
    AsyncStorage.removeItem('Sim_Details')
    AsyncStorage.removeItem('VehicleDetails')

    setDeviceDetailsView(false)
    setSimDetailsView(true)
    setVehicleDetailsView(false)
    setPermitHolderView(false)

    setDeviceDetailsColor(true)
    setSimDetailsColor(true)
    setVehicleDetailsColor(true)
    setPermitHolderColor(true)
    navigation.navigate('Root')
    // setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  useEffect(() => {
    const backAction = () => {
      setDeviceDetailsView(false)
      setSimDetailsView(false)
      setVehicleDetailsView(true)
      setPermitHolderView(false)

      setDeviceDetailsColor(true)
      setSimDetailsColor(true)
      setVehicleDetailsColor(true)
      setPermitHolderColor(false)
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Fragment>

      <Modal visible={customModal.modal} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>CGVTS</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {loader ?
        <Modal visible={true} transparent={true}>
          <BlurViewScreen />
          <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
        </Modal>
        : null}

      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10 }}>
        <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold' }} >Permit Holder Details</Text>
        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Name Of Permit Holder</Text>
          <View style={{ backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
            <Input value={value?.NameOfPermitHolder} onChangeText={(Text) => onChangeNameOfPermitHolder(Text)} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder='Enter Name' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} />
          </View>
          {nameOfPermitHolder ?
            <View>
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Name Of Permit Holder is required</Text>
            </View>
            : null
          }
        </View>
        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Contact</Text>
          <View style={{ backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
            <Input keyboardType='number-pad' maxLength={10} value={value?.Contact} onChangeText={(Text) => onChangeContact(Text)} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder='Enter 10 Digit Mobile' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} />
          </View>
          {contact ?
            <View>
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Contact is required</Text>
            </View>
            : null
          }
          {holderNumber ?
            <View>
              <Text style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Enter 10 digit number</Text>
            </View>
            :
            null}
        </View>
        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Driver Name</Text>
          <View style={{ backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
            <Input value={value?.Point_Of_Contact_Name} onChangeText={(Text) => onChangePoint_Of_Contact_Name(Text)} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder='Driver Name' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} />
          </View>
          {point_Of_Contact_Name ?
            <View>
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Driver Name is required</Text>
            </View>
            : null
          }
        </View>
        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Driver Number</Text>
          <View style={{ backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
            <Input keyboardType='number-pad' maxLength={10} value={value?.Point_Of_Contact_Number} onChangeText={(Text) => onChangePoint_Of_Contact_Number(Text)} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder='Enetr Driver Number' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} />
          </View>
          {point_Of_Contact_Number ?
            <View>
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Driver Number is required</Text>
            </View>
            : null
          }
          {driverNumber ?
            <View>
              <Text style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Enter 10 digit number</Text>
            </View>
            :
            null}
        </View>
      </View>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <TouchableOpacity activeOpacity={0.60} onPress={() => onRoute()} style={{ backgroundColor: '#F25555', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15 }}>
            <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Cancel</Text>
          </TouchableOpacity>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <TouchableOpacity activeOpacity={0.60} onPress={() => onNexnt()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15 }}>
            <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Submit</Text>
          </TouchableOpacity>
        </Col>
      </Row>
    </Fragment>
  )
}

export default EditPermitHolder