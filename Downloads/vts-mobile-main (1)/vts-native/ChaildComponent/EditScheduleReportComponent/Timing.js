import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { RadioButton } from 'react-native-paper';
import { Select, CheckIcon, Input, Icon, } from 'native-base'
import { Col, Row } from 'react-native-responsive-grid-system';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-community/async-storage';
import { useRoute } from '@react-navigation/native';
import {
  AndroidDateInputMode,
  AndroidPickerMode,
  MaterialDatetimePickerAndroid,
  AndroidDatePickerType,
} from 'react-native-material-datetime-picker';
import { useHeader } from '../../ApiHeader';

const Timing = ({ setGeneralinfoActive, setTimingActive, setGeneralinfoView, setTimingView, navigation }) => {
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [loader, setLoader] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [generalData, setGeneralData] = useState({})
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [date, setDate] = useState(false);
  const [selectFormat, setSelectFormat] = useState(false);
  const [frequency, setFrequency] = useState(false);
  const [day, setDay] = useState(false);
  const [value, setValue] = useState({
    Date: '',
    SelectFormat: '',
    Frequency: '',
    Day: '',
    createdon: ''
  });

  const onChangeDate = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Date: Text });
      setDate(false);
    } else {
      setValue({ ...value, Date: Text });
      setDate(false)
    };
  }
  const onChangeSelectFormat = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, SelectFormat: Text });
      setSelectFormat(false);
    } else {
      setValue({ ...value, SelectFormat: Text });
      setSelectFormat(false)
    };
  }
  const onChangeFrequency = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Frequency: Text });
      setFrequency(false);
    } else {
      setValue({ ...value, Frequency: Text });
      setFrequency(false)
    };
  }
  const onChangeDay = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Day: Text });
      setDay(false);
    } else {
      setValue({ ...value, Day: Text });
      setDay(false)
    };
  }

  const onDoneDate = (e) => {
    setFromDate(e.fromDate)
    setToDate(e.toDate)
    onChangeDate(e.fromDate.toDateString() + ' ' + '-' + ' ' + e.toDate.toDateString())
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
    if (checkStringNullEmpty(value.Date)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDate(true)
    }
    if (checkStringNullEmpty(value.SelectFormat)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSelectFormat(true)
    }
    if (checkStringNullEmpty(value.Frequency)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setFrequency(true)
    }
    if (checkStringNullEmpty(value.Day)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDay(true)
    }
  };

  var reportObj = JSON.stringify({
    id: generalData?.id,
    reporttype: generalData?.ReportType,
    groupid: generalData?.Group,
    vehicleno: generalData?.Vehicle,
    email: generalData?.EmailId,
    emailsubject: generalData?.EmailSubject,
    reportfrom: fromDate,
    reportto: toDate,
    report_period: value?.Frequency,
    day: value?.Day,
    format: value?.SelectFormat,
    createdon: value?.createdon,
  })

  const onNexnt = async () => {
    validate();
    if (validation === '') {
      setLoader(true);
      await ApiRequestAuthorizationHook.put(`/report_schedules/${generalData?.id}`, reportObj)
        .then(function (ress) {
          if (ress.status === 200) {
            setLoader(false);
            setCustomModal({ ...customModal, modal: true, message: 'Reports Schedule updated successfully', status: 1 })
          }
        })
        .catch(function (err) {
          console.log('Reports Schedule', err)
          setLoader(false);
          setCustomModal({ ...customModal, modal: true, message: 'Failed to updated Reports Schedule', status: 0 })
        })
    }
  }

  useEffect(() => {
    const getData = async () => {
      const result = await AsyncStorage.getItem('GeneralData')
      const JSONObj = JSON.parse(result)
      setGeneralData(JSONObj)
    }
    getData();
  }, [])

  const getReportTyper = async () => {
    await ApiRequestAuthorizationHook.get(`/report_schedules/${location?.params?.schedule_id}`)
      .then(function (ress) {
        console.log(ress.data)
        setValue({
          Date: new Date(ress?.data?.reportfrom).toDateString() + ' ' + '-' + ' ' + new Date(ress?.data?.reportto).toDateString(),
          SelectFormat: ress?.data?.format,
          Frequency: ress?.data?.report_period?.toString(),
          Day: ress?.data?.day?.toString(),
          createdon: ress?.data?.createdon
        })
        setFromDate(ress?.data?.reportfrom === null ? new Date() : new Date(ress?.data?.reportfrom))
        setToDate(ress?.data?.reportto === null ? new Date() : new Date(ress?.data?.reportto))
      })
      .catch(function (err) {

      })
  }

  const onRoute = () => {
    setGeneralinfoView(false)
    setTimingView(true)
    setGeneralinfoActive(true)
    setTimingActive(true)
    navigation.goBack()
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  useEffect(() => {
    getReportTyper();
  }, [])

  const handleShowDateRangePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: new Date(),
      titleText: 'Select duration',
      mode: AndroidPickerMode.DATE,
      startDate: fromDate,
      endDate: toDate,
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

  return (
    <Fragment>
      <Modal isVisible={customModal.modal} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>TrackoLet</Text>
          <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
          <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
            <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal isVisible={loader}>
        <ActivityIndicator color={'#63CE78'} size={'large'} />
      </Modal>

      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10 }}>
        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Date</Text>
          <Pressable onPress={handleShowDateRangePicker} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
            <Input w={{
              base: "100%",
              md: "100%"
            }} placeholderTextColor={'#67748E'} value={value.Date} editable={false} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} InputRightElement={<Icon as={<Feather name="calendar" />} size={5} mr="2" color="#67748E" />} placeholder="Date range" />
          </Pressable>
          {date ?
            <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Date is required</Text>
            : null
          }
        </View>

        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Select Format</Text>
          <Select style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} borderWidth={0} selectedValue={value.SelectFormat} minWidth="200" accessibilityLabel="Select Foramt" placeholderTextColor={'#67748E'} placeholder="Select Format" _selectedItem={{
            bg: "#f4f4fd",
            endIcon: <CheckIcon size="5" />
          }} _light={{
            bg: "#f4f4fd"
          }} _dark={{
            bg: "coolGray.800"
          }} onValueChange={itemValue => onChangeSelectFormat(itemValue)}>
            <Select.Item shadow={2} label="PDF" value="pdf" />
            <Select.Item shadow={2} label="Excel Sheet" value="xlsx" />
          </Select>
          {selectFormat ?
            <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Format is required</Text>
            : null
          }
        </View>

        <View style={{ paddingTop: 15 }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Frequency</Text>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
            {[{ id: 7, value: 'Weekly' }, { id: 14, value: 'Biweekly' }, { id: 30, value: 'Monthly' }].map((data, id) => (
              <View key={id} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                <RadioButton
                  color='blue'
                  value={value.Frequency}
                  uncheckedColor='#2E2C33'
                  status={value.Frequency === data.id.toString() ? 'checked' : 'unchecked'}
                  onPress={() => onChangeFrequency(data.id.toString())}
                />
                <Text style={{ color: '#67748E', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>{data.value}</Text>
              </View>
            ))}
          </View>
          {frequency ?
            <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Frequency is required</Text>
            : null
          }
        </View>

        <View style={{ paddingTop: 15 }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Day</Text>
          <Row>
            {[
              { id: 1, value: 'Mon' },
              { id: 2, value: 'Tue' },
              { id: 3, value: 'Wed' },
              { id: 4, value: 'Thu' },
              { id: 5, value: 'Fri' },
              { id: 6, value: 'Sat' },
              { id: 7, value: 'Sun' },
            ].map((data, id) => (
              <Col key={id} xs={3} sm={3} md={3} lg={3}>
                <View style={{ marginLeft: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                  <RadioButton
                    color='blue'
                    uncheckedColor='#2E2C33'
                    value={value.Day}
                    status={value.Day === data.id.toString() ? 'checked' : 'unchecked'}
                    onPress={() => onChangeDay(data.id.toString())}
                  />
                  <Text style={{ color: '#67748E', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>{data.value}</Text>
                </View>
              </Col>
            ))}
          </Row>
          {day ?
            <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Day is required</Text>
            : null
          }
        </View>
      </View>
      <Pressable onPress={() => onNexnt()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15, marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Edit Schedule</Text>
      </Pressable>
    </Fragment>
  )
}

export default Timing