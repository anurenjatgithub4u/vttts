import React, { useState, Fragment } from 'react';
import { View, Pressable, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { Modal, ActivityIndicator, ToastAndroid } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OtpInputs from 'react-native-otp-inputs';
import { Col, Row } from "react-native-responsive-grid-system";
import qs from 'qs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';


const EntityVerify = () => {
  let Location = useRoute();
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [otpLoader, setOtpLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [otpObj, setOtpObj] = useState(null);
  const [completeModal, setCompleteModal] = useState({ status: null, message: '', isVisible: false })
  const [buttonDisable, setButtonDisable] = useState(true);
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

  const resendData = qs.stringify({
    clientPhoneNo: otpObj?.contact,
    permitHolderName: otpObj?.permit_holder,
    deviceId: otpObj?.id
  });

  const onVerifyResned = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/otps?${resendData}`, { signal: signal })
      .then(function (response) {
        if (response?.status === 200) {
          ToastAndroid.showWithGravityAndOffset(
            response?.data?.status,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        }
      })
      .catch(function (error) {
        console.log('Entity', error)
        ToastAndroid.showWithGravityAndOffset(
          "OTP is sent to permit holder unsuccessfully.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      })
      .finally(function () {
      });

    return () => {
      controller.abort();
    };
  }

  var data = JSON.stringify({
    otp: value?.otp_value,
    phone: otpObj?.contact,
    deviceId: otpObj?.id,
  });

  const onSubmitVerify = async () => {
    setLoader(true)
    await ApiRequestAuthorizationHook.put(`/otps`, data)
      .then(function (params) {
        if (params?.status === 200) {
          if (params?.data?.status === "valid OTP.") {
            setCompleteModal({ ...completeModal, message: 'Verification Completed!', status: 1, isVisible: true })
            
          } else {
            setCompleteModal({ ...completeModal, message: `Invalid OTP`, status: 0, isVisible: true })
          }
        }
      })
      .catch(function (error) {
        console.log(error)
        setCompleteModal({ ...completeModal, message: `Verification Failed`, status: 0, isVisible: true })
      })
      .finally(() => {
        setLoader(false)
      })
  }

  const getDeviceInfo = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    setOtpLoader(true)
    await ApiRequestAuthorizationHook.get(`/devices/${Location?.params?.verify_id}`, { signal: signal })
      .then(function (result) {
        if (result?.status === 200) {
          setOtpObj(result?.data);
        }
      }).catch(function (err) {
        console.log(err)
      })
      .finally(function () {
        setOtpLoader(false)
      })

    return () => {
      controller.abort();
    };
  }
  useEffect(() => { getDeviceInfo() }, []);

  return (
    <Fragment>

      <Modal visible={loader} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#0000004d', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>
      <Modal visible={otpLoader} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#0000004d', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>
      <View style={{ backgroundColor: '#FFFFFF', width: '95%', elevation: 12, borderRadius: 5, paddingHorizontal: 50, paddingBottom: 30, paddingTop: 30, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ borderWidth: 1, borderColor: 'blue', borderRadius: 50, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
          <MaterialIcons name='send-to-mobile' color={'blue'} size={30} />
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text style={{ textAlign: 'center', color: '#000000', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Verification</Text>
          <Text style={{ paddingTop: 5, textAlign: 'center', color: '#000000', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>Please enter the verification code send to</Text>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Please Enter the code here</Text>
        </View>

        <View style={{ paddingTop: 30 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <OtpInputs
              handleChange={(OTP) => onChangeOtp(OTP)}
              numberOfInputs={6}
              inputStyles={{ backgroundColor: '#e2e2fd', margin: 5, width: 45, height: 45, textAlign: 'center', borderRadius: 5, color: '#252F40', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}
              style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>
          <Text style={{ color: '#67748e', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Didn't received yet ? </Text>
          <Pressable onPress={() => onVerifyResned()}>
            <Text style={{ color: '#4646f2', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Resend</Text>
          </Pressable>
        </View>

        <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            <TouchableOpacity activeOpacity={0.80} onPress={() => Navigation.goBack()} style={{ marginTop: 20, width: '100%', borderRadius: 4, padding: 10, borderWidth: 1, borderColor: '#4646f2' }}>
              <Text style={[{ textAlign: 'center', color: '#4646f2', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>Cancel</Text>
            </TouchableOpacity>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <TouchableOpacity onPress={() => onSubmitVerify()} disabled={buttonDisable} activeOpacity={buttonDisable ? 100 : 0.80} style={{ marginTop: 20, backgroundColor: buttonDisable ? '#4646f273' : '#4646f2', width: '100%', borderRadius: 4, padding: 10, borderWidth: 1, borderColor: buttonDisable ? '#4646f273' : '#4646f2' }}>
              <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>Verify</Text>
            </TouchableOpacity>
          </Col>
        </Row>
      </View>

      <Modal visible={completeModal?.isVisible} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#353232d1', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ backgroundColor: '#FFFFFF', width: '95%', elevation: 12, borderRadius: 5, paddingHorizontal: 50, paddingBottom: 30, paddingTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ borderWidth: 1, borderColor: completeModal?.status === 1 ? '#008000' : 'red', borderRadius: 50, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
              <Feather name={completeModal?.status === 1 ? 'check-circle' : 'info'} color={completeModal?.status === 1 ? '#008000' : 'red'} size={30} />
            </View>
            <View style={{ paddingTop: 10 }}>
              <Text style={{ textAlign: 'center', color: '#000000', fontSize: 14, fontFamily: 'OpenSans-Bold' }}>{completeModal?.message}</Text>
            </View>

            {completeModal?.status === 1 ?
              < TouchableOpacity onPress={() => { setCompleteModal({ ...completeModal, status: null, isVisible: false }); Navigation.goBack() }} activeOpacity={0.80} style={{ marginTop: 20, backgroundColor: completeModal?.status === 1 ? '#4646f2' : '#ff0000', width: '100%', borderRadius: 4, padding: 10, borderWidth: 1, borderColor: completeModal?.status === 1 ? '#4646f2' : '#ff0000' }}>
                <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>{completeModal?.status === 1 ? 'Done' : 'Try Again'}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { setCompleteModal({ ...completeModal, status: null, isVisible: false }); }} activeOpacity={0.80} style={{ marginTop: 20, backgroundColor: completeModal?.status === 1 ? '#4646f2' : '#ff0000', width: '100%', borderRadius: 4, padding: 10, borderWidth: 1, borderColor: completeModal?.status === 1 ? '#4646f2' : '#ff0000' }}>
                <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>{completeModal?.status === 1 ? 'Done' : 'Try Again'}</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </Modal>

    </Fragment >
  )
}

export default EntityVerify