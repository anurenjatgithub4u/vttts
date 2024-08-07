import React, { Fragment, } from 'react'
import { Text, View, UIManager, Platform, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import UpadteInfo from './UpadteInfo';
import UpdateContact from './UpdateContact';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';



if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// const Account = ({ GetProfile, updatePersonal, updateContact, updatePassword, expandPersonal, expandContact, expandPassword, value, setValue, getProfileData }) => {
  const Account = ({ GetProfile, updatePersonal, updateContact, updatePassword, deleteAccount, expandPersonal, expandContact, expandPassword, value, setValue, getProfileData }) => {


  return (
    <Fragment>

      <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Bold', fontSize: 25, color: '#252F40', paddingTop: 15 }}>Account</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
        <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBEBFD', borderRadius: 70, elevation: .5 }}>
          <FontAwesome name={'user'} color={"#7474F5"} size={50} />
        </View>
        <View style={{ paddingTop: 20, }}>
          <Text style={{ lineHeight: 20, textAlign: 'center', color: '#252F40', fontFamily: 'OpenSans-Semibold', fontSize: 18 }}>{getProfileData?.name}</Text>
          <Text style={{ lineHeight: 20, textAlign: 'center', color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>{getProfileData?.email}</Text>
          <Text style={{ lineHeight: 20, textAlign: 'center', color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>{getProfileData?.phone}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 20, paddingBottom: 20 }}>
        <UpadteInfo GetProfile={GetProfile} setValue={setValue} expandPersonal={expandPersonal} value={value} updatePersonal={updatePersonal} />
        <UpdateContact GetProfile={GetProfile} setValue={setValue} expandContact={expandContact} value={value} updateContact={updateContact} />
        <UpdatePassword expandPassword={expandPassword} value={value} setValue={setValue} updatePassword={updatePassword} />
        <DeleteAccount expandPassword={expandPassword} value={value} setValue={setValue} deleteAccount={deleteAccount} />

      </View>
    </Fragment>
  )
}

export default Account