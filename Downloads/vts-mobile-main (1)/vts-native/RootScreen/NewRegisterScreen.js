import React, { Fragment, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { StatusBar, View, Image, TouchableOpacity, BackHandler, Pressable, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { Input, Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Row, Col } from 'react-native-responsive-grid-system';
import imagePath from '../constants/imagePath';
import { useHeader } from '../ApiHeader';
import AsyncStorage from '@react-native-community/async-storage';
import { BlurView, } from "@react-native-community/blur";
import Ionicons from 'react-native-vector-icons/Ionicons';

const NewRegisterScreen = () => {
  let Navigation = useNavigation();
  const { ApiNewUser } = useHeader();
  const [loader, setLoader] = useState(false)
  const [fname, setFName] = useState(false);
  const [lname, setLName] = useState(false);
  const [phone, setPhone] = useState(false);
  const [emailAddress, setEmailAddress] = useState(false);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [phoneValid, setPhoneValid] = useState(false)
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [passwordShow, setPasswordShow] = useState({ password: false, confirmpassword: false })
  const [value, setValue] = useState({
    FName: '',
    LName: '',
    EmailAddress: '',
    Phone: '',
    Password: '',
    ConfirmPassword: ''
  });

  const onChangeFName = (Text) => {
    if (Text?.trim()?.length >= 0) {
      setValue({ ...value, FName: Text });
      setFName(false);
    } else {
      setValue({ ...value, FName: Text });
      setFName(false)
    };
  };
  const onChangeLName = (Text) => {
    if (Text?.trim()?.length >= 0) {
      setValue({ ...value, LName: Text });
      setLName(false);
    } else {
      setValue({ ...value, LName: Text });
      setLName(false)
    };
  };
  const onChangePhone = (Text) => {
    if (Text?.trim()?.length >= 10) {
      setValue({ ...value, Phone: Text });
      setPhone(false);
      setPhoneValid(false)
    } else {
      setValue({ ...value, Phone: Text });
      setPhone(false)
      setPhoneValid(true)
    };
  };
  const onChangeEmailAddress = (Text) => {
    let check = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)
    if (Text?.trim()?.length >= 0) {
      if (Text?.match(check)) {
        setValue({ ...value, EmailAddress: Text });
        setEmailValid(false)
      } else {
        setValue({ ...value, EmailAddress: Text });
        setEmailValid(true)
      }
      setEmailAddress(false);
    } else {
      setValue({ ...value, EmailAddress: Text });
      setEmailAddress(false)
    };
  };
  const onChangePassword = (Text) => {
    let check = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*()_])[a-zA-Z0-9!@#$%^&*()_]{10,}$/);
    if (Text?.trim()?.length !== 0) {
      if (Text?.match(check)) {
        setValue({ ...value, Password: Text });
        setNewPasswordValid(false)
      } else {
        setValue({ ...value, Password: Text });
        setNewPasswordValid(true)
      }
      setPassword(false);
    } else {
      setValue({ ...value, Password: Text });
      setPassword(false)
    };
  };
  const onChangeConfirmPassword = (Text) => {
    if (Text?.trim()?.length !== 0) {
      setValue({ ...value, ConfirmPassword: Text });
      setConfirmPassword(false)
    } else {
      setValue({ ...value, ConfirmPassword: Text });
      setConfirmPassword(false)
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
    if (checkStringNullEmpty(value?.FName)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setFName(true)
    }
    if (checkStringNullEmpty(value?.LName)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setLName(true)
    }
    if (checkStringNullEmpty(value?.Phone)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setPhone(true)
    }
    if (checkStringNullEmpty(value?.EmailAddress)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setEmailAddress(true)
    }
    if (checkStringNullEmpty(value?.Password)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setPassword(true)
    }
    if (checkStringNullEmpty(value?.ConfirmPassword)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setConfirmPassword(true)
    }
  };
  useEffect(() => {
    if (value?.ConfirmPassword === value?.Password) {
      setSamePassword(false)
    } else {
      setSamePassword(true)
    }
  }, [value?.ConfirmPassword, value?.ConfirmPassword])

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

  const data = JSON.stringify({
    firstName: value?.FName,
    lastName: value?.LName,
    email: value?.EmailAddress,
    phone: "91" + value?.Phone,
    isPublic: false,
    password: value?.Password,
  })

  /* const onSubmit = async () => {
    validate();
    if (validation === '') {
      if (emailValid !== true && phoneValid !== true && newPasswordValid !== true && samePassword !== true) {
        setLoader(true)
        await ApiNewUser.post(`/users/register`, data)
          .then(function (ress) {
            if (ress.status === 201) {
              setLoader(false)
              setCustomModal({ ...customModal, modal: true, message: 'Registered Successfully', status: 1 })
            }
          })
          .catch(function (err) {
            console.log('register', err?.response.data)
            setLoader(false)
            if (err?.response?.data?.status === '409') {
              setCustomModal({ ...customModal, modal: true, message: err?.response?.data?.message, status: 0 })
            } else if (err?.response?.data?.status === '400') {
              setCustomModal({ ...customModal, modal: true, message: err?.response?.data?.message, status: 0 })
            } else {
              setCustomModal({ ...customModal, modal: true, message: 'Failed to Register', status: 0 })
            }
          })
          .finally(function () {
            setLoader(false)
          })
      }
    }
  } */
  const onSubmit = async () => {
    validate();
    if (validation === '') {
      if (emailValid !== true && phoneValid !== true && newPasswordValid !== true && samePassword !== true) {
        setLoader(true)
        await ApiNewUser.get(`/user/otps?phone=${'91' + value?.Phone}`)
          .then(async function (params) {
            /* if (params?.status === 200) { */
            await AsyncStorage.setItem('CitizensRegData', data);
            Navigation.navigate({ name: 'CitizensOtpVerifyScreen', params: { phone: '91' + value?.Phone } });
            setValue({ ...value, FName: '', LName: '', EmailAddress: '', Phone: '', Password: '', ConfirmPassword: '' })
            /* } */
          })
          .catch(function (params) {
            console.log(params.response)
            setCustomModal({ ...customModal, modal: true, message: 'FAILED TO SENT OTP !', status: 0 })
          })
          .finally(function () {
            setLoader(false)
          })
      }
    }
  }


  const onRoute = () => {
    // setCustomModal({ ...customModal, modal: false, message: '', status: null })
    // Navigation.navigate('LoginScreen')
  }

  return (
    <Fragment>
      <Modal visible={loader} transparent>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>

      <Modal visible={customModal.modal} transparent={true}>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>CGVTS</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar barStyle='dark-content' backgroundColor="#EBEBFB" style={{ backgroundColor: '#EBEBFB' }} />
      <Animatable.View animation="slideInRight" style={{ flex: 1, backgroundColor: '#ededfc', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
        <LinearGradient
          colors={['#EBEBFB', '#EFEFFC', '#FCFCFC']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ paddingHorizontal: 20, }}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 130, height: 130, justifyContent: 'center', alignItems: 'center', backgroundColor: '#dbdbfa', borderRadius: 70, elevation: .5 }}>
              <Image source={imagePath.vtsLogo} style={{ width: 135, height: 135, marginTop: -20 }} resizeMode='contain' />
            </View>
            <View style={{ paddingTop: 15 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: '#252F40', fontFamily: 'OpenSans-SemiBold' }}>Vehicle Tracking System</Text>
              <Text style={{ paddingTop: 1, textAlign: 'center', fontSize: 14, color: '#7D8EAB', fontFamily: 'OpenSans-Regular' }}>Transport Department, Chhattisgarh</Text>
            </View>

            <View style={{ paddingTop: 20 }}>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ paddingTop: 12 }}>
                    <Text style={{ color: '#252F40', paddingBottom: 6, fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>First Name</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                      <Input
                        value={value?.FName}
                        onChangeText={(Text) => onChangeFName(Text?.replace(/[^a-z]/gi, ''))}
                        variant={'unstyled'} w={'100%'}
                        placeholder='Enter'
                        placeholderTextColor={'#7D8EAB'}
                        style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}
                      />
                    </View>
                    {fname ?
                      <View>
                        <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Frist Name is required</Text>
                      </View>
                      : null
                    }
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ paddingTop: 12 }}>
                    <Text style={{ color: '#252F40', paddingBottom: 6, fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Last Name</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                      <Input
                        value={value?.LName}
                        onChangeText={(Text) => onChangeLName(Text?.replace(/[^a-z]/gi, ''))}
                        variant={'unstyled'} w={'100%'}
                        placeholder='Enter'
                        placeholderTextColor={'#7D8EAB'}
                        style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}
                      />
                    </View>
                    {lname ?
                      <View>
                        <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Last Name is required</Text>
                      </View>
                      : null
                    }
                  </View>
                </Col>
              </Row>

              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: '#252F40', paddingBottom: 6, fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Email</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                  <Input
                    value={value?.EmailAddress}
                    autoCapitalize="none"
                    onChangeText={(Text) => onChangeEmailAddress(Text)}
                    keyboardType='email-address'
                    variant={'unstyled'}
                    w={'100%'}
                    placeholder='Enter'
                    placeholderTextColor={'#7D8EAB'}
                    style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}
                  />
                </View>
                {emailAddress ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Email is required</Text>
                  </View>
                  : null
                }
                {emailValid ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Email is not valid</Text>
                  </View>
                  : null
                }
              </View>

              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: '#252F40', paddingBottom: 6, fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Phone</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                  <Input
                    value={value?.Phone}
                    onChangeText={(Text) => onChangePhone(Text)}
                    keyboardType='number-pad'
                    variant={'unstyled'}
                    maxLength={10}
                    w={'100%'}
                    placeholder='Enter'
                    placeholderTextColor={'#7D8EAB'}
                    style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}
                  />
                </View>
                {phone ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Phone is required</Text>
                  </View>
                  : null
                }
                {phoneValid ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Enter valid phone number</Text>
                  </View>
                  : null
                }
              </View>

              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: '#252F40', paddingBottom: 6, fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Password</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                  <Input
                    value={value?.Password}
                    onChangeText={(Text) => onChangePassword(Text)}
                    type={passwordShow?.password ? "text" : "password"}
                    variant={'unstyled'}
                    w={'100%'}
                    placeholder='Enter'
                    placeholderTextColor={'#7D8EAB'}
                    style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', }}
                    InputRightElement={<Icon as={<Pressable onPress={() => setPasswordShow({ ...passwordShow, password: !passwordShow?.password })} style={{ alignItems: 'center', justifyContent: 'center', width: 35, }}><Ionicons name={passwordShow?.password ? "eye-outline" : "eye-off-outline"} color={"#67748E"} size={20} /></Pressable>} size={5} mr="2" color="#7D8EAB" />}
                  />
                </View>
                {password ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Password is required</Text>
                  </View>
                  : null
                }
                {newPasswordValid ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 10, fontFamily: 'OpenSans-Regular' }}>minimum 10 with uppercase,lowercase,special character and number</Text>
                  </View>
                  : null
                }
              </View>


              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: '#252F40', paddingBottom: 6, fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Confirm Password</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                  <Input
                    value={value?.ConfirmPassword}
                    onChangeText={(Text) => onChangeConfirmPassword(Text)}
                    type={passwordShow?.confirmpassword ? "text" : "password"}
                    variant={'unstyled'}
                    w={'100%'}
                    placeholder='Enter'
                    placeholderTextColor={'#7D8EAB'}
                    style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', }}
                    InputRightElement={<Icon as={<Pressable onPress={() => setPasswordShow({ ...passwordShow, confirmpassword: !passwordShow?.confirmpassword })} style={{ alignItems: 'center', justifyContent: 'center', width: 35, }}><Ionicons name={passwordShow?.confirmpassword ? "eye-outline" : "eye-off-outline"} color={"#67748E"} size={20} /></Pressable>} size={5} mr="2" color="#7D8EAB" />}
                  />
                </View>
                {confirmPassword ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Confirm Password is required</Text>
                  </View>
                  : null
                }
                {samePassword ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Password not match</Text>
                  </View>
                  : null
                }
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.80} onPress={onSubmit} style={{ width: '100%', marginTop: 20, backgroundColor: '#4646f2', width: '100%', borderRadius: 4, padding: 10, }}>
              <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>Register</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 }}>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Already have an account ? </Text>
              <Pressable onPress={() => Navigation.navigate('LoginScreen')}>
                <Text style={{ color: '#4646F2', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Login</Text>
              </Pressable>
            </View>
          </ScrollView>
        </LinearGradient>
      </Animatable.View>
    </Fragment >
  )
}

export default NewRegisterScreen