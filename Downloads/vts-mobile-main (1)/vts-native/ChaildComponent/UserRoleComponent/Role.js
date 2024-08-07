import React, { Fragment, } from 'react'
import { View } from 'react-native';
import { Text, Pressable } from 'react-native';
import { Divider, } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator, } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Role = ({ roleRefresh, loaderRole, loadMoreRole, useRolerCount, userRoleList, fetchMoreDataRole, }) => {
  let Navigation = useNavigation();
  const [expanded, setExpanded] = React.useState();

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Fragment>
      <View>
        <View style={{ backgroundColor: '#ebebfd', }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
            <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{useRolerCount}</Text>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Results Found</Text>
            <View style={{ flexGrow: 1 }} />
            {/* <Pressable onPress={() => roleRefresh()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#4646f2', width: 34, marginRight: 5, height: 34, borderRadius: 5 }}>
              <SimpleLineIcons name='refresh' size={20} color={'#ffffff'} />
            </Pressable> */}

            <Pressable onPress={() => Navigation.navigate('AddUserRoleScreen')} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#4646f2', width: 93, height: 34, borderRadius: 5 }}>
              <Text style={{ color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold', textAlign: 'center' }}>Add Role</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          {loaderRole === true ?
            <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 100, }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
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
              onEndReached={fetchMoreDataRole}
              horizontal={false}
              data={userRoleList}
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
                      <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 10 }}>
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
          }
        </View>

      </View>
    </Fragment >
  )
}

export default Role;