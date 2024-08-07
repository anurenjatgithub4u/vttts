import React, { Fragment, useState, useEffect } from 'react';
import { View, StatusBar, Pressable, BackHandler } from 'react-native';
import { Text, Divider } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Center } from 'native-base'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator, Modal, TouchableOpacity, ToastAndroid } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Col, Row } from "react-native-responsive-grid-system";
import { useHeader } from '../ApiHeader';
import BlurViewScreen from '../BlurViewScreen';
import { setDateFunction } from '../constants/UnitConvert';
import RenderList from './GroupHelper/RenderList';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchGroupScreen = () => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [customModal, setCustomModal] = useState({ message: '', DownloadDirectoryPath: null, isModal: false, status: null });
  const [groupId, setGroupId] = useState('');
  const [expanded, setExpanded] = React.useState();
  const [pageGroup, setPageGroup] = useState(1);
  const [totalPageGroup, setTotalPageGroup] = useState(0)
  const [groupData, setGroupData] = useState([]);
  const [groupDataCount, setGroupDataCount] = useState('0');
  const [loadingGroup, setLoadingGroup] = useState(true);
  const [loadMoreGroup, setLoadMoreGroup] = useState(false);

  const pageSize = 20;
  const requestGroup = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/search/group?search_key=${location?.params?.search_key}&currentPage=${pageGroup}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setGroupData(oldArray => [...oldArray, ...response.data.data])
          setGroupDataCount(response.data.noRecords)
          setTotalPageGroup(response.data.totalPage);
        }
      })
      .catch(function (error) {
        console.log('groups', error)
        // setErrorGroup(error)
      })
      .finally(function () {
        setLoadingGroup(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    requestGroup()
  }, [pageGroup])

  const fetchMoreData = () => {
    console.log('setLoadMoreGroup')
    setLoadMoreGroup(true)
    if (totalPageGroup != pageGroup) {
      setPageGroup(pageGroup + 1)
    } else {
      setLoadMoreGroup(false)
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

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      setLoadingGroup(true)
      requestGroup();
      setPageGroup(1);
      setGroupData([]);
    });
    return unsubscribe;
  }, [Navigation]);

  const newDataGroup = Array.from(new Set(groupData.map(a => a.id)))
    .map(id => {
      return groupData.find(a => a.id === id)
    })

  const onDeleteFunc = async () => {
    await ApiRequestAuthorizationHook.delete(`/groups/${groupId}`)
      .then((result) => {
        if (result?.status === 200) {
          ToastAndroid.showWithGravityAndOffset(
            "Group Deleted Succesfully",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          setLoadingGroup(true)
          requestGroup();
          setPageGroup(1);
          setGroupData([]);
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
      .finally(() => { setCustomModal({ ...customModal, message: '', isModal: false, status: null }); setGroupId('') })
  }
  const onConfirm = (event) => {
    setCustomModal({ message: `Are you sure you want to delete the group?`, isModal: true, status: 1 })
    setGroupId(event)
  }

  return (
    <Fragment>
      <Modal visible={customModal.isModal} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#353232d1', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ backgroundColor: '#ffffff', width: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 35, elevation: 12 }}>
            <Text style={{ fontSize: 16, color: '#252F40', fontFamily: 'OpenSans-Bold' }}>CGVTS</Text>
            <Text style={{ fontSize: 13, color: '#69768F', fontFamily: 'OpenSans-SemiBold', paddingTop: 10, paddingBottom: 25 }}>{customModal?.message}</Text>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Pressable onPress={() => { setCustomModal({ ...customModal, message: '', isModal: false, status: null }); setGroupId('') }} style={{ backgroundColor: '#F25555', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-SemiBold' }}>Cancel</Text>
                </Pressable>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Pressable onPress={() => onDeleteFunc()} style={{ backgroundColor: '#4646F2', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-SemiBold' }}>Confirm</Text>
                </Pressable>
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
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#000000' }}>Group</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
          <Pressable>
            <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

            </Center>
          </Pressable>
        </View>

        <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{groupDataCount}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
        </View>

        <View style={{ marginTop: 10, /* backgroundColor: '#f2f3f8', */ paddingHorizontal: 15 }}>
          {loadingGroup ?
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingTop: 18, paddingBottom: 8 }}>
                    <View style={{ flexGrow: .3 }} />
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Name</Text>
                    <View style={{ flexGrow: 1 }} />
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>No. of Vehicles</Text>
                    <View style={{ flexGrow: .3 }} />
                  </View>
                )
              }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <>
                    {loadMoreGroup ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 220 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 220 }}>
                        {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                      </View>
                    }
                  </>
                )
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 220 }}>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
                  </View>
                )
              }}
              onEndReachedThreshold={0.5}
              onEndReached={fetchMoreData}
              horizontal={false}
              data={newDataGroup}
              renderItem={({ item, index }) => {
                return (
                  <RenderList setGroupData={setGroupData} requestGroup={requestGroup} setPageGroup={setPageGroup} setLoadingGroup={setLoadingGroup} handlePress={handlePress} expanded={expanded} item={item} />
                )
              }}
              keyExtractor={(item) => item.id}
            />
          }
          {/* </ScrollView> */}
        </View>
      </View>
    </Fragment>
  )
}

export default SearchGroupScreen