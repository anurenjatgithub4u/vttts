import React, { Fragment, useState, useEffect } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Divider } from 'native-base';
import { useHeader } from '../ApiHeader';

import Message from '../MainComponent/MessageScreenComponent/Message';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const MessageScreen = () => {
  let Navigation = useNavigation()
  const { ApiRequestAuthorizationHook } = useHeader();
  const [pageNotifications, setPageNotifications] = useState(1);
  const [totalPageNotifications, setTotalPageNotifications] = useState(0)
  const [totalNotifications, setTotalNotifications] = useState(0)
  const [notificationsData, setNotificationsData] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [loadMoreNotifications, setLoadMoreNotifications] = useState(false);

  const FormDate = `${new Date().toISOString()}`.split('T')[0] + "T" + '00:00:00Z';
  const ToDate = `${new Date().toISOString()}`.split('T')[0] + "T" + '23:59:59Z';
  const pageSize = 10;
  const requestNotifications = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/notifications/bydate/logs?from=${FormDate}&to=${ToDate}&currentPage=${pageNotifications}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        // console.log('Response:', response);
        if (response.status === 200) {
          console.log(response);
          setNotificationsData(oldArray => [...oldArray, ...response?.data?.data])
          setTotalPageNotifications(response?.data?.totalPage);
          setTotalNotifications(response?.data?.noRecords);
          Navigation.setOptions({ tabBarBadge: response?.data?.noRecords });
        }
      })
      .catch(function (error) {
        console.log('Notifications', error)
        // setErrorNotifications(error)
      })
      .finally(function () {
        setLoadingNotifications(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requestNotifications()
  }, [pageNotifications])

  const fetchMoreDataNotifications = () => {
    setLoadMoreNotifications(true)
    if (totalPageNotifications != pageNotifications) {
      setPageNotifications(pageNotifications + 1)
    } else {
      setLoadMoreNotifications(false)
    }
  }

  const newDataNotifications = Array.from(new Set(notificationsData.map(a => a.id)))
    .map(id => {
      return notificationsData.find(a => a.id === id)
    })

  const searchDeviceData = newDataNotifications?.filter((item,) => {
    return Boolean((new Date() - new Date(item.eventtime) < 86400 * 1000));
  });


  // useEffect(() => {
  //   Navigation.setOptions({ tabBarBadge: totalNotifications });
  // }, [Navigation, searchDeviceData]);

  return (
    <Fragment>
      <FocusAwareStatusBar barStyle='dark-content' backgroundColor="#ffffff" />
      <View style={{ flex: 1, backgroundColor: '#ebebfd' }}>
        <View style={{ backgroundColor: '#ffffff', height: 50, justifyContent: 'center', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16, textTransform: 'capitalize' }}>Notifications</Text>
          <View style={{ flexGrow: 1 }} />
        </View>
        <View style={{ backgroundColor: '#ffffff', height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', }}>
          <Divider thickness={5} orientation='vertical' bg="#4646F2" style={{ height: 25, borderRadius: 2 }} />
          <Text style={{ color: '#000000', fontSize: 14, paddingLeft: 10, fontFamily: 'OpenSans-Bold' }}>{totalNotifications}</Text>
          <Text style={{ color: '#000000', fontSize: 14, paddingLeft: 5, fontFamily: 'OpenSans-Regular' }}>Notifications Found </Text>
        </View>
        <Message
          setPageNotifications={setPageNotifications}
          setNotificationsData={setNotificationsData}
          requestNotifications={requestNotifications}
          notificationsData={searchDeviceData}
          loadingNotifications={loadingNotifications}
          setLoadingNotifications={setLoadingNotifications}
          loadMoreNotifications={loadMoreNotifications}
          fetchMoreDataNotifications={fetchMoreDataNotifications}
        />
      </View>
    </Fragment>
  )
}

export default MessageScreen