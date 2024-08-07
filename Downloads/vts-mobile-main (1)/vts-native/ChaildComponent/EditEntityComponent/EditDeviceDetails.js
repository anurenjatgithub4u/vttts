import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, LayoutAnimation, UIManager, Platform, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { Col, Row } from 'react-native-responsive-grid-system';
import AsyncStorage from '@react-native-community/async-storage';
import { Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const EditDeviceDetails = ({ setDeviceDetailsColor, setSimDetailsColor, setVehicleDetailsColor, setPermitHolderColor, setDeviceDetailsView, setSimDetailsView, setVehicleDetailsView, setPermitHolderView, }) => {
  const navigation = useNavigation();
  const location = useRoute();
  const [errorMsg, setErrorMsg] = useState('Data Fetching Failed')
  const [alertVisible, setAlertVisible] = useState(false)
  const [vltdNo, setVltdNo] = useState({ vltdNo: '' });//GVLTDNO3242343244
  const [vltdNoValid, setVltdNoValide] = useState(false);
  const [loader, setLoader] = useState(false)
  const [getVltdData, setgetVltdData] = useState({})
  const { ApiRequestAuthorizationHook, } = useHeader();
  const [buttonDisable, setButtonDisable] = useState(true)

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
    } else {
      setVltdNo({ ...vltdNo, vltdNo: Text, });
      setVltdNoValide(false)
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

      await ApiRequestAuthorizationHook.get(`/vehicle_registration/device_info?vltdno=${vltdNo}`, { signal: signal })
        .then(function (response) {
          if (response.status === 200) {
            setgetVltdData(response.data);
            setButtonDisable(false)
          } else {

          }
        })
        .catch(function (error) {
          setErrorMsg('Data Fetching Failed')
          setLoader(true)
          console.log('device details', error);
          showAlert();
        })
        .finally(function () {
          setLoader(false)
        });

      return () => {
        // cancel the request before component unmounts
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

  const getEntityData = async () => {
    setLoader(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/devices/${location?.params?.entity_id}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setVltdNo({ vltdNo: response?.data?.uniqueId })
          setgetVltdData(response.data);
          setButtonDisable(false)
        } else {

        }
      })
      .catch(function (err) {
        console.log('device data', err);
      })
      .finally(function () {
        setLoader(false)
      });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }
  useEffect(() => {
    getEntityData();
  }, []);


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
        <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Vltd Unique Identification Number</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5, alignItems: 'center' }}>
          <TextInput value={vltdNo?.vltdNo} maxLength={19} onChangeText={(text) => onChangeVltd(text)} placeholder='Enter VLTD No.' placeholderTextColor={'#7D8EAB'} style={{ borderRadius: 5, width: '100%', height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} />
        </View>
        {vltdNoValid ?
          <View>
            <Text style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Unique number must be minimum 15 digits and maximum 19 digit</Text>
          </View>
          :
          null}
        <TouchableOpacity activeOpacity={0.60} disabled onPress={() => fetchVltData()} style={{ backgroundColor: '#A1A1F8', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 8 }}>
          <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Fetch Details from Vahan</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: '#f4f4fd', marginTop: 20, borderRadius: 5, padding: 10 }}>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>VLTD MAKE</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>- {getVltdData?.vltd_make === undefined ? '' : getVltdData?.vltd_make}</Text>
              </View>
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>VLTD MODEL</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>- {getVltdData?.vltdmodel === undefined ? '' : getVltdData?.vltdmodel}</Text>
              </View>
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>IMEI NUMBER</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>- {getVltdData?.uniqueId === undefined ? '' : getVltdData?.uniqueId}</Text>
              </View>
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>ICCID NUMBER</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>- {getVltdData?.iccid === undefined ? '' : getVltdData?.iccid}</Text>
              </View>
            </Col>

            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>MODEL CODE</Text>
              </View>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <View style={{ paddingTop: 14 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>- {getVltdData?.model_code === undefined ? '' : getVltdData?.model_code}</Text>
              </View>
            </Col>
          </Row>
        </View>
      </View>

      <Pressable onPress={() => buttonDisable ? onNextValid() : onNexnt()} style={{ backgroundColor: buttonDisable ? '#7474f5' : '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15 }}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Next</Text>
      </Pressable>
    </Fragment >
  )
}

export default EditDeviceDetails;



const styles = StyleSheet.create({
  alert: {
    //position: 'absolute',
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