import React, { Fragment, } from 'react';
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View, } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BarChart, } from "react-native-gifted-charts";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useHeader } from '../../../ApiHeader';
import { Pressable, } from 'react-native';
import { Modal } from 'react-native'
import { Col, Row } from "react-native-responsive-grid-system";
import RNFetchBlob from 'rn-fetch-blob';
import BlurViewScreen from '../../../BlurViewScreen';

const CommunicatingDevice = () => {
  const Navigation = useNavigation();
  const { ApiRequestAuthorizationHook, ApiDownload } = useHeader();
  const [getStatics, seGetTstatics] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [customModal, setCustomModal] = useState({ message: '', DownloadDirectoryPath: null, isModal: false, status: null });

  const staticsData = async () => {
    ApiRequestAuthorizationHook.get(`/dashboard/device_statistics`)
      .then((result) => {
        if (result?.status === 200) {
          seGetTstatics(result?.data)
        }
      }).catch((err) => {
        console.log('device_statistics', err)
      })
      .finally(() => {
        setLoader(false)
      })
  };

  useEffect(() => {
    staticsData();
  }, []);

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      staticsData();
    });
    return unsubscribe;
  }, [Navigation])



  const data = getStatics?.map((value) => ({ value: value?.deviceCount, label: value?.label, labelWidth: 50, labelTextStyle: { color: '#67748E', fontSize: 10, fontFamily: 'OpenSans-Regular', }, frontColor: '#6e26f8' }))
  // const max = data?.reduce((prev, current) => (prev.deviceCount > current.deviceCount) ? prev : current)
  const mainBarData = [
    ...data,
    { value: 0, },
    { value: 0, },
    { value: 0, },
    { value: 0, },
  ]

  var dateDwonLoad = new Date();
  var path = RNFetchBlob.fs.dirs.DownloadDir + `/noncommunicating` + Math.floor(dateDwonLoad?.getTime() + dateDwonLoad?.getSeconds() / 2) + '.xlsx';
  const onDwonLoad = () => {
    setIsLoading(true)
    RNFetchBlob
      .config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          title: 'CGVTS Report',
          description: 'File successfully downloaded',
          path: path,
          mime: 'application/pdf',
          mediaScannable: true,
          notification: true,
        }
      })
      .fetch('GET', `${ApiDownload.baseURL}/reports/device_statistics/export`, {
        Authorization: ApiDownload.headers?.Authorization
      })
      .then((res) => {
        let base64Str = res.data;
        setCustomModal({ message: `File successfully downloaded`, DownloadDirectoryPath: path, isModal: true, status: 1 })
        setIsLoading(false)
        //RNFetchBlob.android.actionViewIntent(path, 'application/pdf')
      })
      .catch((errorMessage, statusCode) => {
        console.log('errorMessage', errorMessage);
        console.log('statusCode', statusCode);
        setCustomModal({ message: `File download failed`, DownloadDirectoryPath: null, isModal: true, status: 0 })
        setIsLoading(false)
      })
  }

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
      <Modal visible={isLoading} transparent>
        <BlurViewScreen />
        <View style={{ backgroundColor: '#353232d1', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <View style={{ marginTop: 5, elevation: 0, backgroundColor: Colors.white, borderRadius: 10, paddingTop: 10, paddingBottom: 10, }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingHorizontal: 10 }}>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold' }}>Non Communicating device</Text>
          </View>

          {loader ?
            <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 30, paddingBottom: 30 }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <View style={{ margin: 10, overflow: 'scroll', }}>
              <BarChart
                data={getStatics?.length === 0 ? statics : mainBarData}
                barWidth={13}
                xAxisThickness={1}
                yAxisThickness={0}
                hideYAxisText={false}
                yAxisTextStyle={{ color: '#67748E', fontSize: 9, fontFamily: 'OpenSans-Regular' }}
                noOfSections={5}
                // maxValue={3}
                // minValue={0}
                // stepValue={1}
                height={130}
                disableScroll={false}
                showScrollIndicator={false}
                width={Dimensions.get('screen').width - 70}
                initialSpacing={25}
                renderTooltip={(event, index) => {
                  return (
                    <View style={{ backgroundColor: '#ffffff', borderWidth: 1, padding: 10, borderRadius: 5, borderColor: '#67748E', zIndex: 99999, position: 'absolute' }}>
                      <View>
                        <View style={{ flexDirection: 'column', }}>
                          <Text style={{ marginLeft: 5, color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 10 }}>{event?.label} days</Text>
                          <Text style={{ marginLeft: 5, color: '#6E26F8', fontFamily: 'OpenSans-SemiBold', fontSize: 10 }}>count : {event?.value}</Text>
                        </View>
                      </View>
                    </View>
                  )
                }}
              />
            </View>
          }
          <TouchableOpacity onPress={() => onDwonLoad()} activeOpacity={0.70} style={{ backgroundColor: '#4646F2', padding: 5, width: '20%', borderRadius: 3, marginLeft: 10, marginTop: 15 }}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'Open Sans-SemiBold', fontSize: 14, textTransform: 'capitalize' }}>EXPORT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  )
}

export default CommunicatingDevice;

const statics = [
  {
    "label": "1",
    "value": 0
  },
  {
    "label": "3",
    "value": 0
  },
  {
    "label": "7",
    "value": 0
  },
  {
    "label": "30",
    "value": 0
  }
]