import React, { Fragment, useState, } from 'react';
import { View, StatusBar, Pressable, } from 'react-native';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchRoutesAssignScreen = () => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = React.useState();
  const [getUserName, setGetUserName] = React.useState({});
  const [pageAssign, setPageAssign] = useState(1);
  const [totalPageAssign, setTotalPageAssign] = useState(0)
  const [loadMoreAssign, setLoadMoreAssign] = useState(false);
  const [routeListAssign, setRouteListAssign] = useState([]);
  const [errorAssign, setErrorAssign] = useState(null)
  const [routeList_countAssign, setRouteList_countAssign] = useState('0');
  const [loaderAssign, setLoaderAssign] = useState(true)

  const handlePress = async (event) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(event?.id)
    await ApiRequestAuthorizationHook.get(`/users/${event?.userid}`)
      .then((res) => {
        if (res.status === 200) {
          setGetUserName(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const pageSize = 20;
  const requesAssign = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/trips/?search_key=${location?.params?.search_key}&currentPage=${pageAssign}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setRouteListAssign(oldArray => [...oldArray, ...response.data.data]);
          setRouteList_countAssign(response?.data.noRecords);
          setTotalPageAssign(response?.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log('routes', error);
        // setError(error)
      })
      .finally(function () {
        setLoaderAssign(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requesAssign();
  }, [errorAssign, pageAssign]);

  const fetchMoreDataAssign = () => {
    setLoadMoreAssign(true)
    if (totalPageAssign != pageAssign) {
      setPageAssign(pageAssign + 1)
    } else {
      setLoadMoreAssign(false)
    }
  }

  const newRouteList = Array.from(new Set(routeListAssign?.map(a => a?.trip?.id)))
    .map(id => {
      return routeListAssign?.find(a => a?.trip?.id === id)
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
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#252F40' }}>Route Assign</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
          <Pressable>
            <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

            </Center>
          </Pressable>
        </View>

        <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{routeList_countAssign}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
        </View>

        <View >
          {loaderAssign ?
            <View style={{ paddingTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <View style={{ paddingHorizontal: 15, }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                  return (
                    <>
                      {newRouteList?.length === 0 ?
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                        </View>
                        :
                        loadMoreAssign ?
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
                onEndReachedThreshold={0.2}
                onEndReached={fetchMoreDataAssign}
                horizontal={false}
                data={newRouteList}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 12, paddingBottom: 12, }}>
                      <Pressable onPress={() => expanded === item?.trip?.id ? handlePress({ id: 0, userid: item?.trip?.assignedBy }) : handlePress({ id: item?.trip?.id, userid: item?.trip?.assignedBy })} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                        <Row>
                          <Col xs={1} sm={1} md={1} lg={1}>
                            {expanded === item?.trip?.id ?
                              <AntDesign onPress={() => handlePress({ id: 0, userid: item?.trip?.assignedBy })} name={"minuscircleo"} size={20} color={'#67748E'} />
                              :
                              <AntDesign onPress={() => handlePress({ id: item?.trip?.id, userid: item?.trip?.assignedBy })} name={"pluscircleo"} size={20} color={'#67748E'} />
                            }
                          </Col>

                          <Col xs={11} sm={11} md={11} lg={11}>
                          <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.route?.name === null ? item?.trip?.routeId : item?.route?.name}</Text>
                          </Col>
                        </Row>
                      </Pressable>

                      {expanded === item?.trip?.id ?
                        < View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                          <View style={{ marginHorizontal: 20 }}>
                            <Row>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Sequence</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.route?.legs?.length}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Route name</Text>
                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesome5 name={'route'} color={'blue'} size={20} />
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', paddingLeft: 10, fontSize: 12, color: '#252F40' }}>{item?.route?.name}</Text>
                                  </View>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Route Type</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.route?.routeType}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Entity</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.device?.name}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Trip Status</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.trip?.status === null ? 'Trip Created Not Started' : item?.trip?.status === "finished" ? 'Trip Finished' : 'Trip Created Not Started'}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Initial Odometer</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.trip?.initialOdometer}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Closing Odometer</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.trip?.closingOdometer}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Time</Text>
                                  {item?.trip?.startTime === null ?
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                    :
                                    <View>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.trip?.startTime).getDate()} ${months[new Date(item?.trip?.startTime).getMonth()]} ${new Date(item?.trip?.startTime).getFullYear()}`}</Text>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{moment(item?.trip?.startTime)?.format(' hh:mm A')}</Text>
                                    </View>
                                  }
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>End Time</Text>
                                  {item?.trip?.endTime === null ?
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                    :
                                    <View>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.trip?.endTime).getDate()} ${months[new Date(item?.trip?.endTime).getMonth()]} ${new Date(item?.trip?.endTime).getFullYear()}`}</Text>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{moment(item?.trip?.endTime)?.format(' hh:mm A')}</Text>
                                    </View>
                                  }
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Tag</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.trip?.remarks}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Assign Time</Text>
                                  {item?.trip?.assignedTime === null ?
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                    :
                                    <View>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.trip?.assignedTime).getDate()} ${months[new Date(item?.trip?.assignedTime).getMonth()]} ${new Date(item?.trip?.assignedTime).getFullYear()}`}</Text>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{moment(item?.trip?.assignedTime)?.format(' hh:mm A')}</Text>
                                    </View>
                                  }
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Assigned By</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{getUserName?.name === undefined ? '-' : getUserName?.name}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Status</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.trip?.status === null ? '-' : item?.trip?.status}</Text>
                                </View>
                              </Col>
                            </Row>
                          </View>
                          <View style={{ marginHorizontal: 20, }}>
                            <View style={{}}>
                              <Pressable onPress={() => Navigation.navigate({ name: 'EditRouteAsignScreen', params: { asign_id: item?.trip?.id } })} style={{ alignSelf: 'flex-start', backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                <FontAwesome5 name='edit' size={15} color={'#ffffff'} />
                                <Text style={{ paddingLeft: 5, color: Colors.white, fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Edit</Text>
                              </Pressable>
                            </View>
                          </View>

                          {item?.route?.legs === null ?
                            null
                            :
                            item?.route?.legs.map((value, index) => (
                              <View key={index} style={{ marginHorizontal: 10, marginTop: 20 }}>
                                <Text h6 style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Sequence {value?.routeIndex}</Text>
                                <View style={{ paddingHorizontal: 10, margin: 5, padding: 15, backgroundColor: '#f5f6fa', borderRadius: 5 }}>
                                  <Row>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                      <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Entity</Text>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                      </View>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                      <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Name</Text>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{value?.nameFrom === null ? '-' : value?.nameFrom} - {value?.nameTo === null ? '-' : value?.nameTo}</Text>
                                      </View>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                      <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Planned Time</Text>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                      </View>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                      <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Planned ETA</Text>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                      </View>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                      <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Actual Time</Text>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                      </View>
                                    </Col>
                                  </Row>
                                </View>
                              </View>
                            ))}

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
    </Fragment>
  )
}

export default SearchRoutesAssignScreen