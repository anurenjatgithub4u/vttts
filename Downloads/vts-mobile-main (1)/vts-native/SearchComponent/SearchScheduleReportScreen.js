import React, { Fragment, useState, useEffect } from 'react';
import { View, StatusBar, Pressable } from 'react-native';
import { Text, Divider } from 'native-base';
import { useHeader } from '../ApiHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Col, Row } from "react-native-responsive-grid-system";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchScheduleReportScreen = () => {
  const Location = useRoute();
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = useState();
  const [groupName, setGroupName] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [schedule_data_count, setSchedule_data_count] = useState('0');
  const [schedule_data, setSchedule_data] = useState([]);
  const [loader, setLoader] = useState(true);

  const pageSize = 20;
  const requestApi = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/search/schedule?search_key=${Location?.params?.search_key}&currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setSchedule_data(oldArray => [...oldArray, ...response.data.data]);
          setSchedule_data_count(response.data.noRecords)
          setTotalPage(response.data.totalPage)
        } else {

        }
      })
      .catch(function (error) {
        console.log("vehicle_summary", error);
      })
      .finally(function () {
        setLoader(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    requestApi()
  }, [page])

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

    await ApiRequestAuthorizationHook.get(`/groups`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setGroupName(ress.data.data);
        }
      })
      .catch(function (err) {
        console.log('gourp name', err)
      })

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      setLoader(true)
      requestApi();
      setPage(1)
      setSchedule_data([])
      groupData();
      setGroupName([]);
    });
    return unsubscribe;
  }, [Navigation])

  const handlePress = (event) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(event?.id);
  };


  const newDataSchedule = Array?.from(new Set(schedule_data.map(a => a?.id)))
    ?.map(id => {
      return schedule_data.find(a => a?.id === id)
    })

  return (
    <Fragment>
      <StatusBar barStyle='dark-content' backgroundColor="#ebebfd" />
      <View style={[{ paddingHorizontal: 15, backgroundColor: '#ebebfd', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 6, }]}>
        <Pressable onPress={() => Navigation.goBack()}>
          <Center style={{ backgroundColor: '#d0d0fb', width: 35, height: 35, borderRadius: 5 }}>
            <Entypo name='chevron-thin-left' color={'#7171F3'} size={20} />
          </Center>
        </Pressable>
        <View style={{ flexGrow: 1 }} />
        <Center style={{ height: 40 }}>
          <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#000000' }}>Schedule</Text>
        </Center>
        <View style={{ flexGrow: 1 }} />
        <Pressable>
          <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

          </Center>
        </Pressable>
      </View>

      <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
        <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
        <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{schedule_data_count}</Text>
        <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
      </View>

      <View style={{ paddingHorizontal: 15, }} >
        {loader ?
          <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: "center", display: 'flex' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              return (
                <>
                  {loadMore ?
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 130 }}>
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                    </View>
                    :
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 130 }}>
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                    </View>
                  }
                </>
              )
            }}
            initialNumToRender={30}
            onEndReachedThreshold={.2}
            onEndReached={fetchMoreData}
            horizontal={false}
            data={newDataSchedule}
            renderItem={({ item, index }) => {
              return (
                <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 12, paddingBottom: 12, }}>
                  <Pressable onPress={() => expanded === item?.id ? handlePress({ id: 0, groupId: item?.groupid }) : handlePress({ id: item?.id, groupId: item?.groupid })} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                    <Row>
                      <Col xs={1} sm={1} md={1} lg={1}>
                        {expanded === item?.id ?
                          <AntDesign onPress={() => handlePress({ id: 0, groupId: item?.groupid })} name={"minuscircleo"} size={20} color={'#67748E'} />
                          :
                          <AntDesign onPress={() => handlePress({ id: item?.id, groupId: item?.groupid })} name={"pluscircleo"} size={20} color={'#67748E'} />
                        }
                      </Col>
                      <Col xs={7} sm={7} md={7} lg={7}>
                        <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.reporttype}</Text>
                      </Col>
                      <Col xs={4} sm={4} md={4} lg={4}>
                        <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{groupName?.find(x => x?.id === item?.groupid)?.name === undefined ? '-' : groupName?.find(x => x?.id === item?.groupid)?.name}</Text>
                      </Col>
                    </Row>
                  </Pressable>

                  {expanded === item?.id ?
                    < View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                      <View style={{ marginHorizontal: 20 }}>
                        <Row>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Details</Text>
                              {item?.report_period === 30 ?
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Monthly</Text>
                                : null}
                              {item?.report_period === 14 ?
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Biweekly</Text>
                                : null}
                              {item?.report_period === 7 ?
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Weekly</Text>
                                : null}
                            </View>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Durtion</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.day}</Text>
                            </View>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Email</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.email}</Text>
                            </View>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Status</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: item?.disabled === true ? '#63ce78' : 'red' }}>{item?.disabled === true ? 'Active' : 'Inactive'}</Text>
                            </View>
                          </Col>
                        </Row>
                      </View>
                      <View style={{ marginHorizontal: 20, marginTop: 55 }}>
                        <View style={{ position: 'absolute', left: 0, bottom: 0, }}>
                          <Pressable onPress={() => { Navigation.navigate({ name: 'EditScheduleReportScreen', params: { schedule_id: item?.id } }) }} style={{ alignSelf: 'flex-start', backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='square-edit-outline' color={'#ffffff'} size={16} style={{ paddingRight: 10 }} />
                            <Text style={{ color: "#FFFFFF", fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Edit</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                    : null}
                </View>
              )
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        }
        {/* ))} */}
      </View>
    </Fragment >
  )
}

export default SearchScheduleReportScreen