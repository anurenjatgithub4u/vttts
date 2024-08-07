import React, { Fragment } from 'react'
import { View, Text, Pressable, LayoutAnimation, ActivityIndicator, UIManager, Platform, FlatList } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Row, Col } from 'react-native-responsive-grid-system'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const VehicleList = ({ groupName, loader, fetchMoreData, loadMore, schedule_data }) => {
  let navigation = useNavigation();
  const [expanded, setExpanded] = useState();

  const handlePress = (event) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(event?.id);
  };

  return (
    <Fragment>
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
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 500 }}>
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                    </View>
                    :
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 500 }}>
                      {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                    </View>
                  }
                </>
              )
            }}
            ListEmptyComponent={() => {
              return (
                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                  <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                </View>
              );
            }}
            initialNumToRender={30}
            onEndReachedThreshold={.2}
            onEndReached={fetchMoreData}
            horizontal={false}
            data={schedule_data}
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
                          <Pressable onPress={() => { navigation.navigate({ name: 'EditScheduleReportScreen', params: { schedule_id: item?.id } }) }} style={{ alignSelf: 'flex-start', backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
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

export default VehicleList