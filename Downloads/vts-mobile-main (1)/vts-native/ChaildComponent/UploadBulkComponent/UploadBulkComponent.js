import React, { Fragment, useState, } from 'react';
import { View, Text, Pressable, ToastAndroid } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import { Col, Row } from 'react-native-responsive-grid-system';
import FormData from 'form-data';
import RNFS from 'react-native-fs';
import { useHeader } from '../../ApiHeader';
import DwonLoadBulkSample from './DwonLoadBulkSample';
import PopUpModals from './PopUpModals';
import BulkFileImport from './BulkFileImport';

const UploadBulkComponent = () => {
  const Navigation = useNavigation()
  const [customModal, setCustomModal] = useState({ message: '', errors: [], isModal: false, status: null, sampleDownload: null })
  const [singleFile, setSingleFile] = useState(null);
  const [loader, setLoader] = useState(false)
  const { ApiRequestForUpoadBulk } = useHeader();

  const onBulkUpload = async () => {
    if (singleFile != null) {
      setLoader(true)
      var formdata = new FormData();
      formdata.append("file", singleFile, RNFS.DownloadDirectoryPath + singleFile?.name);

      await ApiRequestForUpoadBulk.post('/vehicle_registration/data/upload', formdata)
        .then(function (res) {
          if (res?.status === 200) {
            if (res?.data?.message)
              setCustomModal({ message: res?.data?.message, errors: res?.data?.errors, isModal: true, status: 1, sampleDownload: false })
            else
              setCustomModal({ message: `File uploaded successfully`, isModal: true, status: 1, sampleDownload: false, successColor: 'green' })
          }
        })
        .catch(function (err) {
          console.log('err', err)
          setCustomModal({ message: `File uploaded failed`, isModal: true, status: 0, sampleDownload: false })
        })
        .finally(() => {
          setLoader(false)
        })
    } else {
      ToastAndroid.showWithGravityAndOffset("Please Select File", ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
    }
  }

  return (
    <Fragment>
      <PopUpModals loader={loader} setCustomModal={setCustomModal} customModal={customModal} />

      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', width: '100%', borderRadius: 10, paddingTop: 30, paddingBottom: 30, elevation: 12 }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16, textAlign: 'center' }}>Bulk Upload</Text>

          <BulkFileImport setSingleFile={setSingleFile} singleFile={singleFile} />

          <DwonLoadBulkSample />

          <View style={{ width: '90%', marginTop: 20 }}>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Pressable onPress={() => Navigation.goBack()} style={{ borderColor: '#4646f2', borderWidth: 1, borderStyle: 'solid', padding: 10, width: '100%', borderRadius: 5 }}>
                  <Text style={{ color: '#4646f2', fontSize: 14, fontFamily: 'OpenSans-SemiBold', textAlign: 'center', textTransform: 'capitalize' }}>Cancel</Text>
                </Pressable>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Pressable onPress={() => onBulkUpload()} style={{ backgroundColor: '#4646f2', padding: 10, width: '100%', borderRadius: 5 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold', textAlign: 'center', textTransform: 'capitalize' }}>Upload</Text>
                </Pressable>
              </Col>
            </Row>
          </View>
        </View>
      </View>
    </Fragment>
  )
}

export default UploadBulkComponent;