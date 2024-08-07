import React, { Fragment, useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { PieChart } from "react-native-gifted-charts";
import { useNavigation } from '@react-navigation/native';
import { Row, Col } from 'react-native-responsive-grid-system';
import { Box, } from 'native-base';
import { useHeader } from '../../../ApiHeader';


const TodayAlarm = () => {
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook, } = useHeader();
  const [todayEvent, setTodayEvent] = useState(null);
  const [loaderTodayAlarm, setLoaderTodayAlarm] = useState(true);

  const fetchData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get('/dashboard/todayevents', { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setTodayEvent(response?.data);
        }
      })
      .catch(function (error) {
        console.log('TodayAlarm', error);
        // setErrorTodayAlarm(error)
      })
      .finally(function () {
        setLoaderTodayAlarm(false)
      });
    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [Navigation])

  const title = [
    { name: 'Sos', color: '#55b9ed', value: todayEvent?.sos === undefined ? 0 : todayEvent?.sos },
    { name: 'Geofence', color: '#b894fb', value: todayEvent?.geofence === undefined ? 0 : todayEvent?.geofence },
    { name: 'Geofence Enter', color: '#1f78b4', value: todayEvent?.geofenceEnter === undefined ? 0 : todayEvent?.geofenceEnter },
    { name: 'Geofence Exit', color: '#f0ab5b', value: todayEvent?.geofenceExit === undefined ? 0 : todayEvent?.geofenceExit },
    { name: 'Overspeed', color: '#fa9f9f', value: todayEvent?.overspeed === undefined ? 0 : todayEvent?.overspeed }
  ];

  return (
    <Fragment>
      <View style={{ marginTop: 10 }}>
        <View style={{ marginTop: 5, elevation: 0, backgroundColor: '#FFFFFF', height: 213, borderRadius: 10, padding: 15, }}>
          <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingBottom: 25 }}>
            <Text style={{ color: '#f25555', fontSize: 14, fontFamily: 'OpenSans-Bold', }}>Todays Alarm</Text>
            <Box style={{ flexGrow: 1 }} />
            <TouchableOpacity activeOpacity={0.80} /* onPress={() => Navigation.navigate({ name: 'AlarmScreen', params: { tab: 'Logs' } })} */>

            </TouchableOpacity>
          </Box>

          {loaderTodayAlarm ?
            <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 20, paddingBottom: 20 }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{}}>
                  {todayEvent === null ?
                    <PieChart
                      data={Array?.from(Array(6))?.map((_, value) => ({ color: '#EDEDFF', value: 10 }))}
                      radius={54}
                    />
                    :
                    todayEvent?.sos === 0 && todayEvent?.geofence === 0 && todayEvent?.geofenceEnter === 0 && todayEvent?.geofenceExit === 0 && todayEvent?.overspeed === 0 ?
                    <PieChart
                      data={Array?.from(Array(6))?.map((_, value) => ({ color: '#EDEDFF', value: 10 }))}
                      radius={54}
                    />
                    :
                    <PieChart
                      data={title}
                      radius={54}
                      initialAngle={0}
                      isThreeD={false}
                      focusOnPress={false}
                      toggleFocusOnPress={false}
                      sectionAutoFocus={false}
                      semiCircle={false}
                      showValuesAsLabels={false}
                      showText={false}
                      showTextBackground={false}
                      shadow={false}
                    />
                  }
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                  <View style={{ flexDirection: 'column', paddingTop: 7 }}>
                    {title.map((value, i) => (
                      <View key={i} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <FontAwesome name='circle' color={value.color} size={13} />
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ marginLeft: 10, color: '#67748E', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>{value.name}</Text>
                          <Text style={{ marginLeft: 5, color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 12 }}>({value.value})</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </Col>
            </Row>
          }
        </View>
      </View>
    </Fragment>
  )
}

export default TodayAlarm
