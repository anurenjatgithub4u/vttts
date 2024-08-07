import React, { Fragment, useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, Animated, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Divider } from 'native-base'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useHeader } from '../../../ApiHeader';
import { setDateFunction } from '../../../constants/UnitConvert';

const PanicMessage = () => {
  let Navigation = useNavigation();
  let Location = useRoute();
  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  const { ApiRequestAuthorizationHook, } = useHeader();
  const [isLoader, setIsLoader] = useState(true);
  const [sosMessage, setSosMessage] = useState([]);
  const [totalMessage, setTotalMessage] = useState(0);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight)
      / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    extrapolate: 'clamp',
    inputRange: [0, difference],
    outputRange: [0, difference],
  });

  const onContentSizeChange = (_, contentHeight) =>
    setCompleteScrollBarHeight(contentHeight);

  const onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    setVisibleScrollBarHeight(height);
  };

  const getMessage = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/sos_services?status=pending&currentPage=${page}&pageSize=20`, { signal: signal })
      .then(function (ress) {
        if (ress?.status === 200) {
          setSosMessage(oldArray => [...oldArray, ...ress?.data?.data])
          setTotalMessage(ress?.data?.noRecords)
        }
      })
      .catch(function (err) {
        console.log(err)
      })
      .finally(function () {
        setIsLoader(false)
        setLoadMore(false)
      })
    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    getMessage();
  }, [page]);


  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      setPage(1);
      getMessage();
    });
    return unsubscribe;
  }, [Navigation]);

  const fetchMoreDataNotifications = () => {
    setLoadMore(true)
    if (totalMessage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }

  const isCloseToBottom = async ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 100
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom === true) { fetchMoreDataNotifications() }
  }

  const newDataMessage = Array.from(new Set(sosMessage?.map(a => a?.id)))?.map(id => { return sosMessage?.find(a => a?.id === id) })

  useEffect(() => {
    Navigation.setParams({ panicname: undefined })
    Navigation.setParams({ panicDevice: undefined })
  }, [])

  return (
    <View style={{ marginTop: 10 }}>
      <View style={{ marginTop: 5, elevation: 0, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#F25555', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingBottom: 10 }}>Panic Messages</Text>
          <View style={{ flexGrow: 1 }} />
          {Location?.params?.userRole?.view?.panic_sos === 1 ?
            <TouchableOpacity activeOpacity={0.50} /* onPress={() => Navigation.navigate({ name: 'TrackScreen', params: { panicname: 'Panic_Message' } })} */ onPress={() => Navigation.navigate({ name: 'PanicScreen', params: { panicname: 'Pending' } })}>{/*  */}
              <Text style={{ color: '#7171F3', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingBottom: 10 }}>View All</Text>
            </TouchableOpacity> : null}
        </View>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingBottom: 5 }}>
          <Divider thickness={5} orientation='vertical' bg="#4646F2" style={{ height: 20, borderRadius: 1 }} />
          <Text style={{ color: '#000000', fontSize: 14, paddingLeft: 5, fontFamily: 'OpenSans-Bold' }}>{totalMessage}</Text>
          <Text style={{ color: '#000000', fontSize: 14, paddingLeft: 5, fontFamily: 'OpenSans-Regular' }}>Messages Found</Text>
        </View>

        <Fragment>
          <View style={{ flexDirection: 'row', width: '100%', height: /* newDataMessage?.length === 1 ? 200 : */ 350, overflow: 'scroll', }}>
            {isLoader === true ?
              <View style={{ width: '100%', justifyContent: 'center' }}>
                <ActivityIndicator color={'#63CE78'} size='large' />
              </View>
              :
              newDataMessage?.length === 0 ?
                <View style={{ width: '100%', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Regular', color: '#67748E', fontSize: 14, paddingTop: 10, paddingBottom: 10 }}>NO RECORDS</Text>
                </View>
                :
                <ScrollView
                  contentContainerStyle={{ paddingRight: 8 }}
                  onContentSizeChange={onContentSizeChange}
                  onLayout={onLayout}
                  onScroll={
                    Animated.event(
                      [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
                      { useNativeDriver: false },
                    )
                  }
                  scrollEventThrottle={1}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  pagingEnabled={false}
                  style={{ width: '100%', }}
                  onScrollEndDrag={({ nativeEvent }) =>
                    isCloseToBottom(nativeEvent)
                  }
                >
                  {newDataMessage?.map((value, index) => (
                    <View key={index} style={{ backgroundColor: '#f9f9f9', borderRadius: 5, padding: 10, marginTop: 5, }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold' }}>{value?.vehicleNo}</Text>
                        <View style={{ flexGrow: 1 }} />
                        {Location?.params?.userRole?.view?.vehicle_map === 1 ?
                          <TouchableOpacity onPress={() => Navigation.navigate({ name: 'TrackScreen', params: { panicDevice: value?.vehicleNo } })} style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#4646F2', borderStyle: 'solid', borderRadius: 50, padding: 1, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome5 name='map-marked-alt' size={13} color={'#4646F2'} />
                          </TouchableOpacity> : null}
                      </View>
                      <Pressable style={{ paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                        {value?.location === null ?
                          <View>
                            <Text style={{ color: '#252F40', fontSize: 10, fontFamily: 'OpenSans-SemiBold', }}>Latitude: {value?.latitude} {" "}</Text>
                            <Text style={{ color: '#252F40', fontSize: 10, fontFamily: 'OpenSans-SemiBold', }}>Longitude: {value?.longitude}</Text>
                          </View>
                          :
                          <Text numberOfLines={1} style={{ color: '#252F40', fontSize: 10, fontFamily: 'OpenSans-SemiBold', }}>{value?.location}</Text>
                        }
                      </Pressable>
                      <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingBottom: 10 }}>{value?.permitHolder === null ? 'Owner' : value?.permitHolder}</Text>
                      {value?.remark === null ?
                        null
                        :
                        <Text style={{ color: '#69768F', fontSize: 10, fontFamily: 'OpenSans-SemiBold', paddingBottom: 10 }}>{value?.remark}</Text>
                      }
                      <Text style={{ color: '#252F40', fontSize: 10, fontFamily: 'OpenSans-SemiBold', paddingBottom: 10 }}>{setDateFunction(value?.eventTime)?.DateFormate}, {setDateFunction(value?.eventTime)?.TimeFormate}</Text>
                    </View>
                  ))}
                  {loadMore === true ?
                    <View style={{ paddingBottom: 20, paddingTop: 20 }}>
                      <ActivityIndicator color={'#63CE78'} size='small' />
                    </View>
                    : null}
                </ScrollView>
            }
            <View style={{ backgroundColor: '#F9F9F9', borderRadius: 50, height: '100%', width: 8, }}>
              <Animated.View
                style={[
                  { backgroundColor: '#E2E2FD', borderRadius: 50, width: 8, },
                  {
                    height: scrollIndicatorSize,
                    transform: [{ translateY: scrollIndicatorPosition }],
                  },
                ]}
              />
            </View>
          </View>
        </Fragment>
      </View >
    </View >
  )
}

export default PanicMessage;