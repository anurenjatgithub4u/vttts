import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, ActivityIndicator, BackHandler, ToastAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Input, Icon, Select, CheckIcon, } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { AndroidDateInputMode, AndroidPickerMode, MaterialDatetimePickerAndroid, AndroidDatePickerType, } from 'react-native-material-datetime-picker';
import { Col, Row } from 'react-native-responsive-grid-system';
import QueryString from 'qs';
import { useHeader } from '../../ApiHeader';
import moment from 'moment';

const SimDetails = ({ setDeviceDetailsColor, setSimDetailsColor, setVehicleDetailsColor, setPermitHolderColor, setDeviceDetailsView, setSimDetailsView, setVehicleDetailsView, setPermitHolderView, }) => {
  const { ApiRequestAuthorizationHook, } = useHeader();
  const [date1Expiry, setDate1Expiry] = useState(new Date());
  const [date2Expiry, setDate2Expiry] = useState(new Date());
  const [simNumber1, setSimNumber1] = useState(false);
  const [onSimProvider, setOnSimProvider] = useState(false);
  const [simProvider, setSimProvider] = useState([]);
  const [loaderProvider, setLoaderProvider] = useState(true);
  const [providerLoader, setProviderLoader] = useState(false);
  const [network1, setNetwork1] = useState(false);
  const [sim1Expiry, setSim1Expiry] = useState(false);
  const [simNumber2, setSimNumber2] = useState(false);
  const [network2, setNetwork2] = useState(false);
  const [sim2Expiry, setSim2Expiry] = useState(false);
  const [validSim1, setValidSim1] = useState(false);
  const [validSim2, setValidSim2] = useState(false);
  const [value, setValue] = useState({
    SimNumber1: '',
    Network1: '',
    Sim1Expiry: '',
    SimNumber2: '',
    Network2: '',
    Sim2Expiry: '',
    simProvider: '',
    iccId: '',
    uniqueId: '',
  });

  const onChangeSimNumber1 = (Text) => {
    if (Text.trim().length >= 13) {
      setValue({ ...value, SimNumber1: Text });
      setSimNumber1(false);
      setValidSim1(false)
    } else {
      setValue({ ...value, SimNumber1: Text });
      setSimNumber1(false)
      setValidSim1(true)
    };
  }
  const onChangeNetwork1 = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Network1: Text });
      setNetwork1(false);
    } else {
      setValue({ ...value, Network1: Text });
      setNetwork1(false)
    };
  }
  const onChangeSim1Expiry = (selectDate) => {
    setDate1Expiry(selectDate)
    if (selectDate.length >= 0) {
      setValue({ ...value, Sim1Expiry: moment(selectDate).format("DD/MM/YYYY") });
      setSim1Expiry(false);
    } else {
      setValue({ ...value, Sim1Expiry: moment(selectDate).format("DD/MM/YYYY") });
      setSim1Expiry(false)
    };
  }
  const onChangeSimNumber2 = (Text) => {
    if (Text.trim().length >= 13) {
      setValue({ ...value, SimNumber2: Text });
      setSimNumber2(false);
      setValidSim2(false)
    } else {
      setValue({ ...value, SimNumber2: Text });
      setSimNumber2(false)
      setValidSim2(true)
    };
  }
  const onChangeNetwork2 = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Network2: Text });
      setNetwork2(false);
    } else {
      setValue({ ...value, Network2: Text });
      setNetwork2(false)
    };
  }
  const onChangeSim2Expiry = (selectDate) => {
    setDate2Expiry(selectDate)
    if (selectDate.length >= 0) {
      setValue({ ...value, Sim2Expiry: moment(selectDate).format("DD/MM/YYYY") });
      setSim2Expiry(false);
    } else {
      setValue({ ...value, Sim2Expiry: moment(selectDate).format("DD/MM/YYYY") });
      setSim2Expiry(false)
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
    if (checkStringNullEmpty(value?.SimNumber1)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSimNumber1(true)
    }
    if (checkStringNullEmpty(value?.Network1)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setNetwork1(true)
    }
    if (checkStringNullEmpty(value?.Sim1Expiry)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSim1Expiry(true)
    }
    if (checkStringNullEmpty(value?.SimNumber2)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSimNumber2(true)
    }
    if (checkStringNullEmpty(value?.Network2)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setNetwork2(true)
    }
    if (checkStringNullEmpty(value?.Sim2Expiry)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSim2Expiry(true)
    }

  };

  const onNexnt = async () => {
    validate();
    if (validation === '') {
      if (validSim1 === false && validSim2 === false) {
        await AsyncStorage.setItem('Sim_Details', JSON.stringify(value))
        setDeviceDetailsView(false)
        setSimDetailsView(false)
        setVehicleDetailsView(true)
        setPermitHolderView(false)

        setDeviceDetailsColor(true)
        setSimDetailsColor(true)
        setVehicleDetailsColor(true)
        setPermitHolderColor(false)
      }
    }
  }

  const minimumDate = new Date();
  minimumDate?.setDate(minimumDate?.getDate() + 1);
  const showMode1Expiry = () => {
    MaterialDatetimePickerAndroid.show({
      value: value?.Sim1Expiry === '' ? minimumDate : date1Expiry,
      titleText: 'Select date',
      mode: AndroidPickerMode.DATE,
      minimumDate: minimumDate,
      positiveButtonText: 'OK',
      negativeButtonText: 'Cancel',
      inputMode: AndroidDateInputMode.CALENDAR,
      fullscreen: false,
      type: AndroidDatePickerType.DEFAULT,
      onConfirm: (date) => {
        onChangeSim1Expiry(date)
      },
    });
  }
  const showMode2Expiry = () => {
    MaterialDatetimePickerAndroid.show({
      value: value?.Sim2Expiry === '' ? minimumDate : date2Expiry,
      titleText: 'Select date',
      minimumDate: minimumDate,
      mode: AndroidPickerMode.DATE,
      positiveButtonText: 'OK',
      negativeButtonText: 'Cancel',
      inputMode: AndroidDateInputMode.CALENDAR,
      fullscreen: false,
      type: AndroidDatePickerType.DEFAULT,
      onConfirm: (date) => {
        onChangeSim2Expiry(date)
      },
    });
  }


  const onChangeSimProvider = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, simProvider: Text });
      setOnSimProvider(false);
    } else {
      setValue({ ...value, simProvider: Text });
      setOnSimProvider(false)
    };
  }

  const simvalidate = () => {
    if (checkStringNullEmpty(value?.simProvider)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setOnSimProvider(true)
    }
  }
  const getSimProvider = async () => {
    const abortController = new AbortController();

    setLoaderProvider(true)
    await ApiRequestAuthorizationHook.get(`/sim/providers`, { signal: abortController.signal })
      .then((result) => {
        if (result?.status === 200) {
          setSimProvider(result.data)
        }
      }).catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoaderProvider(false)
      })

    return () => {
      abortController.abort();
    };
  }

  const simdata = QueryString.stringify({
    simCompany: value?.simProvider,
    iccId: value?.iccId,
    uniqueId: value?.uniqueId
  })

  const getSimProviderData = async () => {
    const abortController = new AbortController();

    simvalidate();
    if (validation === '') {
      setProviderLoader(true)
      await ApiRequestAuthorizationHook.get(`/sim/data?${simdata}`, { signal: abortController.signal })
        .then((result) => {
          if (result?.status === 200) {
            console.log(result)
          }
        }).catch((err) => {
          console.log(err.response?.data?.errMessage)
          if (err?.response?.data?.errMessage) {
            ToastAndroid.showWithGravityAndOffset(
              err.response?.data?.errMessage,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        })
        .finally(() => {
          setProviderLoader(false)
        })
    }

    return () => {
      abortController.abort();
    };
  }

  useEffect(() => {
    const getData = async () => {
      await AsyncStorage.getItem('DeviceDetails')
        .then(function (res) {
          const JSONObj = JSON.parse(res);
          setValue({
            SimNumber1: JSONObj?.simno1,
            Network1: JSONObj?.network1,
            Sim1Expiry: JSONObj?.sim1_expiry === null ? '' : moment(JSONObj?.sim1_expiry).format("DD/MM/YYYY"), // JSONObj?.sim1_expiry === undefined ? '' : `${new Date(JSONObj?.sim1_expiry).getFullYear()}-${(new Date(JSONObj?.sim1_expiry).getMonth() + 1)?.toString()?.padStart(2, "0")}-${new Date(JSONObj?.sim1_expiry).getDate()?.toString()?.padStart(2, "0")}`,
            SimNumber2: JSONObj?.simno2,
            Network2: JSONObj?.network2,
            Sim2Expiry: JSONObj?.sim2_expiry === null ? '' : moment(JSONObj?.sim2_expiry).format("DD/MM/YYYY"), // JSONObj?.sim2_expiry === undefined ? '' : `${new Date(JSONObj?.sim2_expiry).getFullYear()}-${(new Date(JSONObj?.sim2_expiry).getMonth() + 1)?.toString()?.padStart(2, "0")}-${new Date(JSONObj?.sim2_expiry).getDate()?.toString()?.padStart(2, "0")}`,
            iccId: JSONObj?.iccid,
            uniqueId: JSONObj?.uniqueId
          });
          // setDate1Expiry(new Date(JSONObj?.sim1_expiry === null ? new Date() : JSONObj?.sim1_expiry));
          // setDate2Expiry(new Date(JSONObj?.sim2_expiry === null ? new Date() : JSONObj?.sim2_expiry));
        })
        .catch(function (err) {
          console.log(err);
        })
    }
    getData();
  }, [])

  useEffect(() => {
    const backAction = () => {
      setDeviceDetailsView(true)
      setSimDetailsView(false)
      setVehicleDetailsView(false)
      setPermitHolderView(false)

      setDeviceDetailsColor(true)
      setSimDetailsColor(false)
      setVehicleDetailsColor(false)
      setPermitHolderColor(false)
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Fragment>
      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10, }}>
        <View style={{ width: '100%', paddingBottom: 15, }}>
          <Row>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >SIM Provider</Text>
              <Select onOpen={() => simProvider.length === 0 ? getSimProvider() : null} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} placeholderTextColor={'#7D8EAB'} borderWidth={0} selectedValue={value?.simProvider} minWidth="200" accessibilityLabel="Select SIM Provider" placeholder="Select SIM Provider" _selectedItem={{
                bg: "#f4f4fd",
                endIcon: <CheckIcon size="5" />
              }} _light={{
                bg: "#f4f4fd"
              }} _dark={{
                bg: "coolGray.800"
              }} onValueChange={itemValue => onChangeSimProvider(itemValue)}
                _actionSheetBody={{
                  ListEmptyComponent:
                    <View>
                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                    </View>,
                }}
              >
                {loaderProvider ?
                  <View>
                    <ActivityIndicator color={'#63ce78'} size={'large'} />
                  </View>
                  :
                  simProvider?.map((value, id) => (
                    <Select.Item style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} key={id} shadow={2} label={value?.name} value={value?.name} />
                  ))}
              </Select>
              {onSimProvider ?
                <View>
                  <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Sim Provider is required</Text>
                </View>
                : null
              }
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} ></Text>
              {providerLoader ?
                <TouchableOpacity activeOpacity={0.60} style={{ width: '100%', height: 40, backgroundColor: '#4646f2', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator color={'#63ce78'} size={'small'} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => getSimProviderData()} activeOpacity={0.60} style={{ width: '100%', height: 40, backgroundColor: '#4646f2', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Fetch Data</Text>
                </TouchableOpacity>
              }
            </Col>
          </Row>
        </View>
        <View>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold' }} >Sim 1</Text>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Sim Number 1</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input value={value.SimNumber1} maxLength={13} keyboardType='number-pad' onChangeText={(Text) => onChangeSimNumber1(Text)} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder="Enter Number" w="100%" />
            </View>
            {simNumber1 ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Sim Number 1 is required</Text>
              </View>
              : null
            }
            {validSim1 ?
              <View>
                <Text style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Enter 13 digit sim number</Text>
              </View>
              :
              null}
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Network 1</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input value={value.Network1} onChangeText={(Text) => onChangeNetwork1(Text)} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder="Enter" w="100%" />
            </View>
            {network1 ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Network 1 is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Sim 1 Expiry</Text>
            <Pressable onPress={() => showMode1Expiry()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input w={{
                base: "100%",
                md: "100%"
              }} value={value.Sim1Expiry} editable={false} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} InputRightElement={<Icon as={<Feather name="calendar" />} size={5} mr="2" color="#67748E" />} placeholderTextColor={'#7D8EAB'} placeholder="Select Date" />
            </Pressable>
            {sim1Expiry ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Sim 1 Expiry is required</Text>
              </View>
              : null
            }
          </View>
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold' }} >Sim 2</Text>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Sim Number 2</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input value={value.SimNumber2} maxLength={13} keyboardType='number-pad' onChangeText={(Text) => onChangeSimNumber2(Text)} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder="Enter Number" w="100%" />
            </View>
            {simNumber2 ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Sim Number 2 is required</Text>
              </View>
              : null
            }
            {validSim2 ?
              <View>
                <Text style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Enter 13 digit sim number</Text>
              </View>
              :
              null}
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Network 2</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input value={value.Network2} onChangeText={(Text) => onChangeNetwork2(Text)} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder="Enter" w="100%" />
            </View>
            {network2 ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Network 2 is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Sim 2 Expiry</Text>
            <Pressable onPress={() => showMode2Expiry()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input w={{
                base: "100%",
                md: "100%"
              }} value={value.Sim2Expiry} editable={false} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} InputRightElement={<Icon as={<Feather name="calendar" />} size={5} mr="2" color="#67748E" />} placeholderTextColor={'#7D8EAB'} placeholder="Select Date" />
            </Pressable>
            {sim2Expiry ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Sim 2 Expiry is required</Text>
              </View>
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

export default SimDetails;
