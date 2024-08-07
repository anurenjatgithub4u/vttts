import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, StatusBar, Pressable } from 'react-native';
import { Box, Text, Center } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from "react-native-segmented-control-tab";
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import TrackFloat from '../FloatNavigation/TrackFloat';
import { useRoute } from '@react-navigation/native';

const Trails = ComponentLoadable(lazy(() => import('../ChaildComponent/TrailsComponent/Trails')));
const TrailsTrip = ComponentLoadable(lazy(() => import('../ChaildComponent/TrailsComponent/TrailsTrip')));

const TrailsScreen = ({ navigation }) => {
  const Lodation = useRoute();
  const [itemObject, setItemObject] = useState(null)
  const [tabIndex, setTabIndex] = useState(0);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isDays, setIsDays] = useState(false);
  const [trailsMapShow, setTrailsMapShow] = useState(false);

  const [trailsData, setTrailsData] = useState([]);
  const [value, setValue] = useState({
    Trail: '',
    Device: '',
    Date: '',
  });

  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  d.setDate(d.getDate() + 1)
  const onResetFunc = () => {
    setTrailsMapShow(false)
    setValue({ ...value, Trail: '', Device: '', Date: '' });
    setTrailsData([]);
    setItemObject(null)
    setFromDate(new Date(d))
    setToDate(new Date())
  }


  useEffect(() => {
    setFromDate(new Date(d))
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTabIndex(0)
    });
    return unsubscribe;
  }, [navigation])

  const tabConfig = [{ id: 1, name: "Trails", visivle: Lodation?.params?.userRole?.view?.trails === 1 ? true : false }, { id: 2, name: "Trails/Trip", visivle: Lodation?.params?.userRole?.view?.trip_trail === 1 ? true : false }]
  return (
    <Fragment>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >

          <View style={{ backgroundColor: '#ebebfd', paddingBottom: 15, paddingHorizontal: 15 }}>
            <View style={{ paddingTop: 20, }}>
              <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
                <Center>
                  <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#000000' }}>Trails</Text>
                </Center>
                <View style={{ position: 'absolute', left: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                  {itemObject === null ?
                    trailsMapShow ?
                      < Pressable onPress={() => onResetFunc()}>
                        <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                          <Ionicons name='chevron-back-outline' color={'blue'} size={18} />
                        </Center>
                      </Pressable>
                      :
                      null
                    :
                    trailsMapShow ?
                      <Pressable onPress={() => setItemObject(null)}>
                        <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                          <Ionicons name='chevron-back-outline' color={'blue'} size={18} />
                        </Center>
                      </Pressable>
                      :
                      null
                  }
                </View>
              </Box>
            </View>

            <SegmentedControlTab
              values={tabConfig?.filter(val => val?.visivle === true)?.map((value) => (value?.name))}
              selectedIndex={tabIndex}
              onTabPress={(index) => { setTabIndex(index); onResetFunc() }}

              borderRadius={5}
              tabsContainerStyle={{ height: 40, backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5, marginTop: 20 }}
              tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderRadius: 5, borderColor: 'transparent' }}
              activeTabStyle={{ backgroundColor: '#7171F3', borderRadius: 5, elevation: 12 }}
              tabTextStyle={{ color: '#7171F3', fontFamily: 'OpenSans-Regular', fontSize: 14 }}
              activeTabTextStyle={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}
            />
          </View>
        </ScrollView>


        {tabIndex === 0 ?
          Lodation?.params?.userRole?.view?.trails === 1 ?
            <Trails
              trailsMapShow={trailsMapShow}
              setTrailsMapShow={setTrailsMapShow}
              itemObject={itemObject}
              setItemObject={setItemObject}
              trailsData={trailsData}
              setTrailsData={setTrailsData}
              value={value}
              setValue={setValue}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              onResetFunc={onResetFunc}
              isDays={isDays}
              setIsDays={setIsDays}
            />
            :
            <TrailsTrip
              trailsTripMapShow={trailsMapShow}
              setTrailsTripMapShow={setTrailsMapShow}
              itemObject={itemObject}
              setItemObject={setItemObject}
              trailsData={trailsData}
              setTrailsData={setTrailsData}
              value={value}
              setValue={setValue}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              onResetFunc={onResetFunc}
              isDays={isDays}
              setIsDays={setIsDays}
            />
          :
          <TrailsTrip
            trailsTripMapShow={trailsMapShow}
            setTrailsTripMapShow={setTrailsMapShow}
            itemObject={itemObject}
            setItemObject={setItemObject}
            trailsData={trailsData}
            setTrailsData={setTrailsData}
            value={value}
            setValue={setValue}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            onResetFunc={onResetFunc}
            isDays={isDays}
            setIsDays={setIsDays}
          />
        }
      </SafeAreaView>

      <TrackFloat />
    </Fragment >
  )
}

export default TrailsScreen;