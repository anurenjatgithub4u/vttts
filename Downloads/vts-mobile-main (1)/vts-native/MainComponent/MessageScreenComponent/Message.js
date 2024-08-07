import React, { Fragment } from 'react';
import { useState } from 'react';
import { Pressable, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native';
import { Text, FlatList, View, ActivityIndicator, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';//warning-outline
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';//my-location/alt-route
import moment from 'moment';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';
import { MessageTypeList, MessageTypeBackground } from './MessageTypeList'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Message = ({ setLoadingNotifications, setPageNotifications, setNotificationsData, requestNotifications, notificationsData, loadingNotifications, loadMoreNotifications, fetchMoreDataNotifications }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = useState();
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [onSelected, setOnSelected] = useState(false);
  const [onSelectedId, setOnSelectedId] = useState();
  const [loader, setLoader] = useState(false);
  const [modalObject, setModalObject] = useState(null);

  const onSelect = (event) => {
    setOnSelected(true)
    setOnSelectedId(event)
  }
  const unSelect = () => {
    setOnSelected(false)
    setOnSelectedId()
  }
  const onDelete = async () => {
    // setLoader(true)
    // await ApiRequestAuthorizationHook.delete(`/notifications/${onSelectedId}`)
    //   .then(function (ress) {
    //     console.log(ress.status)
    //     if (ress.status === 200) {
    //       setLoader(false)
    //       setCustomModal({ ...customModal, modal: true, message: 'Deleted Successfully', status: 1 })
    //     }
    //   })
    //   .catch(function (err) {
    //     console.log('Delete message', err)
    //     setLoader(false);
    //     setCustomModal({ ...customModal, modal: true, message: 'Deleted failed', status: 0 })
    //   })
  }

  const onRoute = () => {
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
    setLoadingNotifications(true)
    setOnSelected(false)
    setOnSelectedId();
    requestNotifications();
    setPageNotifications(1)
    setNotificationsData([]);
  }

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  // var today = new Date();
  // var priorDate = new Date(new Date().setDate(today.getDate() + 30));
  // 
  // console.log('today', today)
  // console.log('priorDate', priorDate);

  return (
    <Fragment>
      <Modal visible={customModal.modal} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: 'gray', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>TrackoLet</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={loader} transparent >
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>
      <Modal visible={modalObject !== null} hasBackdrop={true} backdropColor={'#ffffff'} onBackButtonPress={() => setModalObject(null)} onBackdropPress={() => setModalObject(null)}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', paddingHorizontal: 15, }}>
          <View style={{ backgroundColor: '#EBEBFD', borderRadius: 5, elevation: 24, zIndex: 999999, padding: 15, alignItems: 'flex-start', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
              <Text style={{ color: '#252F40', fontSize: 18, fontFamily: 'OpenSans-Bold' }}>{modalObject?.alerttype}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, }}>
              <Text style={{ color: '#67748E', textTransform: 'capitalize', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Device Name:{" "}</Text>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{modalObject?.devicename}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, }}>
              <Text style={{ color: '#67748E', textTransform: 'capitalize', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>latitude:{" "}</Text>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{modalObject?.latitude}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, }}>
              <Text style={{ color: '#67748E', textTransform: 'capitalize', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>longitude:{" "}</Text>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{modalObject?.longitude}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, }}>
              <Text style={{ color: '#67748E', textTransform: 'capitalize', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>notificator type:{" "}</Text>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{modalObject?.notificator_type}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
              <Text style={{ color: '#67748E' }}>{`${new Date(modalObject?.eventtime).getDate()} ${month[new Date(modalObject?.eventtime).getMonth()]} ${new Date(modalObject?.eventtime).getFullYear()} ${moment(modalObject?.eventtime).format('LT')}`}</Text>
            </View>
            <TouchableOpacity onPress={() => setModalObject(null)} style={{ backgroundColor: '#4646F2', width: '100%', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 5, marginTop: 25, marginBottom: 15 }}>
              <Text style={{ fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#FFFFFF' }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ height: 50, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', position: 'absolute', width: '100%', display: onSelected ? 'flex' : 'none', paddingHorizontal: 15 }}>
        <Pressable onPress={() => unSelect()} style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Ionicons name='close' size={22} color={'#B9B9B9'} />
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>1 Selected</Text>
        </Pressable>
        <View style={{ flexGrow: 1 }} />
        <Pressable onPress={() => onDelete()} style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ color: '#67748E', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Delete Selected</Text>
          <MaterialCommunityIcons name='trash-can-outline' size={22} color={'#67748E'} />
        </Pressable>
      </View>
      {loadingNotifications ?
        <View style={{ paddingTop: 100, /* backgroundColor: '#ebebfd', */ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
        :
        <FlatList
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return (
              <>
                {loadMoreNotifications ?
                  <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                  </View>
                  :
                  <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', }}>
                    {/* <Text style={{ color: '#333' }}>No Data at the moment</Text> */}
                  </View>
                }
              </>
            )
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
              </View>
            );
          }}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreDataNotifications}
          horizontal={false}
          data={notificationsData}
          renderItem={({ item, index }) => {
            return (
              <Pressable onPress={() => expanded === item?.id ? handlePress(0) : handlePress(item?.id)} /* onPress={() => setModalObject(item)} */ style={{ backgroundColor: item?.isRead === true ? '#ffffff' : '#f7f7ff', borderBottomColor: item?.isRead === true ? '#ffffff' : '#ebebfd', marginTop: 2, paddingTop: 10, paddingBottom: 10, paddingHorizontal: 10, flexDirection: 'row', }}>
                <Pressable /* onLongPress={() => onSelect(item?.id)} */ style={{ justifyContent: 'center', alignItems: 'center', width: 38, height: 38, backgroundColor: MessageTypeBackground(item), borderRadius: 50 }}>
                  {MessageTypeList(item, onSelectedId)}
                </Pressable>

                <View style={{ paddingLeft: 10 }}>
                  <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>{item?.alerttype}</Text>
                  {expanded === item?.id ?
                    null :
                    <Text style={{ color: '#67748E', fontFamily: 'OpenSans-Regular', fontSize: 10, paddingTop: 5 }}>{`${new Date(item?.eventtime).getDate()}-${month[new Date(item?.eventtime).getMonth()]}-${new Date(item?.eventtime).getFullYear()} ${moment(item?.eventtime).format('LT')}`}</Text>
                  }
                  {expanded === item?.id ?
                    <View style={{ paddingBottom: 20 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, }}>
                        <Text style={{ color: '#252F40', textTransform: 'capitalize', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Vehicle Number:{" "}</Text>
                        <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{item?.devicename}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, }}>
                        <Text style={{ color: '#252F40', textTransform: 'capitalize', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>latitude:{" "}</Text>
                        <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{item?.latitude}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, }}>
                        <Text style={{ color: '#252F40', textTransform: 'capitalize', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>longitude:{" "}</Text>
                        <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>{item?.longitude}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                        <Text style={{ color: '#67748E', fontSize: 10, fontFamily: 'OpenSans-SemiBold' }}>{`${new Date(item?.eventtime).getDate()} ${month[new Date(item?.eventtime).getMonth()]} ${new Date(item?.eventtime).getFullYear()} ${moment(item?.eventtime).format('LT')}`}</Text>
                      </View>
                    </View>
                    : null}
                </View>
              </Pressable>
            )
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      }
    </Fragment>
  )
}

export default Message;
