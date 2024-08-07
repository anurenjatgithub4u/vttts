import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, StatusBar, Pressable, TextInput, } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import { useHeader } from '../ApiHeader';
import ManageFloat from '../FloatNavigation/ManageFloat'

const Geofence = ComponentLoadable(lazy(() => import('../ChaildComponent/GeofenceComponent/Geofence')));

const GeofenceScreen = ({ navigation }) => {
  const [toggleView, setToggleView] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [closeButton, setCloseButton] = useState(true);
  const { ApiRequestAuthorizationHook } = useHeader();
  const [value, setValue] = useState({ search: '' })

  //
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [error, setError] = useState(null)
  const [geofenceData, setGeofenceData] = useState([]);
  const [geofenceDataCount, setGeofenceDataCount] = useState('0');
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  const onPressSearch = () => {
    setSearchBar(searchBar => !searchBar)
  };

  const pageSize = 20;
  const request = async () => {
    const controller = new AbortController();
    const signal = controller.signal;


    await ApiRequestAuthorizationHook.get(`/geofences?currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setGeofenceData(oldArray => [...oldArray, ...response.data.data])
          setGeofenceDataCount(response.data.noRecords)
          setTotalPage(response.data.totalPage);
        }
      })
      .catch(function (error) {
        console.log('geofences', error)
        // setError(error)
      })
      .finally(function () {
        setLoading(false)
      });

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }
  useEffect(() => {
    request()
  }, [error, page])

  const fetchMoreData = () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
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
      navigation.navigate({ name: 'SearchGeofenceScreen', params: { search_key: value.search } });
      setValue({ ...value, search: '', });
      onPressSearch();
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true)
      setGeofenceData([])
      setPage(1)
      request();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Fragment>

      <View>
        <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />

        <View style={{ backgroundColor: '#ebebfd', paddingBottom: 15, paddingHorizontal: 15 }}>
          <View style={{ paddingTop: 20, }}>
            {searchBar ?
              <View style={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'row', height: 40, backgroundColor: '#ffffff', borderRadius: 5, }}>
                <TextInput
                  value={value.search}
                  onChangeText={(Text) => onChangeSearch(Text)}
                  placeholder='Search here'
                  keyboardType="default"
                  onSubmitEditing={() => onRouteSearch()}
                  returnKeyType='go'
                  style={{ color: '#252F40', fontSize: 13, height: 40, width: '100%', fontFamily: 'OpenSans-Regular', position: 'absolute' }}
                  placeholderTextColor="#7D8EAB"
                />
                <View style={{ flexGrow: 1 }} />
                {closeButton === true ?
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
              </View>
              :
              <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
                <Center>
                  <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Geofence</Text>
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

          <View style={{ backgroundColor: '#ffffff', padding: 8, marginTop: 10, borderRadius: 3 }}>
            <Text style={{ color: '#4646f2', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>
              Geo Configuration
            </Text>
          </View>
        </View>


        <Geofence
          toggleView={toggleView}
          setToggleView={setToggleView}
          navigation={navigation}
          geofenceData={geofenceData}
          geofenceDataCount={geofenceDataCount}
          loading={loading}
          loadMore={loadMore}
          fetchMoreData={fetchMoreData}
        />

      </View>

      <ManageFloat toggleView={toggleView} />
    </Fragment>
  )
}

export default GeofenceScreen;