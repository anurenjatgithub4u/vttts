import React, { Fragment, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Pressable } from 'react-native';
import { ToastAndroid, Modal, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Col, Row } from "react-native-responsive-grid-system"
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';
import { setDateFunction } from '../../constants/UnitConvert';

const RenderList = ({ setGroupData, requestGroup, setPageGroup, setLoadingGroup, handlePress, expanded, item }) => {
  let Navigation = useNavigation()
  let Location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [groupId, setGroupId] = useState('');
  const [customModal, setCustomModal] = useState({ message: '', DownloadDirectoryPath: null, isModal: false, status: null });
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

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


  useEffect(() => {
    if (Location?.params?.userRole?.permission?.group === 12) { // create
      setIsDelete(false)
      setIsEdit(false)
    } else if (Location?.params?.userRole?.permission?.group === 6) { // edit 
      setIsEdit(true)
      setIsDelete(false)
    } else if (Location?.params?.userRole?.permission?.group === 5) { // delete 
      setIsDelete(true)
      setIsEdit(false)
    } else if (Location?.params?.userRole?.permission?.group === 4) { // read
      setIsEdit(false)
      setIsDelete(false)
    } else if (Location?.params?.userRole?.permission?.group === 14) { // read  create edit 
      setIsEdit(true)
      setIsDelete(false)
    } else if (Location?.params?.userRole?.permission?.group === 15) { // create edit delete 
      setIsEdit(true)
      setIsDelete(true)
    } else if (Location?.params?.userRole?.permission?.group === 0) { // no permission
      setIsEdit(false)
      setIsDelete(false)
    }
  }, [Location])

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

      <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4 }}>
        <Pressable onPress={() => expanded === item?.id ? handlePress(0) : handlePress(item?.id)} style={{ display: 'flex', alignItems: 'center', /* justifyContent: 'center', */ flexDirection: 'row', marginHorizontal: 10, paddingTop: 10, paddingBottom: 10 }}>
          <Row>
            <Col xs={1} sm={1} md={1} lg={1}>
              <View style={{ width: 25, height: 25, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                {expanded === item?.id ?
                  <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#7D8EAB'} />
                  :
                  <AntDesign onPress={() => handlePress(item?.id)} name={"pluscircleo"} size={20} color={'#7D8EAB'} />
                }
              </View>
            </Col>
            <Col xs={7} sm={7} md={7} lg={7}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', }}>
                <Text numberOfLines={1} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingLeft: 10 }}>{item?.name}</Text>
              </View>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                <Text numberOfLines={1} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingLeft: 10, }}>-</Text>
              </View>
            </Col>
          </Row>
        </Pressable>
        {expanded === item?.id ?
          <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
            <View style={{ marginHorizontal: 10 }}>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Create On</Text>
                    {item?.createdon === null ?
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>-</Text>
                      :
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{setDateFunction(item?.createdon)?.DateFormate},{setDateFunction(item?.createdon)?.TimeFormate}</Text>
                      </View>
                    }
                  </View>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Update On</Text>
                    {item?.lastupdate === null ?
                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#63CE78' }}>-</Text>
                      :
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: 'green' }}>{setDateFunction(item?.lastupdate)?.DateFormate},{setDateFunction(item?.lastupdate)?.TimeFormate}</Text>
                      </View>
                    }
                  </View>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    {isEdit ?
                      <>
                        <Pressable onPress={() => Navigation.navigate({ name: 'EditEntityGroupScreen', params: { Group_Id: item?.id } })} style={{ backgroundColor: '#7474f5', paddingTop: 8, paddingBottom: 8, borderRadius: 5, width: 100, marginTop: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                          <FontAwesome5 name='edit' size={16} color={'#ffffff'} />
                          <Text style={{ color: "#ffffff", textAlign: 'center', paddingLeft: 5, fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Edit</Text>
                        </Pressable>
                        <View style={{ marginLeft: 2, marginRight: 2 }} />
                      </> : null}
                    {isDelete ?
                      <TouchableOpacity activeOpacity={0.80} onPress={() => onConfirm(item?.id)} style={{ backgroundColor: '#F25555', paddingTop: 8, paddingBottom: 8, borderRadius: 5, width: 100, marginTop: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <MaterialIcons name='delete-outline' size={18} color={'#ffffff'} />
                        <Text style={{ color: "#ffffff", textAlign: 'center', paddingLeft: 5, fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Delete</Text>
                      </TouchableOpacity> : null}
                  </View>
                </Col>
              </Row>
            </View>
          </View>
          : null}
      </View>
    </Fragment>
  )
}

export default RenderList