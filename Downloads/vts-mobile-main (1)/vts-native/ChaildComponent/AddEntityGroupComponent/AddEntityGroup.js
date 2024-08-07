import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Text, Pressable } from 'react-native';
import { ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useState, } from 'react';
import * as Animatable from 'react-native-animatable';
import { Modal, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'native-base';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';

const AddEntityGroup = () => {
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [loader, setLoader] = useState(false)
  const [groupName, setGroupName] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [value, setValue] = useState({
    GroupName: '',
  });

  const onChangeGroupName = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, GroupName: Text });
      setGroupName(false);
    } else {
      setValue({ ...value, GroupName: Text });
      setGroupName(false)
    };
  };

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

  var validation = '';
  const validate = () => {
    if (checkStringNullEmpty(value.GroupName)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setGroupName(true)
    }
  };

  var objGroup = JSON.stringify({
    name: value.GroupName,
    createdon: new Date()
  })

  const onSubmit = async () => {
    validate();
    if (validation === '') {
      setLoader(true)
      await ApiRequestAuthorizationHook.post(`/groups`, objGroup)
        .then(function (res) {
          if (res.status === 200) {
            setLoader(false);
            setCustomModal({ ...customModal, modal: true, message: 'Group Created Successfully', status: 1 })
          }
        })
        .catch(function (err) {
          console.log('group', err);
          setLoader(false)
          setCustomModal({ ...customModal, modal: true, message: 'Group Created failed', status: 0 })
        })
        .finally(() => {
          setLoader(false)
        })
    }
  }

  const onRoute = () => {
    Navigation.goBack()
    setCustomModal({ ...customModal, modal: false, message: '', status: null });
  }

  return (
    <Fragment>
      <Modal visible={customModal.modal} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>CGVTS</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal visible={loader} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#353232d1', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>
      <View style={{ backgroundColor: '#FFFFFF', width: '95%', borderRadius: 10, elevation: 16, padding: 15 }}>
        <View style={{ paddingTop: 10, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#444c5b', fontSize: 16, fontFamily: 'OpenSans-Bold', textAlign: 'center' }}>Add Group</Text>
          <Pressable onPress={() => Navigation.goBack()} style={{ position: 'absolute', right: 0 }}>
            <AntDesign name='closecircleo' color={'#69768f'} size={24} />
          </Pressable>
        </View>
        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Group Name</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
            <Input value={value.GroupName} onChangeText={(Text) => onChangeGroupName(Text)} variant={'unstyled'} placeholderTextColor={'#67748E'} placeholder='Enter Group Name' style={{ height: 40, color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }} />
          </View>
          {groupName ?
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Group Name is required</Text>
            </Animatable.View>
            : null
          }
        </View>
        <Pressable onPress={(event) => onSubmit(event)} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 7, marginTop: 40, marginHorizontal: 25, marginBottom: 40 }}>
          <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Create New Group</Text>
        </Pressable>
      </View>
    </Fragment>
  )
}

export default AddEntityGroup