import React, { Fragment, useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, ActivityIndicator, LayoutAnimation, UIManager, Platform, StyleSheet, BackHandler, } from 'react-native';
import { Col, Row } from 'react-native-responsive-grid-system';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const DeviceDetails = ({ setDeviceDetailsColor, setSimDetailsColor, setVehicleDetailsColor, setPermitHolderColor, setDeviceDetailsView, setSimDetailsView, setVehicleDetailsView, setPermitHolderView, }) => {
  const navigation = useNavigation();
  const [errorMsg, setErrorMsg] = useState('RES_904:Invalid deviceSerialNo Please Provide valid Data')
  const [alertVisible, setAlertVisible] = useState(false)
  const [vltdNo, setVltdNo] = useState({ vltdNo: '' });
  const [vltdNoValid, setVltdNoValide] = useState(false);
  const [loader, setLoader] = useState(false)
  const [getVltdData, setgetVltdData] = useState({})
  const { ApiRequestAuthorizationHook, } = useHeader();
  const [validVltd, setValidVltd] = useState(false)
  const [showInvalidNumberError, setShowInvalidNumberError] = useState(false);
const [showEmptyBoxError, setShowEmptyBoxError] = useState(false);


const isValidNumber = (number) => {
  const numberRegex = /^\d{10}$/;
  return numberRegex.test(number);
};
const validateAndSubmit = () => {
  if (!isValidNumber(vltdNo.vltdNo)) {
    setShowInvalidNumberError(true);
    setShowEmptyBoxError(false);
    return;
  }

  if (vltdNo.vltdNo.trim() === '') {
    setShowEmptyBoxError(true);
    setShowInvalidNumberError(false);
    return;
  }
  {vltdNoValid ? (
    <View>
      <Text style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>
        Vltd Number is required
      </Text>
    </View>
  ) : null}
  
  {showInvalidNumberError && (
    <View>
      <Text style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>
        Invalid number format. Please enter a valid number.
      </Text>
    </View>
  )}
  
  {showEmptyBoxError && (
    <View>
      <Text style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>
        Main box is empty. Please enter a number.
      </Text>
    </View>
  )}
  
};


  const onNexnt = async () => {
    await AsyncStorage.setItem('DeviceDetails', JSON.stringify(getVltdData))
    setDeviceDetailsView(false)
    setSimDetailsView(true)
    setVehicleDetailsView(false)
    setPermitHolderView(false)

    setDeviceDetailsColor(true)
    setSimDetailsColor(true)
    setVehicleDetailsColor(false)
    setPermitHolderColor(false)
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


  const onChangeVltd = (Text) => {
    if (Text.trim().length >= 15) {
      setVltdNo({ ...vltdNo, vltdNo: Text, });
      setVltdNoValide(false)
      setValidVltd(false)
    } else {
      setVltdNo({ ...vltdNo, vltdNo: Text, });
      setVltdNoValide(false)
      setValidVltd(true)
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
    if (checkStringNullEmpty(vltdNo.vltdNo)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setVltdNoValide(true)
    }
  }

  const fetchVltData = async () => {
    validateuser();
    if (validationuser === '') {
        setLoader(true)
        const controller = new AbortController();
        const signal = controller.signal;

        await ApiRequestAuthorizationHook.get(`/vehicle_registration/device_info?vltdno=${vltdNo?.vltdNo}`, { signal: signal })
          .then(function (response) {
            if (response?.status === 200) {
              setgetVltdData(response?.data);
            } else {

            }
          })
          .catch(function (error) {
            setErrorMsg('RES_904:Invalid deviceSerialNo Please Provide valid Data')
            console.log('device details', error);
            showAlert();
          })
          .finally(function () {
            setLoader(false)
          });

        return () => {
          controller.abort();
        };
    } else {
      setVltdNoValide(true)
    }
  }

  const onNextValid = () => {
    showAlert();
    setErrorMsg('Fetch Details from Vahan');
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
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
      {loader ?
        <Modal visible={true} transparent={true}>
          <BlurViewScreen />
          <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
        </Modal>
        : null}
      <View style={[styles.alert, !alertVisible && { height: 0, marginTop: -1 }]}>
        <Text style={styles.msg} numberOfLines={5}>{errorMsg}</Text>
      </View>
      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 10, marginTop: 20, borderRadius: 5, padding: 10 }}>
        <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Vltd Unique Identification Number</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5, alignItems: 'center' }}>
          <TextInput value={vltdNo.vltdNo} onChangeText={(text) => onChangeVltd(text)} placeholder='Enter VLTD No.' maxLength={19} placeholderTextColor={'#7D8EAB'} style={{ borderRadius: 5, width: '100%', height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} />
        </View>
        {vltdNoValid ?
          <View>
            <Text style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Vltd Number is required</Text>
          </View>
          :
          null}
        <Pressable onPress={() => fetchVltData()} style={{ backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 8 }}>
          <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Fetch Details from Vahan</Text>
        </Pressable>

        <View style={{ backgroundColor: '#f4f4fd', marginTop: 20, borderRadius: 5, padding: 10 }}>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>VLTD MAKE</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{getVltdData?.vltd_make === undefined ? '-' : `- ${getVltdData?.vltd_make}`}</Text>
              </View>
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>VLTD MODEL</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{getVltdData?.vltdmodel === undefined ? '-' : `- ${getVltdData?.vltdmodel}`}</Text>
              </View>
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>IMEI NUMBER</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{getVltdData?.uniqueId === undefined ? '-' : `- ${getVltdData?.uniqueId}`}</Text>
              </View>
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>ICCID NUMBER</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{getVltdData?.iccid === undefined ? '-' : `- ${getVltdData?.iccid}`}</Text>
              </View>
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>MODEL CODE</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{getVltdData?.model_code === undefined ? '-' : `- ${getVltdData?.model_code}`}</Text>
              </View>
            </Col>
          </Row>
        </View>
      </View>

      {getVltdData.iccid === undefined ?
        <Pressable style={{ backgroundColor: '#A1A2F2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15 }}>
          <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Next</Text>
        </Pressable>
        :
        <Pressable onPress={() => onNexnt()} style={{ backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15 }}>
          <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Next</Text>
        </Pressable>
      }
    </Fragment >
  )
}

export default DeviceDetails;



const styles = StyleSheet.create({
  alert: {
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
})