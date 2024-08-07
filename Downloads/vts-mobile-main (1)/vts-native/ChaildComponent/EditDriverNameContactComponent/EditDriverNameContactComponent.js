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

const EditDriverNameContactComponent = ({ loader, setLoader, value, setValue }) => {
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null });
  const [driverName, setDriverName] = useState(false)
  const [driverContact, setDriverContact] = useState(false)
  const [driverContactValid, setDriverContactValid] = useState(false)

  const onChangeDriverName = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, altContactPerson: Text });
      setDriverName(false);
    } else {
      setValue({ ...value, altContactPerson: Text });
      setDriverName(false)
    };
  };
  const onChangeDriverContact = (Text) => {
    if (Text.trim().length >= 10) {
      setValue({ ...value, altPhone: Text });
      setDriverContact(false);
      setDriverContactValid(false)
    } else {
      setValue({ ...value, altPhone: Text });
      setDriverContact(false)
      setDriverContactValid(true)
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
    if (checkStringNullEmpty(value?.altContactPerson)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDriverName(true)
    }
    if (checkStringNullEmpty(value?.altPhone)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDriverContact(true)
    }
  };

  var EditObj = JSON.stringify({
    id: value?.id,
    altContactPerson: value?.altContactPerson,
    altPhone: value?.altPhone,
  });

  const onEditSubmit = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    validate();
    if (validation === '') {
      if (!driverContactValid) {
        setLoader(true)
        await ApiRequestAuthorizationHook.put(`/device/alt/person/update/${value?.id}`, EditObj, { signal: signal })
          .then(function (res) {
            if (res.status === 200) {
              setCustomModal({ ...customModal, modal: true, message: 'Driver Details Updated Successfully', status: 1 })
            }
          })
          .catch(function (err) {
            console.log('goupr edit', err)
            setCustomModal({ ...customModal, modal: true, message: 'Driver Details Updated failed', status: 0 })
          })
          .finally(() => {
            setLoader(false)
          })
      }
    }
    return () => {
      controller.abort();
    };
  }

  const onRoute = () => {
    Navigation.navigate({ name: 'TrackScreen', params: { name: '' } })
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
          <Text style={{ color: '#444c5b', fontSize: 16, fontFamily: 'OpenSans-Bold', textAlign: 'center' }}>Update Driver Details</Text>
          <Pressable onPress={() => Navigation.goBack()} style={{ position: 'absolute', right: 0 }}>
            <AntDesign name='closecircleo' color={'#69768f'} size={24} />
          </Pressable>
        </View>
        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Driver Name</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
            <Input value={value?.altContactPerson} onChangeText={(Text) => onChangeDriverName(Text)} variant={'unstyled'} placeholderTextColor={'#67748E'} placeholder='Enter Driver Name' style={{ height: 40, color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }} 
            keyboardType='default'
            />
          </View>
          {driverName ?
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Driver Name is required</Text>
            </Animatable.View>
            : null
          }
        </View>
        <View style={{ paddingTop: 12 }}>
          <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Driver Contact</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
            <Input value={value?.altPhone} keyboardType={'number-pad'} maxLength={10} onChangeText={(Text) => onChangeDriverContact(Text)} variant={'unstyled'} placeholderTextColor={'#67748E'} placeholder='Enter Driver Contact' style={{ height: 40, color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }} />
          </View>
          {driverContact ?
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Driver Contact is required</Text>
            </Animatable.View>
            : null
          }
          {driverContactValid ?
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Enter 10 digit contact number</Text>
            </Animatable.View>
            : null
          }
        </View>
        <Pressable onPress={() => onEditSubmit()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 7, marginTop: 40, marginBottom: 40 }}>
          <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Update</Text>
        </Pressable>
      </View>
    </Fragment>
  )
}

export default EditDriverNameContactComponent