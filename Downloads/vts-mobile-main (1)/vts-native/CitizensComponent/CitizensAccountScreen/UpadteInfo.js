import React, { Fragment, useState } from 'react'
import { Text, View, ActivityIndicator, Modal, Pressable, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { Input } from 'native-base';
import { BlurView, } from "@react-native-community/blur";
import { useHeader } from '../../ApiHeader';

const UpadteInfo = ({ GetProfile, setValue, expandPersonal, value, updatePersonal }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [loading, setLoading] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null });

  const onChangeFirstName = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, FirstName: Text });
    } else {
      setValue({ ...value, FirstName: Text });
    };
  };
  const onChangeLastName = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, LastName: Text });
    } else {
      setValue({ ...value, LastName: Text });
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
    createdon: value?.createdon,
    isPublic: value?.isPublic,
    lastUpdate: value?.lastUpdate,
    isRegRequest: value?.isRegRequest
  });
  const onUpdateInfo = async () => {
    setLoading(true)
    await ApiRequestAuthorizationHook.put(`/users/${value?.id}`, Data_Json)
      .then(function (ress) {
        if (ress?.status === 200) {
          setCustomModal({ ...customModal, modal: true, message: 'User Account Updated Successfully', status: 1 })
        }
      })
      .catch(function (err) {
        console.log(err);
        setCustomModal({ ...customModal, modal: true, message: 'User Account Updated Failed', status: 0 })
      })
      .finally(function () {
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
              <TouchableOpacity onPress={() => { setCustomModal({ ...customModal, modal: false, message: '', status: null }); GetProfile() }} activeOpacity={0.80} style={{ backgroundColor: '#4646F2', borderRadius: 5, elevation: 12, height: 40, alignItems: 'center', justifyContent: 'center' }}>
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

      <Pressable onPress={() => expandPersonal()} style={{ width: '100%', backgroundColor: '#EBEBFD', padding: 5, justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Semibold', fontSize: 14 }}>Update personal information</Text>
          <View style={{ flexGrow: 1 }} />
          <Entypo name={updatePersonal ? 'chevron-small-up' : 'chevron-small-down'} size={30} color={'#D0D0FB'} />
        </View>
      </Pressable>
      {updatePersonal ?
        <View style={{ backgroundColor: '#ffffff', width: '100%', paddingHorizontal: 20, paddingBottom: 20, marginTop: 5, marginBottom: 5, borderRadius: 5 }}>
          <View style={{ paddingTop: 15 }}>
            <Text style={{ fontSize: 12, paddingBottom: 5, color: '#252F40', fontFamily: 'OpenSans-Semibold' }}>First Name</Text>
            <Input value={value?.FirstName} onChangeText={(Text) => onChangeFirstName(Text?.replace(/[^A-Z]/ig, ""))} variant={'unstyled'} style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40, borderRadius: 5, backgroundColor: '#F4F4FD', }} placeholder={'Enter'} placeholderTextColor={'#7D8EAB'} />
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={{ fontSize: 12, paddingBottom: 5, color: '#252F40', fontFamily: 'OpenSans-Semibold' }}>Last Name</Text>
            <Input value={value?.LastName} onChangeText={(Text) => onChangeLastName(Text?.replace(/[^A-Z]/ig, ""))} variant={'unstyled'} style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, height: 40, borderRadius: 5, backgroundColor: '#F4F4FD', }} placeholder={'Enter'} placeholderTextColor={'#7D8EAB'} />
          </View>
          <View style={{ paddingTop: 15 }}>
            {value?.FirstName === '' || value?.LastName === '' ?
              < Pressable style={{ backgroundColor: '#9090cc', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 5 }}>
                <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'OpenSans-Semibold' }}>Update</Text>
              </Pressable>
              :
              <Pressable onPress={() => onUpdateInfo()} style={{ backgroundColor: '#4646F2', alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 5 }}>
                <Text style={{ fontSize: 14, color: '#FFFFFF', fontFamily: 'OpenSans-Semibold' }}>Update</Text>
              </Pressable>
            }
          </View>
        </View>
        : null}
    </Fragment>
  )
}

export default UpadteInfo