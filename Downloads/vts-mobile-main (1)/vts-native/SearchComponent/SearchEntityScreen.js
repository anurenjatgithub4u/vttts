import React, { Fragment, useState, } from 'react';
import { View, StatusBar, Pressable, BackHandler, } from 'react-native';
import { Text, } from 'native-base';
import { useHeader } from '../ApiHeader';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import ListHeaderComponent from './EntityHelper/ListHeaderComponent';
import EntityDataList from './EntityHelper/EntityDataList';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchEntityScreen = () => {
  let Navigation = useNavigation();
  let location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = React.useState();
  const [pageEntity, setPageEntity] = useState(1);
  const [totalPageEntity, setTotalPageEntity] = useState(0)
  const [errorEntity, setErrorEntity] = useState(null)
  const [entityData, setEntityData] = useState([]);
  const [entityDataCount, setEntityDataCount] = useState('0');
  const [loadingEntity, setLoadingEntity] = useState(true);
  const [loadMoreEntity, setLoadMoreEntity] = useState(false);


  const pageSize = 20;
  const requestEntity = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/search/device?search_key=${location?.params?.search_key}&currentPage=${pageEntity}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setEntityData(oldArray => [...oldArray, ...response.data.data])
          setEntityDataCount(response?.data.noRecords)
          setTotalPageEntity(response.data.totalPage);
        }
      })
      .catch(function (error) {
        console.log('Entity', error)
        // setErrorEntity(error)
      })
      .finally(function () {
        setLoadingEntity(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    if (location?.params?.search_key !== undefined) {
      requestEntity()
    }
  }, [errorEntity, pageEntity])

  const fetchMoreDataEntity = () => {
    setLoadMoreEntity(true)
    if (totalPageEntity != pageEntity) {
      setPageEntity(pageEntity + 1)
    } else {
      setLoadMoreEntity(false)
    }
  }

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

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

  const newDataEntity = Array.from(new Set(entityData?.map(a => a?.id)))
    ?.map(id => {
      return entityData?.find(a => a?.id === id)
    })

  return (
    <Fragment>

      <View style={{ backgroundColor: '#f5f6fa', width: '100%', flex: 1, }}>
        <StatusBar barStyle='dark-content' backgroundColor="#ebebfd" />
        <View style={[{ paddingHorizontal: 15, backgroundColor: '#ebebfd', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 6, }]}>
          <Pressable onPress={() => Navigation.goBack()}>
            <Center style={{ backgroundColor: '#d0d0fb', width: 35, height: 35, borderRadius: 5 }}>
              <Entypo name='chevron-thin-left' color={'#7171F3'} size={20} />
            </Center>
          </Pressable>
          <View style={{ flexGrow: 1 }} />
          <Center style={{ height: 40 }}>
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#000000' }}>Entity</Text>
          </Center>
          <View style={{ flexGrow: 1 }} />
        </View>

        <ListHeaderComponent valueFilter={location?.params?.search_key} navigation={Navigation} entityDataCount={entityDataCount} />

        <View style={{ marginTop: 10, paddingHorizontal: 15 }}>
          {loadingEntity ?
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingTop: 8, paddingBottom: 8 }}>
                    <View style={{ flexGrow: .3 }} />
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Identity Id</Text>
                    <View style={{ flexGrow: 1 }} />
                    <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Internal Name</Text>
                    <View style={{ flexGrow: .3 }} />
                  </View>
                )
              }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <>
                    {loadMoreEntity ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                        {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                      </View>
                    }
                  </>
                )
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
                  </View>
                );
              }}
              onEndReachedThreshold={0.2}
              onEndReached={fetchMoreDataEntity}
              horizontal={false}
              data={newDataEntity}
              renderItem={({ item, index }) => {
                return (
                  <EntityDataList expanded={expanded} handlePress={handlePress} navigation={Navigation} item={item} />
                )
              }}
              keyExtractor={(item) => item.id}
            />
          }
        </View>
      </View>
    </Fragment>
  )
}

export default SearchEntityScreen