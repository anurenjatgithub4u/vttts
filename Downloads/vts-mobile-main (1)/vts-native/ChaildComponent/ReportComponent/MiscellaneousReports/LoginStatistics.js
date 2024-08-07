import React, { useState, useEffect, Fragment } from 'react'
import { View, BackHandler } from 'react-native';
import { Text, Pressable } from 'react-native';
import { ActivityIndicator, Modal, ToastAndroid, TouchableOpacity } from 'react-native';
import qs from 'qs';
import { Input, Divider } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useHeader } from '../../../ApiHeader';
import BlurViewScreen from '../../../BlurViewScreen';

import LoginStatisticsList from '../MiscellaneousReportsList/LoginStatisticsList';

const LoginStatistics = ({ setToggleReport }) => {
  let Navigation = useNavigation();
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
  const [searchKey, setSearchKey] = useState(false);
  const [value, setValue] = useState({
    searchKey: ''
  });

  const onCHangeSearch = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, searchKey: Text });
      setSearchKey(false);
    } else {
      setValue({ ...value, searchKey: Text });
      setSearchKey(false)
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
    if (checkStringNullEmpty(value?.searchKey)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setSearchKey(true)
    }
  };

  var data = qs.stringify({
    searchKey: value?.searchKey,
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

    await ApiRequestAuthorizationHook.get(`/users/session/report/?${data}&currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
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
            <Pressable onPress={() => { setToggleComponent(false); setToggleReport(false); setApiLoad(false), setValue({ ...value, searchKey: '', }); setVehicle_list([]); setPage(1); }} style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
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
              <LoginStatisticsList fetchMoreData={fetchMoreData} loadMore={loadMore} loader={loader} listData={vehicle_list} />
            </>
            :
            <>
              <View style={{ backgroundColor: '#ffffff', /* marginHorizontal: 15, */ marginTop: 20, borderRadius: 5, /* padding: 10, */ paddingBottom: 20 }}>
                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Name/Email</Text>
                  <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
                    <Input w={{
                      base: "100%",
                      md: "100%"
                    }} value={value?.searchKey} onChangeText={(Text) => onCHangeSearch(Text)} autoCapitalize={'none'} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder="Enter Name" />
                  </Pressable>
                  {searchKey ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Name/Email is required</Text>
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

export default LoginStatistics