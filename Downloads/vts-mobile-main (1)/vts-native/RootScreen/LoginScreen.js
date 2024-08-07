import React, { useContext, useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { Image, StatusBar, Pressable, BackHandler, View, Modal, TouchableOpacity, ActivityIndicator, UIManager, Platform, StyleSheet, ScrollView, } from 'react-native';
import { Text, Center, Input, Icon } from 'native-base';
import qs from 'qs'
import { AuthContext } from '../Context/context';
import AsyncStorage from '@react-native-community/async-storage';
import imagePath from '../constants/imagePath';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignInLoader from '../Suspense_Component/SignInLoader';
import { useHeader } from '../ApiHeader';
import { BlurView, } from "@react-native-community/blur";


if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const LoginScreen = ({ navigation }) => {
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [emailId, setEmailId] = useState(false);
  const [password, setPassword] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false)
  const [loader, setLoader] = useState(false);
  const [recaptchaVerify, setRecaptchaVerify] = useState(false);
  const [confirmVerify, setConfirmVerify] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordEyeIcon, setPasswordEyeIcon] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [iconColor, setIconColor] = useState({ emailIconColor: '#7D8EAB', passwordIconColor: '#7D8EAB' })
  const { ApiPostUrl } = useHeader();
  const MAX_LOGIN_ID_LENGTH = 50;
  const MAX_PASSWORD_LENGTH = 50;
  const [value, setValue] = useState({
    EmailId: '',
    Password: ''
  });

  const onChangeEmailId = (text) => {
    const trimmedText = text.trim().slice(0, MAX_LOGIN_ID_LENGTH);
    setValue((prevValue) => ({ ...prevValue, EmailId: trimmedText }));
    setEmailId(false);
    setIconColor((prevIconColor) => ({
      ...prevIconColor,
      emailIconColor: trimmedText.length !== 50 ? '#252F40' : '#7D8EAB'
    }));
  };
  
  const onChangePassword = (text) => {
    const trimmedText = text.trim().slice(0, MAX_PASSWORD_LENGTH);
    passwordProperty(trimmedText);
    setValue((prevValue) => ({ ...prevValue, Password: trimmedText }));
    setPassword(false);
    setIsPasswordValid(trimmedText.length < 10);
  };

  const passwordProperty = (Text) => {
    if (Text.trim().length !== 0) {
      setPasswordEyeIcon(true);
      setIconColor({ ...iconColor, passwordIconColor: '#252F40' })
    } else {
      setPasswordEyeIcon(false);
      setIconColor({ ...iconColor, passwordIconColor: '#7D8EAB' })
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
    if (checkStringNullEmpty(value?.EmailId)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setEmailId(true)
    }
    if (checkStringNullEmpty(value?.Password)) {
      validationuser += '<li>Enter Your Confrim Password</li>';
      setPassword(true)
    }
  }

  const { toggleRoute } = useContext(AuthContext);

  var data = qs.stringify({
    email: value?.EmailId,
    password: value?.Password
  });

  const onSignIn = async () => {
    if (confirmVerify === true) {
      setLoader(true)
      await ApiPostUrl.post(`/session`, data)
        .then(function (response) {
          if (response.status === 200) {
            AsyncStorage.setItem('userToken', response?.data?.token);
            AsyncStorage.setItem('userType', JSON.stringify(response?.data?.user));
            AsyncStorage.setItem('userLoginData', JSON.stringify({ userId: response?.data?.user?.id, email: value.EmailId, password: value.Password }));
            AsyncStorage.setItem('userRoleData', JSON.stringify(response?.data?.user_role?.roles));
            toggleRoute();
          }
        })
        .catch(function (error) {
          if (error.response?.status === 401) {
            setCustomModal({ ...customModal, modal: true, message: `Login Failed, ${error.response?.data?.errMessage}`, status: 0 })
          } else {
            setCustomModal({ ...customModal, modal: true, message: 'Login Failed, Try again', status: 0 })
          }
        })
        .finally(function () {
          setLoader(false)
        })
    } else {
      setCaptchaValid(true)
    }
  };

  const onSubmit = async () => {
    validateuser();
    if (validationuser === '') {
      if (isPasswordValid === false) {
        onSignIn();
      }
    }
  }

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  const onVerify = () => {
    setRecaptchaVerify(true)
    setTimeout(() => {
      setConfirmVerify(true)
      setCaptchaValid(false)

      setTimeout(() => {
        setRecaptchaVerify(false)
        setConfirmVerify(false)
        setCaptchaValid(true)
      }, 50000)
    }, 2000)


  }

  const onRoute = () => {
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  return (
    <>
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
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar barStyle='dark-content' backgroundColor="#ededfc" style={{ backgroundColor: '#ededfc' }} />
      <SignInLoader loader={loader} />
      <Animatable.View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededfc', flex: 1, paddingHorizontal: 20, }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', /* alignItems: 'center' */ }}>
          <View style={{ alignItems: "center", }}>
            <Center style={{ width: 130, height: 130, backgroundColor: '#dbdbfa', borderRadius: 70, elevation: .5 }}>
              <Image source={imagePath.vtsLogo} style={{ width: 135, height: 135, marginTop: -20 }} resizeMode='contain' />
            </Center>
            <View style={{ paddingTop: 15 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>Vehicle Tracking System</Text>
              <Text style={{ paddingTop: 1, textAlign: 'center', fontSize: 14, color: '#7D8EAB', fontFamily: 'OpenSans-Regular' }}>Transport Department, Chhattisgarh</Text>
            </View>
          </View>
          <View style={{ paddingTop: 15 }}>
            <View>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', paddingBottom: 5 }}>Email</Text>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                <Input w={{
                  base: "100%",
                  md: "100%"
                }} placeholderTextColor={'#7D8EAB'} autoCapitalize='none' keyboardType='email-address' value={value.EmailId} onChangeText={(Text) => onChangeEmailId(Text)} variant="unstyled" borderWidth={0} InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-outline" />} size={5} ml="2" color={iconColor.emailIconColor} />} style={{ fontFamily: 'OpenSans-Regular', fontSize: 14 }} placeholder="Enter email address" />
              </View>
              {emailId ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Username is required</Text>
                </Animatable.View>
                : null
              }
            </View>
          </View>
          <View style={{ paddingTop: 15 }}>
            <View>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000', paddingBottom: 5 }}>Password</Text>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                <Input w={{
                  base: "100%",
                  md: "100%"
                }}
                  placeholderTextColor={'#7D8EAB'}
                  value={value.Password}
                  onChangeText={(Text) => onChangePassword(Text)}
                  type={passwordVisible ? 'text' : "password"}
                  variant="unstyled"
                  borderWidth={0}
                  InputLeftElement={<Icon as={<SimpleLineIcons name="lock" />} size={5} ml="2" color={iconColor.passwordIconColor} />}
                  InputRightElement={<Icon as={<Pressable onPress={() => setPasswordVisible(passwordVisible => !passwordVisible)} style={{ alignItems: 'center', justifyContent: 'center', width: 35, }}><Ionicons name={passwordVisible ? "eye-outline" : "eye-off-outline"} color={"#67748E"} size={20} /></Pressable>} size={5} mr="2" color="#7D8EAB" />} style={{ fontFamily: 'OpenSans-Regular', fontSize: 14 }} placeholder="Enter password" />
              </View>
              {password ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Password is required</Text>
                </Animatable.View>
                : null
              }
              {isPasswordValid ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Password must be 10 characters long.</Text>
                </Animatable.View>
                : null
              }
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
            <View style={{ flexGrow: 1 }} />
            <Pressable onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Forgot password ?</Text>
            </Pressable>
          </View>

          <View style={{ backgroundColor: '#f9f9f9', height: 80, borderWidth: 1, borderColor: '#c1c1c1', width: '100%', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, marginTop: 10 }}>
            <Center style={{ width: 40, height: 40, }}>
              {recaptchaVerify ?
                confirmVerify ?
                  <Animatable.View animation='zoomIn' duration={100}>
                    <Feather name='check' color={'#28a935'} size={30} />
                  </Animatable.View>
                  :
                  <ActivityIndicator color={'#28a935'} size="large" />
                :
                <Pressable
                  onPress={() => onVerify()}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: '#ffffff',
                    borderWidth: 2,
                    borderColor: '#c1c1c1',
                  }}
                ></Pressable>
              }
            </Center>
            <Text style={{ fontSize: 16, paddingLeft: 5 }}>I'm not a robot</Text>
            <View style={{ flexGrow: 1 }} />
            <Center style={{}}>
              <Image source={imagePath.gCaptchaV2} style={{ width: 30, height: 30 }} />
              <View style={{}}>
                <Text style={{ fontSize: 13, textAlign: 'center', color: '#555555' }}>reCaptcha</Text>
                <Text style={{ fontSize: 9, textAlign: 'center', color: '#555555', position: 'absolute', top: 12 }}>Privacy- Terms</Text>
              </View>
            </Center>
          </View>

          {captchaValid ?
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: 'red', textAlign: 'left' }}>Please check the box above to proceed.</Text>
            </Animatable.View>
            :
            null
          }

          <TouchableOpacity activeOpacity={0.80} onPress={() => onSubmit()} style={[styles.LoginButton, { width: '100%', marginTop: 30 }]}>
            <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>Login</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>
            <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Not registered yet ? </Text>
            <Pressable onPress={() => navigation.navigate('UserTypeScreen')}>
              <Text style={{ color: '#4646F2', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Register now</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Animatable.View>
    </>
  )
}

export default LoginScreen;


const styles = StyleSheet.create({
  LoginButton: {
    backgroundColor: '#4646f2',
    width: '100%',
    borderRadius: 2,
    padding: 13,
  },
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
});
