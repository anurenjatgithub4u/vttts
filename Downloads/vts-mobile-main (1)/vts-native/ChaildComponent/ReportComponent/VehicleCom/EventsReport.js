import React, { Fragment } from 'react'
import { FlatList, ActivityIndicator, View, Text, Pressable, LayoutAnimation, UIManager, Platform, } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHeader } from '../../../ApiHeader'; 

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const EventsReport = ({ value, loadMore, fetchMoreData, loader, listData, }) => {
  const { ApiRequestAuthorizationHook, } = useHeader();
  const [expanded, setExpanded] = React.useState();
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  const getData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/devices/${value?.Vehicle}`, { signal: signal })
      .then(function (ress) {
        if (ress?.status === 200) {
          setDeviceData(ress?.data)
          setLoading(false)
        }
      })
      .catch(function (err) {
        console.log('setDeviceData', err)
      })
    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    getData();
  }, [])


  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  return (
    <Fragment>

      {loading ?
        <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: "center", display: 'flex' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
        :
        loader ?
          <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: "center", display: 'flex' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <Fragment>
            <View style={{ paddingHorizontal: 15, paddingBottom: 350 }} >
              <FlatList
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                  return (
                    <>
                      {loadMore ?
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                        </View>
                        :
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                          {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                        </View>
                      }
                    </>
                  )
                }}
                ListEmptyComponent={() => {
                  return (
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
                    </View>
                  );
                }}
                ListHeaderComponent={() => {
                  return (
                    <View style={{ paddingTop: 10 }}>
                      <Row>
                        <Col xs={1} sm={1} md={1} lg={1}>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                          <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Event Type</Text>
                        </Col>
                        <Col xs={5} sm={5} md={5} lg={5}>
                          <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', textAlign: 'right', paddingRight: 30 }}>Event Time</Text>
                        </Col>
                      </Row>
                    </View>
                  )
                }}
                onEndReachedThreshold={0.2}
                onEndReached={fetchMoreData}
                horizontal={false}
                data={listData}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 14, paddingBottom: 14, }}>
                      <Pressable onPress={() => expanded === item?.id ? handlePress(0) : handlePress(item?.id)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                        <Row>
                          <Col xs={1} sm={1} md={1} lg={1}>
                            {expanded === item?.id ?
                              <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#67748E'} />
                              :
                              <AntDesign onPress={() => handlePress(item?.id)} name={"pluscircleo"} size={20} color={'#67748E'} />
                            }
                          </Col>
                          <Col xs={5} sm={5} md={5} lg={5}>
                            <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.type === undefined ? '-' : item?.type}</Text>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                              <Text numberOfLines={1} style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold', }}>
                                {item?.eventTime === null ?
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                  :
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.eventTime)?.getDate()} ${months[new Date(item?.eventTime)?.getMonth()]} ${new Date(item?.eventTime)?.getFullYear()}, ${moment(item?.eventTime)?.format(' hh:mm A')}`}</Text>
                                }
                              </Text>
                            </View>
                          </Col>
                        </Row>
                      </Pressable>

                      {expanded === item?.id ?
                        <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                          <View style={{ marginHorizontal: 20 }}>
                            <Row>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Vehicle Id</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.deviceId === null ? '-' : item?.deviceId}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Type</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.type === null ? '-' : item?.type}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Event Time</Text>
                                  {item?.eventTime === null ?
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>-</Text>
                                    :
                                    <View>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>{`${new Date(item?.eventTime)?.getDate()} ${months[new Date(item?.eventTime)?.getMonth()]} ${new Date(item?.eventTime)?.getFullYear()}, ${moment(item?.eventTime)?.format(' hh:mm A')}`}</Text>
                                    </View>
                                  }
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Position Id</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.positionId === null ? '-' : item?.positionId}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Geofence Id</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.geofenceId === null ? '-' : item?.geofenceId}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Maintenance Id</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.maintenanceId === null ? '-' : item?.maintenanceId}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Action</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.action === null ? '-' : item?.action}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Remark</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.remark === null ? '-' : item?.remark}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Location</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.location === null ? '-' : item?.location}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Status</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: item?.status === true ? "green" : '#F25555' }}>{item?.status === null ? '-' : item?.status === true ? 'True' : 'False'}</Text>
                                </View>
                              </Col>

                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Geofence Name</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.geofenceName === null ? '-' : item?.geofenceName}</Text>
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 10 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Group Name</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.groupName === null ? '-' : item?.groupName}</Text>
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
          </Fragment>
      }
    </Fragment >
  )
}

export default EventsReport;