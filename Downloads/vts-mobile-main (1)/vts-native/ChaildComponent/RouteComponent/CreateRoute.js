import React, { Fragment } from 'react';
import { View, Text, } from 'react-native';
import { Divider, } from 'native-base';
import { FlatList, ActivityIndicator, Pressable, LayoutAnimation, UIManager, Platform } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';
import { useHeader } from '../../ApiHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CreateRoute = ({ navigation, loadMoreAssign, routeListAssign, routeList_countAssign, loaderAssign, fetchMoreDataAssign }) => {
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

  const newRouteList = Array.from(new Set(routeListAssign?.map(a => a?.trip?.id)))
    .map(id => {
      return routeListAssign?.find(a => a?.trip?.id === id)
    })

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Fragment>
      <View style={{ backgroundColor: '#ebebfd', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{routeList_countAssign}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Route ID Found</Text>
          <View style={{ flexGrow: 1 }} />
          <Pressable onPress={() => navigation.navigate('AddRouteAsignScreen')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4646f2', paddingLeft: 8, paddingRight: 8, paddingTop: 8, paddingBottom: 8, borderRadius: 5 }}>
            <AntDesign name='pluscircleo' size={14} color={'#FFFFFF'} style={{ paddingRight: 5 }} />
            <Text style={{ color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold', textAlign: 'center' }}>Assign Route</Text>
          </Pressable>
        </View>
      </View>
      <View >
        {loaderAssign ?
          <View style={{ paddingTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View style={{ paddingHorizontal: 15, paddingBottom: 320 }}>
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
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 13 }}>Fetching More Data....</Text>
                        </View>
                        :
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>No Data at the moment</Text>
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
                      <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
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
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.trip?.startTime === null ? '' : `${new Date(item?.trip?.startTime).getDate()} ${months[new Date(item?.trip?.startTime).getMonth()]} ${new Date(item?.trip?.startTime).getFullYear()}`}</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.trip?.startTime === null ? '' : moment(item?.trip?.startTime)?.format(' hh:mm A')}</Text>
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
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.trip?.endTime === null ? '' : `${new Date(item?.trip?.endTime).getDate()} ${months[new Date(item?.trip?.endTime).getMonth()]} ${new Date(item?.trip?.endTime).getFullYear()}`}</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.trip?.endTime === null ? '' : moment(item?.trip?.endTime)?.format(' hh:mm A')}</Text>
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
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>{item?.trip?.status === null ? '-' : item?.trip?.status}</Text>
                              </View>
                            </Col>
                          </Row>
                        </View>
                        <View style={{ marginHorizontal: 20, }}>
                          <View style={{}}>
                            <Pressable onPress={() => navigation.navigate({ name: 'EditRouteAsignScreen', params: { asign_id: item?.trip?.id } })} style={{ alignSelf: 'flex-start', backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
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

    </Fragment>
  )
}

export default CreateRoute