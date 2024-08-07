import React, { Fragment, useState } from 'react'
import { FlatList, ActivityIndicator, View, Text, Pressable, LayoutAnimation, UIManager, Platform, } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const VltdMakeModelList = ({ loadMore, fetchMoreData, loader, listData, }) => {
  const [expanded, setExpanded] = useState();

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
              onEndReachedThreshold={0.2}
              onEndReached={fetchMoreData}
              horizontal={false}
              data={listData}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 12, paddingBottom: 12, }}>
                    <Pressable onPress={() => expanded === item?.id ? handlePress(0) : handlePress(item?.id)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                      {expanded === item?.id ?
                        <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#67748E'} />
                        :
                        <AntDesign onPress={() => handlePress(item?.id)} name={"pluscircleo"} size={20} color={'#67748E'} />
                      }
                      {/* <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingLeft: 10 }}>{deviceData?.find(x => x?.id === item?.deviceId)?.name === undefined ? '-' : deviceData?.find(x => x?.id === item?.deviceId)?.name}</Text> */}
                      <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingLeft: 10 }}>{item?.name}</Text>
                    </Pressable>

                    {expanded === item?.id ?
                      <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                        <View style={{ marginHorizontal: 20 }}>
                          <Row>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Id</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.id === null ? '-' : item?.id}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Unique ID</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.uniqueId === null ? '-' : item?.uniqueId}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Status</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.status === null ? '-' : item?.status}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>lastUpdate</Text>
                                {item?.lastUpdate === null ?
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                  :
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.lastUpdate)?.getDate()} ${months[new Date(item?.lastUpdate)?.getMonth()]} ${new Date(item?.lastUpdate)?.getFullYear()}, ${moment(item?.lastUpdate)?.format(' hh:mm A')}`}</Text>
                                }
                              </View>
                            </Col>

                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>PositionId</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.positionId === null ? '-' : item?.positionId}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>GeofenceId</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.geofenceIds === null ? '-' : item?.geofenceIds}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Phone</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.phone === null ? '-' : item?.phone}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Vehicle Model</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.vehicleModel === null ? '-' : item?.vehicleModel}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Contact</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.contact === null ? '-' : item?.contact}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Category</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.category === null ? '-' : item?.category}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Model</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.vltdmodel === null ? '-' : item?.vltdmodel}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Disabled</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.disabled === null ? '-' : item?.disabled}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Vltd Make</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.vltd_make === null ? '-' : item?.vltd_make}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Serial No</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.serialNo === null ? '-' : item?.serialNo}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Iccid</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.iccid === null ? '-' : item?.iccid}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>CreatedOn</Text>
                                {item?.createdon === null ?
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                  :
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.createdon)?.getDate()} ${months[new Date(item?.createdon)?.getMonth()]} ${new Date(item?.createdon)?.getFullYear()}, ${moment(item?.createdon)?.format(' hh:mm A')}`}</Text>
                                }
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>SimNo1</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.simno1 === null ? '-' : item?.simno1}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>RTO Code</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.rto_code === null ? '-' : item?.rto_code}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>ChassisNo</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.chasisno === null ? '-' : item?.chasisno}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>EngineNo</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.engineno === null ? '-' : item?.engineno}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>PermitHolder</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.permit_holder === null ? '-' : item?.permit_holder}</Text>
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

export default VltdMakeModelList;
