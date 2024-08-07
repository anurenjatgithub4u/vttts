import React, { Fragment, useState, } from 'react';
import { View, Text, Pressable, ToastAndroid, TouchableOpacity, Modal } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';

const DwonLoadBulkSample = () => {
  const [customModal, setCustomModal] = useState({ message: '', isModal: false, status: null, sampleDownload: null })
  const { ApiDownload } = useHeader();

  var date = new Date();
  var path = RNFetchBlob.fs.dirs.DownloadDir + '/BulkSample' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.xlsx';

  const DwonLoadSample = () => {
    RNFetchBlob
      .config({
        addAndroidDownloads: {
          useDownloadManager: true,
          title: 'CGVTS Bulk Sample',
          description: 'File successfully downloaded',
          path: path,
          mediaScannable: true,
          notification: true,
        }
      })// https://cgvtsapi.trackolet.in/api/download/vehicle/sample
      .fetch('GET', `${ApiDownload.baseURL}/download/vehicle/sample`, {
        Authorization: ApiDownload.headers?.Authorization
      })
      .then((res) => {
        setCustomModal({ message: `File successfully downloaded`, isModal: true, status: 1, sampleDownload: true })
        ToastAndroid.showWithGravityAndOffset(
          "File successfully downloaded",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50
        );
      })
      .catch((errorMessage, statusCode) => {
        console.log('errorMessage', errorMessage);
        console.log('statusCode', statusCode);
        setCustomModal({ message: `File download failed`, isModal: true, status: 0, sampleDownload: true })
        ToastAndroid.showWithGravityAndOffset(
          "File download failed",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50
        );
      })
  }

  return (
    <Fragment>
      <Modal visible={customModal?.isModal} transparent={true}>
        <BlurViewScreen />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000004d', paddingHorizontal: 15 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', width: '100%', borderRadius: 10, paddingTop: 30, paddingBottom: 30, paddingLeft: 15, paddingRight: 15, elevation: 12 }}>
              <Text style={{ fontSize: 15, color: '#252F40', fontFamily: 'OpenSans-Bold', }}>CGVTS</Text>
              <Text style={{ fontSize: 13, color: customModal.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-SemoBold', paddingTop: 30, paddingBottom: 30 }}>{customModal?.message}</Text>
              {customModal?.sampleDownload === true ?
                <Pressable onPress={() => { setCustomModal({ ...customModal, message: '', isModal: false, status: null }) }} style={{ backgroundColor: customModal.status ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-Bold' }}>OK</Text>
                </Pressable>
                :
                <Pressable onPress={() => { setCustomModal({ ...customModal, message: '', isModal: false, status: null }); }} style={{ backgroundColor: customModal.status ? 'blue' : 'red', width: '100%', borderRadius: 5, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-Bold' }}>OK</Text>
                </Pressable>
              }
            </View>
          </View>
        </View>
      </Modal>


      <View>
        <TouchableOpacity onPress={() => DwonLoadSample()}>
          <Text style={{ color: '#67748e', fontFamily: 'OpenSans-Regular', fontSize: 14, textAlign: 'center', paddingTop: 15 }}>Click here to download sample excel sheet</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}

export default DwonLoadBulkSample