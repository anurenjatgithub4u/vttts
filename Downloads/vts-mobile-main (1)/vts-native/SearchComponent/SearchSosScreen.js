import React, { Fragment, useState, } from 'react';
import { View, StatusBar, Pressable, BackHandler } from 'react-native';
import { Text, Divider } from 'native-base';
import { useHeader } from '../ApiHeader';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Col, Row } from "react-native-responsive-grid-system";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchSosScreen = () => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState(null);
  const [expanded, setExpanded] = React.useState();
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null)
  const [sosData, setSosData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/search/event/sos?search_key=${location?.params?.search_key}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setSosData(response.data);
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
        // setError(error)
        setLoading(true)
      })
      .finally(function () {
        setLoading(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    fetchData();
  }, [error, page])

  const handlePress = async (event) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(event?.id)
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
    const backAction = () => {
      Navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      setLoading(true)
      fetchData();
      setPage(1)
      setSosData([])
    });
    return unsubscribe;
  }, [Navigation]);

  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#252F40' }}>Panic</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
          <Pressable>
            <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

            </Center>
          </Pressable>
        </View>
        <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{sosData?.length === undefined ? 0 : sosData?.length}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
        </View>

        <View style={{ /* backgroundColor: loading ? 'transparent' : '#f5f6fa' */ }}>
          {loading ?
            <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 30, paddingBottom: 30 }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <View>
              <FlatList
                ListHeaderComponent={() => {
                  return (
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 25, marginTop: 10 }}>
                      <Row>
                        <Col xs={4} sm={4} md={4} lg={4}>
                          <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000' }}>Serial #</Text>
                          </View>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4}>
                          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000' }}>Vehicle #</Text>
                          </View>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4}>
                          <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#000000' }}>Status</Text>
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
                      {sosData.length === 0 ?
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 300 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                        </View>
                        :
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 300 }}>

                        </View>
                      }
                    </>
                  )
                }}
                onEndReachedThreshold={0.2}
                horizontal={false}
                data={sosData}
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
                          <Col xs={3} sm={3} md={3}>
                            <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.id}</Text>
                          </Col>
                          <Col xs={4} sm={4} md={4}>
                            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                              <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.vehicleNo}</Text>
                            </View>
                          </Col>
                          <Col xs={4} sm={4} md={4}>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                              <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.status}</Text>
                            </View>
                          </Col>
                        </Row>
                      </Pressable>

                      {expanded === item.id ?
                        < View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 10 }}>
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
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.remark === null ? '-' : item?.remark}</Text>
                                </View>
                              </Col>
                            </Row>
                          </View>

                          <View style={{ marginHorizontal: 20, marginTop: 55 }}>
                            <View style={{ position: 'absolute', left: 0, bottom: 0, }}>
                              <Pressable onPress={() => { AsyncStorage.setItem('sos_data', JSON.stringify(item)); Navigation.navigate({ name: 'EditPanicScreen', params: { sos_id: item.id } }) }} style={{ alignSelf: 'flex-start', backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
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
            </View>
          }
        </View >
      </View>
    </Fragment>
  )
}

export default SearchSosScreen