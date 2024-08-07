import React, { useEffect } from 'react'
import { BackHandler } from 'react-native';
import { Fragment, useState, } from 'react'
import { TextInput, Text, View, Pressable, } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Center, Box, Divider, useDisclose, Actionsheet, Select, CheckIcon, Input, Icon } from 'native-base';
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native';
import { Col, Row } from "react-native-responsive-grid-system";
import {
  AndroidDateInputMode,
  AndroidPickerMode,
  MaterialDatetimePickerAndroid,
  AndroidDatePickerType,
} from 'react-native-material-datetime-picker';
import { useHeader } from '../../ApiHeader';


if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Summary = ({ setSlideOverViewCom, loadMore, vehicle_count, vehicle_summary, loader, fetchMoreData, }) => {
  const { ApiRequestAuthorizationHook } = useHeader()
  const [expanded, setExpanded] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [groupLoader, setGroupLoader] = useState(true);
  const [getGroupData, setGetGroupData] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [date, setDate] = useState(false);
  const [group, setGroup] = useState(false);
  const [value, setValue] = useState({ search: '', gorupId: '', Date: '' });
  const [isFilter, setIsFilter] = useState(false);

  const [pageVehicle, setPageVehicle] = useState(1);
  const [totalPageVehicle, setTotalPageVehicle] = useState(0)
  const [loadMoreVehicle, setLoadMoreVehicle] = useState(false);
  const [vehicle_list, setVehicle_list] = useState([]);
  const [count, setCount] = useState('0');
  const [loaderVehicle, setLoaderVehicle] = useState(true)

  function handleBackButtonClick() {
    setSlideOverViewCom(true);
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);


  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  const groupData = async () => {
    setGroupLoader(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/groups`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setGetGroupData(ress?.data?.data)
          setGroupLoader(false)
        }
      })
      .catch(function (err) {
        console.log(err);
        setGroupLoader(false)
      })
    return () => {
      controller.abort();
    };
  }

  const onCHangeGroup = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, gorupId: Text });
      setGroup(false);
    } else {
      setValue({ ...value, gorupId: Text });
      setGroup(false)
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
  const onDoneDate = (e) => {
    setFromDate(e.fromDate)
    setToDate(e.toDate)

    const fromDate = new Date(e?.fromDate);
    const yyyy_1 = fromDate?.getFullYear();
    let mm_1 = fromDate?.getMonth() + 1;
    let dd_1 = fromDate?.getDate();
    if (dd_1 < 10) dd_1 = '0' + dd_1;
    if (mm_1 < 10) mm_1 = '0' + mm_1;
    const formattedFromDate = dd_1 + '/' + mm_1 + '/' + yyyy_1;

    const toDate = new Date(e?.toDate);
    const yyyy_2 = toDate?.getFullYear();
    let mm_2 = toDate?.getMonth() + 1;
    let dd_2 = toDate?.getDate();
    if (dd_2 < 10) dd_2 = '0' + dd_2;
    if (mm_2 < 10) mm_2 = '0' + mm_2;
    const formattedtoDate = dd_2 + '/' + mm_2 + '/' + yyyy_2;

    onCHangeDate(formattedFromDate + ' ' + '-' + ' ' + formattedtoDate)
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
    if (checkStringNullEmpty(value?.gorupId)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setGroup(true)
    }
    if (checkStringNullEmpty(value?.Date)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDate(true)
    }
  };
  const onFilter = () => {
    setVehicle_list([])
    validate();
    if (validation === '') {
      setIsFilter(true)
      setLoaderVehicle(true)
      onRequestSearch();
      setCount(0)
      setPageVehicle(1)
      onClose()
    }
  }
  const onSearch = () => {
    if (value?.search === '') {
      setValue({ ...value, search: '', gorupId: '', Date: '' });
      setIsFilter(false);
      setFromDate(new Date());
      setToDate(new Date());
    } else {
      setLoaderVehicle(true)
      setVehicle_list([])
      setIsFilter(true)
      setCount(0)
      setPageVehicle(1)
      onRequestSearch();
    }
  }
  const onRequestSearch = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/dashboard/vehicle_summary?${value?.search === "" ? '' : 'searchKey=' + value?.search + "&"}${value?.gorupId === "" ? '' : 'groupId=' + value?.gorupId + "&"}${value?.Date === "" ? '' : 'from=' + fromDate?.toISOString() + "&" + 'to=' + toDate?.toISOString() + "&"}currentPage=${pageVehicle}&pageSize=${50}`, { signal: signal })
      .then(function (response) {
        if (response?.status === 200) {
          setVehicle_list(oldArray => [...oldArray, ...response?.data?.data]);
          setCount(response?.data.noRecords);
          setTotalPageVehicle(response?.data?.totalPage);
          setLoaderVehicle(false)
        }
      })
      .catch(function (err) {
        console.log(err)
        setLoaderVehicle(false)
      })

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    if (isFilter === true) {
      onRequestSearch();
    }
  }, [pageVehicle])

  const fetchMoreDataVehicle = () => {
    setLoadMoreVehicle(true)
    if (totalPageVehicle != pageVehicle) {
      setPageVehicle(pageVehicle + 1)
    } else {
      setLoadMoreVehicle(false)
    }
  }
  const onClear = () => {
    setValue({ ...value, search: '', gorupId: '', Date: '' });
    setIsFilter(false);
    onClose();
    setFromDate(new Date());
    setToDate(new Date());
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', '', '', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleShowDateRangePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: fromDate,
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

  const newSummaryFilter = Array.from(new Set(vehicle_list.map(a => a?.deviceId)))
    .map(deviceId => {
      return vehicle_list.find(a => a?.deviceId === deviceId)
    })
  const newSummary = Array.from(new Set(vehicle_summary.map(a => a?.deviceId)))
    .map(deviceId => {
      return vehicle_summary.find(a => a?.deviceId === deviceId)
    })


  function padTo2Digits(num) {
    return num.toString()?.padStart(2, '0');
  }
  function convertMsToHM(milliseconds) {
    let seconds = Math?.floor(milliseconds / 1000);
    let minutes = Math?.floor(seconds / 60);
    let hours = Math?.floor(minutes / 60);

    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
  }


  // console.log(`/dashboard/vehicle_summary?${value?.search === "" ? '' : 'searchKey=' + value?.search + "&"}${value?.gorupId === "" ? '' : 'groupId=' + value?.gorupId + "&"}${value?.Date === "" ? '' : 'from=' + fromDate?.toISOString() + "&" + 'to=' + toDate?.toISOString() + "&"}`)

  return (
    <Fragment>
      {isFilter === false ?
        <View style={{ /* paddingHorizontal: 15 */ }}>
          <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Search</Text>
          </View>
          <View style={{ paddingHorizontal: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', flexDirection: 'row', borderColor: '#000', borderRadius: 5, backgroundColor: '#ffffff', width: '85%', height: 35 }}>
                <TextInput
                  style={{ flex: 1, fontSize: 13, color: '#252F40', fontFamily: 'OpenSans-Regular' }}
                  autoCorrect={false}
                  placeholder="Enter Vehicle No."
                  placeholderTextColor={'#7D8EAB'}
                  returnKeyType='search'
                  value={value?.search}
                  onChangeText={(Text) => setValue({ ...value, search: Text })}
                  onSubmitEditing={() => onSearch()}
                />
                <Pressable onPress={() => onSearch()} style={{ backgroundColor: '#4646f2', height: 35, width: 35, borderRadius: 5, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                  <AntDesign name='search1' color={Colors.white} size={20} />
                </Pressable>
              </View>
              <View style={{ flexGrow: 1 }} />
              <Pressable onPress={onOpen}>
                <Center bg="#ffffff" style={{ borderRadius: 5, height: 35, width: 35 }}>
                  <Feather name='filter' size={20} color={'#69748C'} />
                </Center >
              </Pressable>
            </View>
          </View>
          <Box style={{ paddingHorizontal: 15, display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15 }}>
            <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{vehicle_count}</Text>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Vehicles Found</Text>
          </Box>
          <View>
            {loader ?
              <View style={{ paddingTop: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={'#63CE78'} size={'large'} />
              </View>
              :
              <View style={{ paddingBottom: 200, marginBottom: 20, backgroundColor: '#F5F6FA', paddingHorizontal: 15, }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={() => {
                    return (
                      <>
                        {loadMore ?
                          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                          </View>
                          :
                          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                            {/*  <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                          </View>
                        }
                      </>
                    )
                  }}
                  ListEmptyComponent={() => {
                    return (
                      <>
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
                        </View>
                      </>
                    )
                  }}
                  initialNumToRender={30}
                  onEndReachedThreshold={0.2}
                  onEndReached={fetchMoreData}
                  horizontal={false}
                  data={newSummary}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={index} style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4 }}>
                        <Pressable onPress={() => expanded === item?.deviceId ? handlePress(0) : handlePress(item?.deviceId)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 10, width: '100%' }}>
                            {expanded === item?.deviceId ?
                              <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#7D8EAB'} />
                              :
                              <AntDesign onPress={() => handlePress(item?.deviceId)} name={"pluscircleo"} size={20} color={'#7D8EAB'} />
                            }
                            <Text numberOfLines={1} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingLeft: 10 }}>{item?.deviceName}</Text>
                          </View>
                        </Pressable>
                        {expanded === item?.deviceId ?
                          <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                            <View style={{ marginHorizontal: 10 }}>
                              <Row>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start date</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.startTime === null ? '-' : `${new Date(item?.startTime)?.getDate()} ${months[new Date(item?.startTime)?.getMonth()]} ${new Date(item?.startTime)?.getFullYear()}`}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Distance</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>{item?.distance === null ? 0 : (item?.distance / 1000)?.toFixed(2)} km</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Odometer Start</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.startOdometer === null ? 0 : (item?.startOdometer / 1000)?.toFixed(0)} KMs</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Odometer End</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.endOdometer === null ? 0 : (item?.endOdometer / 1000)?.toFixed(0)} KMs</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Avg Speed</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#FA9826' }}>{item?.averageSpeed === null ? 0 : (item?.averageSpeed / 1000)?.toFixed(2)} km/hr</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Max Speed</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#F25555' }}>{item?.maxSpeed === null ? 0 : (item?.maxSpeed / 1000)?.toFixed(2)} km/hr</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Engine (hrs)</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.engineHours === null ? 0 : convertMsToHM(item?.engineHours)}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Spent fuel</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.spentFuel === null ? 0 : item?.spentFuel}</Text>
                                  </View>
                                </Col>

                              </Row>


                            </View>
                          </View>
                          : null}
                      </View>
                    )
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            }
          </View>
        </View>
        :
        <View style={{ paddingHorizontal: 15 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Search</Text>
          </View>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', flexDirection: 'row', borderColor: '#000', borderRadius: 5, backgroundColor: '#ffffff', width: '85%', height: 35 }}>
                <TextInput
                  style={{ flex: 1, height: 35, fontSize: 13, color: '#252F40', fontFamily: 'OpenSans-Regular' }}
                  autoCorrect={false}
                  placeholder="Enter Vehicle No."
                  placeholderTextColor={'#7D8EAB'}
                  returnKeyType='search'
                  value={value?.search}
                  onChangeText={(Text) => setValue({ ...value, search: Text })}
                  onSubmitEditing={() => onSearch()}
                />
                <Pressable onPress={() => onSearch()} style={{ backgroundColor: '#4646f2', height: 35, width: 35, borderRadius: 5, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                  <AntDesign name='search1' color={Colors.white} size={20} />
                </Pressable>
              </View>
              <View style={{ flexGrow: 1 }} />
              <Pressable onPress={onOpen}>
                <Center bg="#ffffff" style={{ borderRadius: 5, height: 35, width: 35 }}>
                  <Feather name='filter' size={20} color={'#69748C'} />
                </Center >
              </Pressable>
            </View>
          </View>
          <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15 }}>
            <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{count}</Text>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Vehicles Found</Text>
          </Box>
          <View>
            {loaderVehicle ?
              <View style={{ paddingTop: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={'#63CE78'} size={'large'} />
              </View>
              :
              <View style={{ paddingBottom: 200, }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={() => {
                    return (
                      <>
                        {loadMoreVehicle ?
                          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 270 }}>
                            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                          </View>
                          :
                          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 270 }}>
                            {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                          </View>
                        }
                      </>
                    )
                  }}
                  ListEmptyComponent={() => {
                    return (
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 270 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
                      </View>
                    )
                  }}
                  initialNumToRender={30}
                  onEndReachedThreshold={0.2}
                  onEndReached={fetchMoreDataVehicle}
                  horizontal={false}
                  data={newSummaryFilter}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={index} style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4 }}>
                        <Pressable onPress={() => expanded === item?.deviceId ? handlePress(0) : handlePress(item?.deviceId)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, width: '100%' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 10, width: '100%' }}>
                            {expanded === item?.deviceId ?
                              <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#7D8EAB'} />
                              :
                              <AntDesign onPress={() => handlePress(item?.deviceId)} name={"pluscircleo"} size={20} color={'#7D8EAB'} />
                            }
                            <Text numberOfLines={1} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingLeft: 10 }}>{item?.deviceName}</Text>
                          </View>
                        </Pressable>
                        {expanded === item?.deviceId ?
                          <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                            <View style={{ marginHorizontal: 10 }}>
                              <Row>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start date</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.startTime === null ? '-' : `${new Date(item?.startTime)?.getDate()} ${months[new Date(item?.startTime)?.getMonth()]} ${new Date(item?.startTime)?.getFullYear()}`}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Distance</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>{item?.distance === null ? 0 : (item?.distance / 1000)?.toFixed(2)} km</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Odometer Start</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.startOdometer === null ? 0 : (item?.startOdometer / 1000)?.toFixed(0)} KMs</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Odometer End</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.endOdometer === null ? 0 : (item?.endOdometer / 1000)?.toFixed(0)} KMs</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Avg Speed</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#FA9826' }}>{item?.averageSpeed === null ? 0 : (item?.averageSpeed / 1000)?.toFixed(2)} km/hr</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Max Speed</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#F25555' }}>{item?.maxSpeed === null ? 0 : (item?.maxSpeed)?.toFixed(2)} km/hr</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Engine (hrs)</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.engineHours === null ? 0 : item?.engineHours}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Spent fuel</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.spentFuel === null ? 0 : item?.spentFuel}</Text>
                                  </View>
                                </Col>

                              </Row>


                            </View>
                          </View>
                          : null}
                      </View>
                    )
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            }
          </View>
        </View>
      }

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 10 }}>
            <Pressable onPress={onClose}>
              <Center style={{ width: 35, height: 35, backgroundColor: '#ededff', borderRadius: 5 }}>
                <Feather name='chevron-left' size={20} color={'#5252f2'} />
              </Center>
            </Pressable>
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#5252f2', paddingLeft: 15, }}>Filters</Text>
            <View style={{ flexGrow: 1 }} />
            <Pressable onPress={() => onClear()} style={{ backgroundColor: '#ececef', borderRadius: 5 }}>
              <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#252F40', paddingTop: 8, paddingBottom: 8, paddingLeft: 15, paddingRight: 15 }}>Clear all</Text>
            </Pressable>
          </View>

          <View style={{ paddingHorizontal: 15, minWidth: '100%' }}>
            <View style={{ paddingTop: 10 }}>
              <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Group</Text>
              <Select onOpen={() => getGroupData?.length === 0 ? groupData() : null} style={{ height: 40, backgroundColor: '#f4f4fd', color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} placeholderTextColor={'#7D8EAB'} borderWidth={0} selectedValue={value?.gorupId} minWidth="200" accessibilityLabel="Select" placeholder="All Groups" _selectedItem={{
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
                      {groupLoader === true ?
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
                {groupLoader ?
                  <View>
                    <ActivityIndicator color={'#63CE78'} size={'small'} />
                  </View>
                  :
                  getGroupData.map((value, index) => (
                    <Select.Item key={index} shadow={2} label={value?.name} value={value?.id.toString()} />
                  ))
                }
              </Select>
              {group ?
                <View>
                  <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Group is required</Text>
                </View>
                : null
              }
            </View>
            <View style={{ paddingTop: 10 }}>
              <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Select Date</Text>
              <Pressable onPress={handleShowDateRangePicker} style={{ display: 'flex', alignItems: 'center', height: 40, backgroundColor: "#f4f4fd", borderRadius: 5 }}>
                <Input w={{
                  base: "100%",
                  md: "100%"
                }} editable={false} value={value.Date} variant='unstyled' style={{ height: 40, color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} placeholderTextColor={'#7D8EAB'} InputRightElement={<Icon as={<Feather name={'calendar'} />} size={5} mr="2" color="#67748E" />} placeholder="dd/mm/yyyy - dd/mm/yyyy" />
              </Pressable>
              {date ?
                <View>
                  <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Date is required</Text>
                </View>
                : null
              }
            </View>

            <View style={{ paddingTop: 25, paddingBottom: 25 }}>
              {value?.gorupId === '' || value?.Date === '' ?
                <Pressable style={{ backgroundColor: '#7477ED', borderRadius: 5 }}>
                  <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 10, paddingBottom: 10 }}>Search</Text>
                </Pressable>
                :
                <Pressable onPress={() => onFilter()} style={{ backgroundColor: '#4646f2', borderRadius: 5 }}>
                  <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 10, paddingBottom: 10 }}>Search</Text>
                </Pressable>
              }
            </View>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  )
}

export default Summary