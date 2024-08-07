import { useNavigation } from '@react-navigation/native';
import React, { Fragment, } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator, ScrollView } from 'react-native';
import BlurViewScreen from '../../BlurViewScreen';

const PopUpModals = ({ loader, customModal, setCustomModal }) => {
  const Navigation = useNavigation()

  return (
    <Fragment>
      <Modal visible={loader} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000004d' }}>
          <ActivityIndicator size={'large'} color={'#63ce78'} />
        </View>
      </Modal>

      <Modal visible={customModal?.isModal} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000004d', paddingHorizontal: 15, paddingBottom: 20, paddingTop: 20 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', width: '100%', borderRadius: 10, marginBottom: 20, marginTop: 20, paddingTop: 30, paddingBottom: 30, paddingLeft: 15, paddingRight: 15, elevation: 12 }}>
              <Text style={{ fontSize: 15, color: '#252F40', fontFamily: 'OpenSans-Bold', }}>CGVTS</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: "flex-start", alignItems: 'flex-start', width: '100%', paddingBottom: 30 }}>
                  <Text style={{ fontSize: 13, color: customModal.status === 1 ? customModal?.errors === 0 ? 'green' : '#F25555' : '#F25555', fontFamily: 'OpenSans-Bold', paddingTop: 30 }}>{customModal?.message}</Text>
                  {customModal?.errors === 0 ?
                    null :
                    customModal?.errors?.map((value, index) => (
                      <Text key={index} style={{ textAlign: 'left', fontSize: 12, color: '#F25555', fontFamily: 'OpenSans-SemiBold', paddingTop: 10, }}>{value?.id}</Text>
                    ))}
                </View>
              </ScrollView>
              {customModal?.sampleDownload === true ?
                <Pressable onPress={() => { setCustomModal({ ...customModal, message: '', isModal: false, status: null }) }} style={{ backgroundColor: customModal.status ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-Bold' }}>OK</Text>
                </Pressable>
                :
                <Pressable onPress={() => { setCustomModal({ ...customModal, message: '', isModal: false, status: null }); Navigation.goBack() }} style={{ backgroundColor: customModal.status ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-Bold' }}>OK</Text>
                </Pressable>
              }
            </View>
          </View>
        </View>
      </Modal>
    </Fragment>
  )
}

export default PopUpModals