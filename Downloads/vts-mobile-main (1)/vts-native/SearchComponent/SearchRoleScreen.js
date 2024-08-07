import React, { Fragment, useState, } from 'react';
import { View, StatusBar, Pressable, BackHandler } from 'react-native';
import { Text, Divider, } from 'native-base';
import { useHeader } from '../ApiHeader';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator, } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Col, Row } from "react-native-responsive-grid-system";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchRoleScreen = () => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = React.useState();
  const [pageRole, setPageRole] = useState(1);
  const [totalPageRole, setTotalPageRole] = useState(0)
  const [loaderRole, setLoaderRole] = useState(true)
  const [loadMoreRole, setLoadMoreRole] = useState(false);
  const [useRolerCount, setUserRoleCount] = useState('0');
  const [userRoleList, setUserRoleList] = useState([]);

  const pageSize = 20;
  const requestRole = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/search/userrole/?search_key=${location?.params?.search_key}&currentPage=${pageRole}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setUserRoleList(oldArray => [...oldArray, ...response.data.data]);
          setUserRoleCount(response?.data.noRecords);
          setTotalPageRole(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log('user_roles', error);
        // setErrorRole(error);
        setLoaderRole(true)
      })
      .finally(function () {
        setLoaderRole(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requestRole();
  }, [pageRole]);

  const fetchMoreDataRole = () => {
    setLoadMoreRole(true)
    if (totalPageRole != pageRole) {
      setPageRole(pageRole + 1)
    } else {
      setLoadMoreRole(false)
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

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const newDataRoleList = Array.from(new Set(userRoleList.map(a => a.id)))
    .map(id => {
      return userRoleList.find(a => a.id === id)
    })

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      setLoaderRole(true)
      setPageRole(1)
      setUserRoleList([])
      requestRole();
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
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#000000' }}>Users Role</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
          <Pressable>
            <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

            </Center>
          </Pressable>
        </View>


        <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{useRolerCount}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
        </View>

        <View style={{ paddingHorizontal: 15, }}>
          {loaderRole ?
            <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 100, }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <View>
              <FlatList
                ListHeaderComponent={() => {
                  return (
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
                      <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Role Name</Text>
                      </View>
                      <View>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Total Features</Text>
                      </View>
                    </View>
                  )
                }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                  return (
                    <>
                      {loadMoreRole ?
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                          <Text style={{ color: '#333', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                        </View>
                        :
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                          <Text style={{ color: '#333', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                        </View>
                      }
                    </>
                  )
                }}
                onEndReachedThreshold={0.1}
                onEndReached={fetchMoreDataRole}
                horizontal={false}
                data={newDataRoleList}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 2, paddingTop: 15, paddingBottom: 15, }}>
                      <Pressable onPress={() => expanded === item?.id ? handlePress(0) : handlePress(item?.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                        <Row>
                          <Col xs={1} sm={1} md={1} lg={1}>
                            <View style={{ width: '100%' }}>
                              {expanded === item?.id ?
                                <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#7D8EAB'} />
                                :
                                <AntDesign onPress={() => handlePress(item?.id)} name={"pluscircleo"} size={20} color={'#7D8EAB'} />
                              }
                            </View>
                          </Col>
                          <Col xs={8} sm={8} md={8} lg={8}>
                            <View style={{ width: '100%' }}>
                              <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.rolename}</Text>
                            </View>
                          </Col>
                          <Col xs={3} sm={3} md={3} lg={3}>
                            <View style={{ width: '100%' }}>
                              <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>-</Text>
                            </View>
                          </Col>
                        </Row>
                      </Pressable>

                      {expanded === item?.id ?
                        < View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 10 }}>
                          <View style={{ paddingHorizontal: 20 }}>
                            <Row>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Create on</Text>
                                  {item?.createdon === null ?
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#50bf66' }}>-</Text>
                                    :
                                    <View>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#50bf66' }}>{item?.createdon === null ? '-' : `${new Date(item?.createdon).getDate()} ${months[new Date(item?.createdon).getMonth()]} ${new Date(item?.createdon).getFullYear()}, ${moment(item?.createdon)?.format(' hh:mm A')}`}</Text>
                                    </View>
                                  }
                                </View>
                              </Col>
                              <Col xs={6} sm={6} md={6} lg={6}>
                                <View style={{ marginTop: 20 }}>
                                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Last Update</Text>
                                  {item?.lastupdate === null ?
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#ef4444' }}>-</Text>
                                    :
                                    <View>
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#ef4444' }}>{item?.lastupdate === null ? '-' : `${new Date(item?.lastupdate).getDate()} ${months[new Date(item?.lastupdate).getMonth()]} ${new Date(item?.lastupdate).getFullYear()}, ${moment(item?.lastupdate)?.format(' hh:mm A')}`}</Text>
                                    </View>
                                  }
                                </View>
                              </Col>
                            </Row>
                          </View>
                          <View style={{ marginHorizontal: 20, marginTop: 55 }}>
                            <View style={{ position: 'absolute', left: 0, bottom: 0, }}>
                              <Pressable onPress={() => Navigation.navigate({ name: 'EditUserRoleScreen', params: { Role_Id: item?.id } })} style={{ alignSelf: 'flex-start', backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
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
      </View>
    </Fragment>
  )
}

export default SearchRoleScreen