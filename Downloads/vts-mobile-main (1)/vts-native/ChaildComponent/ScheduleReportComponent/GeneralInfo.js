import React, { Fragment, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { Select, CheckIcon, Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { useHeader } from '../../ApiHeader';

const GeneralInfo = ({ setGeneralinfoActive, setTimingActive, setGeneralinfoView, setTimingView, navigation }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [reportType, setReportType] = useState(false);
  const [loader, setLoader] = useState(false);
  const [group, setGroup] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [emailId, setEmailId] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [emailSubject, setEmailSubject] = useState(false);
  const [getGroupData, setGetGroupData] = useState([]);
  const [getVehicleData, setGetVehicleData] = useState([]);
  const [value, setValue] = useState({
    ReportType: '',
    Group: '',
    Vehicle: '',
    EmailId: '',
    EmailSubject: ''
  })


  const onChangeReportType = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, ReportType: Text });
      setReportType(false);
    } else {
      setValue({ ...value, ReportType: Text });
      setReportType(false)
    };
  }
  const onChangeGroup = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Group: Text });
      setGroup(false);
    } else {
      setValue({ ...value, Group: Text });
      setGroup(false)
    };
  }
  const onChangeVehicle = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Vehicle: Text });
      setVehicle(false);
    } else {
      setValue({ ...value, Vehicle: Text });
      setVehicle(false)
    };
  }
  const onChangeEmailId = (Text) => {
    emailValidate(Text)
    if (Text.trim().length >= 0) {
      setValue({ ...value, EmailId: Text });
      setEmailId(false);
    } else {
      setValue({ ...value, EmailId: Text });
      setEmailId(false)
    };
  }

  const emailValidate = (Text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(Text) === false) {
      setEmailIsValid(false)
      return false;
    } else {
      setEmailIsValid(true)
    }
  }

  const onChangeEmailSubject = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, EmailSubject: Text });
      setEmailSubject(false);
    } else {
      setValue({ ...value, EmailSubject: Text });
      setEmailSubject(false)
    };
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
    if (checkStringNullEmpty(value.ReportType)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setReportType(true)
    }
    if (checkStringNullEmpty(value.Group)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setGroup(true)
    }
    if (checkStringNullEmpty(value.Vehicle)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setVehicle(true)
    }
    if (checkStringNullEmpty(value.EmailId)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setEmailId(true)
    }
    if (checkStringNullEmpty(value.EmailSubject)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setEmailSubject(true)
    }
  };

  const onNexnt = async () => {
    validate();
    if (validation === '') {
      if (emailIsValid === true) {
        await AsyncStorage.setItem('GeneralData', JSON.stringify(value))
        setGeneralinfoView(false)
        setTimingView(true)
        setGeneralinfoActive(true)
        setTimingActive(true)
      }
    }
  }

  const getReportGroup = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true)
    await ApiRequestAuthorizationHook.get(`/groups`, { signal: signal })
      .then(function (ress) {
        setGetGroupData(ress.data.data)
        setLoader(false)
      })
      .catch(function (err) {
        setLoader(false)
      })
    return () => {
      controller.abort();
    };
  }
  const getReportVehicle = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true)
    await ApiRequestAuthorizationHook.get(`/devices/vehicle`, { signal: signal })
      .then(function (ress) {
        setGetVehicleData(ress.data.data)
        setLoader(false)
      })
      .catch(function (err) {
        setLoader(false)
      })
    return () => {
      controller.abort();
    };
  }

  const newGroupData = Array.from(new Set(getGroupData.map(a => a.id)))
    .map(id => {
      return getGroupData.find(a => a.id === id)
    })
  const newVehicleData = Array.from(new Set(getVehicleData.map(a => a?.device?.id)))
    .map(id => {
      return getVehicleData.find(a => a?.device?.id === id)
    })

  return (
    <Fragment>
      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10 }}>
        <View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Report Type</Text>
            <Select style={{ height: 40, backgroundColor: '#f4f4fd', fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} placeholderTextColor={'#67748E'} borderWidth={0} selectedValue={value.ReportType} minWidth="200" accessibilityLabel="Select Report Type" placeholder="Select Report Type" _selectedItem={{
              bg: "#f4f4fd",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#f4f4fd"
            }} _dark={{
              bg: "coolGray.800"
            }} onValueChange={itemValue => onChangeReportType(itemValue)}>
              <Select.Item shadow={2} label="Route Summary Report" value="Route Summary Report" />
              <Select.Item shadow={2} label="Summary Report" value="Summary Report" />
              <Select.Item shadow={2} label="Trips Summary Report" value="Trips Summary Report" />
              <Select.Item shadow={2} label="Stops Summary Report" value="Stops Summary Report" />
              <Select.Item shadow={2} label="Events Report" value="Events Report" />
            </Select>
            {reportType ?
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Report Type is required</Text>
              : null
            }
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Group</Text>
            <Select onOpen={() => newGroupData?.length === 0 ? getReportGroup() : null} style={{ height: 40, backgroundColor: '#f4f4fd', fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} placeholderTextColor={'#67748E'} borderWidth={0} selectedValue={value.Group} minWidth="200" accessibilityLabel="Select Group" placeholder="Select Group" _selectedItem={{
              bg: "#f4f4fd",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#f4f4fd"
            }} _dark={{
              bg: "coolGray.800"
            }}
              onValueChange={itemValue => onChangeGroup(itemValue)}
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
                <View>
                  <ActivityIndicator color={'#63CE78'} size={'small'} />
                </View>
                :
                newGroupData?.map((value, id) => (
                  <Select.Item key={id} shadow={2} label={value?.name} value={value?.id.toString()} />
                ))}
            </Select>
            {group ?
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Group is required</Text>
              : null
            }
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }}>Vehicle #</Text>
            <Select onOpen={() => newVehicleData?.length === 0 ? getReportVehicle() : null} style={{ height: 40, backgroundColor: '#f4f4fd', fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} placeholderTextColor={'#67748E'} borderWidth={0} selectedValue={value.Vehicle} minWidth="200" accessibilityLabel="Select Vehicle" placeholder="Select Vehicle" _selectedItem={{
              bg: "#f4f4fd",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#f4f4fd"
            }} _dark={{
              bg: "coolGray.800"
            }}
              onValueChange={itemValue => onChangeVehicle(itemValue)}
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
                <View>
                  <ActivityIndicator color={'#63CE78'} size={'small'} />
                </View>
                :
                newVehicleData?.map((value, id) => (
                  <Select.Item key={id} shadow={2} label={value?.device?.name} value={value?.device?.name} />
                ))}
            </Select>
            {vehicle ?
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Vehicle is required</Text>
              : null
            }
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Email ID</Text>
            <Input autoCapitalize='none' variant={'unstyled'} keyboardType={'email-address'} value={value.EmailId} onChangeText={(Text) => onChangeEmailId(Text)} style={{ height: 40, backgroundColor: '#f4f4fd', fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} placeholderTextColor={'#67748E'} placeholder={'Enter Email ID'} />
            {emailId ?
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Email Id  is required</Text>
              : null
            }
            {emailIsValid === false ?
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Email Id  is not valid</Text>
              : null
            }
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Email Subject</Text>
            <Input variant={'unstyled'} value={value.EmailSubject} onChangeText={(Text) => onChangeEmailSubject(Text)} style={{ height: 40, backgroundColor: '#f4f4fd', fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} placeholderTextColor={'#67748E'} placeholder={'Enter Email Subject'} />
            {emailSubject ?
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Email Subject is required</Text>
              : null
            }
          </View>
        </View>

      </View>

      <Pressable onPress={() => onNexnt()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15, marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Next</Text>
      </Pressable>
    </Fragment>
  )
}

export default GeneralInfo