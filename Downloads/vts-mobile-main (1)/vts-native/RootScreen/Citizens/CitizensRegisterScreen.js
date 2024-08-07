import React, { Fragment, useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { StatusBar, View, Image, TouchableOpacity, BackHandler, ScrollView, Modal, ActivityIndicator, Platform } from 'react-native';
import { Input, Select, CheckIcon, Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'
import { Row, Col } from 'react-native-responsive-grid-system';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AndroidDateInputMode, AndroidPickerMode, MaterialDatetimePickerAndroid, AndroidDatePickerType, } from 'react-native-material-datetime-picker';
import imagePath from '../../constants/imagePath';
import { useHeader } from '../../ApiHeader';
import AsyncStorage from '@react-native-community/async-storage';
import { BlurView, } from "@react-native-community/blur";
// import DateTimePicker from "react-native-modal-datetime-picker";

const CitizensRegisterScreen = () => {
  let Navigation = useNavigation();
  const { ApiNewUser } = useHeader();
  const [loader, setLoader] = useState(false)
  const [fname, setFName] = useState(false);
  const [lname, setLName] = useState(false);
  const [phone, setPhone] = useState(false);
  const [gender, setGender] = useState(false);
  const [dob, setDob] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [date, setDate] = useState(new Date());
  const [newPasswordValid, setNewPasswordValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [phoneValid, setPhoneValid] = useState(false)
  const [validAge, setValidAge] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [passwordShow, setPasswordShow] = useState({ password: false, confirmpassword: false })
  const [value, setValue] = useState({
    FName: '',
    LName: '',
    Phone: '',
    gender: '',
    dob: '',
    email: '',
    isPublic: true,
    Password: '',
    ConfirmPassword: '',
  });

  const onChangeFName = (Text) => {
    if (Text?.trim()?.length >= 0) {
      setValue({ ...value, FName: Text });
      setFName(false);
    } else {
      setValue({ ...value, FName: Text });
      setFName(false);
    };
  };
  const onChangeLName = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, LName: Text });
      setLName(false);
    } else {
      setValue({ ...value, LName: Text });
      setLName(false)
    };
  };
  const onChangePhone = (Text) => {
    if (Text.trim().length >= 10) {
      setValue({ ...value, Phone: Text });
      setPhone(false);
      setPhoneValid(false)
    } else {
      setValue({ ...value, Phone: Text });
      setPhone(false)
      setPhoneValid(true)
    };
  };
  const onChangeGender = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, gender: Text });
      setGender(false);
    } else {
      setValue({ ...value, gender: Text });
      setGender(false)
    };
  };

  function underAgeValidate(birthday) {
    var optimizedBirthday = birthday.replace(/-/g, "/");
    var myBirthday = new Date(optimizedBirthday);
    var currentDate = new Date().toJSON().slice(0, 10) + ' 01:00:00';
    var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));
    if (myAge < 18) {
      setValidAge(true)
    } else {
      setValidAge(false)
    }
  }

  const onChangeDob = (Text) => {
    setDate(Text)
    if (Text?.length >= 0) {
      setValue({ ...value, dob: `${Text?.getDate()?.toString()?.padStart(2, "0")}/${(Text?.getMonth() + 1)?.toString()?.padStart(2, "0")}/${Text?.getFullYear()?.toString()}` });
      setDob(false);
      underAgeValidate(`${Text?.getFullYear()?.toString()}-${(Text?.getMonth() + 1)?.toString()?.padStart(2, "0")}-${Text?.getDate()?.toString()?.padStart(2, "0")}`)
    } else {
      setValue({ ...value, dob: `${Text?.getDate()?.toString()?.padStart(2, "0")}/${(Text?.getMonth() + 1)?.toString()?.padStart(2, "0")}/${Text?.getFullYear()?.toString()}` });
      setDob(false)
      underAgeValidate(`${Text?.getFullYear()?.toString()}-${(Text?.getMonth() + 1)?.toString()?.padStart(2, "0")}-${Text?.getDate()?.toString()?.padStart(2, "0")}`)
      console.log('date', aaaaaaaa); 
    };
  };

  const onChangeEmail = (Text) => {
    let check = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)
    if (Text.trim().length >= 0) {
      if (Text?.match(check)) {
        setValue({ ...value, email: Text });
        setEmailValid(false)
      } else {
        setValue({ ...value, email: Text });
        setEmailValid(true)
      }
      setEmail(false);
    } else {
      setValue({ ...value, email: Text });
      setEmail(false)
    };
  };
  const onChangePassword = (Text) => {
    let check = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*()_])[a-zA-Z0-9!@#$%^&*()_]{10,}$/);
    if (Text.trim().length !== 0) {
      if (Text.match(check)) {
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
    if (Text.trim().length !== 0) {
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
    if (checkStringNullEmpty(value?.gender)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setGender(true)
    }
    if (checkStringNullEmpty(value?.dob)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDob(true)
    }
    if (checkStringNullEmpty(value?.email)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setEmail(true)
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
  }, [value.ConfirmPassword, value?.Password])

  useEffect(() => {
    const backAction = () => {
      Navigation.goBack();
      AsyncStorage.clear();
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
    phone: '91' + value?.Phone,
    gender: value?.gender,
    dob: `${date?.getFullYear()}-${(date?.getMonth() + 1)?.toString()?.padStart(2, "0")}-${date?.getDate()?.toString()?.padStart(2, "0")}`,
    isPublic: value?.isPublic,
    email: value?.email,
    password: value?.Password,
  });

  const onSubmit = async () => {
    validate();
    if (validation === '') {
      if (emailValid !== true && phoneValid !== true && validAge !== true && newPasswordValid !== true && samePassword !== true) {
        setLoader(true)
        await ApiNewUser.get(`/user/otps?phone=${'91' + value?.Phone}`)
          .then(async function (params) {
            if (params?.status === 200) {
              await AsyncStorage.setItem('CitizensRegData', data);
              Navigation.navigate({ name: 'CitizensOtpVerifyScreen', params: { phone: '91' + value?.Phone } });
              setValue({ ...value, FName: '', LName: '', Phone: '', gender: '', dob: '', email: '', Password: '', ConfirmPassword: '', })
            }
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
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
    // Navigation.navigate('CitizensOtpVerifyScreen')
  }

  const isCalender = () => {
    MaterialDatetimePickerAndroid.show({
      value: date,
      titleText: 'Select date',
      mode: AndroidPickerMode.DATE,
      positiveButtonText: 'OK',
      negativeButtonText: 'cancel',
      inputMode: AndroidDateInputMode.CALENDAR,
      fullscreen: false,
      type: AndroidDatePickerType.DEFAULT,
      onConfirm: (date) => {
        onChangeDob(date)
      },
    });
  }

  return (
    <Fragment>
      <Modal visible={loader} transparent>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
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
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>CGVTS</Text>
            <Text style={{ color: 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
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
                    <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>First Name</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                      <Input
                        allowFontScaling={false}
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
                    <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Last Name</Text>
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
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Mobile Number</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                  <Input
                    value={value?.Phone}
                    onChangeText={(Text) => onChangePhone(Text)}
                    keyboardType='number-pad'
                    variant={'unstyled'}
                    w={'100%'}
                    maxLength={10}
                    placeholder='Enter'
                    placeholderTextColor={'#7D8EAB'}
                    // onFocus={() => onChangePhone('+91')}
                    // onBlur={() => onChangePhone('')}
                    style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}
                  />
                </View>
                {phone ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Mobile is required</Text>
                  </View>
                  : null
                }
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Gender</Text>
                <Select style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40, backgroundColor: '#e2e2fd' }} borderWidth={0} selectedValue={value?.gender} placeholderTextColor={'#7D8EAB'} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
                  bg: "#e2e2fd",
                  endIcon: <CheckIcon size="5" />
                }} _light={{
                  bg: "#e2e2fd"
                }} _dark={{
                  bg: "#e2e2fd"
                }} onValueChange={itemValue => onChangeGender(itemValue)}>
                  <Select.Item shadow={2} label="Male" value="Male" />
                  <Select.Item shadow={2} label="Female" value="Female" />
                  <Select.Item shadow={2} label="Other" value="Other" />
                </Select>
                {gender ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Gender is required</Text>
                  </View>
                  : null
                }
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Date of Birth</Text>
                <Pressable onPress={() => isCalender()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                  <Input
                    editable={false}
                    value={value?.dob}
                    onChangeText={(Text) => onChangeDob(Text)}
                    keyboardType='number-pad'
                    variant={'unstyled'}
                    w={'100%'}
                    placeholder='DD/MM/YYYY'
                    placeholderTextColor={'#7D8EAB'}
                    style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}
                    InputRightElement={<Pressable><Icon as={<Feather name={"calendar"} />} size={5} mr="2" color="#69748C" /></Pressable>}
                  />
                </Pressable>
                {dob ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Date of Birth is required</Text>
                  </View>
                  : null
                }
                {validAge ?
                  <View>
                    <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Age must be minimum of 18 years</Text>
                  </View>
                  : null
                }
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Username</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40 }}>
                  <Input
                    value={value?.email}
                    onChangeText={(Text) => onChangeEmail(Text)}
                    keyboardType='email-address'
                    variant={'unstyled'}
                    autoCapitalize={'none'}
                    w={'100%'}
                    placeholder='Enter'
                    placeholderTextColor={'#7D8EAB'}
                    style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#e2e2fd', borderRadius: 5, height: 40, }}
                  />
                </View>
                {email ?
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
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Password</Text>
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
                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Confirm Password</Text>
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
            <TouchableOpacity activeOpacity={0.80} onPress={onSubmit} style={{ width: '100%', marginTop: 20, marginBottom: 20, backgroundColor: '#4646f2', width: '100%', borderRadius: 4, padding: 10, }}>
              <Text style={[{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }]}>Register</Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </Animatable.View>

    </Fragment >
  )
}

export default CitizensRegisterScreen