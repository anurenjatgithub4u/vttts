import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Pressable, } from 'react-native';
import { Box, Text, Center } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'native-base'
import SegmentedControlTab from "react-native-segmented-control-tab";
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import { useHeader } from '../ApiHeader';
import ManageFloat from '../FloatNavigation/ManageFloat'

const Routes = ComponentLoadable(lazy(() => import('../ChaildComponent/RouteComponent/Routes')));
const CreateRoute = ComponentLoadable(lazy(() => import('../ChaildComponent/RouteComponent/CreateRoute')));

const RouteScreen = ({ navigation }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchBar, setSearchBar] = useState(false);
  const [closeButton, setCloseButton] = useState(true);
  const [value, setValue] = useState({ search: '' })
  const { ApiRequestAuthorizationHook } = useHeader();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [loadMore, setLoadMore] = useState(false);
  const [routeList, setRouteList] = useState([]);
  const [routeList_count, setRouteList_count] = useState('0');
  const [loader, setLoader] = useState(true)

  const [pageAssign, setPageAssign] = useState(1);
  const [totalPageAssign, setTotalPageAssign] = useState(0)
  const [loadMoreAssign, setLoadMoreAssign] = useState(false);
  const [routeListAssign, setRouteListAssign] = useState([]);
  const [routeList_countAssign, setRouteList_countAssign] = useState('0');
  const [loaderAssign, setLoaderAssign] = useState(true)


  const onPressSearch = () => {
    setSearchBar(searchBar => !searchBar)
  };

  const pageSize = 20;
  const reques = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/routes?currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setRouteList(oldArray => [...oldArray, ...response.data.data]);
          setRouteList_count(response?.data.noRecords);
          setTotalPage(response?.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log('routes', error);
        // setError(error)
      })
      .finally(function () {
        setLoader(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    reques();
  }, [page]);

  const fetchMoreData = () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }


  const requesAssign = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/trips?currentPage=${pageAssign}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setRouteListAssign(oldArray => [...oldArray, ...response.data.data]);
          setRouteList_countAssign(response?.data.noRecords);
          setTotalPageAssign(response?.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log('routes', error);
        // setError(error)
      })
      .finally(function () {
        setLoaderAssign(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requesAssign();
  }, [pageAssign]);

  const fetchMoreDataAssign = () => {
    setLoadMoreAssign(true)
    if (totalPageAssign != pageAssign) {
      setPageAssign(pageAssign + 1)
    } else {
      setLoadMoreAssign(false)
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
      navigation.navigate({ name: tabIndex === 0 ? 'SearchRoutesScreen' : 'SearchRoutesAssignScreen', params: { search_key: value.search } });
      setValue({ ...value, search: '', });
      onPressSearch();
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoader(true)
      setLoaderAssign(true)
      setPage(1)
      setRouteList([])
      reques();
      setPageAssign(1)
      setRouteListAssign([])
      requesAssign();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Fragment>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
        <View style={{ backgroundColor: '#ebebfd', paddingBottom: 15, paddingHorizontal: 15 }}>
          <View style={{ paddingTop: 20, }}>
            {searchBar ?
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', height: 40, backgroundColor: '#ffffff', borderRadius: 5, }}>
                <Input
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
                  <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Route</Text>
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
            values={["Route List", "Route Assign"]}
            selectedIndex={tabIndex}
            onTabPress={(index) => setTabIndex(index)}

            borderRadius={5}
            tabsContainerStyle={{ height: 40, backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5, marginTop: 20 }}
            tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderRadius: 5, borderColor: 'transparent' }}
            activeTabStyle={{ backgroundColor: '#7171F3', borderRadius: 5, elevation: 12 }}
            tabTextStyle={{ color: '#7171F3', fontFamily: 'OpenSans-Regular', fontSize: 14 }}
            activeTabTextStyle={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}
          />
        </View>


        {tabIndex === 0 ?
          <Routes
            loadMore={loadMore}
            routeList={routeList}
            routeList_count={routeList_count}
            loader={loader}
            fetchMoreData={fetchMoreData}
          />
          :
          <CreateRoute
            navigation={navigation}

            loadMoreAssign={loadMoreAssign}
            routeListAssign={routeListAssign}
            routeList_countAssign={routeList_countAssign}
            loaderAssign={loaderAssign}
            fetchMoreDataAssign={fetchMoreDataAssign}
          />
        }
      </SafeAreaView>

      <ManageFloat />
    </Fragment>
  )
}

export default RouteScreen;