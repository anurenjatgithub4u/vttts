import React, { useState, Fragment, useEffect } from 'react';
import { StatusBar } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Pressable } from 'react-native';
import { Divider, Center, } from 'native-base';
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeader } from '../ApiHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchGeofenceScreen = () => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = React.useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [geofenceData, setGeofenceData] = useState([]);
  const [geofenceDataCount, setGeofenceDataCount] = useState('0');
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  const pageSize = 20;
  const request = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`search/geofence/?search_key=${location?.params?.search_key}&currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setGeofenceData(oldArray => [...oldArray, ...response.data.data])
          setGeofenceDataCount(response.data.noRecords)
          setTotalPage(response.data.totalPage);
        }
      })
      .catch(function (error) {
        console.log('geofences', error)
        // setError(error)
      })
      .finally(function () {
        setLoading(false)
      });

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }
  useEffect(() => {
    request()
  }, [page])

  const fetchMoreData = () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  const newDataGeofence = Array.from(new Set(geofenceData.map(a => a.id)))
    .map(id => {
      return geofenceData.find(a => a.id === id)
    })

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      setLoading(true)
      setGeofenceData([])
      setPage(1)
      request();
    });
    return unsubscribe;
  }, [Navigation]);

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
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#252F40' }}>Geofence</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
          <Pressable>
            <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

            </Center>
          </Pressable>
        </View>

        <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{geofenceDataCount}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
        </View>


        {loading ?
          <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View style={{ paddingHorizontal: 15 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <>
                    {loadMore ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 150 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 150 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                      </View>

                    }
                  </>
                )
              }}
              onEndReachedThreshold={0.1}
              onEndReached={fetchMoreData}
              horizontal={false}
              data={newDataGeofence}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 12, paddingBottom: 12, }}>
                    <Pressable onPress={() => expanded === item?.id ? handlePress(0) : handlePress(item?.id)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                      <Row>
                        <Col xs={1} sm={1} md={1} lg={1}>
                          {expanded === item?.id ?
                            <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#7D8EAB'} />
                            :
                            <AntDesign onPress={() => handlePress(item?.id)} name={"pluscircleo"} size={20} color={'#7D8EAB'} />
                          }
                        </Col>

                        <Col xs={11} sm={11} md={11} lg={11}>
                        <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.name === null ? '-' : item?.name}</Text>
                        </Col>
                      </Row>
                    </Pressable>

                    {expanded === item?.id ?
                      <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                        <View style={{ marginHorizontal: 20 }}>
                          <Row>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 15 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Type</Text>
                                {item?.area?.match(/[^()]+/g)[0] === "CIRCLE" ?
                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#4646F2', paddingRight: 8 }}>{item?.area?.match(/[^()]+/g)[0]}</Text>
                                    <FontAwesome name='circle' size={18} color={'#4646F2'} />
                                  </View>
                                  : null}
                                {item?.area?.match(/[^()]+/g)[0] === "POLYGON" ?
                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name='square' size={18} color={'#000000'} />
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', paddingLeft: 8 }}>{item?.area?.match(/[^()]+/g)[0]}</Text>
                                  </View>
                                  : null}
                                {item?.area?.match(/[^()]+/g)[0] === "LINESTRING" ?
                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name='vector-polyline' size={18} color={'#000000'} />
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', paddingLeft: 8 }}>{item?.area?.match(/[^()]+/g)[0] === "LINESTRING" ? 'Polyline' : '-'}</Text>
                                  </View>
                                  : null}
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 15 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Name</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.name === null ? '-' : item?.name}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 15 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Speed Limit</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.attributes?.speedLimit}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 15 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Created By</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.createdByUser === null ? '-' : item?.createdByUser}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 15 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Created on</Text>
                                {item?.createdon === null ?
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#40b657' }}>-</Text>
                                  :
                                  <View>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.createdon).getDate()} ${months[new Date(item?.createdon).getMonth()]} ${new Date(item?.createdon).getFullYear()} ${moment(item?.createdon)?.format('hh:mm A')}`}</Text>
                                  </View>
                                }
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 15 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Modified By</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.modifiedByUser === null ? '-' : item?.modifiedByUser}</Text>
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 15 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Modified On</Text>
                                {item?.lastupdate === null ?
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#40b657' }}>-</Text>
                                  :
                                  <View>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.lastupdate).getDate()} ${months[new Date(item?.lastupdate).getMonth()]} ${new Date(item?.lastupdate).getFullYear()} ${moment(item?.lastupdate)?.format(' hh:mm A')}`}</Text>
                                  </View>
                                }
                              </View>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                              <View style={{ marginTop: 15 }}>
                                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Description</Text>
                                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.description === null ? '-' : item?.description}</Text>
                              </View>
                            </Col>
                          </Row>
                        </View>
                        <View style={{ marginHorizontal: 20, marginTop: 55 }}>
                          <View style={{ position: 'absolute', lrft: 0, bottom: 0, }}>
                            <Pressable onPress={() => Navigation.navigate({ name: 'EditGeofenceScreen', params: { edit_id: item?.id } })} style={{ alignSelf: 'flex-start', backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                              <FontAwesome5 name='edit' size={15} color={'#ffffff'} />
                              <Text style={{ paddingLeft: 5, color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Edit</Text>
                            </Pressable>
                          </View>
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

export default SearchGeofenceScreen