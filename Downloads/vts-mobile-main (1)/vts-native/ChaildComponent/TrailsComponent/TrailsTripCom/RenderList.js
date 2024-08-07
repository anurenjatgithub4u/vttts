import React from 'react';
import { View, Text, Pressable, LogBox } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Row, Col } from 'react-native-responsive-grid-system'
import Dash from 'react-native-dash';
import { MeterToKm, msToTime } from '../../../constants/UnitConvert';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const RenderList = ({ item, index, setItemObject }) => {

  return (
    <View style={{
      marginBottom: 10,
      backgroundColor: '#ffffff', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation: 5, /* position: 'relative', top: -70, */ paddingHorizontal: 10, paddingBottom: 30
    }}>
      {index === 0 ?
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <View style={{ backgroundColor: "#252F40", width: 110, height: 3, borderRadius: 5, marginTop: 10, marginBottom: 10 }} />
        </View>
        : null}
      <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 15, }}>
        <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#e2e2fd', borderRadius: 50, height: 25, width: 25 }}>
            <Fontisto name='truck' size={13} color={'#000000'} />
          </View>
          <Text style={{ color: 'blue', fontFamily: 'OpenSans-SemiBold', fontSize: 14, marginLeft: 10 }}>{item?.vehicleNo}</Text>{/* item?.deviceName */}
          <View style={{ flexGrow: 1 }} />
        </Pressable>
      </Pressable>
      <View style={{ paddingTop: 20, }}>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 10, textAlign: 'center', color: '#000000' }}>{new Date(item?.startTime).toDateString()}</Text>
              <AntDesign name='checkcircle' size={15} color={'#63ce78'} style={{ paddingLeft: 10, }} />
            </View>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8}>
            <View style={{}}>
              <Text style={{ fontFamily: 'OpenSans-Light', fontSize: 10, color: '#000000', paddingLeft: 10 }}>
                {/* {item?.startAddress} */} -
              </Text>
            </View>
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
              <View style={{ flexGrow: 1 }} />
              {/* <Divider orientation='vertical' thickness={2} style={{ height: 100, }} /> */}
              <Dash dashColor='#B9B9B9' dashThickness={2} dashLength={2} dashGap={3} style={{ height: 120, flexDirection: 'column', paddingRight: 13 }} />
            </View>
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 10, textAlign: 'center', color: '#000000' }}>{new Date(item?.endTime).toDateString()}</Text>
              <AntDesign name='checkcircle' size={15} color={'#63ce78'} style={{ paddingLeft: 10, }} />
            </View>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8}>
            <View style={{}}>
              <Text style={{ fontFamily: 'OpenSans-Light', fontSize: 10, color: '#000000', paddingLeft: 10, }}>
                {/* {item?.endAddress} */} -
              </Text>
            </View>
          </Col>
        </Row>
      </View>

      <View style={{ paddingTop: 30 }}>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>

          </Col>
          <Col xs={8} sm={8} md={8} lg={8}>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <FontAwesome5 name='route' color={'#63CE78'} />
              <Text style={{ fontFamily: 'OpenSans-Light', paddingLeft: 10, fontSize: 12, color: '#000000' }}>
                Distance
              </Text>
              <Text style={{ fontFamily: 'OpenSans-Bold', paddingLeft: 10, fontSize: 12, color: '#000000' }}>
                {MeterToKm(0)} Km
              </Text>
            </View>
          </Col>
        </Row>
      </View>
      <View style={{ paddingTop: 30 }}>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8}>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <Feather name='clock' color={'#e08d2b'} />
              <Text style={{ fontFamily: 'OpenSans-Light', paddingLeft: 10, fontSize: 12, color: '#000000' }}>
                Duration
              </Text>
              <Text style={{ fontFamily: 'OpenSans-Bold', paddingLeft: 10, fontSize: 12, color: '#000000' }}>
                {msToTime(0)} Hrs
              </Text>
            </View>
          </Col>
        </Row>
      </View>
      <View style={{ paddingTop: 30 }}>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
          </Col>
          <Col xs={8} sm={8} md={8} lg={8}>
            <Pressable onPress={() => { setItemObject(item); }}
              style={{ padding: 10, justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderColor: 'blue', borderRadius: 5 }}>
              <AntDesign name='play' color={'blue'} size={16} />
              <Text style={{ paddingLeft: 5, fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#000000' }}>Play trails on map</Text>
            </Pressable>
          </Col>
        </Row>
      </View>
    </View>
  )
}

export default RenderList