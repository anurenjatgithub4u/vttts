import React, { Fragment, useState, } from 'react';
import { View, StatusBar, Pressable, BackHandler } from 'react-native';
import { Box, Text, Divider } from 'native-base';
import { useHeader } from '../ApiHeader';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Col, Row } from "react-native-responsive-grid-system"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchUserScreen = () => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [roleName, setRoleName] = React.useState({ rolename: null });
  const [expanded, setExpanded] = React.useState();
  const [pageUser, setPageUser] = useState(1);
  const [totalPageUser, setTotalPageUser] = useState(0)
  const [errorUser, setErrorUser] = useState(null)
  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState('0');
  const [loaderUser, setLoaderUser] = useState(true);
  const [loadMoreUser, setLoadMoreUser] = useState(false);

  const pageSize = 20;
  const requestUser = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/search/user/?search_key=${location?.params?.search_key}&currentPage=${pageUser}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setUserList(oldArray => [...oldArray, ...response.data.data]);
          setUserCount(response?.data.noRecords);
          setTotalPageUser(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log('users', error);
        // setErrorUser(error);
        setLoaderUser(true)
      })
      .finally(function () {
        setLoaderUser(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    requestUser();
  }, [errorUser, pageUser]);

  const fetchMoreDataUser = () => {
    setLoadMoreUser(true)
    if (totalPageUser != pageUser) {
      setPageUser(pageUser + 1)
    } else {
      setLoadMoreUser(false)
    }
  }

  const handlePress = async (event) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(event?.id)
    await ApiRequestAuthorizationHook.get(`/user_roles/${event?.roleId}`)
      .then(function (ress) {
        if (ress.status === 200) {
          setRoleName({ ...roleName, rolename: ress.data.rolename });
        }
      })
      .catch(function (err) {
        console.log(err)
      })
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

  const newDataUserList = Array.from(new Set(userList.map(a => a.id)))
    .map(id => {
      return userList.find(a => a.id === id)
    })

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
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#000000' }}>Users</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
          <Pressable>
            <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

            </Center>
          </Pressable>
        </View>

        <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{userCount}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
        </View>


        <View style={{ paddingHorizontal: 15, /* backgroundColor: loaderUser ? 'transparent' : '#f5f6fa' */ }}>
          {loaderUser ?
            <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 100, }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <View>
              <View>
                <FlatList
                  ListHeaderComponent={() => {
                    return (
                      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 20, marginTop: 20, paddingBottom: 10 }}>
                        <View style={{ width: '50%' }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>Name</Text>
                        </View>
                        <View>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>User type</Text>
                        </View>
                      </View>
                    )
                  }}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={() => {
                    return (
                      <>
                        {loadMoreUser ?
                          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 110 }}>
                            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                          </View>
                          :
                          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 110 }}>
                            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                          </View>
                        }
                      </>
                    )
                  }}
                  onEndReachedThreshold={0.1}
                  onEndReached={fetchMoreDataUser}
                  horizontal={false}
                  data={newDataUserList}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 15, paddingBottom: 15, }}>
                        <Pressable onPress={() => expanded === item?.id ? handlePress({ id: 0, roleId: item?.roleid }) : handlePress({ id: item?.id, roleId: item?.roleid })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                          <Row>
                            <Col xs={1} sm={1} md={1} lg={1}>
                              <View style={{ width: '100%', }}>
                                {expanded === item?.id ?
                                  <AntDesign style={{}} onPress={() => handlePress({ id: 0, roleId: item?.roleid })} name={"minuscircleo"} size={20} color={'#7D8EAB'} />
                                  :
                                  <AntDesign style={{}} onPress={() => handlePress({ id: item?.id, roleId: item?.roleid })} name={"pluscircleo"} size={20} color={'#7D8EAB'} />
                                }
                              </View>
                            </Col>
                            <Col xs={7} sm={7} md={7} lg={7}>
                              <View style={{ width: '100%', }}>
                                <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14, paddingLeft: 6 }}>{item?.name}</Text>
                              </View>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4}>
                              <View style={{ width: '100%', }}>
                                <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>-</Text>
                              </View>
                            </Col>
                          </Row>
                        </Pressable>

                        {expanded === item?.id ?
                          <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 10 }}>
                            <View style={{ paddingHorizontal: 20 }}>
                              <Row>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Phone no.</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.phone === '' || null || undefined ? '-' : item?.phone}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Email</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#FA9826' }}>{item?.email === '' || null || undefined ? '-' : item?.email}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Role</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{roleName?.rolename === null ? '-' : roleName?.rolename}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Created on</Text>
                                    {item?.createdon === null ?
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                                      :
                                      <View>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.createdon).toDateString()}`}</Text>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${moment().utcOffset(item?.createdon).format(' hh:mm A')}`}</Text>
                                      </View>
                                    }
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Manager</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.administrator === true ? 'Yes' : 'No'}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Device access</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.deviceLimit === '' || null || undefined ? '-' : item?.deviceLimit}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>User Limit</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.userLimit === '' || null || undefined ? '-' : item?.userLimit}</Text>
                                  </View>
                                </Col>
                              </Row>
                            </View>
                            <View style={{ marginHorizontal: 20, marginTop: 55 }}>
                              <View style={{ position: 'absolute', lrft: 0, bottom: 0, }}>
                                <Pressable onPress={() => Navigation.navigate({ name: 'EditUserScreen', params: { user_id: item?.id } })} style={{ alignSelf: 'flex-start', backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                  <FontAwesome5 name='edit' size={15} color={'#ffffff'} />
                                  <Text style={{ paddingLeft: 5, color: Colors.white, fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Edit</Text>
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
            </View>
          }
        </View>
      </View>
    </Fragment>
  )
}

export default SearchUserScreen