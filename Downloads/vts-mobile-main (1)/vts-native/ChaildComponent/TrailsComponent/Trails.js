import React, { lazy, Fragment } from 'react';
import { useState } from 'react';
import qs from 'qs'
import { View, Text, TouchableOpacity, } from 'react-native';
import { LayoutAnimation, UIManager, Platform, StyleSheet, Modal } from 'react-native';
import { Pressable, ActivityIndicator } from 'react-native';
import { Select, CheckIcon, Input, Icon, } from 'native-base'
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AndroidDateInputMode, AndroidPickerMode, MaterialDatetimePickerAndroid, AndroidDatePickerType, } from 'react-native-material-datetime-picker';

import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';

import ComponentLoadable from '../../Suspense_Component/ComponentLoadable';
import moment from 'moment';
const TrailsMap = ComponentLoadable(lazy(() => import('./TrailsCom/TrailsMap')));

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const Trails = ({ trailsMapShow, setTrailsMapShow, itemObject, setItemObject, trailsData, setTrailsData, value, setValue, fromDate, setFromDate, toDate, setToDate, onResetFunc, isDays, setIsDays }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [searchValue, setSearchValue] = useState('')
  const [deviceData, setGetDeviceData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [errorMsg, setErrorMsg] = useState('Data Fetching Failed');
  const [alertVisible, setAlertVisible] = useState(false);
  const [device, setDevice] = useState(false);
  const [date, setDate] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  const onCHangeDevice = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Device: Text });
      setDevice(false);
      setSearchValue('')
    } else {
      setValue({ ...value, Device: Text });
      setDevice(false)
    };
  }
  const onCHangeDate = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Date: Text });
      setDate(false);
    } else {
      setValue({ ...value, Date: Text });
      setDate(false)
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
    if (checkStringNullEmpty(value?.Device)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDevice(true)
    }
    if (checkStringNullEmpty(value?.Date)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDate(true)
    }
  };

  var data = qs.stringify({
    deviceId: value.Device,
    from: fromDate,
    to: toDate
  })

  let timeout = null;
  const showAlert = () => {
    LayoutAnimation.easeInEaseOut()
    setAlertVisible(true)
    if (timeout) { clearTimeout(timeout) }
    timeout = setTimeout(() => {
      LayoutAnimation.easeInEaseOut()
      setAlertVisible(false)
    }, 3000);
  }

  const onSubmit = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    validate();
    if (validation === '') {
      if (isDays === false) {
        setApiLoading(true)
        await ApiRequestAuthorizationHook.get(`/reports/trips/?${data}`, { signal: signal })
          .then(function (response) {
            if (response.status === 200) {
              setTrailsData(response?.data?.data);
              setTrailsMapShow(true);
            } else {

            }
          }).catch(function (error) {
            console.log('error', error)
            showAlert();
          })
          .finally(function () {
            setApiLoading(false)
          })
      }
    }

    return () => {
      controller.abort();
    };
  }

  const onDoneDate = (e) => {
    setFromDate(e.fromDate)
    setToDate(e.toDate)
    onCHangeDate(moment(e?.fromDate)?.format("DD/MM/YYYY") + ' ' + '-' + ' ' + moment(e?.toDate)?.format("DD/MM/YYYY"))
    days_between(e.fromDate, e.toDate)
  }

  function days_between(date1, date2) {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date1 - date2);
    const totalDays = Math.round(differenceMs / ONE_DAY)
    if (totalDays > 30) {
      setIsDays(true)
    } else {
      setIsDays(false)
    }
  }

  const getDataDevice = async () => {
    setLoader(true)
    await ApiRequestAuthorizationHook.get(`/devices`)
      .then(function (ress) {
        if (ress.status === 200) {
          setGetDeviceData(ress?.data?.data)
          setLoader(false)
        }
      })
      .catch(function (err) {
        console.log('get device data', err)
        setLoader(false)
      })
  }

  const handleShowDateRangePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: fromDate,
      titleText: 'Select duration',
      mode: AndroidPickerMode.DATE,
      startDate: fromDate,
      endDate: toDate,
      maximumDate: new Date(),
      positiveButtonText: 'OK',
      negativeButtonText: 'Cancel',
      fullscreen: true,
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.RANGE,
      onConfirmDateRange: (fromDate, toDate) => {
        onDoneDate({ fromDate, toDate })
      },
    });
  };

  const searchDeviceData = deviceData?.filter(
    DeviceItem => {
      return (
        DeviceItem
          .name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
  );

  return (
    <>
      <Modal visible={apiLoading} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#353232d1', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator color={'#63ce78'} size={'large'} />
        </View>
      </Modal>

      <View style={{ paddingBottom: 40 }}>
        <Fragment>
          <View style={[styles.alert, !alertVisible && { height: 0, marginTop: -1 }]}>
            <Text style={styles.msg} numberOfLines={5}>{errorMsg}</Text>
          </View>

          {trailsMapShow ?
            <TrailsMap onResetFunc={onResetFunc} itemObject={itemObject} setItemObject={setItemObject} trailsData={trailsData} />
            :
            <>
              <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10, paddingBottom: 20, }}>
                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >DEVICE</Text>
                  <Select mode={'modal'} onOpen={() => searchDeviceData?.length === 0 ? getDataDevice() : null} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} placeholderTextColor={'#7D8EAB'} borderWidth={0} selectedValue={value?.Device} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
                    bg: "#f4f4fd",
                    endIcon: <CheckIcon size="5" />
                  }} _light={{
                    bg: "#f4f4fd"
                  }} _dark={{
                    bg: "coolGray.800"
                  }} onValueChange={itemValue => onCHangeDevice(itemValue)}
                    _actionSheetBody={{
                      ListHeaderComponent:
                        <View>
                          {loader === true ?
                            <ActivityIndicator color={'#63ce78'} size={'large'} />
                            :
                            <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#7D8EAB' }}>
                              <Input
                                placeholder="Search here"
                                type='text'
                                // value={searchValue}
                                // onChangeText={(value) => {
                                //   setSearchValue(value);
                                // }}
                                onSubmitEditing={(Text) => setSearchValue(Text?.nativeEvent?.text)}
                                variant={'unstyled'}
                                //InputRightElement={<Icon as={<MaterialIcons name="clear" onPress={() => setSearchValue('')} />} size={6} mr="2" color="#7D8EAB" />}
                                InputRightElement={
                                  <Icon as={
                                    <TouchableOpacity onPress={() => setSearchValue('')} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4646F2' }}>
                                      <MaterialIcons name="clear" size={20} color={'#FFFFFF'} />
                                    </TouchableOpacity>
                                  } />
                                }
                                placeholderTextColor={'#7D8EAB'}
                                style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }}
                              />
                            </Pressable>
                          }
                        </View>,
                      ListEmptyComponent:
                        <View>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>No Options</Text>
                        </View>,
                    }}
                  >
                    {loader ?
                      <View>
                        <ActivityIndicator color={'#63ce78'} size={'large'} />
                      </View>
                      :
                      searchDeviceData?.map((value, id) => (
                        <Select.Item key={id} style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} shadow={2} label={value?.name} value={value?.id.toString()} />
                      ))}
                  </Select>
                  {device ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Device is required</Text>
                    </View>
                    : null
                  }
                </View>
                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Date</Text>
                  <Pressable onPress={handleShowDateRangePicker} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
                    <Input w={{
                      base: "100%",
                      md: "100%"
                    }} editable={false} value={value.Date} onChangeText={(Text) => onCHangeDate(Text)} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} InputRightElement={<Icon as={<Feather name="calendar" />} size={5} mr="2" color="#69748C" />} placeholderTextColor={'#7D8EAB'} placeholder="Select Date Range" />
                  </Pressable>
                  {date ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Date is required</Text>
                    </View>
                    : null
                  }
                  {isDays === true ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Select 30 days difference between from and to date</Text>
                    </View>
                    : null
                  }
                </View>
                <Pressable onPress={() => onSubmit()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, }}>
                  <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Track</Text>
                </Pressable>
              </View>
            </>
          }
        </Fragment >
      </View>
    </>
  )
}

export default Trails;



const styles = StyleSheet.create({
  alert: {
    //position: 'absolute',
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
})