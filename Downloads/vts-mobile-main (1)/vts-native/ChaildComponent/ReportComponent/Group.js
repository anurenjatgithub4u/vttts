import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, UIManager, Modal, ToastAndroid, TouchableOpacity } from 'react-native';
import { View, Text, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import qs from 'qs';
import { Select, CheckIcon, Input, Icon, Divider } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {
  AndroidDateInputMode,
  AndroidPickerMode,
  MaterialDatetimePickerAndroid,
  AndroidDatePickerType,
} from 'react-native-material-datetime-picker';
import QueryString from 'qs';
import RNFetchBlob from 'rn-fetch-blob';
import EventsReport from './GroupCom/EventsReport';
import RouteReport from './GroupCom/RouteReport';
import SummaryReport from './GroupCom/SummaryReport';
import StopsReport from './GroupCom/StopsReport';
import TripsReport from './GroupCom/TripsReport';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Group = () => {
  const { ApiRequestAuthorizationHook, ApiDownload } = useHeader();
  const [download, setDownload] = useState(false);
  const [customModal, setCustomModal] = useState({ message: '', DownloadDirectoryPath: null, isModal: false, status: null })
  const [searchValue, setSearchValue] = useState('');
  const [groupName, setGroupName] = useState([])
  const [gLoader, setGLoader] = useState(false)
  const [eventTypeSearch, setEventTypeSearch] = useState('')
  const [eventType, setGetEventType] = useState([])
  const [eventTypeLoader, setEventTypeLoader] = useState(false)
  const [toggleComponent, setToggleComponent] = useState(false);
  const [selectReportType, setSelectReportType] = useState(false);
  const [group, setGroup] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [apiLoading, setApiLoading] = useState(false);
  const [apiLoad, setApiLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [loadMore, setLoadMore] = useState(false);
  const [group_data_count, setGroup_data_count] = useState('0');
  const [group_data, setGroup_data] = useState([]);
  const [loader, setLoader] = useState(true);
  const [dateFrom, setDateFrom] = useState(false);
  const [dateTo, setDateTo] = useState(false);
  const [value, setValue] = useState({
    SelectReportType: '',
    Group: '',
    EventType: '',
    DateFrom: '',
    DateTo: '',
  });
  const [rangeTime, setRangeTime] = useState({ TimeForm: '', TimeTo: '' })

  const onCHangeSelectReportType = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, SelectReportType: Text });
      setSelectReportType(false);
    } else {
      setValue({ ...value, SelectReportType: Text });
      setSelectReportType(false)
    };
  }
  const onCHangeGroup = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Group: Text });
      setGroup(false);
      setSearchValue('')
    } else {
      setValue({ ...value, Group: Text });
      setGroup(false)
    };
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
  const onCHangeEventType = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, EventType: Text });
      setEventTypeSearch('')
    } else {
      setValue({ ...value, EventType: Text });
      setEventTypeSearch('')
    };
  }
  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

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

  var validation = '';
  const validate = () => {
    if (checkStringNullEmpty(value?.SelectReportType)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSelectReportType(true)
    }
    if (checkStringNullEmpty(value?.Group)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setGroup(true)
    }
    if (checkStringNullEmpty(value?.DateFrom)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDateFrom(true)
    }
    if (checkStringNullEmpty(value?.DateTo)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDateTo(true)
    }
  };

  const onSubmit = () => {
    validate();
    if (validation === '') {
      setApiLoading(true)
      setApiLoad(true)
    }
  }

  var data = qs.stringify({
    groupId: value.Group,
    from: `${fromDate.toISOString()}`?.split("T")[0] + 'T' + `${fromTime.toISOString()}`?.split("T")[1],
    to: `${toDate.toISOString()}`?.split("T")[0] + 'T' + `${toTime.toISOString()}`?.split("T")[1]
  })

  const pageSize = 20;
  const requestApi = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/reports/${value.SelectReportType}/?${data}&currentPage=${page}&pageSize=${pageSize}${value?.EventType === '' ? '' : `&type=${value?.EventType}`}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setGroup_data(oldArray => [...oldArray, ...response.data.data]);
          setGroup_data_count(response.data.noRecords)
          setTotalPage(response.data.totalPage)
          setToggleComponent(true);
        } else {

        }
      })
      .catch(function (error) {
        console.log("vehicle_summary", error);
        // showAlert();
        ToastAndroid.showWithGravity(
          "Data Fetching Failed",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setApiLoad(false)
      })
      .finally(function () {
        setLoader(false)
        setApiLoading(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    if (apiLoad === true) {
      requestApi()
    } else {
      setToggleComponent(false)
    }
  }, [page, apiLoad])

  const fetchMoreData = async () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }

  const groupData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setGLoader(true)
    await ApiRequestAuthorizationHook.get(`/groups`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setGroupName(ress.data.data);
          setGLoader(false)
        }
      })
      .catch(function (err) {
        console.log('gourp name', err)
        setGLoader(false)
      })

    return () => {
      controller.abort();
    };
  }
  const getDataEventType = async () => {
    setEventTypeLoader(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/notifications/types`, { signal: signal })
      .then(function (ress) {
        if (ress?.status === 200) {
          setGetEventType(ress?.data)
        }
      })
      .catch(function (err) {
        console.log('get notifications types data', err)
      })
      .finally(function () {
        setEventTypeLoader(false)
      })

    return () => {
      controller.abort();
    };
  }

  const newGroupData = Array.from(new Set(groupName.map(a => a?.id)))
    .map(id => {
      return groupName.find(a => a?.id === id)
    })
  const newTypeData = Array.from(new Set(eventType?.map(a => a?.id)))
    .map(id => {
      return eventType?.find(a => a?.id === id)
    })

  const handleShowDateForm = () => {
    MaterialDatetimePickerAndroid.show({
      value: fromDate,
      titleText: 'Select Date',
      mode: AndroidPickerMode.DATE,
      maximumDate: new Date(),
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
      mode: AndroidPickerMode.DATE,
      maximumDate: new Date(),
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

  const searchGroupData = newGroupData?.filter(
    DeviceItem => {
      return (
        DeviceItem
          .name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
  );
  const searchEventTypeData = newTypeData?.filter(
    DeviceItem => {
      return (
        DeviceItem
          .type
          .toLowerCase()
          .includes(eventTypeSearch.toLowerCase())
      );
    }
  );

  const onDwonloadData = QueryString.stringify({
    groupId: value?.Group,
    from: `${fromDate.toISOString()}`?.split("T")[0] + 'T' + `${fromTime.toISOString()}`?.split("T")[1],
    to: `${toDate.toISOString()}`?.split("T")[0] + 'T' + `${toTime.toISOString()}`?.split("T")[1]
  })

  var dateDwonLoad = new Date();
  var path = RNFetchBlob.fs.dirs.DownloadDir + `/${value?.SelectReportType}_group_report` + Math.floor(dateDwonLoad?.getTime() + dateDwonLoad?.getSeconds() / 2) + '.xlsx';

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
      .fetch('GET', `${ApiDownload.baseURL}/reports/${value?.SelectReportType === 'route' ? 'routes' : value?.SelectReportType}/export?${onDwonloadData}`, {
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
    <View>
      <Modal visible={customModal.isModal} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#000000b5', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ backgroundColor: '#ffffff', width: '70%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 10, elevation: 12 }}>
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
        <View style={{ backgroundColor: '#000000b5', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator size={'large'} color={'#63CE78'} />
        </View>
      </Modal>

      {toggleComponent ?
        <View style={{ backgroundColor: '#ebebfd', }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
            <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{group_data_count}</Text>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Results Found </Text>
            <View style={{ flexGrow: 1 }} />
            <Pressable onPress={() => { setToggleComponent(false); setApiLoad(false); setValue({ ...value, SelectReportType: '', DateFrom: '', DateTo: '', Group: '', EventType: '' }); setRangeTime({ ...rangeTime, TimeForm: '', TimeTo: '' }); setGroup_data([]); setPage(1); setFromDate(new Date(d)); setToDate(new Date()) }} style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingLeft: 8 }}>Reset</Text>
              <FontAwesome name='refresh' color={'#67748E'} size={18} style={{ paddingLeft: 10 }} />
            </Pressable>
            <TouchableOpacity disabled={group_data_count === 0} onPress={() => onDwonLoad()} style={{ backgroundColor: group_data_count === 0 ? '#A1A1F8' : '#4646F2', borderRadius: 5, paddingTop: 9, paddingBottom: 9, paddingRight: 12, paddingLeft: 12 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold', }}>Export</Text>
            </TouchableOpacity>
          </View>
        </View>
        : null}

      <View>
        {toggleComponent ?
          <>
            {value.SelectReportType === 'events' ?
              <EventsReport fetchMoreData={fetchMoreData} loadMore={loadMore} loader={loader} listData={group_data} />
              :
              null}
            {value.SelectReportType === 'route' ?
              <RouteReport fetchMoreData={fetchMoreData} loadMore={loadMore} loader={loader} listData={group_data} />
              :
              null}
            {value.SelectReportType === 'stops' ?
              <StopsReport fetchMoreData={fetchMoreData} loadMore={loadMore} loader={loader} listData={group_data} />
              :
              null}
            {value.SelectReportType === 'summary' ?
              <SummaryReport fetchMoreData={fetchMoreData} loadMore={loadMore} loader={loader} listData={group_data} />
              :
              null}
            {value.SelectReportType === 'trips' ?
              <TripsReport fetchMoreData={fetchMoreData} loadMore={loadMore} loader={loader} listData={group_data} />
              :
              null}
          </>
          :
          <Fragment>
            <View>
              <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10, paddingBottom: 20 }}>

                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Select Report Type</Text>
                  <Select placeholderTextColor={'#7D8EAB'} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} borderWidth={0} selectedValue={value.SelectReportType} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
                    bg: "#f4f4fd",
                    endIcon: <CheckIcon size="5" />
                  }} _light={{
                    bg: "#f4f4fd"
                  }} _dark={{
                    bg: "coolGray.800"
                  }} onValueChange={itemValue => onCHangeSelectReportType(itemValue)}>
                    <Select.Item shadow={2} label="Event" value="events" />
                    <Select.Item shadow={2} label="Route" value="route" />
                    <Select.Item shadow={2} label="Stops" value="stops" />
                    <Select.Item shadow={2} label="Summary" value="summary" />
                    <Select.Item shadow={2} label="Trips" value="trips" />
                  </Select>
                  {selectReportType ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Report Type is required</Text>
                    </View>
                    : null
                  }
                </View>

                {value.SelectReportType === 'events' ?
                  <View style={{ paddingTop: 12 }}>
                    <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Select Event Type</Text>
                    <Select onOpen={() => searchEventTypeData?.length === 0 ? getDataEventType() : null} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} borderWidth={0} selectedValue={value?.EventType} placeholderTextColor={'#7D8EAB'} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
                      bg: "#f4f4fd",
                      endIcon: <CheckIcon size="5" />
                    }} _light={{
                      bg: "#f4f4fd"
                    }} _dark={{
                      bg: "coolGray.800"
                    }}
                      onValueChange={itemValue => onCHangeEventType(itemValue)}
                      _actionSheetBody={{
                        ListHeaderComponent:
                          <View>
                            {eventTypeLoader === true ?
                              <ActivityIndicator color={'#63ce78'} size={'large'} />
                              :
                              <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#7D8EAB' }}>
                                <Input
                                  placeholder="Search here"
                                  type='text'
                                  // value={eventTypeSearch}
                                  // onChangeText={(value) => {
                                  //   setEventTypeSearch(value);
                                  // }}
                                  onSubmitEditing={(Text) => setEventTypeSearch(Text?.nativeEvent?.text)}
                                  variant={'unstyled'}
                                  InputRightElement={
                                    <Icon as={
                                      <TouchableOpacity onPress={() => setEventTypeSearch('')} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4646F2' }}>
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
                      {eventTypeLoader ?
                        <View>
                          <ActivityIndicator size={'large'} color={'#63CE78'} />
                        </View>
                        :
                        searchEventTypeData?.map((value, id) => (
                          <Select.Item key={id} shadow={2} label={value?.type} value={value?.type} />
                        ))}
                    </Select>
                  </View>
                  : null}

                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Group</Text>
                  <Select onOpen={() => searchGroupData?.length === 0 ? groupData() : null} placeholderTextColor={'#7D8EAB'} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} borderWidth={0} selectedValue={value.Group} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
                    bg: "#f4f4fd",
                    endIcon: <CheckIcon size="5" />
                  }} _light={{
                    bg: "#f4f4fd"
                  }} _dark={{
                    bg: "coolGray.800"
                  }}
                    onValueChange={itemValue => onCHangeGroup(itemValue)}
                    _actionSheetBody={{
                      ListHeaderComponent:
                        <View>
                          {gLoader === true ?
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
                    {gLoader ?
                      <View>
                        <ActivityIndicator color={'#63ce78'} size={'large'} />
                      </View>
                      :
                      searchGroupData?.map((value, id) => (
                        <Select.Item key={id} shadow={2} label={value?.name} value={value?.id.toString()} />
                      ))}
                  </Select>
                  {group ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Group is required</Text>
                    </View>
                    : null
                  }
                </View>

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
            </View>

          </Fragment>
        }
      </View>
    </View>
  )
}

export default Group;