import React, { Fragment, useState } from 'react'
import { Text, View, ActivityIndicator, Modal, Pressable, TouchableOpacity, ToastAndroid } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Input } from 'native-base';
import { useHeader } from '../../ApiHeader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { BlurView, } from "@react-native-community/blur";

const UpdateContact = ({ GetProfile, setValue, expandContact, value, updateContact }) => {
  let Navigation = useNavigation();
  const { ApiNewUser } = useHeader();
  const [loading, setLoading] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null });
  const [numberValid, setNumberValid] = useState(null);

  const onChangePhone = (Text) => {
    if (Text.trim().length >= 10) {
      setValue({ ...value, Phone: Text });
      setNumberValid(false)
    } else {
      setValue({ ...value, Phone: Text });
      setNumberValid(true)
    };
  };

  const Data_Json = JSON.stringify({
    id: value?.id,
    name: `${value?.FirstName} ${value?.LastName}`,//value?.Name
    email: value?.Emial,
    phone: '91' + value?.Phone,
    attributes: {},
    login: value?.login,
    readonly: value?.readonly,
    administrator: value?.administrator,
    map: value?.map,
    latitude: value?.latitude,
    longitude: value?.longitude,
    zoom: value?.zoom,
    twelveHourFormat: value?.twelveHourFormat,
    coordinateFormat: value?.coordinateFormat,
    disabled: value?.disabled,
    expirationTime: value?.expirationTime,
    deviceLimit: value?.deviceLimit,
    userLimit: value?.userLimit,
    deviceReadonly: value?.deviceReadonly,
    token: value?.token,
    limitCommands: value?.limitCommands,
    poiLayer: value?.poiLayer,
    disableReports: value?.disableReports,
    roleid: value?.roleid,
    isPublic: value?.isPublic,
    createdon: value?.createdon,
    lastUpdate: value?.lastUpdate,
    isRegRequest: value?.isRegRequest
  });

  const onUpdateContact = async () => {
    setLoading(true)
    await ApiNewUser.get(`/user/otps?phone=${"91" + value?.Phone}`)
      .then(function name(params) {
        AsyncStorage.setItem('AccountData', Data_Json)
        Navigation.navigate({ name: 'UpdateCitizensOtpVerifyScreen', params: { AccoutnId: value?.id, phone: "91" + value?.Phone } })
      })
      .catch(function name(params) {
        AsyncStorage.setItem('AccountData', Data_Json)
        Navigation.navigate({ name: 'UpdateCitizensOtpVerifyScreen', params: { AccoutnId: value?.id, phone: "91" + value?.Phone } })
      })
      .finally(function name(params) {
        setLoading(false)
      })
  }

  return (
    <Fragment>
      <Modal visible={loading} transparent>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={'#63CE78'} />
        </View>
      </Modal>

      <Modal visible={customModal?.modal} transparent>
        <BlurView
          blurType={"light"}
          blurAmount={1}
          reducedTransparencyFallbackColor={'white'}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, }}
        />
        <View style={{ flex: 1, backgroundColor: '#000000ad', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, elevation: 12, width: '90%', padding: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40', paddingBottom: 20 }}>CGVTS</Text>
            <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: 'OpenSans-Bold', color: customModal?.status === 1 ? '#6CCF7F' : '#F25555', paddingBottom: 20 }}>{customModal?.message}</Text>
            {customModal?.status === 1 ?
              <TouchableOpacity activeOpacity={0.80} onPress={() => { setCustomModal({ ...customModal, modal: false, message: '', status: null }); GetProfile() }} style={{ backgroundColor: '#4646F2', borderRadius: 5, elevation: 12, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#FFFFFF' }}>ok</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity activeOpacity={0.80} onPress={() => { setCustomModal({ ...customModal, modal: false, message: '', status: null }) }} style={{ backgroundColor: '#F25555', borderRadius: 5, elevation: 12, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#FFFFFF' }}>ok</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => expandContact()} style={{ marginTop: 2, width: '100%', backgroundColor: '#EBEBFD', padding: 5, justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Semibold', fontSize: 14 }}>Change contact details</Text>
          <View style={{ flexGrow: 1 }} />
          <Entypo name={updateContact ? 'chevron-small-up' : 'chevron-small-down'} size={30} color={'#D0D0FB'} />
        </View>
      </Pressable>
      {updateContact ?
        <View style={{ backgroundColor: '#ffffff', width: '100%', paddingHorizontal: 20, paddingBottom: 20, marginTop: 5, marginBottom: 5, borderRadius: 5 }}>
          <View style={{ paddingTop: 15 }}>
            <Text style={{ fontSize: 12, paddingBottom: 5, color: '#252F40', fontFamily: 'OpenSans-Semibold' }}>Phone</Text>
            <Input value={value?.Phone} onChangeText={(Text) => onChangePhone(Text)} maxLength={10} variant={'unstyled'} keyboardType={'numeric'} style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40, borderRadius: 5, backgroundColor: '#F4F4FD', }} placeholder={'Enter'} placeholderTextColor={'#7D8EAB'} />
            {numberValid === true ?
              <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Enetr valid number</Text>
              : null}
          </View>
          <View style={{ paddingTop: 15 }}>
            {value?.Phone === '' || numberValid === true ?
              < Pressable style={{ backgroundColor: '#7272F2', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 5 }}>
                <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'OpenSans-Semibold' }}>Update</Text>
              </Pressable>
              :
              <TouchableOpacity activeOpacity={0.80} onPress={() => onUpdateContact()} style={{ backgroundColor: '#4646F2', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 5 }}>
                <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'OpenSans-Semibold' }}>Update</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        : null}
    </Fragment >
  )
}

export default UpdateContact