import React, { Fragment, useState, } from 'react';
import { View, StatusBar, Pressable, BackHandler } from 'react-native';
import { Text, Divider } from 'native-base';
import { useHeader } from '../ApiHeader';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Col, Row } from "react-native-responsive-grid-system"
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchAlarmLogScreen = () => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [dataSet, setDataSet] = useState('');
  const [showAddress, setShowAddress] = useState(false)
  const [expanded, setExpanded] = useState();
  const [logsCount, setLogsCount] = useState('0');
  const [pageLog, setPageLog] = useState(1);
  const [totalPageLog, setTotalPageLog] = useState(0)
  const [errorLog, setErrorLog] = useState(null)
  const [logsList, setLogsList] = useState([])
  const [loaderLog, setLoaderLog] = useState(true)
  const [loadMoreLog, setLoadMoreLog] = useState(false);

  const pageSize = 20;
  const requestLog = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/search/event/logs?search_key=${location?.params?.search_key}&currentPage=${pageLog}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setLogsList(oldArray => [...oldArray, ...response.data.data]);
          setLogsCount(response.data.noRecords);
          setTotalPageLog(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
        // setErrorLog(error);
        setLoaderLog(true)
      })
      .finally(function () {
        setLoaderLog(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    requestLog();
  }, [pageLog]);

  const fetchMoreDataLog = () => {
    setLoadMoreLog(true)
    if (totalPageLog != pageLog) {
      setPageLog(pageLog + 1)
    } else {
      setLoadMoreLog(false)
    }
  }


  const handlePress = async (event) => {
    setShowAddress(false)
    console.log(event.lat)
    LayoutAnimation.easeInEaseOut();
    setExpanded(event.id)
    await ApiRequestAuthorizationHook.get(`/server/geocode?latitude=${event?.lat}&longitude=${event?.long}`)
      .then(function (response) {
        if (response?.status === 200) {
          setDataSet(response?.data)
        }
      })
      .catch(function (error) {
        console.log(error);
        setDataSet('Address not found')
      });
  };

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


  const newDataLogList = Array.from(new Set(logsList.map(a => a.id)))
    .map(id => {
      return logsList.find(a => a.id === id)
    })

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Fragment>
      <View style={{ backgroundColor: '#f5f6fa', width: '100%', flex: 1, }}>
        <StatusBar barStyle='dark-content' backgroundColor="#ebebfd" />
        <View style={[{ paddingHorizontal: 15, backgroundColor: '#ebebfd', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 6, }]}>
          <Pressable onPress={() => Navigation.goBack()}>
            <Center style={{ backgroundColor: '#d0d0fb', width: 35, height: 35, borderRadius: 5 }}>
              <Entypo name='chevron-thin-left' color={'#7171F3'} size={20} />
            </Center>
          </Pressable>
          <View style={{ flexGrow: 1 }} />
          <Center style={{ height: 40 }}>
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#000000' }}>Alarm Log</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
          <Pressable>
            <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

            </Center>
          </Pressable>
        </View>

        <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{logsCount}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
        </View>

        <View style={{ paddingHorizontal: 15, /* backgroundColor: loaderLog ? 'transparent' : '#f5f6fa' */ }}>
          {loaderLog ?
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: "center", display: 'flex' }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <View>
              <FlatList
                ListHeaderComponent={() => {
                  return (
                    <View style={{ display: 'flex', alignItems: "center", flexDirection: 'row', paddingBottom: 10, paddingTop: 10 }}>
                      <View style={{ flexGrow: .5 }} />
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Device name</Text>
                      <View style={{ flexGrow: 1 }} />
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Alert Type</Text>
                      <View style={{ flexGrow: 1 }} />
                    </View>
                  )
                }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                  return (
                    <>
                      {loadMoreLog ?
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                        </View>
                        :
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                        </View>
                      }
                    </>
                  )
                }}
                onEndReachedThreshold={0.5}
                onEndReached={fetchMoreDataLog}
                horizontal={false}
                data={newDataLogList}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 15, paddingBottom: 15, }}>
                      <Pressable onPress={() => expanded === item?.id ? handlePress({ id: 0, lat: item?.latitude, long: item?.longitude }) : handlePress({ id: item?.id, lat: item?.latitude, long: item?.longitude })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                        <Row>
                          <Col xs={1} sm={1} md={1} lg={1}>
                            {expanded === item?.id ?
                              <AntDesign onPress={() => handlePress({ id: 0, lat: item?.latitude, long: item?.longitude })} name={"minuscircleo"} size={20} color={'#67748E'} />
                              :
                              <AntDesign onPress={() => handlePress({ id: item?.id, lat: item?.latitude, long: item?.longitude })} name={"pluscircleo"} size={20} color={'#67748E'} />
                            }
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ width: '100%' }}>
                              <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.devicename}</Text>
                            </View>
                          </Col>
                          <Col xs={5} sm={5} md={5} lg={5}>
                            <View style={{ width: '100%', }}>
                              <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.alerttype}</Text>
                            </View>
                          </Col>
                        </Row>
                      </Pressable>

                      {expanded === item?.id ?
                        <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 10 }}>
                          <View style={{ paddingHorizontal: 15 }}>
                            <Row>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Date &#38; Time</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>{`${new Date(item?.eventtime).getDate()} ${months[new Date(item?.eventtime).getMonth()]} ${new Date(item?.eventtime).getFullYear()} ${moment(item?.eventtime)?.format(' hh:mm A')}`}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Latitude</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.latitude === null ? '-' : item?.latitude}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Longitude</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.longitude === null ? '-' : item?.longitude}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20, width: '90%' }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Address</Text>
                                  <Pressable onPress={() => setShowAddress(!showAddress)}>
                                    {showAddress ?
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{dataSet}</Text>
                                      :
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: 'blue' }}>Show Address</Text>
                                    }
                                  </Pressable>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start time</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.start_time === null ? '-' : `${new Date(item?.start_time).getDate()} ${months[new Date(item?.start_time).getMonth()]} ${new Date(item?.start_time).getFullYear()} ${moment(item?.start_time)?.format(' hh:mm A')}`}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Latitude</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.start_lat === null ? '-' : item?.start_lat}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Longitude</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.start_lng === null ? '-' : item?.start_lng}</Text>
                                </View>
                              </Col>

                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Status</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.status === null ? '-' : item?.status}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Type</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.notificator_type === null ? '-' : item?.notificator_type}</Text>
                                </View>
                              </Col>
                            </Row>
                          </View>
                        </View>
                        : null}
                    </View>
                  )
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
          }
        </View>
      </View>
    </Fragment>
  )
}

export default SearchAlarmLogScreen