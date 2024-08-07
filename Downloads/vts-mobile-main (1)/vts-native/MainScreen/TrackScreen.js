import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, StatusBar, Image } from 'react-native';
import { useDisclose, } from 'native-base';
import CookieManager from '@react-native-cookies/cookies';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import { useHeader } from '../ApiHeader';
import TrackFloat from '../FloatNavigation/TrackFloat';
import FilterFunction from '../MainComponent/TrackScreenComponent/helper/FilterFunction';
import HeaderFunction from '../MainComponent/TrackScreenComponent/helper/HeaderFunction';
import imagePath from '../constants/imagePath';

const List = ComponentLoadable(lazy(() => import('../MainComponent/TrackScreenComponent/List')))
const Map = ComponentLoadable(lazy(() => import('../MainComponent/TrackScreenComponent/Map')))

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const TrackScreen = () => {
  let location = useRoute();
  let navigation = useNavigation();
  const [endPoint, setEndPoint] = useState('vehicle');
  let { isOpen, onOpen, onClose } = useDisclose();
  const [selectedData, setSelectedData] = useState([]);
  const [listComView, setListComView] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [closeButton, setCloseButton] = useState(true);
  const { ApiRequestAuthorizationHook, ApiDownload } = useHeader();
  const [mapIdVehicle, setMapIdVehicle] = useState(null)
  const [isFilter, setIsFilter] = useState(false)
  const [valueSearch, setValueSearch] = useState({ id: '', groupId: '', name: '', rtocode: '', })
  const [pageVehicle, setPageVehicle] = useState(1);
  const [totalPageVehicle, setTotalPageVehicle] = useState(0)
  const [loadMoreVehicle, setLoadMoreVehicle] = useState(false);
  const [vehicle_list, setVehicle_list] = useState([]);
  const [vehicle_count, setVehicle_count] = useState('0');
  const [loaderVehicle, setLoaderVehicle] = useState(true)

  const requesVehicle = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (location?.params?.panicDevice) {
      setMapIdVehicle(null)
      setSelectedData([])
      // await ApiRequestAuthorizationHook.get(`/devices/search?${location?.params?.panicDevice === undefined ? '' : `deviceId=${location?.params?.panicDevice}&`}currentPage=${onSetFilter}&pageSize=${pageSize}`, { signal: signal })
      await ApiRequestAuthorizationHook.get(`/devices/search?${location?.params?.panicDevice === undefined ? '' : `deviceId=${location?.params?.panicDevice}&`}currentPage=${pageVehicle}&pageSize=${15}`, { signal: signal })
        .then(function (response) {
          if (response.status === 200) {
            setVehicle_list(oldArray => [...oldArray, ...response.data.data]);
            setVehicle_count(response.data.noRecords);
            setTotalPageVehicle(response.data.totalPage);
          }
        })
        .catch(function (error) {
          console.log('devices_vehicle', error);
          // setErrorVehicle(error)
        })
        .finally(function () {
          setListComView(false);
          setLoaderVehicle(false)
        });
    } else {
      // await ApiRequestAuthorizationHook.get(`/devices/vehicle?${endPoint}?${location?.params?.search_key === undefined ? '' : `vehiclestatus=${location?.params?.search_key}&`}${valueSearch.groupId === "" ? '' : `groupId=${valueSearch.groupId}&`}${valueSearch.rtocode === "" ? '' : `rtoName=${valueSearch.rtocode}&`}${valueSearch.name === "" ? '' : `deviceId=${valueSearch.name}&`}${location?.params?.panicDevice === undefined ? '' : `deviceId=${location?.params?.panicDevice}`}currentPage=${valueSearch}&pageSize=${pageSize}`,{ signal: signal } )
      // await ApiRequestAuthorizationHook.get(`/devices/search?searchKey=CG04JH1099`, { signal: signal })
      await ApiRequestAuthorizationHook.get(`/devices/${endPoint}?${location?.params?.search_key === undefined ? '' : `vehicleStatus=${location?.params?.search_key}&`}${valueSearch.groupId === "" ? '' : `groupId=${valueSearch.groupId}&`}${valueSearch?.rtocode === "" ? '' : `rtoName=${valueSearch?.rtocode}&`}${valueSearch.name === "" ? '' : `deviceId=${valueSearch.name}&`}${location?.params?.panicDevice === undefined ? '' : `deviceId=${location?.params?.panicDevice}`}currentPage=${pageVehicle}&pageSize=${15}`, { signal: signal })

        .then(function (response) {
          if (response.status === 200) {
            setVehicle_list(oldArray => [...oldArray, ...response.data.data]);
            setVehicle_count(response.data.noRecords);
            setTotalPageVehicle(response.data.totalPage);
          }
        })
        .catch(function (error) {
          console.log('devices_vehicle', error);
          // setErrorVehicle(error)
        })
        .finally(function () {
          setLoaderVehicle(false)
        });
    }

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requesVehicle();
  }, [pageVehicle]);

  useEffect(() => {
    if (!isFilter) {
      setValueSearch({ ...valueSearch, groupId: '', name: '', rtocode: '' })
      setEndPoint('vehicle');
      setLoaderVehicle(true)
      setPageVehicle(1);
      setVehicle_count('0');
      setTotalPageVehicle(0);
      setVehicle_list([])
      requesVehicle();
    } else {
      setLoaderVehicle(true)
      setEndPoint('search');
      setPageVehicle(1);
      setVehicle_count('0');
      setTotalPageVehicle(0);
      setVehicle_list([]);
      requesVehicle();
    }
  }, [location]);
  useEffect(() => {
    setIsFilter(false);
    setEndPoint('vehicle');
  }, [location]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setListComView(true);
      onCloseSearchBar();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchMoreDataVehicle = () => {
    setLoadMoreVehicle(true)
    if (totalPageVehicle != pageVehicle) {
      setPageVehicle(pageVehicle + 1);
    } else {
      setLoadMoreVehicle(false);
    }
  }

  const onCloseSearchBar = () => {
    setSearchBar(false);
    setIsFilter(false);
  };

  const onResetFunc = () => {
    setIsFilter(false);
    setEndPoint('vehicle');
    setLoaderVehicle(true)
    setPageVehicle(1);
    setVehicle_list([]);
    setVehicle_count('0');
    setTotalPageVehicle(0);
    setEndPoint('vehicle');
    requesVehicle();
    setValueSearch({ ...valueSearch, groupId: '', name: '', rtocode: '' });
  }

  const onSetFilter = () => {
    setEndPoint('search');
    setIsFilter(true)
    navigation.setParams({ panicDevice: undefined });
    navigation.setParams({ search_key: undefined });
  }

  useEffect(() => {
    var ws = new WebSocket(`wss://cgvtsapi.trackolet.in/api/socket`);
    ws.close = (e) => { console.log('onclose', e); };
  }, [selectedData, location]);

  return (
    <Fragment>
      <View style={{ backgroundColor: '#F5F6FA', width: '100%', flex: 1 }}>
        <View style={{ backgroundColor: '#ebebfd', width: '100%' }}>
          <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />

          <HeaderFunction
            setValueSearch={setValueSearch}
            valueSearch={valueSearch}
            onResetFunc={onResetFunc}
            onSetFilter={onSetFilter}
            setSearchBar={setSearchBar}
            onOpen={onOpen}
            onCloseSearchBar={onCloseSearchBar}
            setCloseButton={setCloseButton}
            closeButton={closeButton}
            searchBar={searchBar}

            listComView={listComView}
            setListComView={setListComView}
            setMapIdVehicle={setMapIdVehicle}
            setSelectedData={setSelectedData}
          />
        </View>

        {listComView ?
          location?.params?.userRole?.view?.vehicle_list === 1 ?
            <List
              setListComView={setListComView}
              loadMoreVehicle={loadMoreVehicle}
              // vehicle_list={uniqByKeepLast(vehicle_list, it => it?.device?.id)}
              vehicle_list={vehicle_list}
              vehicle_count={vehicle_count}
              loaderVehicle={loaderVehicle}
              fetchMoreDataVehicle={fetchMoreDataVehicle}
              setMapIdVehicle={setMapIdVehicle}
              setSelectedData={setSelectedData}
            />
            :
            <View style={{ paddingHorizontal: 20, paddingTop: 50, elevation: 12 }}>
              <Image source={imagePath?.access_denied} resizeMode='contain' style={{ width: '100%', borderRadius: 5 }} />
            </View>
          :
          location?.params?.userRole?.view?.vehicle_map === 1 ?
            <Map
              setMapIdVehicle={setMapIdVehicle}
              mapIdVehicle={mapIdVehicle}
              // vehicle_listMap={uniqByKeepLast(vehicle_list, it => it?.device?.id)}
              vehicle_listMap={vehicle_list}
              loaderVehicle={loaderVehicle}
              setSelectedData={setSelectedData}
              selectedData={selectedData}
            />
            :
            <View style={{ paddingHorizontal: 20, paddingTop: 50, elevation: 12 }}>
              <Image source={imagePath?.access_denied} resizeMode='contain' style={{ width: '100%', borderRadius: 5 }} />
            </View>
        }

        <FilterFunction setValueSearch={setValueSearch} valueSearch={valueSearch} isOpen={isOpen} onClose={onClose} /* setIsSearch={setIsSearch} */ setIsFilter={setIsFilter} onSetFilter={onSetFilter} />
        <TrackFloat />
      </View>
    </Fragment>
  )
}

export default TrackScreen