import React, { Fragment, useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, StatusBar, Dimensions, Pressable, BackHandler } from 'react-native';

import { Box, Text, Center, } from 'native-base';
import { Row, Col } from 'react-native-responsive-grid-system';
import Ionicons from 'react-native-vector-icons/Ionicons';


import GeneralInfo from '../ChaildComponent/EditScheduleReportComponent/GeneralInfo';
import Timing from '../ChaildComponent/EditScheduleReportComponent/Timing';

const EditScheduleReportScreen = ({ navigation }) => {
  const [generalinfoView, setGeneralinfoView] = useState(true);
  const [timingView, setTimingView] = useState(false);
  const [generalinfoActive, setGeneralinfoActive] = useState(true);
  const [timingActive, setTimingActive] = useState(false);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Fragment>
      <SafeAreaView style={{ backgroundColor: '#f5f6fa', flex: 1 }}>
        <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
        <View style={{
          paddingHorizontal: 15, paddingTop: 25, backgroundColor: '#ebebfd', width: Dimensions.get('window').width, shadowColor: '#470000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          elevation: 1
        }}>
          <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
            <Center>
              <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Edit Schedule Report</Text>
            </Center>
            <View style={{ position: 'absolute', left: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
              <Pressable onPress={() => navigation.goBack(-1)}>
                <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                  <Ionicons name='chevron-back-outline' color={'blue'} size={18} />
                </Center>
              </Pressable>
            </View>
          </Box>
        </View>


        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          nestedScrollEnabled={false}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#f5f6fa', width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}
          scrollEnabled={true}
        >
          <View style={{ marginHorizontal: 15, marginTop: 15, backgroundColor: '#e2e2e2', borderRadius: 50 }}>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ backgroundColor: generalinfoActive ? '#a1a1f8' : 'transparent', borderRadius: 50 }}>
                  <View style={{ backgroundColor: timingActive ? '#5D5DD8' : '#ffffff', width: 12, height: 12, borderRadius: 50, margin: 1 }} />
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ backgroundColor: timingActive ? '#a1a1f8' : 'transparent', borderRadius: 50 }}>
                  <View style={{ backgroundColor: '#ffffff', width: 12, height: 12, borderRadius: 50, margin: 1 }} />
                </View>
              </Col>
            </Row>
          </View>
          <View style={{ marginHorizontal: 15, }}>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Text style={{ fontSize: 11, color: timingActive === false ? '#252F40' : '#67748E', fontFamily: timingActive === false ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>General info</Text>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Text style={{ fontSize: 11, color: timingActive === true ? '#252F40' : '#67748E', fontFamily: timingActive === true ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>Timing</Text>
              </Col>
            </Row>
          </View>



          {generalinfoView ?
            <GeneralInfo
              generalinfoView={generalinfoView}
              timingView={timingView}
              setGeneralinfoView={setGeneralinfoView}
              setTimingView={setTimingView}
              generalinfoActive={generalinfoActive}
              timingActive={timingActive}
              setGeneralinfoActive={setGeneralinfoActive}
              setTimingActive={setTimingActive}
              navigation={navigation}
            />
            : null}
          {timingView ?
            <Timing
              generalinfoView={generalinfoView}
              timingView={timingView}
              setGeneralinfoView={setGeneralinfoView}
              setTimingView={setTimingView}
              generalinfoActive={generalinfoActive}
              timingActive={timingActive}
              setGeneralinfoActive={setGeneralinfoActive}
              setTimingActive={setTimingActive}
              navigation={navigation}
            />
            : null}
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  )
}

export default EditScheduleReportScreen