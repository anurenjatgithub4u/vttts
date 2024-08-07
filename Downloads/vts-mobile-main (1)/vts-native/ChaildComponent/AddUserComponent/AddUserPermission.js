import React, { Fragment, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Modal, } from 'react-native';
import { Input, Icon } from 'native-base';
import { Row, Col } from 'react-native-responsive-grid-system';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
import { AndroidDateInputMode, AndroidPickerMode, MaterialDatetimePickerAndroid, AndroidDatePickerType, } from 'react-native-material-datetime-picker';
import { useHeader } from '../../ApiHeader';

const AddUserPermission = ({ setAddUserPersonalInfoView, setAddUserSettingsView, navigation, setAddUserPersonalInfoActive, setAddUserSettingsActive, setAddUserPermissionView, setAddUserPermissionActive }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [user_info, setUser_info] = useState({});
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [user_setting, setUser_setting] = useState({});
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loginFrom, setLoginFrom] = useState(new Date());
  const [loginTo, setLoginTo] = useState(new Date());
  const [dateExpiration, setDateExpiration] = useState(false);
  const [deviceLimit, setDeviceLimit] = useState(false);
  const [userLimit, setUserLimit] = useState(false);
  const [value, setValue] = useState({
    DateExpiration: '',
    DeviceLimit: '',
    UserLimit: '',
    Disabled: false,
    Admin: false,
    ReadOnly: false,
    DeviceReadOnly: false,
    LimitCommands: false,
    LoginFrom: null,
    LoginTo: null
  });

  const onChangeDateExpiration = (selectDate) => {
    setDate(selectDate)
    if (selectDate.length >= 0) {
      setValue({
        ...value, DateExpiration: `${selectDate.getDate()}/${selectDate.getMonth()}/${selectDate.getFullYear()}`
      });
      setDateExpiration(false);
    } else {
      setValue({
        ...value, DateExpiration: `${selectDate.getDate()}/${selectDate.getMonth()}/${selectDate.getFullYear()}`
      });
      setDateExpiration(false)
    };
  }
  const onChangeDeviceLimit = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, DeviceLimit: Text });
      setDeviceLimit(false);
    } else {
      setValue({ ...value, DeviceLimit: Text });
      setDeviceLimit(false)
    };
  }
  const onChangeUserLimit = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, UserLimit: Text });
      setUserLimit(false);
    } else {
      setValue({ ...value, UserLimit: Text });
      setUserLimit(false)
    };
  }

  const onChangeLoginFrom = (selectTime) => {
    setLoginFrom(selectTime)
    setValue({
      ...value, LoginFrom: `${selectTime.getHours()}:${selectTime.getMinutes()}`
    });
  }

  const onChangeLoginTo = (selectTime) => {
    setLoginTo(selectTime)
    setValue({
      ...value, LoginTo: `${selectTime?.getHours()}:${selectTime?.getMinutes()}`
    });
  }

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };
  var validation = '';
  const validate = () => {
    if (checkStringNullEmpty(value.DateExpiration)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDateExpiration(true)
    }
    if (checkStringNullEmpty(value.DeviceLimit)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDeviceLimit(true)
    }
    if (checkStringNullEmpty(value.UserLimit)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setUserLimit(true)
    }
  };

  var PostObj = JSON.stringify({
    attributes: {
      notificationTokens: ""
    },
    name: user_info?.Name,
    email: user_info?.EmailAddress,
    phone: user_info?.Phone,
    readonly: value?.ReadOnly,
    administrator: value?.Admin,
    map: user_setting?.MapLayer,
    latitude: user_setting?.Latitude,
    longitude: user_setting?.Longitude,
    zoom: user_setting?.Zoom,
    twelveHourFormat: user_setting?.Hour_24_format,
    coordinateFormat: user_setting?.CoordinateFormate,
    disabled: value?.Disabled,
    expirationTime: date,
    deviceLimit: value?.DeviceLimit,
    userLimit: value?.UserLimit,
    deviceReadonly: value?.DeviceReadOnly,
    limitCommands: value?.LimitCommands,
    poiLayer: user_setting?.Layer,
    disableReports: value?.Disabled,
    roleid: user_info?.Role,
    password: user_info?.Password,
    createdon: new Date(),
  })

  const onNexnt = async () => {
    validate();
    if (validation === '') {
      setLoader(true)
      await ApiRequestAuthorizationHook.post(`/users`, PostObj)
        .then(function (res) {
          if (res.status === 200) {
            setLoader(false);
            setCustomModal({ ...customModal, modal: true, message: 'User Created Successfully', status: 1 })
          }
        })
        .catch(function (err) {
          console.log('err', err?.response?.data);
          setLoader(false);
          setCustomModal({ ...customModal, modal: true, message: `User Created failed ${err?.response?.data}`, status: 0 })
        })

    }
  }

  const showMode = () => {
    MaterialDatetimePickerAndroid.show({
      value: date,
      titleText: 'Select date',
      mode: AndroidPickerMode.DATE,
      positiveButtonText: 'OK',
      negativeButtonText: 'Cancel',
      inputMode: AndroidDateInputMode.CALENDAR,
      fullscreen: true,
      type: AndroidDatePickerType.DEFAULT,
      onConfirm: (date) => {
        onChangeDateExpiration(date)
      },
    });
  }

  useEffect(() => {
    const getAsyncUserSetting = async () => {
      const result = await AsyncStorage.getItem('UserSetting');
      const JSONObj = JSON.parse(result);
      setUser_setting(JSONObj)
    }
    const getAsyncUserPersonalInfo = async () => {
      const result = await AsyncStorage.getItem('UserPersonalInfo');
      const JSONObj = JSON.parse(result)
      setUser_info(JSONObj)
    }
    getAsyncUserSetting();
    getAsyncUserPersonalInfo();
  }, []);

  const onRoute = () => {
    navigation.navigate('UserRoleScreen')
    setAddUserPersonalInfoView(false);
    setAddUserSettingsView(false);
    setAddUserPermissionView(true)
    setAddUserPersonalInfoActive(true);
    setAddUserSettingsActive(true);
    setAddUserPermissionActive(true)
    AsyncStorage.removeItem('UserSetting');
    AsyncStorage.removeItem('UserPersonalInfo');
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }


  const showFrom = () => {
    MaterialDatetimePickerAndroid.show({
      value: loginFrom,
      titleText: 'Select date',
      mode: AndroidPickerMode.TIME,
      positiveButtonText: 'OK',
      negativeButtonText: 'Cancel',
      inputMode: AndroidDateInputMode.CALENDAR,
      fullscreen: false,
      type: AndroidDatePickerType.DEFAULT,
      onConfirm: (date) => {
        onChangeLoginFrom(date)
      },
    });
  }
  const showTo = () => {
    MaterialDatetimePickerAndroid.show({
      value: loginTo,
      titleText: 'Select date',
      mode: AndroidPickerMode.TIME,
      positiveButtonText: 'OK',
      negativeButtonText: 'Cancel',
      inputMode: AndroidDateInputMode.CALENDAR,
      fullscreen: false,
      type: AndroidDatePickerType.DEFAULT,
      onConfirm: (date) => {
        onChangeLoginTo(date)
      },
    });
  }

  return (
    <Fragment>

      <Modal visible={customModal.modal} transparent={true}>
        <View style={{ flex: 1, backgroundColor: '#0000ff4d', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>TrackoLet</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={loader} transparent={true}>
        <View style={{ flex: 1, backgroundColor: '#0000ff57', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={'#63CE78'} />
        </View>
      </Modal>

      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10 }}>
        <View>
          <Text style={{ color: '#000000', fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#554F60' }} >Permission</Text>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Expiration</Text>
            <Pressable onPress={showMode} style={{ backgroundColor: '#f4f4fd', height: 40, borderRadius: 5, marginTop: 10 }}>
              <Input value={value?.DateExpiration} editable={false} onChangeText={(Text) => onChangeDateExpiration(Text)} variant={'unstyled'} w={'100%'} InputRightElement={<Icon as={<Feather name={'calendar'} />} size={5} mr="2" color="#67748E" />} placeholderTextColor={'#7D8EAB'} placeholder='Select' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            </Pressable>
            {dateExpiration ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Expiration is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Device Limit</Text>
            <Input placeholderTextColor={'#7D8EAB'} value={value?.DeviceLimit} keyboardType='numeric' onChangeText={(Text) => onChangeDeviceLimit(Text)} variant={'unstyled'} w={'100%'} placeholder='Enter' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {deviceLimit ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>DeviceLimit is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>User Limit</Text>
            <Input placeholderTextColor={'#7D8EAB'} value={value?.UserLimit} keyboardType='numeric' onChangeText={(Text) => onChangeUserLimit(Text)} variant={'unstyled'} w={'100%'} placeholder='Select' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {userLimit ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>User Limit is required</Text>
              </View>
              : null
            }
          </View>

          <View style={{ paddingTop: 20 }}>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    uncheckedColor={'#554F60'}
                    color={'#4646F2'}
                    status={value?.Disabled ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setValue({ ...value, Disabled: !value?.Disabled });
                    }}
                  />
                  <Text style={{ color: '#554F60', fontSize: 12, fontFamily: 'OpenSans-SemiBold', }}>Disabled</Text>
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    uncheckedColor={'#554F60'}
                    color={'#4646F2'}
                    status={value?.Admin ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setValue({ ...value, Admin: !value?.Admin });
                    }}
                  />
                  <Text style={{ color: '#554F60', fontSize: 12, fontFamily: 'OpenSans-SemiBold', }}>Admin</Text>
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    uncheckedColor={'#554F60'}
                    color={'#4646F2'}
                    status={value?.ReadOnly ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setValue({ ...value, ReadOnly: !value?.ReadOnly });
                    }}
                  />
                  <Text style={{ color: '#554F60', fontSize: 12, fontFamily: 'OpenSans-SemiBold', }}>Read Only</Text>
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    uncheckedColor={'#554F60'}
                    color={'#4646F2'}
                    status={value?.DeviceReadOnly ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setValue({ ...value, DeviceReadOnly: !value?.DeviceReadOnly });
                    }}
                  />
                  <Text style={{ color: '#554F60', fontSize: 12, fontFamily: 'OpenSans-SemiBold', }}>Device Read Only</Text>
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    uncheckedColor={'#554F60'}
                    color={'#4646F2'}
                    status={value?.Limit ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setValue({ ...value, Limit: !value?.Limit });
                    }}
                  />
                  <Text style={{ color: '#554F60', fontSize: 12, fontFamily: 'OpenSans-SemiBold', }}>Limit Commands</Text>
                </View>
              </Col>
            </Row>
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Login From</Text>
            <Pressable onPress={showFrom} style={{ backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10 }}>
              <Input editable={false} placeholderTextColor={'#7D8EAB'} value={value?.LoginFrom} keyboardType='numeric' variant={'unstyled'} w={'100%'} placeholder='00:00' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40, }} InputRightElement={<Icon as={<Feather name={'calendar'} />} size={5} mr="2" color="#67748E" />} />
            </Pressable>
            {/* {userLimit ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Login From is required</Text>
              </View>
              : null
            } */}
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Login To</Text>
            <Pressable onPress={showTo} style={{ backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10 }}>
              <Input editable={false} placeholderTextColor={'#7D8EAB'} value={value?.LoginTo} keyboardType='numeric' variant={'unstyled'} w={'100%'} placeholder='00:00' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40, }} InputRightElement={<Icon as={<Feather name={'calendar'} />} size={5} mr="2" color="#67748E" />} />
            </Pressable>
            {/* {userLimit ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Login To is required</Text>
              </View>
              : null
            } */}
          </View>


        </View>
      </View>
      <Pressable onPress={() => onNexnt()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15, marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Create New User</Text>
      </Pressable>
    </Fragment>
  )
}

export default AddUserPermission