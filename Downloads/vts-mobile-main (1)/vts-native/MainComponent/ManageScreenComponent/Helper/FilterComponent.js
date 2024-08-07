import React, { Fragment, useState } from 'react';
import { View, Pressable, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { Center, Select, CheckIcon, } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { Divider, useDisclose, Actionsheet } from 'native-base';
import { FlatList, LayoutAnimation, UIManager, Platform, Modal, ActivityIndicator, ToastAndroid, PermissionsAndroid } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Col, Row } from "react-native-responsive-grid-system";
import { writeFile, DownloadDirectoryPath, } from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob';
import { useHeader } from '../../../ApiHeader';
import moment from 'moment';

const FilterComponent = ({ searchBar, isOpen, onClose, onOpen, onGetFilter, setValueFilter, valueFilter, }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [MakeGet, setMakeGet] = useState([]);
  const [modelGet, setModelGet] = useState([]);
  const [makeLoader, setMakeLodaer] = useState(true);
  const [modelLoader, setModelLodaer] = useState(true);

  const onGetModelmake = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setMakeLodaer(true)
    await ApiRequestAuthorizationHook.get(`/oem/make/model`, { signal: signal })
      .then(function (ress) {
        if (ress?.status === 200) {
          setMakeGet(Array.from(new Set(ress?.data?.map(a => a?.id)))?.map(id => { return ress?.data?.find(a => a?.id === id) }))
        }
      })
      .catch(function (err) {
        console.log(err)
      })
      .finally(function () {
        setMakeLodaer(false)
      })

    return () => {
      controller.abort();
    };
  }

  const onGetMakeModel = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setModelLodaer(true)
    await ApiRequestAuthorizationHook.get(`/oem/make/model`, { signal: signal })
      .then(function (ress) {
        if (ress?.status === 200) {
          setModelGet(Array.from(new Set(ress?.data?.map(a => a?.id)))?.map(id => { return ress?.data?.find(a => a?.id === id) }))
        }
      })
      .catch(function (err) {
        console.log(err)
      })
      .finally(function () {
        setModelLodaer(false)
      })

    return () => {
      controller.abort();
    };
  }
  return (
    <Fragment>
      <TouchableOpacity onPress={onOpen} activeOpacity={0.60} style={{ backgroundColor: '#FFFFFF', borderRadius: 5, width: 40, height: 40, position: 'absolute', right: 60, top: 10, justifyContent: 'center', alignItems: 'center', zIndex: 0, elevation: 6, display: searchBar === true ? 'none' : 'flex' }}>
        <Feather name={'filter'} color={'#69748C'} size={20} />
      </TouchableOpacity>

      <Actionsheet isOpen={isOpen} onClose={() => { onClose(); onGetFilter() }}>{/* valueFilter?.vldtMake === '' || valueFilter?.vldtModel === '' ? */}
        <Actionsheet.Content>
          <View style={{ width: '100%', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity activeOpacity={0.60} onPress={() => { onClose(); onGetFilter() }} style={{ width: 40, height: 40, backgroundColor: '#EBEBFD', borderRadius: 3, alignItems: 'center', justifyContent: 'center', elevation: 3 }}>
                <Entypo name={'chevron-small-left'} color={'#252F40'} size={30} />
              </TouchableOpacity>
              <View style={{ flexGrow: 1 }} />
              <TouchableOpacity activeOpacity={0.60} onPress={() => { setValueFilter({ ...valueFilter, vldtMake: '', vldtModel: '' }); }} style={{ backgroundColor: '#EBEBFD', borderRadius: 3, paddingLeft: 15, paddingRight: 15, paddingTop: 7, paddingBottom: 7, elevation: 3 }}>
                <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Clear</Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 10 }}>
              <Text style={{ color: "#252F40", fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Select Vltd Make</Text>
              <Select onOpen={onGetModelmake} selectedValue={valueFilter?.vldtMake} placeholderTextColor={'#7D8EAB'} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40, backgroundColor: '#F4F4FD' }} variant={'unstyled'} borderWidth={0} accessibilityLabel="Select Vltd Make" placeholder="Select Vltd Make" _selectedItem={{
                bg: "#F4F4FD",
                endIcon: <CheckIcon size="5" />
              }} _light={{
                bg: "#F4F4FD"
              }} _dark={{
                bg: "#F4F4FD"
              }} onValueChange={itemValue => setValueFilter({ ...valueFilter, vldtMake: itemValue })}
                _actionSheetBody={{
                  ListHeaderComponent:
                    <View>
                      {makeLoader === true ?
                        <ActivityIndicator color={'#63ce78'} size={'large'} />
                        :
                        null
                      }
                    </View>,
                  ListEmptyComponent:
                    <View>
                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                    </View>
                }}
              >
                {makeLoader ?
                  <View>
                    <ActivityIndicator size={'large'} color={'#63CE78'} />
                  </View>
                  :
                  MakeGet?.map((value, id) => (
                    <Select.Item key={id} shadow={2} label={value?.make} value={value?.make} />
                  ))}
              </Select>
            </View>
            <View style={{ paddingTop: 15 }}>
              <Text style={{ color: "#252F40", fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Select Vltd Model</Text>
              <Select onOpen={onGetMakeModel} selectedValue={valueFilter?.vldtModel} placeholderTextColor={'#7D8EAB'} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40, backgroundColor: '#F4F4FD' }} variant={'unstyled'} borderWidth={0} accessibilityLabel="Select Vltd Model" placeholder="Select Vltd Model" _selectedItem={{
                bg: "#F4F4FD",
                endIcon: <CheckIcon size="5" />
              }} _light={{
                bg: "#F4F4FD"
              }} _dark={{
                bg: "#F4F4FD"
              }} onValueChange={itemValue => setValueFilter({ ...valueFilter, vldtModel: itemValue })}
                _actionSheetBody={{
                  ListHeaderComponent:
                    <View>
                      {modelLoader === true ?
                        <ActivityIndicator color={'#63ce78'} size={'large'} />
                        :
                        null
                      }
                    </View>,
                  ListEmptyComponent:
                    <View>
                      <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                    </View>
                }}
              >
                {modelLoader ?
                  <View>
                    <ActivityIndicator size={'large'} color={'#63CE78'} />
                  </View>
                  :
                  modelGet?.map((value, id) => (
                    <Select.Item key={id} shadow={2} label={value?.model} value={value?.model} />
                  ))}
              </Select>
            </View>

            {valueFilter?.vldtMake === '' || valueFilter?.vldtModel === '' ?
              <TouchableOpacity disabled activeOpacity={0.60} style={{ backgroundColor: '#A1A1F8', borderRadius: 5, height: 40, justifyContent: 'center', alignItems: 'center', elevation: 6, marginTop: 15, marginBottom: 10 }}>
                <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Submit</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { onClose(); onGetFilter() }} activeOpacity={0.60} style={{ backgroundColor: '#4646F2', borderRadius: 5, height: 40, justifyContent: 'center', alignItems: 'center', elevation: 6, marginTop: 15, marginBottom: 10 }}>
                <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Submit</Text>
              </TouchableOpacity>
            }

          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  )
}

export default FilterComponent