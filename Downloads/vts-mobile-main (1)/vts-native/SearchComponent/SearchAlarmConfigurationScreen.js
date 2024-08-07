import React, { Fragment, useState, } from 'react';
import { View, StatusBar, Pressable, BackHandler, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
import { Text, Divider } from 'native-base';
import { useHeader } from '../ApiHeader';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Col, Row } from "react-native-responsive-grid-system";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchAlarmConfigurationScreen = () => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = useState();
  const [pageConfiguration, setPageConfiguration] = useState(1);
  const [totalPageConfiguration, setTotalPageConfiguration] = useState(0)
  const [loaderConfiguration, setLoaderConfiguration] = useState(true)
  const [loadMoreConfiguration, setLoadMoreConfiguration] = useState(false);
  const [configurationList, setConfigurationList] = useState([])
  const [configurationCount, setConfigurationCount] = useState('0');
  const [alarmId, setAlarmId] = useState('');
  const [customModal, setCustomModal] = useState({ message: '', DownloadDirectoryPath: null, isModal: false, status: null });

  const pageSize = 20;
  const requestConfiguration = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/search/alarm/notification/config?search_key=${location?.params?.search_key}&currentPage=${pageConfiguration}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setConfigurationList(oldArray => [...oldArray, ...response.data.data]);
          setConfigurationCount(response.data.noRecords)
          setTotalPageConfiguration(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log("Configuration", error);
        // setErrorConfiguration(error);
        setLoaderConfiguration(true)
      })
      .finally(function () {
        setLoaderConfiguration(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requestConfiguration();
  }, [pageConfiguration]);

  const fetchMoreDataConfiguration = () => {
    setLoadMoreConfiguration(true)
    if (totalPageConfiguration != pageConfiguration) {
      setPageConfiguration(pageConfiguration + 1)
    } else {
      setLoadMoreConfiguration(false)
    }
  }

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
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

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const newDataConfiguration = Array.from(new Set(configurationList.map(a => a.id)))
    .map(id => {
      return configurationList.find(a => a.id === id)
    })

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      setLoaderConfiguration(true)
      requestConfiguration();
      setPageConfiguration(1)
      setConfigurationList([])
    });
    return unsubscribe;
  }, [Navigation]);

  const onDeleteFunc = async () => {
    await ApiRequestAuthorizationHook.delete(`/notifications/${alarmId}`)
      .then((result) => {
        if (result?.status === 200 || result?.status === 204) {
          ToastAndroid.showWithGravityAndOffset(
            "Group Deleted Succesfully",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          setLoaderConfiguration(true)
          requestConfiguration();
          setPageConfiguration(1)
          setConfigurationList([])
        }
      }).catch((err) => {
        console.log(err)
        ToastAndroid.showWithGravityAndOffset(
          "Group Deleted Failed",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      })
      .finally(() => { setCustomModal({ ...customModal, message: '', isModal: false, status: null }); setAlarmId('') })
  }
  const onConfirm = (event) => {
    setCustomModal({ message: `Are you sure you want to delete the alarm?`, isModal: true, status: 1 })
    setAlarmId(event)
  }

  return (
    <Fragment>
      <Modal visible={customModal.isModal} transparent>
        <View style={{ backgroundColor: '#ebebfd6e', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ backgroundColor: '#ffffff', width: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 35, elevation: 12 }}>
            <Text style={{ fontSize: 16, color: '#252F40', fontFamily: 'OpenSans-Bold' }}>Tracko Let</Text>
            <Text style={{ fontSize: 13, color: '#69768F', fontFamily: 'OpenSans-SemiBold', paddingTop: 10, paddingBottom: 25 }}>{customModal?.message}</Text>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Pressable onPress={() => { setCustomModal({ ...customModal, message: '', isModal: false, status: null }); setAlarmId('') }} style={{ backgroundColor: '#F25555', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-SemiBold' }}>Cancel</Text>
                </Pressable>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <TouchableOpacity activeOpacity={0.80} onPress={() => onDeleteFunc()} style={{ backgroundColor: '#4646F2', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-SemiBold' }}>Confirm</Text>
                </TouchableOpacity>
              </Col>
            </Row>
          </View>
        </View>
      </Modal>

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
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#252F40' }}>Configuration</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
          <Pressable>
            <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

            </Center>
          </Pressable>
        </View>


        <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{configurationCount}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
        </View>

        <View style={{ paddingHorizontal: 15, /* backgroundColor: loaderConfiguration ? 'transparent' : '#f5f6fa' */ }}>
          {loaderConfiguration ?
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: "center", display: 'flex' }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                  return (
                    <>
                      {loadMoreConfiguration ?
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                        </View>
                        :
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                        </View>
                      }
                    </>
                  )
                }}
                onEndReachedThreshold={0.5}
                onEndReached={fetchMoreDataConfiguration}
                horizontal={false}
                data={newDataConfiguration}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 15, paddingBottom: 15, }}>
                      <Pressable onPress={() => expanded === item.id ? handlePress(0) : handlePress(item.id)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10, }}>
                        <Row>
                          <Col xs={1} sm={1} md={1} lg={1}>
                            {expanded === item.id ?
                              <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#67748E'} />
                              :
                              <AntDesign onPress={() => handlePress(item.id)} name={"pluscircleo"} size={20} color={'#67748E'} />
                            }
                          </Col>
                          <Col xs={11} sm={11} md={11} lg={11}>
                            <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.type}</Text>
                          </Col>
                        </Row>
                      </Pressable>

                      {expanded === item.id ?
                        < View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 10 }}>
                          <View style={{ paddingHorizontal: 20 }}>
                            <Row>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Notificator</Text>
                                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#3f3fc6' }}>{item?.notificators}</Text>
                                </View>
                              </Col>

                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Created by/on</Text>
                                  {item?.createdon === null ?
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#55d16e' }}>-</Text>
                                    :
                                    <View>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#55d16e' }}>{item?.createdon === null ? '-' : `${new Date(item?.createdon).getDate()} ${months[new Date(item?.createdon).getMonth()]} ${new Date(item?.createdon).getFullYear()}, ${moment(item?.createdon)?.format('hh:mm A')}`}</Text>
                                    </View>
                                  }
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Updated by/on</Text>
                                  {item?.lastupdate === null ?
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#c53535' }}>-</Text>
                                    :
                                    <View>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#c53535' }}>{`${new Date(item?.lastupdate).getDate()} ${months[new Date(item?.lastupdate).getMonth()]} ${new Date(item?.lastupdate).getFullYear()}, ${moment(item?.lastupdate)?.format('hh:mm A')}`}</Text>
                                    </View>
                                  }
                                </View>
                              </Col>
                            </Row>
                          </View>

                          <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                            <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                              <Pressable onPress={() => Navigation.navigate({ name: 'EditAlarmScreen', params: { alarm_id: item.id } })} style={{ alignSelf: 'flex-start', backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                <FontAwesome5 name='edit' size={13} color={'#ffffff'} />
                                <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Regular', fontSize: 14, paddingLeft: 5 }}>Edit</Text>
                              </Pressable>
                              <Pressable onPress={() => onConfirm(item?.id)} style={{ backgroundColor: '#F25555', paddingTop: 10, paddingBottom: 10, paddingLeft: 15, paddingRight: 15, borderRadius: 5, marginLeft: 10, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                <MaterialIcons name='delete-outline' size={18} color={'#ffffff'} />
                                <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Regular', fontSize: 14, paddingLeft: 5 }}>Delete</Text>
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
      </View>
    </Fragment>
  )
}

export default SearchAlarmConfigurationScreen