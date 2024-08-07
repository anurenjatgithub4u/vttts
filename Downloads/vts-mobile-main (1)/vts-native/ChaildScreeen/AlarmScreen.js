import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, StatusBar, Pressable, } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { Divider } from 'native-base'
import SegmentedControlTab from "react-native-segmented-control-tab";
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import { useHeader } from '../ApiHeader';
import ManageFloat from '../FloatNavigation/ManageFloat'

import Configuration from '../ChaildComponent/AlarmScreenComponent/Configuration';
const Logs = ComponentLoadable(lazy(() => import('../ChaildComponent/AlarmScreenComponent/Logs')));

const AlarmScreen = ({ navigation }) => {
  let location = useRoute();
  const [tabIndex, setTabIndex] = useState(0);
  const [searchBar, setSearchBar] = useState(false);
  const [closeButton, setCloseButton] = useState(true);
  const [value, setValue] = useState({ search: '' })
  const { ApiRequestAuthorizationHook } = useHeader();

  // Configuration
  const [pageConfiguration, setPageConfiguration] = useState(1);
  const [totalPageConfiguration, setTotalPageConfiguration] = useState(0)
  const [loaderConfiguration, setLoaderConfiguration] = useState(true)
  const [loadMoreConfiguration, setLoadMoreConfiguration] = useState(false);
  const [configurationList, setConfigurationList] = useState([])
  const [configurationCount, setConfigurationCount] = useState('0');


  //Log
  const [logsCount, setLogsCount] = useState('0');
  const [pageLog, setPageLog] = useState(1);
  const [totalPageLog, setTotalPageLog] = useState(0)
  const [logsList, setLogsList] = useState([])
  const [loaderLog, setLoaderLog] = useState(true)
  const [loadMoreLog, setLoadMoreLog] = useState(false);

  const onPressSearch = () => {
    setSearchBar(searchBar => !searchBar)
  };

  const pageSize = 20;
  const requestConfiguration = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/notifications?currentPage=${pageConfiguration}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setConfigurationList(oldArray => [...oldArray, ...response.data.data]);
          setConfigurationCount(response.data.noRecords)
          setTotalPageConfiguration(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log("Configuration", error);
        setLoaderConfiguration(true)
      })
      .finally(function () {
        setLoaderConfiguration(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requestConfiguration();
  }, [pageConfiguration]);

  const fetchMoreDataConfiguration = () => {
    setLoadMoreConfiguration(true)
    if (totalPageConfiguration != pageConfiguration) {
      setPageConfiguration(pageConfiguration + 1)
    } else {
      setLoadMoreConfiguration(false)
    }
  }

  const requestLog = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/notifications/alarms/logs?currentPage=${pageLog}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setLogsList(oldArray => [...oldArray, ...response.data.data]);
          setLogsCount(response.data.noRecords);
          setTotalPageLog(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
        setLoaderLog(true)
      })
      .finally(function () {
        setLoaderLog(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    requestLog();
  }, [pageLog]);

  const fetchMoreDataLog = () => {
    setLoadMoreLog(true)
    if (totalPageLog != pageLog) {
      setPageLog(pageLog + 1)
    } else {
      setLoadMoreLog(false)
    }
  }

  const onChangeSearch = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, search: Text, });
      setCloseButton(false)
    } else {
      setValue({ ...value, search: Text, });
      setCloseButton(true)
    }
  }

  const onRouteSearch = () => {
    if (value.search != '') {
      navigation.navigate({ name: tabIndex === 0 ? 'SearchAlarmConfigurationScreen' : 'SearchAlarmLogScreen', params: { search_key: value.search } });
      setValue({ ...value, search: '', });
      onPressSearch();
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoaderConfiguration(true)
      requestConfiguration();
      setPageConfiguration(1)
      setConfigurationList([])
    });
    return unsubscribe;
  }, [navigation]);


  const newDataConfiguration = Array.from(new Set(configurationList.map(a => a.id)))
    .map(id => {
      return configurationList.find(a => a.id === id)
    })
  const newDataLog = Array.from(new Set(logsList.map(a => a.id)))
    .map(id => {
      return logsList.find(a => a.id === id)
    })

  useEffect(() => {
    if (location?.params?.tab === 'Logs') {
      setTabIndex(1)
    }
  }, [navigation])

  return (
    <Fragment>
      <View>
        <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
        <View style={{ backgroundColor: '#ebebfd', paddingBottom: 15, paddingHorizontal: 15 }}>
          <View style={{ paddingTop: 20, }}>
            {searchBar ?
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', height: 40, backgroundColor: '#ffffff', borderRadius: 5, }}>
                <Input
                  variant={'unstyled'}
                  value={value.search}
                  onChangeText={(Text) => onChangeSearch(Text)}
                  InputRightElement={
                    closeButton === true ?
                      <Pressable onPress={() => setCloseButton(closeButton => !closeButton)}>
                        <Center style={{ backgroundColor: '#4646f2', width: 40, height: 40, borderRadius: 5 }}>
                          <FontAwesome name='search' color={'#ffffff'} size={18} />
                        </Center>
                      </Pressable>
                      :
                      <Pressable onPress={() => { onPressSearch(); setCloseButton(closeButton => !closeButton) }}>
                        <Center style={{ width: 40, height: 40, borderRadius: 5 }}>
                          <AntDesign name='close' color={'#000000'} size={18} />
                        </Center>
                      </Pressable>

                  }
                  placeholder='Search here'
                  keyboardType="default"
                  onSubmitEditing={() => onRouteSearch()}
                  returnKeyType='go'
                  style={{ color: '#252F40', fontSize: 13, height: 40, width: '100%', fontFamily: 'OpenSans-Regular' }}
                  placeholderTextColor="#7D8EAB"
                />
              </View>
              :
              <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
                <Center>
                  <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Alarm</Text>
                </Center>
                <View style={{ position: 'absolute', right: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                  <Pressable onPress={() => onPressSearch()}>
                    <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                      <FontAwesome name='search' color={'#7171F3'} size={18} />
                    </Center>
                  </Pressable>
                </View>
              </Box>
            }
          </View>

          <SegmentedControlTab
            values={["Configuration", "Logs"]}
            selectedIndex={tabIndex}
            onTabPress={(index) => setTabIndex(index)}

            borderRadius={5}
            tabsContainerStyle={{ height: 40, backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5, marginTop: 20 }}
            tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderRadius: 5, borderColor: 'transparent' }}
            activeTabStyle={{ backgroundColor: '#7171F3', borderRadius: 5, elevation: 12 }}
            tabTextStyle={{ color: '#7171F3', fontFamily: 'OpenSans-Regular', fontSize: 14 }}
            activeTabTextStyle={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}
          />

          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 10 }}>
            <Divider bg={'#4646f2'} thickness="5" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{tabIndex === 0 ? configurationCount : logsCount}</Text>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Alarm Found </Text>
            <View style={{ flexGrow: 1 }} />
            {tabIndex === 0 ?
              <Pressable onPress={() => navigation.navigate('CreateAlarmScreen')} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#4646f2', padding: 7, borderRadius: 5 }}>
                <Ionicons name={'add-circle-outline'} size={18} color={'#ffffff'} />
                <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Add Alarm</Text>
              </Pressable>
              : null}
          </View>
        </View>

        {tabIndex === 0 ?
          <Configuration
            setConfigurationCount={setConfigurationCount}
            fetchMoreDataConfiguration={fetchMoreDataConfiguration}
            loaderConfiguration={loaderConfiguration}
            loadMoreConfiguration={loadMoreConfiguration}
            configurationList={newDataConfiguration}

            setLoaderConfiguration={setLoaderConfiguration}
            requestConfiguration={requestConfiguration}
            setPageConfiguration={setPageConfiguration}
            setConfigurationList={setConfigurationList}
          />
          :
          <Logs
            setLogsCount={setLogsCount}
            logsList={newDataLog}
            loaderLog={loaderLog}
            loadMoreLog={loadMoreLog}
            fetchMoreDataLog={fetchMoreDataLog}
          />
        }
      </View>

      <ManageFloat />
    </Fragment>
  )
}

export default AlarmScreen;