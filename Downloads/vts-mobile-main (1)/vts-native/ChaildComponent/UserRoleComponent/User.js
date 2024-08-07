import React, { Fragment, useEffect } from 'react'
import { View } from 'react-native';
import { Text, Pressable, BackHandler } from 'react-native';
import { Divider, } from 'native-base';
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Row, Col } from 'react-native-responsive-grid-system';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import { useHeader } from '../../ApiHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const User = ({ userRefresh, navigation, userList, userCount, loaderUser, loadMoreUser, fetchMoreDataUser, }) => {
  const [expanded, setExpanded] = React.useState();
  const [roleName, setRoleName] = React.useState({ rolename: null });
  const { ApiRequestAuthorizationHook } = useHeader();

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
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);


  return (
    <Fragment>
      <View style={{ backgroundColor: '#ebebfd', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{userCount}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Results Found</Text>
          <View style={{ flexGrow: 1 }} />
          {/* <Pressable onPress={() => userRefresh()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#4646f2', width: 34, marginRight: 5, height: 34, borderRadius: 5 }}>
            <SimpleLineIcons name='refresh' size={20} color={'#ffffff'} />
          </Pressable> */}

          <Pressable onPress={() => navigation.navigate('AddUserScreen')} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#4646f2', width: 93, height: 34, borderRadius: 5 }}>
            <Text style={{ color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold', textAlign: 'center' }}>Add User</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        {loaderUser ?
          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 100, }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View>
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 20, marginTop: 20, paddingBottom: 10 }}>
                    <Row>
                      <Col xs={8} sm={8} md={8} lg={8}>
                        <View style={{ width: '50%' }}>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', textAlign: 'center' }}>Name</Text>
                        </View>
                      </Col>
                      <Col xs={4} sm={4} md={4} lg={4}>
                        <View>
                          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>User type</Text>
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
                    {loadMoreUser ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 450 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 450 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                      </View>
                    }
                  </>
                )
              }}
              onEndReachedThreshold={0.1}
              onEndReached={fetchMoreDataUser}
              horizontal={false}
              data={userList}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 15, paddingBottom: 15 }}>
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
                            <Pressable onPress={() => navigation.navigate({ name: 'EditUserScreen', params: { user_id: item?.id } })} style={{ alignSelf: 'flex-start', backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
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
        }
      </View>
    </Fragment>
  )
}

export default User