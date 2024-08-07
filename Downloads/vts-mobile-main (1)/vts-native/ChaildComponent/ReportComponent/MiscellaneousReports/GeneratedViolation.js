import React, { useState, useEffect, Fragment } from 'react'
import { View, BackHandler, TouchableOpacity } from 'react-native';
import { Text, Pressable } from 'react-native';
import { ActivityIndicator, Modal, ToastAndroid } from 'react-native';
import { Input, Icon, Divider } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import QueryString from 'qs';
import { AndroidDateInputMode, AndroidPickerMode, MaterialDatetimePickerAndroid, AndroidDatePickerType, } from 'react-native-material-datetime-picker';
import moment from 'moment';
import { Row, Col } from 'react-native-responsive-grid-system';
import { useHeader } from '../../../ApiHeader';
import BlurViewScreen from '../../../BlurViewScreen';

import GeneratedViolationList from '../MiscellaneousReportsList/GeneratedViolationList';

const GeneratedViolation = ({ setToggleReport }) => {
  let Navigation = useNavigation();
  const [download, setDownload] = useState(false);
  const [customModal, setCustomModal] = useState({ message: '', DownloadDirectoryPath: null, isModal: false, status: null })
  const [fromDate, setFromDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [toggleComponent, setToggleComponent] = useState(false);
  const [trailsCount, setTrailsCount] = useState('0');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiLoad, setApiLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [loadMore, setLoadMore] = useState(false);
  const [vehicle_list, setVehicle_list] = useState([]);
  const [loader, setLoader] = useState(false)
  const { ApiRequestAuthorizationHook, ApiDownload } = useHeader();
  const [dateFrom, setDateFrom] = useState(false);
  const [dateTo, setDateTo] = useState(false);
  const [rangeTime, setRangeTime] = useState({ TimeForm: '', TimeTo: '' });
  const [value, setValue] = useState({
    DateFrom: '',
    DateTo: '',
  });

  const onDoneDateForm = (e) => {
    setFromDate(e?.Date)
    onCHangeDateForm(moment(e?.Date)?.format("DD/MM/YYYY"))
  }
  const onDoneTimeForm = (e) => {
    setFromTime(e?.Time)
    setRangeTime({ ...rangeTime, TimeForm: moment(e?.Time).format('LT') })
  }
  const onDoneDateTo = (e) => {
    setToDate(e.Date)
    onCHangeDateTo(moment(e?.Date)?.format("DD/MM/YYYY"))
  }
  const onDoneTimeTo = (e) => {
    setToTime(e?.Time)
    setRangeTime({ ...rangeTime, TimeTo: moment(e?.Time).format('LT') })
  }

  const onCHangeDateForm = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, DateFrom: Text });
      setDateFrom(false);
    } else {
      setValue({ ...value, DateFrom: Text });
      setDateFrom(false)
    };
  }
  const onCHangeDateTo = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, DateTo: Text });
      setDateTo(false);
    } else {
      setValue({ ...value, DateTo: Text });
      setDateTo(false)
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
    if (checkStringNullEmpty(value?.DateFrom)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDateFrom(true)
    }
    if (checkStringNullEmpty(value?.DateTo)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDateTo(true)
    }
  };

  var data = QueryString.stringify({
    from: `${fromDate.toISOString()}`?.split("T")[0] + 'T' + `${fromTime.toISOString()}`?.split("T")[1],
    to: `${toDate.toISOString()}`?.split("T")[0] + 'T' + `${toTime.toISOString()}`?.split("T")[1]
  })

  const onSubmit = () => {
    validate();
    if (validation === '') {
      setApiLoading(true)
      setApiLoad(true)
    }
  }

  const pageSize = 15;
  const reques = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/reports/permit/violations/generated/?${data}&currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setVehicle_list(oldArray => [...oldArray, ...response?.data?.data]);
          setTrailsCount(response.data.noRecords);
          setTotalPage(response.data.totalPage);
          setToggleComponent(true);
          setToggleReport(true)
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
        // showAlert();
        ToastAndroid.showWithGravity(
          "Data Fetching Failed",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      })
      .finally(function () {
        setLoader(false);
        setApiLoading(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    if (apiLoad === true) {
      reques();
    } else {
      setToggleComponent(false)
      setToggleReport(false)
    }
  }, [page, apiLoad]);

  const fetchMoreData = () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }

  useEffect(() => {
    const backAction = () => {
      Navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);


  const handleShowDateForm = () => {
    MaterialDatetimePickerAndroid.show({
      value: fromDate,
      titleText: 'Select Date',
      maximumDate: new Date(),
      mode: AndroidPickerMode.DATE,
      positiveButtonText: 'OK',
      negativeButtonText: 'cancel',
      fullscreen: false,
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.DEFAULT,
      onConfirm: (Date) => {
        onDoneDateForm({ Date });
        MaterialDatetimePickerAndroid.show({
          value: fromTime,
          titleText: 'Select Time',
          mode: AndroidPickerMode.TIME,
          positiveButtonText: 'OK',
          negativeButtonText: 'cancel',
          fullscreen: false,
          inputMode: AndroidDateInputMode.CALENDAR,
          type: AndroidDatePickerType.DEFAULT,
          onConfirm: (Time) => {
            onDoneTimeForm({ Time })
          },
        });
      },
    });
  };

  const handleShowDateTo = () => {
    MaterialDatetimePickerAndroid.show({
      value: toDate,
      titleText: 'Select Date',
      maximumDate: new Date(),
      mode: AndroidPickerMode.DATE,
      positiveButtonText: 'OK',
      negativeButtonText: 'cancel',
      fullscreen: false,
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.DEFAULT,
      onConfirm: (Date) => {
        onDoneDateTo({ Date })
        MaterialDatetimePickerAndroid.show({
          value: toTime,
          titleText: 'Select Time',
          mode: AndroidPickerMode.TIME,
          positiveButtonText: 'OK',
          negativeButtonText: 'cancel',
          fullscreen: false,
          inputMode: AndroidDateInputMode.CALENDAR,
          type: AndroidDatePickerType.DEFAULT,
          onConfirm: (Time) => {
            onDoneTimeTo({ Time })
          },
        });
      },
    });
  };


  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  useEffect(() => {
    setFromDate(new Date(d))
  }, [])


  const onDwonloadData = QueryString.stringify({
    from: `${fromDate.toISOString()}`?.split("T")[0] + 'T' + `${fromTime.toISOString()}`?.split("T")[1],
    to: `${toDate.toISOString()}`?.split("T")[0] + 'T' + `${toTime.toISOString()}`?.split("T")[1]
  })

  var dateDwonLoad = new Date();
  var path = RNFetchBlob.fs.dirs.DownloadDir + `/generated_report` + Math.floor(dateDwonLoad?.getTime() + dateDwonLoad?.getSeconds() / 2) + '.xlsx';

  const onDwonLoad = () => {
    setDownload(true)
    RNFetchBlob
      .config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          title: 'TrackoLet Report',
          description: 'File successfully downloaded',
          path: path,
          mime: 'application/pdf',
          mediaScannable: true,
          notification: true,
        }
      })
      .fetch('GET', `${ApiDownload.baseURL}/reports/permit/violations/generated/export?${onDwonloadData}`, {
        Authorization: ApiDownload.headers?.Authorization
      })
      .then((res) => {
        let base64Str = res.data;
        setCustomModal({ message: `File successfully downloaded`, DownloadDirectoryPath: path, isModal: true, status: 1 })
        setDownload(false)
        //RNFetchBlob.android.actionViewIntent(path, 'application/pdf')
      })
      .catch((errorMessage, statusCode) => {
        console.log('errorMessage', errorMessage);
        console.log('statusCode', statusCode);
        setCustomModal({ message: `File download failed`, DownloadDirectoryPath: null, isModal: true, status: 0 })
        setDownload(false)
      })
  }

  const onOpenFile = () => {
    RNFetchBlob.android.actionViewIntent(customModal?.DownloadDirectoryPath, 'application/pdf')
    setCustomModal({ ...customModal, message: '', DownloadDirectoryPath: null, isModal: false, status: null })
  }


  return (
    <Fragment>
      <Modal visible={customModal.isModal} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#000000b5', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ backgroundColor: '#ffffff', width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 10, elevation: 12 }}>
            <Text style={{ fontSize: 15, color: '#252F40', fontFamily: 'OpenSans-Bold' }}>CGVTS</Text>
            <Text style={{ fontSize: 13, color: customModal.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-SemiBold', paddingTop: 10, paddingBottom: 10 }}>{customModal?.message}</Text>
            {customModal?.DownloadDirectoryPath === null ?
              null :
              <Text style={{ fontSize: 13, color: customModal.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Regular', paddingTop: 10, paddingBottom: 10 }}>Download path: {customModal?.DownloadDirectoryPath}</Text>
            }
            {customModal.status === 0 ?
              <Pressable onPress={() => setCustomModal({ ...customModal, message: '', DownloadDirectoryPath: null, isModal: false, status: null })} style={{ backgroundColor: customModal.status === 1 ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-Bold' }}>OK</Text>
              </Pressable>
              :
              <Row>
                {/* <Col xs={6} sm={6} md={6} lg={6}>
                  <Pressable onPress={() => onOpenFile()} style={{ backgroundColor: customModal.status === 1 ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-SemiBold' }}>Open</Text>
                  </Pressable>
                </Col> */}
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Pressable onPress={() => setCustomModal({ ...customModal, message: '', DownloadDirectoryPath: null, isModal: false, status: null })} style={{ backgroundColor: customModal.status === 1 ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-SemiBold' }}>OK</Text>
                  </Pressable>
                </Col>
              </Row>
            }
          </View>
        </View>
      </Modal>
      <Modal visible={download} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#000000b5', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>
      <Modal visible={apiLoading} transparent>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#000000b5', justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator size={'large'} color={'#63CE78'} />
        </View>
      </Modal>

      {toggleComponent ?
        <View style={{ backgroundColor: '#ebebfd', }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
            <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{trailsCount}</Text>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Results Found</Text>
            <View style={{ flexGrow: 1 }} />
            <Pressable onPress={() => { setToggleComponent(false); setToggleReport(false); setApiLoad(false), setValue({ ...value, DateFrom: '', DateTo: '', }); setRangeTime({ ...rangeTime, TimeForm: '', TimeTo: '' }); setVehicle_list([]); setPage(1); setFromDate(new Date(d)); setToDate(new Date()) }} style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingLeft: 8 }}>Reset </Text>
              <FontAwesome name='refresh' size={18} color={'#67748E'} style={{ paddingLeft: 10 }} />
            </Pressable>
            <TouchableOpacity disabled={trailsCount === 0} onPress={() => onDwonLoad()} style={{ backgroundColor: trailsCount === 0 ? '#A1A1F8' : '#4646F2', borderRadius: 5, paddingTop: 9, paddingBottom: 9, paddingRight: 12, paddingLeft: 12 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold', }}>Export</Text>
            </TouchableOpacity>
          </View>
        </View>
        : null}

      <View>
        <>
          {toggleComponent ?
            <>
              <GeneratedViolationList fetchMoreData={fetchMoreData} loadMore={loadMore} loader={loader} listData={vehicle_list} />
            </>
            :
            <>
              <View style={{ backgroundColor: '#ffffff', /* marginHorizontal: 15, */ marginTop: 20, borderRadius: 5, /* padding: 10, */ paddingBottom: 20 }}>

                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Date From</Text>
                  <Pressable onPress={handleShowDateForm} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
                    <Input w={{
                      base: "100%",
                      md: "100%"
                    }} value={value?.DateFrom === '' ? '' : `${value?.DateFrom} ${rangeTime?.TimeForm}`} editable={false} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} InputRightElement={<Icon as={<Feather name="calendar" />} size={5} mr="2" color="#48556F" />} placeholder="Select Date Range" />
                  </Pressable>
                  {dateFrom ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Date is required</Text>
                    </View>
                    : null
                  }
                </View>
                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Date To</Text>
                  <Pressable onPress={handleShowDateTo} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
                    <Input w={{
                      base: "100%",
                      md: "100%"
                    }} value={value?.DateTo === '' ? '' : `${value?.DateTo} ${rangeTime?.TimeTo}`} editable={false} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} InputRightElement={<Icon as={<Feather name="calendar" />} size={5} mr="2" color="#48556F" />} placeholder="Select Date Range" />
                  </Pressable>
                  {dateTo ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Date is required</Text>
                    </View>
                    : null
                  }
                </View>
                <Pressable onPress={() => onSubmit()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, }}>
                  <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Show Results</Text>
                </Pressable>
              </View>
            </>
          }
        </>
      </View>
    </Fragment>
  )
}

export default GeneratedViolation