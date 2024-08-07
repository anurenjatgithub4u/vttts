import React, { Fragment, useEffect, useState } from 'react';
import { StatusBar, View, Text, Pressable, } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Center, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViolationHistory from '../CitizensComponent/ViolationHistory/ViolationHistory'
import { useHeader } from '../ApiHeader';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const CitizensHistory = () => {
  let Navigation = useNavigation();
  const {ApiRequestAuthorizationHook} = useHeader();
  const [pageViolation, setPageViolation] = useState(1);
  const [totalPageViolation, setTotalPageViolation] = useState(0)
  const [violationData, setViolationData] = useState([]);
  const [loadingViolation, setLoadingViolation] = useState(true);
  const [loadMoreViolation, setLoadMoreViolation] = useState(false);

  const pageSize = 20;
  const requestViolation = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/reported/violations?currentPage=${pageViolation}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setViolationData(oldArray => [...oldArray, ...response.data.data])
          setTotalPageViolation(response.data.totalPage);
        }
      })
      .catch(function (error) {
        console.log('Violation', error)
        // setErrorViolation(error)
      })
      .finally(function () {
        setLoadingViolation(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requestViolation()
  }, [pageViolation])

  const fetchMoreDataViolation = () => {
    setLoadMoreViolation(true)
    if (totalPageViolation != pageViolation) {
      setPageViolation(pageViolation + 1)
    } else {
      setLoadMoreViolation(false)
    }
  }

  const newDataViolation = Array.from(new Set(violationData?.map(a => a.id)))
    .map(id => {
      return violationData?.find(a => a.id === id)
    })

  return (
    <Fragment>
      <FocusAwareStatusBar barStyle='dark-content' backgroundColor="#ffffff" />
      <View style={{ flex: 1, backgroundColor: '#ebebfd', width: '100%' }}>
        <View style={{ backgroundColor: '#ffffff', height: 80, justifyContent: 'center', paddingHorizontal: 20 }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16, textTransform: 'capitalize', textAlign: 'center' }}>History</Text>
        </View>
        <View style={{ position: 'absolute', left: 20, top: 20, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
          <Pressable onPress={() => Navigation.goBack()}>
            <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
              <Ionicons name='chevron-back-sharp' color={'#FFFFFF'} size={28} />
            </Center>
          </Pressable>
        </View>
        <ViolationHistory
          violationData={newDataViolation}
          loadingViolation={loadingViolation}
          loadMoreViolation={loadMoreViolation}
          fetchMoreDataViolation={fetchMoreDataViolation}
        />
      </View>
    </Fragment>
  )
}

export default CitizensHistory;
