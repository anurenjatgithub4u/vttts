import React, { Fragment, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { StatusBar, View, Image, TouchableOpacity, BackHandler, ScrollView, Pressable, Modal, ToastAndroid, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import qs from 'qs'
import imagePath from '../constants/imagePath';
import { useHeader } from '../ApiHeader';
import { BlurView, } from "@react-native-community/blur";

const OtpVerifyScreen = () => {
  let Navigation = useNavigation();
  let params = useRoute()
  const [loader, setLoader] = useState(false)
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [buttonDisable, setButtonDisable] = useState(true);
  const [passwordToken, setPasswordToken] = useState(true);
  const { ApiPostUrl } = useHeader();
  const [value, setValue] = useState({
    otp_value: '',
  });

  const onChangeOtp = (OTP) => {
    if (OTP.trim().length === 6) {
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
    email: params?.params?.email,
    otp: value?.otp_value
  });

  const onVerifyOtp = async () => {
    setLoader(true)
    await ApiPostUrl.post(`/password/otp/verify`, dataotp)
      .then(function (ress) {
        if (ress?.status === 200) {
          setPasswordToken(ress.data?.passwordToken)
          setLoader(false)
          setCustomModal({ ...customModal, modal: true, message: 'OTP VERIFIED SUCCESSFULLY!', status: 1 })
        }
      })
      .catch(function (errr) {
        console.log(errr)
        setLoader(false)
        setCustomModal({ ...customModal, modal: true, message: 'FAILED TO VERIFY, TRY AGAIN !', status: 0 })
      })
  }

  var data = qs.stringify({
    email: params?.params?.email,
  });

  const onSubmit = async () => {
    setLoader(true)
    await ApiPostUrl.post(`/password/otp`, data)
      .then(function (ress) {
        if (ress?.status === 200) {
          console.log(ress.data)
          setLoader(false)
          ToastAndroid.showWithGravity(
            "OTP SENT TO EMAIL SUCCESSFULLY!",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      })
      .catch(function (errr) {
        console.log(errr)
        setLoader(false)
        ToastAndroid.showWithGravity(
          "FAILED TO SENT OTP !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
  }

  const onRouteSuccess = () => {
    Navigation.navigate({ name: 'UpdatePasswordScreen', params: { passwordToken: passwordToken } })
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }
  const onRouteFailed = () => {
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  return (
    <Fragment>
      <Modal visible={customModal.modal} transparent={true}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>CGVTS</Text>
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
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>

      <StatusBar barStyle='dark-content' backgroundColor="#ededfc" style={{ backgroundColor: '#ededfc' }} />
      <Animatable.View animation="slideInRight" style={{ flex: 1, backgroundColor: '#ededfc', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, }}>
        <Pressable onPress={() => Navigation.goBack()} style={{ position: 'absolute', top: 10, left: 10, zIndex: 99, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name='arrow-back-circle' size={25} color={'#67748E'} />
          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 16, color: '#67748E', lineHeight: 22 }}>Back</Text>
        </Pressable>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 130, height: 130, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dbdbfa', borderRadius: 70, elevation: .5 }}>
            <Image source={imagePath.vtsLogo} style={{ width: 135, height: 135, marginTop: -20 }} resizeMode='contain' />
          </View>

          <View style={{ paddingTop: 15 }}>
            <Text style={{ textAlign: 'center', fontSize: 14, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>Vehicle Tracking System</Text>
            <Text style={{ paddingTop: 1, textAlign: 'center', fontSize: 14, color: '#7D8EAB', fontFamily: 'OpenSans-Regular' }}>Transport Department, Chhattisgarh</Text>
          </View>

          <View style={{ paddingTop: 70 }}>
            <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 16, color: '#7474f5', lineHeight: 22 }}>Enter OTP</Text>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252f40', lineHeight: 22 }}>Enter the 6 digit code that you received on your mail</Text>
          </View>

          <View style={{ paddingTop: 30 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
              <OtpInputs
                handleChange={(OTP) => onChangeOtp(OTP)}
                numberOfInputs={6}
                //placeholder={'0'}
                inputStyles={{ backgroundColor: '#e2e2fd', margin: 5, width: 45, height: 45, textAlign: 'center', borderRadius: 5, color: '#252F40', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}
                style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}
              />
            </View>
          </View>


          <TouchableOpacity disabled={buttonDisable} activeOpacity={buttonDisable ? 100 : 0.80} onPress={() => onVerifyOtp()} style={{ width: '100%', marginTop: 50, backgroundColor: buttonDisable ? '#4646f273' : '#4646f2', width: '100%', borderRadius: 4, padding: 10, }}>
            <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>Verify</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>
            <Text style={{ color: '#67748e', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Didn't received yet ? </Text>
            <Pressable onPress={() => onSubmit()}>
              <Text style={{ color: '#4646f2', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Resend</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Animatable.View>
    </Fragment>
  )
}

export default OtpVerifyScreen