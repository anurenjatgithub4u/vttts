import React from 'react';
import { View, Text, } from 'react-native';
import { Divider, } from 'native-base';
import { FlatList, ActivityIndicator, Pressable, LayoutAnimation, UIManager, Platform } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { useHeader } from '../../ApiHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Routes = ({ loadMore, routeList, routeList_count, loader, fetchMoreData }) => {
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = React.useState();
  const [getUserName, setGetUserName] = React.useState({});

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

  const newRouteList = Array.from(new Set(routeList?.map(a => a?.id)))
    .map(id => {
      return routeList?.find(a => a?.id === id)
    })


  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60)
    var minutes = Math.floor((duration / (1000 * 60)) % 60)
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
  }

  return (
    <View>
      <View style={{ backgroundColor: '#ebebfd', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{routeList_count}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Route ID Found</Text>
          <View style={{ flexGrow: 1 }} />
          <Pressable onPress={() => Navigation.navigate('CreateRouteScreen')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4646f2', paddingLeft: 8, paddingRight: 8, paddingTop: 8, paddingBottom: 8, borderRadius: 5 }}>
            <AntDesign name='pluscircleo' size={14} color={'#FFFFFF'} style={{ paddingRight: 5 }} />
            <Text style={{ color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold', textAlign: 'center' }}>Create Route</Text>
          </Pressable>
        </View>
      </View>
      <View >
        {loader ?
          <View style={{ paddingTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View style={{ paddingHorizontal: 15, paddingBottom: 380 }}>
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
                      loadMore ?
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                        </View>
                        :
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                        </View>
                    }
                  </>
                )
              }}
              onEndReachedThreshold={0.2}
              onEndReached={fetchMoreData}
              horizontal={false}
              data={newRouteList}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 12, paddingBottom: 12, }}>
                    <Pressable onPress={() => expanded === item?.id ? handlePress({ id: 0, userid: item?.createdBy }) : handlePress({ id: item?.id, userid: item?.createdBy })} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                      <Row>
                        <Col xs={1} sm={1} md={1} lg={1}>
                          {expanded === item?.id ?
                            <AntDesign onPress={() => handlePress({ id: 0, userid: item?.createdBy })} name={"minuscircleo"} size={20} color={'#67748E'} />
                            :
                            <AntDesign onPress={() => handlePress({ id: item?.id, userid: item?.createdBy })} name={"pluscircleo"} size={20} color={'#67748E'} />
                          }
                        </Col>

                        <Col xs={11} sm={11} md={11} lg={11}>
                          <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.name === null ? item?.id : item?.name}</Text>
                        </Col>
                      </Row>
                    </Pressable>

                    {expanded === item?.id ?
                      <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                        <View style={{ marginHorizontal: 20 }}>
                          <Row>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Route Type</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.routeType === null ? '-' : item?.routeType}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Route name</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <FontAwesome5 name={'route'} color={'blue'} size={20} />
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', paddingLeft: 10, fontSize: 12, color: '#252F40' }}>{item?.name === null ? '-' : item?.name}</Text>
                                </View>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Stoppage #</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.numStoppage === null ? '-' : item?.numStoppage}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Planned Distance(KM)</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.estimatedDistance === null ? '-' : (item?.estimatedDistance / 1000).toFixed(2)}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Estimated time</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.estimatedDuration === null ? '-' : item?.estimatedDuration?.toString()?.toHHMMSS()}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Created by</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{getUserName?.name === undefined ? '-' : getUserName?.name}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Created on</Text>
                                {item?.createdOn === null ?
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                  :
                                  <View>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{new Date(item?.createdOn).getDate()} {months[new Date(item?.createdOn).getMonth()]} {new Date(item?.createdOn).getFullYear()}, {moment(item?.createdOn)?.format(' hh:mm A')}</Text>
                                  </View>
                                }
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Modified on</Text>
                                {item?.lastUpdate === null ?
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                  :
                                  <View>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.lastUpdate === null ? '' : `${new Date(item?.lastUpdate).getDate()} ${months[new Date(item?.lastUpdate).getMonth()]} ${new Date(item?.lastUpdate).getFullYear()}`}</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.lastUpdate === null ? '' : moment(item?.lastUpdate)?.format(' hh:mm A')}</Text>
                                  </View>
                                }
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Description</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.description === null ? '-' : item?.description}</Text>
                              </View>
                            </Col>
                          </Row>
                        </View>

                        {item?.legs === null ?
                          null
                          :
                          item?.legs.map((value, index) => (
                            <View key={index} style={{ marginHorizontal: 10, marginTop: 20 }}>
                              <Text h6 style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Sequence {value?.routeIndex}</Text>
                              <View style={{ paddingHorizontal: 10, margin: 5, padding: 15, backgroundColor: '#f5f6fa', borderRadius: 5 }}>
                                <Row>
                                  <Col xs={12} sm={12} md={12} lg={12}>
                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Name</Text>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${value?.nameFrom === null ? '-' : value?.nameFrom} - ${value?.nameTo === null ? '-' : value?.nameTo}`}</Text>
                                    </View>
                                  </Col>
                                  <Col xs={6} sm={6} md={6} lg={6}>
                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Distance from origin</Text>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{value?.estDistanceFromOrigin === null ? '-' : (value?.estDistanceFromOrigin / 1000)?.toFixed(2)}</Text>
                                    </View>
                                  </Col>
                                  <Col xs={6} sm={6} md={6} lg={6}>
                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Duration from origin</Text>
                                      {/* <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{new Date(value?.estDurationFromOrigin * 1000)?.toISOString()?.substr(11, 8)}</Text> */}
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{value?.estDurationFromOrigin === null ? '-' : value?.estDurationFromOrigin?.toString()?.toHHMMSS()}</Text>
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
              keyExtractor={(item) => item.id}
            />
          </View>
        }
      </View>
    </View>
  )
}

export default Routes;