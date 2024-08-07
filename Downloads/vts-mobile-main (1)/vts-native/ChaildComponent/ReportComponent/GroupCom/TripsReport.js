import React, { Fragment } from 'react'
import { FlatList, ActivityIndicator, View, Text, Pressable, LayoutAnimation, UIManager, Platform } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';
import { MeterToKm, setOdometer } from '../../../constants/UnitConvert';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const TripsReport = ({ loadMore, fetchMoreData, loader, listData, }) => {
  const [expanded, setExpanded] = React.useState();

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  return (
    <Fragment>
      {loader ?
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
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                        {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                      </View>
                    }
                  </>
                )
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No records found</Text>
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
                        <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Vehicle Name</Text>
                      </Col>
                      <Col xs={5} sm={5} md={5} lg={5}>
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
                  <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 12, paddingBottom: 12, }}>
                    <Pressable onPress={() => expanded === index + 1 ? handlePress(0) : handlePress(index + 1)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                      <Row>
                        <Col xs={1} sm={1} md={1} lg={1}>
                          {expanded === index + 1 ?
                            <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#67748E'} />
                            :
                            <AntDesign onPress={() => handlePress(index + 1)} name={"pluscircleo"} size={20} color={'#67748E'} />
                          }
                        </Col>
                        <Col xs={11} sm={11} md={11} lg={11}>
                          <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.deviceName}</Text>
                        </Col>
                      </Row>
                    </Pressable>

                    {expanded === index + 1 ?
                      < View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                        <View style={{ marginHorizontal: 20 }}>
                          <Row>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Vehicle Name</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.deviceName === null ? '-' : item?.deviceName}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Distance</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.distance === null ? '-' : MeterToKm(item?.distance)}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Average Speed</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.averageSpeed === null ? '-' : item?.averageSpeed}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Max Speed</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.maxSpeed === null ? '-' : item?.maxSpeed}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Spent Fuel</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.spentFuel === null ? '-' : item?.spentFuel}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Odometer</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.startOdometer === null ? '-' : setOdometer(item?.startOdometer)}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>End Odometer</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.endOdometer === null ? '-' : setOdometer(item?.endOdometer)}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Time</Text>
                                {item?.startTime === null ?
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                  :
                                  <View>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.startTime).getDate()} ${months[new Date(item?.startTime).getMonth()]} ${new Date(item?.startTime).getFullYear()}, ${moment(item?.startTime)?.format(' hh:mm A')}`}</Text>
                                  </View>
                                }
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>End Time</Text>
                                {item?.endTime === null ?
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                  :
                                  <View>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.endTime).getDate()} ${months[new Date(item?.endTime).getMonth()]} ${new Date(item?.endTime).getFullYear()}, ${moment(item?.endTime)?.format(' hh:mm A')}`}</Text>
                                  </View>
                                }
                              </View>
                            </Col>
                            {/*  */}
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Position Id</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.startPositionId === null ? '-' : item?.startPositionId}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>End Position Id</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.endPositionId === null ? '-' : item?.endPositionId}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Lat</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.startLat === null ? '-' : item?.startLat}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Lon</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.startLon === null ? '-' : item?.startLon}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>End Lat</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.endLat === null ? '-' : item?.endLat}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>End Lon</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.endLon === null ? '-' : item?.endLon}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Start Address</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.startAddress === null ? '-' : item?.startAddress}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>End Address</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.endAddress === null ? '-' : item?.endAddress}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Duration</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.duration === null ? '-' : item?.duration}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Driver Unique Id</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.driverUniqueId === null ? '-' : item?.driverUniqueId}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Driver Name</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.driverName === null ? '-' : item?.driverName}</Text>
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

export default TripsReport