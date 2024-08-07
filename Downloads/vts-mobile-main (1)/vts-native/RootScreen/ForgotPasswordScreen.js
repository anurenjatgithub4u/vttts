import React, { Fragment, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { StatusBar, View, Image, TouchableOpacity, BackHandler, Pressable, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { Input, } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import qs from 'qs'
import imagePath from '../constants/imagePath';
import { useHeader } from '../ApiHeader';
import { BlurView, } from "@react-native-community/blur";

const ForgotPasswordScreen = () => {
  let Navigation = useNavigation();
  const { ApiPostUrl } = useHeader();
  const [loader, setLoader] = useState(false)
  const [emailId, setEmailId] = useState(true);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [iconColor, setIconColor] = useState({ emailIconColor: 'gray', })
  const [value, setValue] = useState({
    EmailId: '',
  });

  const onChangeEmailId = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, EmailId: Text, });
      setEmailId(false)
      setIconColor({ ...iconColor, emailIconColor: '#000000' })
    } else {
      setValue({ ...value, EmailId: Text, });
      setEmailId(true)
      setIconColor({ ...iconColor, emailIconColor: 'gray' })
    }
  };

  var data = qs.stringify({
    email: value.EmailId,
  });

  const onSubmit = async () => {
    setLoader(true)
    await ApiPostUrl.post(`/password/otp`, data)
      .then(function (ress) {
        if (ress?.status === 200) {
          console.log(ress?.data)
          setLoader(false)
          setCustomModal({ ...customModal, modal: true, message: 'OTP SENT TO EMAIL SUCCESSFULLY!', status: 1 })
        }
      })
      .catch(function (errr) {
        console.log(errr)
        setLoader(false)
        setCustomModal({ ...customModal, modal: true, message: 'FAILED TO SENT OTP !', status: 0 })
      })
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

  const onRouteSuccess = () => {
    Navigation.navigate({ name: 'OtpVerifyScreen', params: { email: value.EmailId } })
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
        <View style={{ flex: 1, backgroundColor: '#0000ff4d', justifyContent: 'center', alignItems: 'center' }}>
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

      <Modal visible={loader} transparent>{/* loader */}
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

          {/* <View style={{ paddingTop: 20 }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: '#252F40', lineHeight: 22 }}>Vehicle Tracking System</Text>
          </View>
          <View>
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E', lineHeight: 22 }}>Transport Department, Chhattisgarh</Text>
          </View> */}

          <View style={{ paddingTop: 70 }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 16, color: '#7474F5', lineHeight: 22 }}>Forgot Password</Text>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', lineHeight: 22 }}>Enter the email associated with your account,</Text>
          </View>
          <View>
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', lineHeight: 22 }}>we will send an OTP to your registered mail id.</Text>
          </View>


          <View style={{ paddingTop: 30 }}>
            <View>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', paddingBottom: 5 }}>Email</Text>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                <Input w={{
                  base: "100%",
                  md: "100%"
                }}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  value={value.EmailId}
                  onChangeText={(Text) => onChangeEmailId(Text)}
                  variant="unstyled"
                  borderWidth={0}
                  // InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-outline" />} size={5} ml="2" color={iconColor.emailIconColor} />}
                  style={{ fontFamily: 'OpenSans-Regular', fontSize: 14 }}
                  placeholder="Enter email address"
                  placeholderTextColor={'#7D8EAB'}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity activeOpacity={emailId ? 100 : 0.80} onPress={() => emailId ? null : onSubmit()} style={{ width: '100%', marginTop: 50, backgroundColor: emailId ? '#4646f273' : '#4646f2', width: '100%', borderRadius: 4, padding: 10, marginBottom: 10 }}>
            <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>Send Verification Code</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </Fragment >
  )
}

export default ForgotPasswordScreen