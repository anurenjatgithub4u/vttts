import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Divider } from 'native-base';
import ScheduleList from './ScheduleCom/ScheduleList';
import { useHeader } from '../../ApiHeader';
import { useNavigation, } from '@react-navigation/native';

const Schedule = () => {
  let navigation = useNavigation()
  const { ApiRequestAuthorizationHook } = useHeader();
  const [groupName, setGroupName] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [schedule_data_count, setSchedule_data_count] = useState('0');
  const [schedule_data, setSchedule_data] = useState([]);
  const [loader, setLoader] = useState(true);

  const pageSize = 20;
  const requestApi = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoadMore(true)
    await ApiRequestAuthorizationHook.get(`/report_schedules?currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setSchedule_data(oldArray => [...oldArray, ...response.data.data]);
          setSchedule_data_count(response.data.noRecords)
          setTotalPage(response.data.totalPage)
        } else {

        }
      })
      .catch(function (error) {
        console.log("vehicle_summary", error);
      })
      .finally(function () {
        setLoader(false);
        setLoadMore(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    requestApi()
  }, [page])

  const fetchMoreData = async () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }

  const groupData = async () => {
    setLoadMore(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/groups`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setGroupName(ress.data.data);
        }
      })
      .catch(function (err) {
        console.log('gourp name', err)
      })

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoader(true)
      requestApi();
      setPage(1)
      setSchedule_data([])
      groupData();
      setGroupName([]);
    });
    return unsubscribe;
  }, [navigation])

  const newDataSchedule = Array.from(new Set(schedule_data.map(a => a?.id)))
    ?.map(id => {
      return schedule_data.find(a => a?.id === id)
    })

  return (
    <View>
      <View style={{ backgroundColor: '#ebebfd', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{schedule_data_count}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Results Found </Text>
          <View style={{ flexGrow: 1 }} />
          <Pressable onPress={() => navigation.navigate('ScheduleReportScreen')} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, paddingLeft: 10, paddingRight: 10 }}>
            <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Schedule Report</Text>
          </Pressable>
        </View>
      </View>

      <View>
        <ScheduleList groupName={groupName} loadMore={loadMore} schedule_data={newDataSchedule} fetchMoreData={fetchMoreData} loader={loader} />
      </View>
    </View>
  )
}

export default Schedule;