import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, StatusBar, Dimensions, Pressable, Image } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'native-base'
import { useIsFocused, useRoute } from '@react-navigation/native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import ManageFloat from '../FloatNavigation/ManageFloat';
import imagePath from '../constants/imagePath';

import { useHeader } from '../ApiHeader';
const Entity = ComponentLoadable(lazy(() => import('../MainComponent/ManageScreenComponent/Entity')))
const Group = ComponentLoadable(lazy(() => import('../MainComponent/ManageScreenComponent/Group')))


function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const MangeScreen = ({ navigation }) => {
  const Lodation = useRoute();
  const [tabIndex, setTabIndex] = useState(0);
  const [searchBar, setSearchBar] = useState(false);
  const [closeButton, setCloseButton] = useState(true);
  const [value, setValue] = useState({ search: '' })
  const { ApiRequestAuthorizationHook } = useHeader();
  const [valueFilter, setValueFilter] = useState({
    vldtMake: '',
    vldtModel: ''
  });

  // Entity list
  const [pageEntity, setPageEntity] = useState(1);
  const [totalPageEntity, setTotalPageEntity] = useState(0)
  const [entityData, setEntityData] = useState([]);
  const [entityDataCount, setEntityDataCount] = useState('0');
  const [loadingEntity, setLoadingEntity] = useState(true);
  const [loadMoreEntity, setLoadMoreEntity] = useState(false);

  // Group List
  const [pageGroup, setPageGroup] = useState(1);
  const [totalPageGroup, setTotalPageGroup] = useState(0)
  const [groupData, setGroupData] = useState([]);
  const [groupDataCount, setGroupDataCount] = useState('0');
  const [loadingGroup, setLoadingGroup] = useState(true);
  const [loadMoreGroup, setLoadMoreGroup] = useState(false);

  const onPressSearch = () => {
    setSearchBar(searchBar => !searchBar)
  };

  const pageSize = 20;
  const requestEntity = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/devices?currentPage=${pageEntity}&pageSize=${pageSize}${valueFilter?.vldtMake === '' ? '' : `&vltdMake=${valueFilter?.vldtMake}&`}` + `${valueFilter?.vldtModel === '' ? '' : `vltdModel=${valueFilter?.vldtModel}&`}`, { signal: signal })//, { signal: signal }
      .then(function (response) {
        if (response?.status === 200) {
          setEntityData(oldArray => [...oldArray, ...response?.data?.data])
          setEntityDataCount(response?.data?.noRecords)
          setTotalPageEntity(response?.data?.totalPage);
        }
      })
      .catch(function (error) {
        console.log('Entity', error)
      })
      .finally(function () {
        setLoadingEntity(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requestEntity()
  }, [pageEntity])

  const fetchMoreDataEntity = () => {
    setLoadMoreEntity(true)
    if (totalPageEntity != pageEntity) {
      setPageEntity(pageEntity + 1)
    } else {
      setLoadMoreEntity(false)
    }
  }

  const requestGroup = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/groups?currentPage=${pageGroup}&pageSize=${pageSize}`, { signal: signal })//, { signal: signal }
      .then(function (response) {
        if (response?.status === 200) {
          setGroupData(oldArray => [...oldArray, ...response?.data?.data])
          setGroupDataCount(response?.data?.noRecords)
          setTotalPageGroup(response?.data?.totalPage);
        }
      })
      .catch(function (error) {
        console.log('groups', error)
      })
      .finally(function () {
        setLoadingGroup(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    requestGroup()
  }, [pageGroup])

  const fetchMoreData = () => {
    setLoadMoreGroup(true)
    if (totalPageGroup != pageGroup) {
      setPageGroup(pageGroup + 1)
    } else {
      setLoadMoreGroup(false)
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
      navigation.navigate({ name: tabIndex === 0 ? 'SearchEntityScreen' : 'SearchGroupScreen', params: { search_key: value.search } });
      setValue({ ...value, search: '', });
      onPressSearch();
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoadingEntity(true)
      setLoadingGroup(true)
      requestEntity();
      requestGroup();
      setPageEntity(1);
      setPageGroup(1);
      setEntityData([])
      setGroupData([])
      setTabIndex(0)
    });
    return unsubscribe;
  }, [navigation]);

  const newDataEntity = Array.from(new Set(entityData.map(a => a?.id)))
    ?.map(id => {
      return entityData.find(a => a?.id === id)
    })
  const newDataGroup = Array.from(new Set(groupData.map(a => a?.id)))
    ?.map(id => {
      return groupData.find(a => a?.id === id)
    })

  const onGetFilter = () => {
    setLoadingEntity(true);
    requestEntity();
    setEntityData([]);
    setPageEntity(1);
  }

  return (
    <Fragment>
      <View style={{ backgroundColor: '#ebebfd', width: Dimensions.get('window').width, flex: 1 }}>
        <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
        <View style={{ paddingHorizontal: 15, paddingTop: 20, }}>
          {searchBar ?
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', height: 40, backgroundColor: '#ffffff', borderRadius: 5, zIndex: 999 }}>
              <Input
                autoCorrect={false}
                autoComplete={'off'}
                textContentType='none'
                autoCapitalize='none'
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
                <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Group/Assets</Text>
              </Center>
              <View style={{ position: 'absolute', right: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                {tabIndex === 0 ?
                  Lodation?.params?.userRole?.view?.entity === 1 ?
                    <Pressable onPress={() => onPressSearch()}>
                      <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                        <FontAwesome name='search' color={'#7171F3'} size={18} />
                      </Center>
                    </Pressable> : null : null}
                {tabIndex === 1 ?
                  Lodation?.params?.userRole?.view?.group === 1 ?
                    <Pressable onPress={() => onPressSearch()}>
                      <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                        <FontAwesome name='search' color={'#7171F3'} size={18} />
                      </Center>
                    </Pressable> : null : null}

              </View>
            </Box>
          }
        </View>

        <SegmentedControlTab
          values={["Entity", "Group"]}
          selectedIndex={tabIndex}
          onTabPress={(index) => { setTabIndex(index) }}

          borderRadius={5}
          tabsContainerStyle={{ height: 40, backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5, marginHorizontal: 15, marginTop: 20 }}
          tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderRadius: 5, borderColor: 'transparent' }}
          activeTabStyle={{ backgroundColor: '#7171F3', borderRadius: 5, elevation: 12 }}
          tabTextStyle={{ color: '#7171F3', fontFamily: 'OpenSans-Regular', fontSize: 14 }}
          activeTabTextStyle={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}
        />

        {tabIndex === 0 ?
          Lodation?.params?.userRole?.view?.entity === 1 ?
            <Entity
              navigation={navigation}
              entityData={newDataEntity}
              entityDataCount={entityDataCount}
              loadingEntity={loadingEntity}
              loadMoreEntity={loadMoreEntity}
              fetchMoreDataEntity={fetchMoreDataEntity}
              searchBar={searchBar}
              valueFilter={valueFilter}
              setValueFilter={setValueFilter}
              onGetFilter={onGetFilter}
            />
            :
            <View style={{ paddingHorizontal: 20, paddingTop: 50, elevation: 12 }}>
              <Image source={imagePath?.access_denied} resizeMode='contain' style={{ width: '100%', borderRadius: 5 }} />
            </View>
          :
          Lodation?.params?.userRole?.view?.group === 1 ?
            <Group
              loadingGroup={loadingGroup}
              loadMoreGroup={loadMoreGroup}
              groupDataCount={groupDataCount}
              groupData={newDataGroup}
              fetchMoreData={fetchMoreData}

              setGroupData={setGroupData}
              requestGroup={requestGroup}
              setPageGroup={setPageGroup}
              setLoadingGroup={setLoadingGroup}
            />
            :
            <View style={{ paddingHorizontal: 20, paddingTop: 50, elevation: 12 }}>
              <Image source={imagePath?.access_denied} resizeMode='contain' style={{ width: '100%', borderRadius: 5 }} />
            </View>
        }
      </View>

      <ManageFloat />
    </Fragment>
  )
}

export default MangeScreen;