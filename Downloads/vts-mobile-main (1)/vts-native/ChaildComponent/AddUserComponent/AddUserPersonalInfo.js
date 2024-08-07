import React, { Fragment, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Select, CheckIcon } from 'native-base';
import { useEffect } from 'react';
import { useHeader } from '../../ApiHeader';

const AddUserPersonalInfo = ({ setAddUserPersonalInfoView, setAddUserSettingsView, setAddUserPersonalInfoActive, setAddUserSettingsActive, setAddUserPermissionView, setAddUserPermissionActive }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [roleData, setRoleData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState(false);
  const [phone, setPhone] = useState(false);
  const [emailAddress, setEmailAddress] = useState(false);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [role, setRole] = useState(false);
  const [value, setValue] = useState({
    Name: '',
    Phone: '',
    EmailAddress: '',
    Role: '',
    Password: '',
    ConfirmPassword: ''
  });


  const onChangeName = (Text) => {
    if (Text?.trim().length >= 0) {
      setValue({ ...value, Name: Text });
      setName(false);
    } else {
      setValue({ ...value, Name: Text });
      setName(false)
    };
  };
  const onChangePhone = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Phone: Text });
      setPhone(false);
    } else {
      setValue({ ...value, Phone: Text });
      setPhone(false)
    };
  };
  const onChangeEmailAddress = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, EmailAddress: Text });
      setEmailAddress(false);
    } else {
      setValue({ ...value, EmailAddress: Text });
      setEmailAddress(false)
    };
  };
  const onChangeRole = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Role: Text });
      setRole(false);
    } else {
      setValue({ ...value, Role: Text });
      setRole(false)
    };
  };
  const onChangePassword = (Text) => {
    let check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,25}$/;
    if (Text.trim().length >= 0) {
      if (Text.match(check)) {
        setValue({ ...value, Password: Text });
        setPassword(false);
      } else {
        setValue({ ...value, Password: Text });
        setPassword(true);
      }
    } else {
      setValue({ ...value, Password: Text });
      // setPassword(false)
    };
  };
  const onChangeConfirmPassword = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, ConfirmPassword: Text });
      setConfirmPassword(false);
    } else {
      setValue({ ...value, ConfirmPassword: Text });
      // setConfirmPassword(false)
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
    if (checkStringNullEmpty(value.Name)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setName(true)
    }
    if (checkStringNullEmpty(value.Phone)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setPhone(true)
    }
    if (checkStringNullEmpty(value.EmailAddress)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setEmailAddress(true)
    }
    if (checkStringNullEmpty(value.Role)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setRole(true)
    }
    if (checkStringNullEmpty(value.Password)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setPassword(true)
    }
    if (checkStringNullEmpty(value.ConfirmPassword)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setConfirmPassword(true)
    }
    if (checkStringNullEmpty(value.ConfirmPassword === value.Password)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSamePassword(true)
    }
  };

  const onNexnt = async () => {
    validate();
    if (validation === '') {
      if (value.ConfirmPassword === value.Password) {
        setAddUserPersonalInfoView(false)
        setAddUserSettingsView(true)
        setAddUserPersonalInfoActive(true)
        setAddUserSettingsActive(true)
        setAddUserPermissionView(false)
        setAddUserPermissionActive(false)
        await AsyncStorage.setItem('UserPersonalInfo', JSON.stringify(value))
      } else {

      }
    }
  }

  useEffect(() => {
    if (value.ConfirmPassword === value.Password) {
      setSamePassword(false)
    } else {
      setSamePassword(true)
    }
  }, [value.ConfirmPassword])

  const getRoleData = async () => {
    setLoader(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/user_roles`, { signal: signal })
      .then(function (res) {
        setRoleData(res?.data?.data)
      })
      .catch(function (err) {
        console.log(err)
        setLoader(false)
      })
      .finally(() => {
        setLoader(false)
      })
    return () => {
      controller.abort();
    };
  }

  const roleDataList = roleData.map((value) => ({ id: value.id, rolename: value.rolename }));

  return (
    <Fragment>
      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10 }}>
        <View>
          <Text style={{ color: '#000000', fontSize: 14, fontFamily: 'OpenSans-Bold' }} >Personal Information</Text>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Name</Text>
            <Input placeholderTextColor={'#7D8EAB'} value={value.Name} onChangeText={(Text) => onChangeName(Text)} variant={'unstyled'} w={'100%'} placeholder='Enter Name' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {name ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Name  is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Phone</Text>
            <Input placeholderTextColor={'#7D8EAB'} maxLength={10} value={value.Phone} onChangeText={(Text) => onChangePhone(Text)} keyboardType='number-pad' variant={'unstyled'} w={'100%'} placeholder='10 Digit Mobile No.' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {phone ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Phone is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Email Address</Text>
            <Input placeholderTextColor={'#7D8EAB'} value={value.EmailAddress} autoCapitalize="none" onChangeText={(Text) => onChangeEmailAddress(Text)} keyboardType='email-address' variant={'unstyled'} w={'100%'} placeholder='Enter Email Address' style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', marginTop: 5, backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, }} />
            {emailAddress ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Email Address is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 5 }} >Role</Text>
            <Select onOpen={() => roleDataList?.length === 0 ? getRoleData() : null} placeholderTextColor={'#7D8EAB'} style={{ color: '#252F40', height: 40, backgroundColor: '#f4f4fd', fontFamily: 'OpenSans-Regular', fontSize: 14, }} borderWidth={0} selectedValue={value.Role} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
              bg: "#f4f4fd",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#f4f4fd"
            }} _dark={{
              bg: "coolGray.800"
            }}
              onValueChange={itemValue => onChangeRole(itemValue)}
              _actionSheetBody={{
                ListHeaderComponent:
                  <View>
                    {loader === true ?
                      <ActivityIndicator color={'#63ce78'} size={'large'} />
                      :
                      <View></View>
                    }
                  </View>,
                ListEmptyComponent:
                  <View>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                  </View>,
              }}
            >
              {loader ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator color={'#63CE78'} size={'large'} />
                </View>
                :
                roleDataList.map((value, id) => (
                  <Select.Item key={id} shadow={2} label={value?.rolename} value={value.id.toString()} />
                ))
              }
            </Select>
            {role ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Role  is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Password</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40 }}>
              <Input placeholderTextColor={'#7D8EAB'}
                value={value.Password}
                onChangeText={(Text) => onChangePassword(Text)}
                type={show ? "text" : "password"}
                InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShow(!show)} />}
                variant={'unstyled'}
                w={'100%'}
                placeholder='Enter Password'
                style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', }}
              />
            </View>
            {password ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Password is required, Password should be Minimum ten characters, at least one Capital letter, one number and one special character. '#' and '.' are not allowed!</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Confirm Password</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40 }}>
              <Input placeholderTextColor={'#7D8EAB'}
                value={value.ConfirmPassword}
                onChangeText={(Text) => onChangeConfirmPassword(Text)}
                type={showConfirm ? "text" : "password"}
                InputRightElement={<Icon as={<MaterialIcons name={showConfirm ? "visibility" : "visibility-off"} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShowConfirm(!showConfirm)} />}
                variant={'unstyled'}
                w={'100%'}
                placeholder='Enter Password'
                style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', }}
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

      </View>
      <Pressable onPress={() => onNexnt()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15, marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Next</Text>
      </Pressable>
    </Fragment >
  )
}

export default AddUserPersonalInfo