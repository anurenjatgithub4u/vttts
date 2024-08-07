import React, { Fragment, useState, useEffect } from 'react';
import { View, Pressable, Text, TouchableOpacity } from 'react-native';
import { Center, } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'native-base';
import { PermissionsAndroid } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { writeFile, DownloadDirectoryPath, } from 'react-native-fs'
import LoderComponent from './LoderComponent';

import XLSX from 'xlsx';
import { useHeader } from '../../../ApiHeader';

const DDP = DownloadDirectoryPath + "/";
const output = res => res;
const ListHeaderComponent = ({ valueFilter, entityDataCount, navigation, }) => { //handleClick
  const { ApiRequestAuthorizationHook } = useHeader();
  const Location = useRoute();
  const [loader, setLoader] = useState(false);
  const [customModal, setCustomModal] = useState({ message: '', DownloadDirectoryPath: null, isModal: false, status: null });
  const [isNew, setIsNew] = useState(false)

  const exportDataToExcel = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true)
    await ApiRequestAuthorizationHook.get(`/devices?${valueFilter?.vldtMake === '' ? '' : `&vltdMake=${valueFilter?.vldtMake}&`}` + `${valueFilter?.vldtModel === '' ? '' : `vltdModel=${valueFilter?.vldtModel}&`}`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          let ws = XLSX.utils.json_to_sheet(ress?.data?.data)
          let wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Entity List")
          const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
          const file = DDP + `Entity-${new Date().getDate()?.toString()?.padStart(2, "0")}${(new Date().getMonth() + 1)?.toString()?.padStart(2, "0")}${new Date().getFullYear()}-${new Date().toLocaleTimeString()?.replace(':', '-')?.replace(':', '-')?.replace(':', '-')}.xlsx`

          writeFile(file, output(wbout), 'ascii')
            .then((ress) => {
              // RNFetchBlob.android.actionViewIntent(file, 'application/pdf')
              // RNFetchBlob.android.addCompleteDownload({
              //   title: 'Report',
              //   description: 'Download complete',
              //   mime: 'application/pdf',
              //   path: file,
              //   showNotification: true,
              // });
              setLoader(false)
              setCustomModal({ message: `Export File Success`, DownloadDirectoryPath: file, isModal: true, status: 1 })
            })
            .catch((err) => {
              setLoader(false)
              console.log(err)
              setCustomModal({ message: `Export File failed`, DownloadDirectoryPath: null, isModal: true, status: 0 })
            })
        }
      })
      .catch(function (err) {
        console.log('entity', err)
        setLoader(false)
      })
    return () => {
      controller.abort();
    };
  }

  const handleClick = async () => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if (!isPermitedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage permission needed",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportDataToExcel();
          console.log("Permission granted");
        } else {
          console.log("Permission denied");
        }
      } else {
        exportDataToExcel();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return
    }

  };

  useEffect(() => {
    if (Location?.params?.userRole?.permission?.vehicle_registration === 12) { // create
      setIsNew(true)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 6) { // edit 
      setIsNew(false)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 5) { // delete 
      setIsNew(false)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 4) { // read
      setIsNew(false)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 14) { // read  create edit 
      setIsNew(true)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 15) { // create edit delete read
      setIsNew(true)
    } else if (Location?.params?.userRole?.permission?.vehicle_registration === 0) { // no permission
      setIsNew(false)
    }
  }, [Location])

  return (
    <Fragment>
      <LoderComponent customModal={customModal} setCustomModal={setCustomModal} loader={loader} />

      <View style={{ marginTop: 10, paddingHorizontal: 15, }}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Divider thickness={5} orientation='vertical' bg="#4646F2" style={{ height: 25, borderRadius: 2 }} />
          <Text style={{ color: '#000000', fontSize: 14, paddingLeft: 10, fontFamily: 'OpenSans-Bold' }}>{entityDataCount}</Text>
          <Text style={{ color: '#000000', fontSize: 14, paddingLeft: 5, fontFamily: 'OpenSans-Regular' }}>Result Found</Text>
          <View style={{ flexGrow: 1 }} />
          <TouchableOpacity disabled={entityDataCount === 0 ? true : false} onPress={() => handleClick()}>
            <Center style={{ padding: 6, backgroundColor: '#ffffff', borderRadius: 5, width: 33, height: 33, marginRight: 7 }}>
              <MaterialCommunityIcons name='file-document-outline' size={22} color={entityDataCount === 0 ? "#6ccf7f91" : "#6CCF7F"} />
            </Center>
          </TouchableOpacity>
          {isNew ?
            <>
              <Pressable onPress={() => navigation.navigate('UploadBulkScreen')} style={{ marginRight: 1, backgroundColor: '#4646f2', paddingLeft: 6, paddingRight: 6, paddingTop: 10, paddingBottom: 10, borderRadius: 5 }}>
                <Text style={{ color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold', textTransform: 'capitalize' }}>Upload Bulk</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('AddEntityScreen')} style={{ backgroundColor: '#4646f2', paddingLeft: 6, paddingRight: 6, paddingTop: 10, paddingBottom: 10, borderRadius: 5 }}>
                <Text style={{ color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold', textTransform: 'capitalize' }}>ASSIGN A DEVICE</Text>
              </Pressable>
            </> : null}
        </View>
      </View>
    </Fragment>
  )
}

export default ListHeaderComponent