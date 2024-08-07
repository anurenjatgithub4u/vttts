import React, { Fragment } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Modal, ActivityIndicator, } from 'react-native'
import { Col, Row } from "react-native-responsive-grid-system";
import RNFetchBlob from 'rn-fetch-blob';
import BlurViewScreen from '../../../BlurViewScreen';

const LoderComponent = ({ customModal, setCustomModal, loader = false, }) => {

  const onOpenFile = () => {
    RNFetchBlob.android.actionViewIntent(customModal?.DownloadDirectoryPath, 'application/pdf')
    setCustomModal({ ...customModal, message: '', DownloadDirectoryPath: null, isModal: false, status: null })
  }

  return (
    <Fragment>
      <Modal visible={customModal.isModal} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#353232d1', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ backgroundColor: '#ffffff', width: '70%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 10, elevation: 12 }}>
            <Text style={{ fontSize: 15, color: '#252F40', fontFamily: 'OpenSans-Bold' }}>CGVTS</Text>
            <Text style={{ fontSize: 13, color: customModal.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-SemiBold', paddingTop: 10, paddingBottom: 10 }}>{customModal?.message}</Text>
            {customModal?.DownloadDirectoryPath === null ?
              null :
              <Text style={{ fontSize: 13, color: customModal.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Regular', paddingTop: 10, paddingBottom: 10 }}>Download path: {customModal?.DownloadDirectoryPath}</Text>
            }
            {customModal.status === 0 ?
              <Pressable onPress={() => setCustomModal({ ...customModal, message: '', DownloadDirectoryPath: null, isModal: false, status: null })} style={{ backgroundColor: customModal.status === 1 ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-Bold' }}>OK</Text>
              </Pressable>
              :
              <Row>
                {/* <Col xs={6} sm={6} md={6} lg={6}>
                  <Pressable onPress={() => onOpenFile()} style={{ backgroundColor: customModal.status === 1 ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-SemiBold' }}>Open</Text>
                  </Pressable>
                </Col> */}
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Pressable onPress={() => setCustomModal({ ...customModal, message: '', DownloadDirectoryPath: null, isModal: false, status: null })} style={{ backgroundColor: customModal.status === 1 ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-SemiBold' }}>OK</Text>
                  </Pressable>
                </Col>
              </Row>
            }
          </View>
        </View>
      </Modal>

      <Modal visible={loader} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#353232d1', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>
    </Fragment>
  )
}

export default LoderComponent