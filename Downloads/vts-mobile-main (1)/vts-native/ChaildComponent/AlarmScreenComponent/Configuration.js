import React, { Fragment, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FlatList, Text, Pressable, LayoutAnimation, UIManager, Platform, ActivityIndicator, ToastAndroid, Modal } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Row, Col } from 'react-native-responsive-grid-system';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useHeader } from '../../ApiHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Configuration = ({ setLoaderConfiguration, requestConfiguration, setPageConfiguration, setConfigurationList, fetchMoreDataConfiguration, loaderConfiguration, loadMoreConfiguration, configurationList, }) => {
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = useState();
  const [alarmId, setAlarmId] = useState('');
  const [customModal, setCustomModal] = useState({ message: '', DownloadDirectoryPath: null, isModal: false, status: null });


  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


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

      <View style={{ marginBottom: 10, marginHorizontal: 15 }}>
        {loaderConfiguration ?
          <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: "center", display: 'flex' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View style={{ paddingBottom: 300 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <>
                    {loadMoreConfiguration ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                      </View>
                    }
                  </>
                )
              }}
              onEndReachedThreshold={0.5}
              onEndReached={fetchMoreDataConfiguration}
              horizontal={false}
              data={configurationList}
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

                    {expanded === item?.id ?
                      <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 10 }}>
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

                        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                          <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                            <Pressable onPress={() => Navigation.navigate({ name: 'EditAlarmScreen', params: { alarm_id: item.id } })} style={{ backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
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
    </Fragment>
  )
}

export default Configuration;