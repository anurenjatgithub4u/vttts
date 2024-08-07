import React, { Fragment, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { StatusBar, View, Image, TouchableOpacity, BackHandler, ScrollView, Pressable, Modal, ToastAndroid, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Center, } from 'native-base';
import qs from 'qs';
import { BlurView, } from "@react-native-community/blur";
import imagePath from '../../constants/imagePath';
import { useHeader } from '../../ApiHeader';
import AsyncStorage from '@react-native-community/async-storage';

const UpdateCitizensOtpVerifyScreen = () => {
  let Navigation = useNavigation();
  let params = useRoute()
  const [loader, setLoader] = useState(false)
  const [successModal, setSuccessModal] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [buttonDisable, setButtonDisable] = useState(true);
  const [accountData, setAccountData] = useState({})
  const { ApiNewUser, ApiRequestAuthorizationHook } = useHeader();
  const [value, setValue] = useState({
    otp_value: '',
  });

  const onChangeOtp = (OTP) => {
    if (OTP.trim().length === 4) {
      setValue({ ...value, otp_value: OTP })
      setButtonDisable(false)
    } else {
      setValue({ ...value, otp_value: OTP })
      setButtonDisable(true)
    }
  }

  useEffect(() => {
    const backAction = () => {
      Navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  var dataotp = qs.stringify({
    otp: value?.otp_value,
    phone: params?.params?.phone
  });

  const onVerifyOtp = async () => {
    setLoader(true)
    await ApiNewUser.put(`/user/otps?${dataotp}`)
      .then(async function (ress) {
        if (ress?.status === 200) {
          await ApiRequestAuthorizationHook.put(`/users/${params?.params?.AccoutnId}`, accountData)
            .then(function (ress) {
              if (ress?.status === 200) {
                setSuccessModal(true)
                setTimeout(() => {
                  Navigation.navigate('CitizensHomeScreen')
                  setSuccessModal(false)
                }, 2000);
              }
            })
            .catch(function (err) {
              console.log(err?.response)
              setCustomModal({ ...customModal, modal: true, message: 'User Account Updated Failed', status: 0 })
            })
            .finally(function () {
              setLoader(false)
            })
        }
      })
      .catch(function (errr) {
        console.log(errr.response)
        setLoader(false)
        setCustomModal({ ...customModal, modal: true, message: 'FAILED TO VERIFY, TRY AGAIN !' + ' ' + errr?.response?.data?.status, status: 0 })
      })
  }

  const onResendOtp = async () => {
    setLoader(true)
    await ApiNewUser.get(`/user/otps?phone=${params?.params?.phone}`)
      .then(function (ress) {
        if (ress?.status === 200) {
          setLoader(false)
          ToastAndroid.showWithGravity(
            "OTP SEND TO MOBILE SUCCESSFULLY!",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      })
      .catch(function (errr) {
        console.log(errr)
        setLoader(false)
        ToastAndroid.showWithGravity(
          "FAILED TO SEND OTP !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
  }

  const onRouteFailed = () => {
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
    // Navigation.navigate('CitizensHomeScreen')
  }

  const getData = async () => {
    await AsyncStorage.getItem('AccountData')
      .then(function name(params) {
        const RegisterData = JSON.parse(params)
        setAccountData(params)
      })
      .catch(function name(params) {
        console.log('params', params)
      })
      .finally(function name(params) {

      })
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <Fragment>
      <Modal visible={customModal.modal} transparent={true}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#0000ff4d', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>CGVTS</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            {customModal?.status === 1 ?
              <Pressable onPress={() => onRouteSuccess()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
                <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
              </Pressable>
              :
              <Pressable onPress={() => onRouteFailed()} style={{ width: '100%', backgroundColor: 'red', borderRadius: 5, padding: 10 }}>
                <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
              </Pressable>
            }
          </View>
        </View>
      </Modal>

      <Modal visible={loader} transparent>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#ededfcab', justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>

      <Pressable onPress={() => { Navigation.goBack(); AsyncStorage.removeItem('AccountData') }} style={{ position: 'absolute', top: 10, left: 10, zIndex: 99, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name='arrow-back-circle' size={25} color={'#67748E'} />
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 16, color: '#67748E', lineHeight: 22 }}>Back</Text>
      </Pressable>

      <StatusBar barStyle='dark-content' backgroundColor="#ededfc" style={{ backgroundColor: '#ededfc' }} />
      <Animatable.View animation="slideInRight" style={{ flex: 1, backgroundColor: '#ededfc', paddingHorizontal: 20, }}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", paddingTop: 70 }}>
            <Center style={{ width: 130, height: 130, backgroundColor: '#dbdbfa', borderRadius: 70, elevation: .5 }}>
              <Image source={imagePath.vtsLogo} style={{ width: 135, height: 135, marginTop: -20 }} resizeMode='contain' />
            </Center>
            <View style={{ paddingTop: 15 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>Vehicle Tracking System</Text>
              <Text style={{ paddingTop: 1, textAlign: 'center', fontSize: 14, color: '#7D8EAB', fontFamily: 'OpenSans-Regular' }}>Transport Department, Chhattisgarh</Text>
            </View>
          </View>

          <View style={{ paddingTop: 50 }}>
            <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 16, color: '#7474f5', lineHeight: 22, textAlign: 'center' }}>Enter OTP</Text>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252f40', lineHeight: 22 }}>Enter the 4 digit code that you received on your mail</Text>
          </View>

          <View style={{ paddingTop: 30 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
              <OtpInputs
                handleChange={(OTP) => onChangeOtp(OTP)}
                numberOfInputs={4}
                //placeholder={'0'}
                inputStyles={{ backgroundColor: '#FFFFFF', margin: 5, width: 45, height: 45, textAlign: 'center', borderRadius: 5, color: '#252F40', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}
                style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}
              />
            </View>
          </View>


          <TouchableOpacity disabled={buttonDisable} activeOpacity={buttonDisable ? 100 : 0.80} onPress={() => onVerifyOtp()} style={{ width: '100%', marginTop: 30, backgroundColor: buttonDisable ? '#4646f273' : '#4646f2', width: '100%', borderRadius: 4, padding: 10, }}>
            <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>Verify</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal visible={successModal} transparent>
          <BlurView
            blurType={"light"}
            blurAmount={1}
            reducedTransparencyFallbackColor={'white'}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
          />
          <View style={{ flex: 1, backgroundColor: '#000000ba', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={imagePath?.animation__500__lauq92sz} style={{ width: 300, height: 300, }} resizeMode={'contain'} />
            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 16, paddingTop: 20 }}>Contact number changed successfully</Text>
          </View>
        </Modal>

        <View style={{ position: 'relative', bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Pressable style={{ paddingTop: 20, paddingBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#67748e', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Didn't received yet ? </Text>
            <Pressable onPress={() => onResendOtp()}>
              <Text style={{ color: '#4646f2', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Resend</Text>
            </Pressable>
          </Pressable>
        </View>
      </Animatable.View>
    </Fragment>
  )
}

export default UpdateCitizensOtpVerifyScreen;


const zoomOut = {
  0: {
    opacity: 0,
    scale: 0,
  },
  0.5: {
    opacity: 1,
    scale: 0.3,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};