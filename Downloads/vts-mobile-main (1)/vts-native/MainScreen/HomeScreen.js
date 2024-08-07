import React, { lazy, Fragment, useState, } from 'react';
import { View, ScrollView, StatusBar, Dimensions, Pressable, StyleSheet } from 'react-native';
import { Box, Text, Divider } from 'native-base';
import moment from 'moment';
import { Row, Col } from 'react-native-responsive-grid-system';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import { useHeader } from '../ApiHeader';

import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const OverView = ComponentLoadable(lazy(() => import('../MainComponent/HomeScreenComponet/OverView')))
const Summary = ComponentLoadable(lazy(() => import('../MainComponent/HomeScreenComponet/Summary')))
const ProfileSection = ComponentLoadable(lazy(() => import('../MainComponent/HomeScreenComponet/OverViewComponents/ProfileSection')))

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const HomeScreen = () => {
  const [slideOverViewCom, setSlideOverViewCom] = useState(true);
  const { ApiRequestAuthorizationHook } = useHeader();

  // Vahicle list
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [vehicle_count, setVehicle_count] = useState('0');
  const [vehicle_summary, setVehicle_summary] = useState([]);
  const [loader, setLoader] = useState(true);

  const pageSize = 25;
  const reques = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/dashboard/vehicle_summary/?currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {

          setVehicle_summary(oldArray => [...oldArray, ...response.data.data]);
          setVehicle_count(response.data.noRecords)
          setTotalPage(response.data.totalPage)
        } else {

        }
      })
      .catch(function (error) {
        console.log("vehicle_summary", error);
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

  // const devicet = new Date()?.toISOString();
  // const devicet1 = moment(devicet).format("DD MMM");
  // const [date, time] = devicet.split('T')
  // const [hours, min, sec] = time.split(':')
  // console.log(date, hours, min,)

  // const date = new Date()?.toISOString()
  // console.log(date?.split("T")[1]?.split(":"))

  return (
    <Fragment>
      <View style={{ backgroundColor: '#ebebfd', width: Dimensions.get('window').width, flex: 1, /* paddingHorizontal: 15, */ }}>
        <FocusAwareStatusBar barStyle='dark-content' backgroundColor="#ebebfd" />

        {slideOverViewCom ?
          null
          :
          <>
            <ProfileSection />
            <View style={{ paddingHorizontal: 15 }}>
              <Box style={[style.GroupButton, { paddingHorizontal: 15, }]}>
                <Row >
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <Pressable onPress={() => { setSlideOverViewCom(true); }} style={[{ backgroundColor: slideOverViewCom === true ? '#7171f3' : 'transparent', padding: 5, borderRadius: 3 }]}>
                      <Text style={{ textAlign: 'center', color: slideOverViewCom === true ? '#ffffff' : '#7171F3', fontSize: 14, fontFamily: slideOverViewCom === true ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>
                        Overview
                      </Text>
                    </Pressable>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <Pressable onPress={() => { setSlideOverViewCom(false); }} style={[{ backgroundColor: slideOverViewCom === false ? '#7171f3' : 'transparent', padding: 5, borderRadius: 3 }]}>
                      <Text style={{ textAlign: 'center', color: slideOverViewCom === false ? "#ffffff" : '#7171F3', fontSize: 14, fontFamily: slideOverViewCom === false ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>
                        Vehicle Summary
                      </Text>
                    </Pressable>
                  </Col>
                </Row>
              </Box>
            </View>
          </>
        }

        {slideOverViewCom ?
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            nestedScrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#ebebfd' }}
            scrollEnabled={slideOverViewCom ? true : false}
          // onScroll={onScroll}
          >
            <ProfileSection />
            <View style={{ paddingHorizontal: 15 }}>
              {/* <Box style={[style.GroupButton, {}]}>
                <Row>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <Pressable onPress={() => { setSlideOverViewCom(true); }} style={[{ backgroundColor: slideOverViewCom === true ? '#7171f3' : 'transparent', padding: 5, borderRadius: 3 }]}>
                      <Text style={{ textAlign: 'center', color: slideOverViewCom === true ? '#ffffff' : '#7171F3', fontSize: 14, fontFamily: slideOverViewCom === true ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>
                        Overview
                      </Text>
                    </Pressable>
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={6}>
                    <Pressable onPress={() => { setSlideOverViewCom(false); }} style={[{ backgroundColor: slideOverViewCom === false ? '#7171f3' : 'transparent', padding: 5, borderRadius: 3 }]}>
                      <Text style={{ textAlign: 'center', color: slideOverViewCom === false ? "#ffffff" : '#7171F3', fontSize: 14, fontFamily: slideOverViewCom === false ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>
                        Vehicle Summary
                      </Text>
                    </Pressable>
                  </Col>
                </Row>
              </Box> */}
              <Divider orientation='horizontal' thickness={1} style={{ backgroundColor: '#7171F3', marginTop: 5, borderRadius: 3 }} />
            </View>


            <OverView
              slideOverViewCom={slideOverViewCom}
              setSlideOverViewCom={setSlideOverViewCom}
            />
          </ScrollView>
          :
          <Summary
            slideOverViewCom={slideOverViewCom}
            setSlideOverViewCom={setSlideOverViewCom}

            loadMore={loadMore}
            vehicle_count={vehicle_count}
            vehicle_summary={vehicle_summary}
            loader={loader}
            fetchMoreData={fetchMoreData}
          />
        }
      </View>
    </Fragment >
  )
}

export default HomeScreen;


const style = StyleSheet.create({
  GroupButton: {
    backgroundColor: '#ffffff',
    width: '100%',
    marginTop: 20,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
  }
});