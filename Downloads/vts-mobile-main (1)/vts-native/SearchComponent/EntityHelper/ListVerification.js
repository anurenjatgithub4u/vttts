import React, { useState, Fragment } from 'react';
import { View, Pressable, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { ActivityIndicator, ToastAndroid } from 'react-native'
import { Col, Row } from "react-native-responsive-grid-system";
import RNFetchBlob from 'rn-fetch-blob';
import qs from 'qs';
import { useHeader } from '../../ApiHeader';
import LoderComponent from './LoderComponent';

const ListVerification = ({ navigation, item, }) => {
  const { ApiRequestAuthorizationHook, ApiDownload } = useHeader();
  const [otpLoader, setOtpLoader] = useState(false);
  const [customModal, setCustomModal] = useState({ message: '', DownloadDirectoryPath: null, isModal: false, status: null });

  const onVerify = async (event) => {
    const data = qs.stringify({ clientPhoneNo: event?.contact, permitHolderName: event?.permit_holder, deviceId: event?.id })
    const controller = new AbortController();
    const signal = controller.signal;
    setOtpLoader(true)
    await ApiRequestAuthorizationHook.get(`/otps?${data}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          navigation.navigate({ name: 'EntityVerifyScreen', params: { verify_id: event.id } })
        }
      })
      .catch(function (error) {
        console.log('Entity', error)
        ToastAndroid.showWithGravityAndOffset(
          "Request failed",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      })
      .finally(function () {
        setOtpLoader(false)
      });

    return () => {
      controller.abort();
    };
  }

  var date = new Date();
  var path = RNFetchBlob.fs.dirs.DownloadDir + '/Certificate' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf';
  const DwonLoadCertificate = (event) => {
    setOtpLoader(true)
    RNFetchBlob
      .config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          title: 'CGVTS Certificate',
          description: 'File successfully downloaded',
          path: path,
          mime: 'application/pdf',
          mediaScannable: true,
          notification: true,
        }
      })
      .fetch('GET', `${ApiDownload.baseURL}/devices/download?deviceId=${event}`, {
        Authorization: ApiDownload.headers?.Authorization
      })
      .then((res) => {
        let base64Str = res.data;
        setCustomModal({ message: `File successfully downloaded`, DownloadDirectoryPath: path, isModal: true, status: 1 })
        setOtpLoader(false)
      })
      .catch((errorMessage, statusCode) => {
        console.log('errorMessage', errorMessage);
        console.log('statusCode', statusCode);
        setCustomModal({ message: `File download failed`, DownloadDirectoryPath: null, isModal: true, status: 0 })
        setOtpLoader(false)
      })
      .finally(() => {
        setOtpLoader(false)
      })
  }

  return (
    <Fragment>
      <LoderComponent customModal={customModal} setCustomModal={setCustomModal} />

      <View style={{ backgroundColor: '#f5f6fa', height: 100, borderRadius: 5, marginHorizontal: 10, marginTop: 20 }}>
        <View style={{ marginHorizontal: 15 }}>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 12, color: '#000000' }}>Verification</Text>
                {item?.otpverified === true ?
                  <View style={{ paddingTop: 8, marginTop: 10, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', }}>
                    <Feather name={'check-circle'} color={'#60cd75'} size={20} />
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', color: "#000000", paddingLeft: 6, fontSize: 14 }} >Completed</Text>
                  </View>
                  :
                  <>
                    {otpLoader ?
                      <Pressable style={{ backgroundColor: '#4646f242', paddingTop: 8, paddingBottom: 8, borderRadius: 5, width: 100, marginTop: 10 }}>
                        <ActivityIndicator color={'#63CE78'} size={'small'} />
                      </Pressable>
                      :
                      item?.sos_status === false ?
                        <Pressable style={{ paddingBottom: 8, borderRadius: 5, width: 100, marginTop: 10 }}>
                          <Text style={{ color: "#000000", fontFamily: 'OpenSans-Reegular', fontSize: 14 }}>Pending</Text>
                        </Pressable>
                        :
                        <Pressable onPress={() => { onVerify(item) }} style={{ backgroundColor: '#4646f2', paddingTop: 8, paddingBottom: 8, borderRadius: 5, width: 100, marginTop: 10 }}>
                          <Text style={{ color: "#ffffff", textAlign: 'center', fontFamily: 'OpenSans-Reegular', fontSize: 14 }}>Send OTP</Text>
                        </Pressable>
                    }
                  </>
                }
              </View>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: 'OpenSans-Light', fontSize: 12, color: '#000000' }}>Certificate</Text>
                {item?.otpverified === true ?
                  otpLoader ?
                    <Pressable style={{ backgroundColor: '#4646f2', paddingTop: 8, paddingBottom: 8, borderRadius: 5, width: 100, marginTop: 10 }}>
                      <ActivityIndicator color={'#63CE78'} size={'small'} />
                    </Pressable>
                    :
                    <Pressable onPress={() => DwonLoadCertificate(item.id)} style={{ backgroundColor: '#4646f2', paddingTop: 8, paddingBottom: 8, borderRadius: 5, width: 100, marginTop: 10 }}>
                      <Text style={{ color: "#ffffff", textAlign: 'center', fontFamily: 'OpenSans-Reegular', fontSize: 14 }}>Download</Text>
                    </Pressable>
                  :
                  <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 11, color: 'blue', marginTop: 15 }}>- Verification required -</Text>
                }
              </View>
            </Col>
          </Row>
        </View>
      </View>
    </Fragment>
  )
}

export default ListVerification