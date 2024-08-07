import React, { useState, useEffect, Fragment } from 'react'
import { View, BackHandler, TouchableOpacity } from 'react-native';
import { Text, Pressable } from 'react-native';
import { ActivityIndicator, Modal, ToastAndroid } from 'react-native';
import { Select, CheckIcon, Input, Icon, Divider } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import QueryString from 'qs';
import { useHeader } from '../../../ApiHeader';
import BlurViewScreen from '../../../BlurViewScreen';

import VltdMakeModelList from '../MiscellaneousReportsList/VltdMakeModelList';

const VltdMakeModel = ({ setToggleReport }) => {
  let Navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('')
  const [deviceData, setGetDeviceData] = useState([])
  const [toggleComponent, setToggleComponent] = useState(false);
  const [trailsCount, setTrailsCount] = useState('0');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiLoad, setApiLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [loadMore, setLoadMore] = useState(false);
  const [vehicle_list, setVehicle_list] = useState([]);
  const [loader, setLoader] = useState(false)
  const { ApiRequestAuthorizationHook } = useHeader();

  const [vltdMake, setVltdMake] = useState(false);
  const [vltdModel, setVltdModel] = useState(false);
  const [value, setValue] = useState({
    VltdMake: '',
    VltdModel: ''
  });

  const onCHangeVltdMake = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, VltdMake: Text });
      setVltdMake(false);
      setSearchValue('')
    } else {
      setValue({ ...value, VltdMake: Text });
      setVltdMake(false)
    };
  }
  const onCHangeVltdModel = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, VltdModel: Text });
      setVltdModel(false);
      setSearchValue('');
    } else {
      setValue({ ...value, VltdModel: Text });
      setVltdModel(false)
    };
  }

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };

  var validation = '';
  const validate = () => {
    if (checkStringNullEmpty(value?.VltdMake)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setVltdMake(true)
    }
    if (checkStringNullEmpty(value?.VltdModel)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setVltdModel(true)
    }
  };

  var data = QueryString.stringify({
    vltdMake: value?.VltdMake,
    vltdModel: value.VltdModel,
  })

  const onSubmit = () => {
    validate();
    if (validation === '') {
      setApiLoading(true)
      setApiLoad(true)
    }
  }

  const pageSize = 15;
  const reques = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/devices?${data}&currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setVehicle_list(oldArray => [...oldArray, ...response?.data?.data]);
          setTrailsCount(response.data.noRecords);
          setTotalPage(response.data.totalPage);
          setToggleComponent(true);
          setToggleReport(true)
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
        // showAlert();
        ToastAndroid.showWithGravity(
          "Data Fetching Failed",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      })
      .finally(function () {
        setLoader(false);
        setApiLoading(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    if (apiLoad === true) {
      reques();
    } else {
      setToggleComponent(false)
      setToggleReport(false)
    }
  }, [page, apiLoad]);

  const fetchMoreData = () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }

  const getDataDevice = async () => {
    setLoader(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/oem/make/model`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setGetDeviceData(ress?.data)
          setLoader(false)
        }
      })
      .catch(function (err) {
        console.log('get sos report data', err)
        setLoader(false)
      })

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    const backAction = () => {
      Navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Fragment>
      <Modal visible={apiLoading} transparent>
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#000000b5', justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator size={'large'} color={'#63CE78'} />
        </View>
      </Modal>

      {toggleComponent ?
        <View style={{ backgroundColor: '#ebebfd', }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
            <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{trailsCount}</Text>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Results Found</Text>
            <View style={{ flexGrow: 1 }} />
            <Pressable onPress={() => { setToggleComponent(false); setToggleReport(false); setApiLoad(false), setValue({ ...value, VltdMake: '', VltdModel: '', }); setVehicle_list([]); setPage(1); }} style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingLeft: 8 }}>Reset </Text>
              <FontAwesome name='refresh' size={18} color={'#67748E'} style={{ paddingLeft: 10 }} />
            </Pressable>
          </View>
        </View>
        : null}

      <View>
        <>
          {toggleComponent ?
            <>
              <VltdMakeModelList fetchMoreData={fetchMoreData} loadMore={loadMore} loader={loader} listData={vehicle_list} />
            </>
            :
            <>
              <View style={{ backgroundColor: '#ffffff', /* marginHorizontal: 15, */ marginTop: 20, borderRadius: 5, /* padding: 10, */ paddingBottom: 20 }}>
                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Vltd Make</Text>
                  <Select onOpen={() => deviceData?.length === 0 ? getDataDevice() : null} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} borderWidth={0} selectedValue={value?.VltdMake} placeholderTextColor={'#7D8EAB'} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
                    bg: "#f4f4fd",
                    endIcon: <CheckIcon size="5" />
                  }} _light={{
                    bg: "#f4f4fd"
                  }} _dark={{
                    bg: "coolGray.800"
                  }}
                    onValueChange={itemValue => onCHangeVltdMake(itemValue)}
                    _actionSheetBody={{
                      ListHeaderComponent:
                        <View>
                          {loader === true ?
                            <ActivityIndicator color={'#63ce78'} size={'large'} />
                            :
                            <Fragment>
                              {/* <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#7D8EAB' }}>
                                <Input
                                  placeholder="Search here"
                                  type='text'
                                  // value={searchValue}
                                  // onChangeText={(value) => {
                                  //   setSearchValue(value);
                                  // }}
                                  onSubmitEditing={(Text) => setSearchValue(Text?.nativeEvent?.text)}
                                  variant={'unstyled'}
                                  // InputRightElement={<Icon as={<MaterialIcons name="clear" onPress={() => setSearchValue('')} />} size={6} mr="2" color="#7D8EAB" />}
                                  InputRightElement={
                                    <Icon as={
                                      <TouchableOpacity onPress={() => setSearchValue('')} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4646F2' }}>
                                        <MaterialIcons name="clear" size={20} color={'#FFFFFF'} />
                                      </TouchableOpacity>
                                    } />
                                  }
                                  placeholderTextColor={'#7D8EAB'}
                                  style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }}
                                />
                              </Pressable> */}
                            </Fragment>
                          }
                        </View>,
                      ListEmptyComponent:
                        <View>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>No Options</Text>
                        </View>,
                    }}
                  >
                    {loader ?
                      <View>
                        <ActivityIndicator size={'large'} color={'#63CE78'} />
                      </View>
                      :
                      deviceData?.map((value, id) => (
                        <Select.Item key={id} shadow={2} label={value?.make} value={value?.make} />
                      ))}
                  </Select>
                  {vltdMake ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Vltd Make is required</Text>
                    </View>
                    : null
                  }
                </View>

                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Vltd Model</Text>
                  <Select onOpen={() => deviceData?.length === 0 ? getDataDevice() : null} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} borderWidth={0} selectedValue={value?.VltdModel} placeholderTextColor={'#7D8EAB'} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
                    bg: "#f4f4fd",
                    endIcon: <CheckIcon size="5" />
                  }} _light={{
                    bg: "#f4f4fd"
                  }} _dark={{
                    bg: "coolGray.800"
                  }}
                    onValueChange={itemValue => onCHangeVltdModel(itemValue)}
                    _actionSheetBody={{
                      ListHeaderComponent:
                        <View>
                          {loader === true ?
                            <ActivityIndicator color={'#63ce78'} size={'large'} />
                            :
                            <Fragment>
                              <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#7D8EAB' }}>
                                <Input
                                  placeholder="Search here"
                                  type='text'
                                  // value={searchValue}
                                  // onChangeText={(value) => {
                                  //   setSearchValue(value);
                                  // }}
                                  onSubmitEditing={(Text) => setSearchValue(Text?.nativeEvent?.text)}
                                  variant={'unstyled'}
                                  // InputRightElement={<Icon as={<MaterialIcons name="clear" onPress={() => setSearchValue('')} />} size={6} mr="2" color="#7D8EAB" />}
                                  InputRightElement={
                                    <Icon as={
                                      <TouchableOpacity onPress={() => setSearchValue('')} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4646F2' }}>
                                        <MaterialIcons name="clear" size={20} color={'#FFFFFF'} />
                                      </TouchableOpacity>
                                    } />
                                  }
                                  placeholderTextColor={'#7D8EAB'}
                                  style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }}
                                />
                              </Pressable>
                            </Fragment>
                          }
                        </View>,
                      ListEmptyComponent:
                        <View>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>No Options</Text>
                        </View>,
                    }}
                  >
                    {loader ?
                      <View>
                        <ActivityIndicator size={'large'} color={'#63CE78'} />
                      </View>
                      :
                      deviceData?.map((value, id) => (
                        <Select.Item key={id} shadow={2} label={value?.model} value={value?.model} />
                      ))}
                  </Select>
                  {vltdModel ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Vltd Model is required</Text>
                    </View>
                    : null
                  }
                </View>


                <Pressable onPress={() => onSubmit()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, }}>
                  <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Show Results</Text>
                </Pressable>
              </View>
            </>
          }
        </>
      </View>
    </Fragment>
  )
}

export default VltdMakeModel