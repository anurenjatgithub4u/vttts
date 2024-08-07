import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, StatusBar, Pressable } from 'react-native';
import { Text, } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from "react-native-segmented-control-tab";
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import TrackFloat from '../FloatNavigation/TrackFloat';
import { useRoute } from '@react-navigation/native';

const Vehicle = ComponentLoadable(lazy(() => import('../ChaildComponent/ReportComponent/Vehicle')));
const Group = ComponentLoadable(lazy(() => import('../ChaildComponent/ReportComponent/Group')));
const Miscellaneous = ComponentLoadable(lazy(() => import('../ChaildComponent/ReportComponent/Miscellaneous')));

const ReportScreen = ({ navigation }) => {
  const Lodation = useRoute();
  const [tabIndex, setTabIndex] = useState(0);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTabIndex(0)
    });
    return unsubscribe;
  }, [navigation])


  const tabConfig = [{ id: 1, name: "Vehicle", visivle: Lodation?.params?.userRole?.view?.by_vehicle === 1 ? true : false }, { id: 2, name: "Group", visivle: Lodation?.params?.userRole?.view?.by_group === 1 ? true : false }, { id: 3, name: "Miscellaneous", visivle: true }]
  return (
    <Fragment>
      <View>
        <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
        <View style={{ paddingHorizontal: 15, backgroundColor: '#ebebfd', paddingBottom: 15 }}>
          <View style={{ paddingTop: 10, paddingBottom: 10 }}>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
              <Pressable onPress={() => navigation.goBack()} style={{ backgroundColor: '#d0d0fb', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 5 }}>
                <Ionicons name='chevron-back-outline' color={'#7171F3'} size={24} />
              </Pressable>
              <View style={{ flexGrow: 1 }} />
              <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#000000' }}>Report</Text>
              <View style={{ flexGrow: 1 }} />
              <Pressable style={{ width: 40, height: 40, }}>

              </Pressable>
            </View>
          </View>

          <SegmentedControlTab
            values={tabConfig?.filter(val => val?.visivle === true)?.map((value) => (value?.name))}
            selectedIndex={tabIndex}
            onTabPress={(index) => setTabIndex(index)}
            enabled={true}
            multiple={false}
            borderRadius={5}
            tabsContainerStyle={{ height: 40, backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5 }}
            tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderColor: 'transparent' }}
            activeTabStyle={{ backgroundColor: '#7171F3', borderRadius: 5, elevation: 12 }}
            tabTextStyle={{ color: '#7171F3', fontFamily: 'OpenSans-Regular', fontSize: 14 }}
            activeTabTextStyle={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}
          />
        </View>

        {tabIndex === 0 ?
          Lodation?.params?.userRole?.view?.by_vehicle === 1 ?
            <Vehicle />
            :
            Lodation?.params?.userRole?.view?.by_group === 1 ?
              <Group />
              :
              <Miscellaneous />
          : null}
        {tabIndex === 1 ?
          Lodation?.params?.userRole?.view?.by_vehicle === 1 ?
            Lodation?.params?.userRole?.view?.by_group === 1 ?
              <Group />
              :
              <Miscellaneous />
            :
            <Miscellaneous />
          : null}
        {tabIndex === 2 ?
          <Miscellaneous />
          : null}
      </View>

      <TrackFloat />
    </Fragment>
  )
}

export default ReportScreen;
