import React, { Fragment, } from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import { FlatList, Text, Pressable, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';
import { useHeader } from '../../ApiHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Logs = ({ logsList, loaderLog, loadMoreLog, fetchMoreDataLog, }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = useState();
  const [dataSet, setDataSet] = useState('');
  const [showAddress, setShowAddress] = useState(false)

  const handlePress = async (event) => {
    setShowAddress(false)
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

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Fragment>
      <View style={{ marginBottom: 10, marginHorizontal: 15 }}>
        {loaderLog ?
          <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: "center", display: 'flex' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View>
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <View style={{ display: 'flex', alignItems: "center", flexDirection: 'row', paddingBottom: 8, paddingTop: 10 }}>
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ width: '100%', }}>
                          <Text style={{ color: '#000000', textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Device name</Text>
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View>
                          <Text style={{ color: '#000000', textAlign: 'center', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Alert Type</Text>
                        </View>
                      </Col>
                    </Row>
                  </View>
                )
              }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <>
                    {loadMoreLog ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 450 }}>
                        <Text style={{ color: '#333' }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 450 }}>
                        <Text style={{ color: '#333' }}>No Data at the moment</Text>
                      </View>
                    }
                  </>
                )
              }}
              onEndReachedThreshold={0.5}
              onEndReached={fetchMoreDataLog}
              horizontal={false}
              data={logsList}
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
    </Fragment>
  )
}

export default Logs;