import React, { useState, useEffect } from 'react';
import { FlatList, Text, Pressable, LayoutAnimation, UIManager, Platform, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useHeader } from '../../../ApiHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SosList = ({ searchloadMore, fetchSearchMoreData, newSosSearchList }) => {
  const navigation = useNavigation();
  const Location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState(null);
  const [expanded, setExpanded] = React.useState();
  const [isEdit, setIsEdit] = React.useState(false);

  const handlePress = async (event) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(event?.id)
    setShowAddress(false)
    setShowAddress(false)
    await ApiRequestAuthorizationHook.get(`/server/geocode?latitude=${event?.lat}&longitude=${event?.long}`)
      .then(function (response) {
        if (response?.status === 200) {
          setAddress(response?.data)
        }
      })
      .catch(function (error) {
        console.log(error);
        setAddress('Address not found')
      });
  };

  useEffect(() => {
    if (Location?.params?.userRole?.permission?.sos === 12) { // create
      setIsEdit(false)
    } else if (Location?.params?.userRole?.permission?.sos === 6) { // edit 
      setIsEdit(true)
    } else if (Location?.params?.userRole?.permission?.sos === 5) { // delete 
      setIsEdit(false)
    } else if (Location?.params?.userRole?.permission?.sos === 4) { // read
      setIsEdit(false)
    } else if (Location?.params?.userRole?.permission?.sos === 14) { // read  create edit 
      setIsEdit(true)
    } else if (Location?.params?.userRole?.permission?.sos === 15) { // create edit delete 
      setIsEdit(true)
    } else if (Location?.params?.userRole?.permission?.sos === 0) { // no permission
      setIsEdit(false)
    }
  }, [Location]);

  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <View style={{ paddingBottom: 100 }}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <>
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 25, marginTop: 10, paddingBottom: 10 }}>
                <Row>
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 10 }}>
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#000000' }}>Vehicle</Text>
                    </View>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                      {/* <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000' }}>Vehicle #</Text> */}
                    </View>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={4}>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingRight: 10 }}>
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#000000' }}>Status</Text>
                    </View>
                  </Col>
                </Row>
              </View>
            </>
          )
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return (
            <>
              {searchloadMore ?
                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 300 }}>
                  <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                </View>
                :
                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 300 }}>
                  {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                </View>
              }
            </>
          )
        }}
        ListEmptyComponent={() => {
          return (
            <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
              <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
            </View>
          )
        }}
        onEndReachedThreshold={.2}
        onEndReached={fetchSearchMoreData}
        horizontal={false}
        data={newSosSearchList}
        renderItem={({ item, index }) => {
          return (
            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginHorizontal: 15, marginTop: 4, paddingTop: 12, paddingBottom: 12, }}>
              <Pressable onPress={() => expanded === item.id ? handlePress({ id: 0, lat: item?.latitude, long: item?.longitude }) : handlePress({ id: item.id, lat: item?.latitude, long: item?.longitude })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                <Row>
                  <Col xs={1} sm={1} md={1}>
                    {expanded === item.id ?
                      <AntDesign onPress={() => handlePress({ id: 0, lat: item?.latitude, long: item?.longitude })} name={"minuscircleo"} size={20} color={'#67748E'} />
                      :
                      <AntDesign onPress={() => handlePress({ id: item.id, lat: item?.latitude, long: item?.longitude })} name={"pluscircleo"} size={20} color={'#67748E'} />
                    }
                  </Col>
                  <Col xs={6} sm={6} md={6}>
                    <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.vehicleNo}</Text>
                  </Col>
                  <Col xs={5} sm={5} md={5}>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                      <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.status}</Text>
                    </View>
                  </Col>
                </Row>
              </Pressable>

              {expanded === item.id ?
                <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 10 }}>
                  <View style={{ paddingHorizontal: 20 }}>
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Date &#38; Time</Text>
                          {item?.eventTime === null ?
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                            :
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{new Date(item?.eventTime).getDate()} {month[new Date(item?.eventTime).getMonth()]} {new Date(item?.eventTime).getFullYear()} {moment(item?.eventTime).format('LT')}</Text>
                          }
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Location</Text>
                          {showAddress ?
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{address}</Text>
                            :
                            <Pressable onPress={() => setShowAddress(true)} style={{ paddingTop: 5, }}>
                              <Text style={{ color: 'blue', fontFamily: 'OpenSans-SemiBold', fontSize: 12, width: 85, textAlign: 'center' }}>Show Address</Text>
                            </Pressable>
                          }
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Lat. Long</Text>
                          <View>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.latitude}</Text>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.longitude}</Text>
                          </View>
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Sos Action</Text>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.action === null ? '-' : item?.action}</Text>
                        </View>
                      </Col>

                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Remarks</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#252F40' }}>{item?.remark === null ? '-' : item?.remark}</Text>
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Permit Holder</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#252F40' }}>{item?.permitHolder === null ? '-' : item?.permitHolder}</Text>
                        </View>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <View style={{ marginTop: 20 }}>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Contact</Text>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#252F40' }}>{item?.permitHolderPhone === null ? '-' : item?.permitHolderPhone}</Text>
                        </View>
                      </Col>
                    </Row>
                  </View>

                  {isEdit ?
                    <Pressable onPress={() => { AsyncStorage.setItem('sos_data', JSON.stringify(item)); navigation.navigate({ name: 'EditPanicScreen', params: { sos_id: item.id } }) }} style={{ alignSelf: 'flex-start', backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, marginLeft: 15, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 15, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                      <MaterialCommunityIcons name='square-edit-outline' color={'#ffffff'} size={16} style={{ paddingRight: 10 }} />
                      <Text style={{ color: "#FFFFFF", fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Edit</Text>
                    </Pressable> : null}
                </View>
                : null}
            </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default SosList