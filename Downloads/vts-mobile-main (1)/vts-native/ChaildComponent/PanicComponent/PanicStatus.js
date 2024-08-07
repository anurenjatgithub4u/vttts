import React, { Fragment, useEffect } from 'react'
import { ScrollView, View } from 'react-native';
import { Pressable, Dimensions, ActivityIndicator, } from 'react-native'
import { Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BarChart, } from "react-native-gifted-charts";
import LinearGradient from 'react-native-linear-gradient';
import { Col, Row } from 'react-native-responsive-grid-system';
import { Select, CheckIcon } from 'native-base';
import { useRoute } from '@react-navigation/native';


const PanicStatus = ({ panicLoader, setTabIndex, statusSearch, setStatusSearch, getPanicData, value, setValue, }) => {
  const location = useRoute();
  const getPanicDataFilter = getPanicData?.bar_chart?.filter((data) => data.year == value?.date)
  const panicDataArrObj = getPanicDataFilter?.map((value) => value.data);
  var result = panicDataArrObj?.reduce((r, e) => (r.push(...e), r), [])

  const barData = result === undefined ? null : result?.map((value) => ({
    value: value?.num_panic,
    label: value?.tcmonth == 1 ? 'Jan' : value?.tcmonth == 2 ? 'Feb' : value?.tcmonth == 3 ? 'Mar' : value?.tcmonth == 4 ? 'Apr' : value?.tcmonth == 5 ? 'May' : value?.tcmonth == 6 ? 'Jun' : value?.tcmonth == 7 ? 'Jul' : value?.tcmonth == 8 ? 'Aug' : value?.tcmonth == 9 ? 'Sep' : value?.tcmonth == 10 ? 'Oct' : value?.tcmonth == 11 ? 'Nov' : 'Dec',
    labelTextStyle: { color: 'gray', fontSize: 8, fontFamily: 'OpenSans-Regular' },
    frontColor: '#4646F2',
  }))

  const panic_summaryData = getPanicDataFilter?.map((value) => value.panic_summary)
  var panic_summaryObj = panic_summaryData === undefined ? null : Object.assign({}, ...panic_summaryData);

  const onChangeState = (event) => {
    setStatusSearch({ ...statusSearch, search: event })
    setTabIndex(1)
  }

  const currentYear = (new Date()).getFullYear();
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
  const YearsList = range(currentYear, currentYear - 5, -1);

  return (
    <Fragment>

      <View style={{ paddingTop: 20, paddingHorizontal: 15 }}>
        <View>
          {panicLoader === true ?
            <Row>
              {Array.from(Array(3)).map((value, index) => (
                <Col key={index} xs={4} sm={4} md={4} lg={4}>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={'#63CE78'} size={'large'} />
                  </View>
                </Col>
              ))}
            </Row>
            :
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal={true}>
              <Pressable onPress={() => { location?.params?.userRole?.view?.panic_sos === 1 ? onChangeState('resolved') : null }}>
                <LinearGradient
                  colors={['#EE2C7C', '#FF7CB7']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{ paddingTop: 15, margin: 2, width: 130, paddingLeft: 10, paddingRight: 10, paddingBottom: 15, display: 'flex', alignItems: 'center', flexDirection: 'row', borderRadius: 9, height: 78 }}>
                  <View>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 12 }}>Resolved</Text>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 20, paddingTop: 8 }}>{panic_summaryObj?.num_sos_resolved === undefined ? 0 : panic_summaryObj?.num_sos_resolved}</Text>
                  </View>
                  <View style={{ flexGrow: 1 }} />
                  {location?.params?.userRole?.view?.panic_sos === 1 ?
                    <AntDesign name='arrowright' size={22} color={'#ffffff'} /> : null}
                </LinearGradient>
              </Pressable>
              <Pressable onPress={() => { location?.params?.userRole?.view?.panic_sos === 1 ? onChangeState('pending') : null }}>
                <LinearGradient
                  colors={['#00A5F9', '#04FE91']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{ paddingTop: 15, margin: 2, width: 130, paddingLeft: 10, paddingRight: 10, paddingBottom: 15, display: 'flex', alignItems: 'center', flexDirection: 'row', borderRadius: 9, height: 78 }}>
                  <View>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 12 }}>Pending</Text>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 20, paddingTop: 8 }}>{panic_summaryObj?.num_sos_pending === undefined ? 0 : panic_summaryObj?.num_sos_pending}</Text>
                  </View>
                  <View style={{ flexGrow: 1 }} />
                  {location?.params?.userRole?.view?.panic_sos === 1 ?
                    <AntDesign name='arrowright' size={22} color={'#ffffff'} /> : null}
                </LinearGradient>
              </Pressable>
              <Pressable onPress={() => { location?.params?.userRole?.view?.panic_sos === 1 ? onChangeState('acknowledged') : null }}>
                <LinearGradient
                  colors={['#EE2C7C', '#FF7CB7']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{ paddingTop: 15, margin: 2, width: 130, paddingLeft: 10, paddingRight: 10, paddingBottom: 15, display: 'flex', alignItems: 'center', flexDirection: 'row', borderRadius: 9, height: 78 }}>
                  <View>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 12 }}>Acknowledged</Text>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 20, paddingTop: 8 }}>{panic_summaryObj?.num_sos_acknowledged === undefined ? 0 : panic_summaryObj?.num_sos_acknowledged}</Text>
                  </View>
                  <View style={{ flexGrow: 1 }} />
                  {location?.params?.userRole?.view?.panic_sos === 1 ?
                    <AntDesign name='arrowright' size={22} color={'#ffffff'} /> : null}
                </LinearGradient>
              </Pressable>
              <Pressable onPress={() => { location?.params?.userRole?.view?.panic_sos === 1 ? onChangeState('cancelled') : null }}>
                <LinearGradient
                  colors={['#00A5F9', '#04FE91']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{ paddingTop: 15, margin: 2, width: 130, paddingLeft: 10, paddingRight: 10, paddingBottom: 15, display: 'flex', alignItems: 'center', flexDirection: 'row', borderRadius: 9, height: 78 }}>
                  <View>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 12 }}>Cancelled</Text>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 20, paddingTop: 8 }}>{panic_summaryObj?.num_sos_cancelled === undefined ? 0 : panic_summaryObj?.num_sos_cancelled}</Text>
                  </View>
                  <View style={{ flexGrow: 1 }} />
                  {location?.params?.userRole?.view?.panic_sos === 1 ?
                    <AntDesign name='arrowright' size={22} color={'#ffffff'} /> : null}
                </LinearGradient>
              </Pressable>
              <Pressable>
                <LinearGradient
                  colors={['#EF4436', '#FBAE40']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{ paddingTop: 15, margin: 2, width: 130, paddingLeft: 10, paddingRight: 10, paddingBottom: 15, display: 'flex', alignItems: 'center', flexDirection: 'row', borderRadius: 9, height: 78 }}>
                  <View>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 12 }}>Total</Text>
                    <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Bold', fontSize: 20, paddingTop: 8 }}>{panic_summaryObj?.total_sos === undefined ? 0 : panic_summaryObj?.total_sos}</Text>
                  </View>
                  <View style={{ flexGrow: 1 }} />
                </LinearGradient>
              </Pressable>
            </ScrollView>
          }
        </View>

        {panicLoader === true ?
          <View style={{ elevation: 6, alignItems: 'center', justifyContent: 'center', marginTop: 50, height: 250, backgroundColor: '#ffffff', borderRadius: 10 }}>
            {/* <Text style={{ color: 'gray', fontFamily: 'OpenSans-Regular' }}>No data found at moment</Text> */}
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <View>
            {barData === null ?
              <View style={{ elevation: 6, alignItems: 'center', justifyContent: 'center', marginTop: 50, height: 250, backgroundColor: '#ffffff', borderRadius: 10 }}>
                <Text style={{ color: 'gray', fontFamily: 'OpenSans-Regular' }}>No data found at moment</Text>
              </View>
              :
              <View style={{ marginTop: 20, marginBottom: 70, backgroundColor: '#ffffff', padding: 10, borderRadius: 10, overflow: 'scroll', elevation: 6 }}>
                <Text style={{ color: 'blue', fontFamily: 'OpenSans-Bold', fontSize: 14, paddingBottom: 4 }}>Total SOS</Text>
                <Select style={{ height: 40, backgroundColor: '#f4f4fd', color: '#000000', fontFamily: 'OpenSans-Regular', fontSize: 14 }} borderWidth={0} selectedValue={value.date} minWidth="200" placeholder="Select" _selectedItem={{
                  bg: "#f4f4fd",
                  endIcon: <CheckIcon size="5" />
                }} _light={{
                  bg: "#f4f4fd"
                }} _dark={{
                  bg: "coolGray.800"
                }} onValueChange={itemValue => setValue({ ...value, date: itemValue })}>
                  {YearsList.map((value, id) => (
                    <Select.Item key={id} shadow={2} label={value?.toString()} value={value?.toString()} />
                  ))}
                </Select>

                <View style={{ paddingTop: 10, paddingBottom: 30, overflow: 'scroll' }}>
                  <BarChart
                    data={barData}
                    barWidth={13}
                    rulesType="solid"
                    xAxisThickness={1}
                    xAxisColor={'gray'}
                    yAxisThickness={0}
                    hideYAxisText={false}
                    yAxisTextStyle={{ color: 'gray', fontSize: 8, fontFamily: 'OpenSans-Regular' }}
                    noOfSections={5}
                    roundedTop
                    height={150}
                    width={Dimensions.get('screen').width - 70}
                    showLine={false}
                    initialSpacing={10}
                  />
                </View>
              </View>
            }
          </View>
        }
      </View>
    </Fragment >
  )
}

export default PanicStatus