import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { LineChart } from "react-native-gifted-charts";
import { useHeader } from '../../../ApiHeader';


const TrailsChart = ({ itemObject, }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [isGraph, setIsGraph] = useState(false)
  const [speed, setSpeed] = useState([0]);
  const [battery, setBattery] = useState([0]);
  const [ignition, setIgnition] = useState([0]);
  const [deviceTime, setDeviceTime] = useState([0]);
  const [isLoading, setIsLoading] = useState(true)
  


  useEffect(() => {
    if (itemObject) {
      const controller = new AbortController();
      const signal = controller.signal;

      let speedarr = [];
      let batteryarr = [];
      let ignitionarr = [];
      let devicetimearr = [];
      let dayarr = [];
      ApiRequestAuthorizationHook.get(`/reports/route?deviceId=${itemObject?.deviceId}&from=${new Date(itemObject?.startTime)?.toISOString()}&to=${new Date(itemObject?.endTime)?.toISOString()}`, { signal: signal })
        .then((result) => {
          if (result?.status === 200) {
            if (result?.data?.data.length > 0) {
              result?.data?.data.map((value, index) => {
                speedarr.push(value.speed);
                batteryarr.push(value.attributes?.battery);
                ignitionarr.push(value.ignition ? value.ignition : 0);
                const devicet = value.deviceTime;
                const devicet1 = moment(value.deviceTime).format("DD MMM");
                dayarr.push(devicet1);
                const [date, time] = devicet.split('T');
                const [hours, min, sec] = time.split(':');
                if (devicet1 !== dayarr[index - 1]);
                devicetimearr.push(devicet1);
                if (devicet1 !== dayarr[index - 1])
                  devicetimearr.push(devicet1)
                else
                  devicetimearr.push(hours + ":" + min)
              })
              setSpeed(speedarr)
              setBattery(batteryarr)
              setIgnition(ignitionarr)
              setDeviceTime(devicetimearr)
            }
          }
        }).catch((err) => {
          console.log('err', err)
        })
        .finally(() => {
          setIsLoading(false)
        })


      return () => {
        controller.abort();
      };
    }
  }, []);

  let speedArr = speed?.map((value, index) => ({ value: value, label: deviceTime[index], labelTextStyle: { color: '#67748E', fontSize: 10, fontFamily: 'OpenSans-Regular', transform: [{ rotate: '0deg' }], }, }))
  let batteryArr = battery?.map((value, index) => ({ value: value, label: deviceTime[index], labelTextStyle: { color: '#67748E', fontSize: 10, fontFamily: 'OpenSans-Regular', transform: [{ rotate: '0deg' }], }, }))
  let ignitionArr = ignition?.map((value, index) => ({ value: value, label: deviceTime[index], labelTextStyle: { color: '#67748E', fontSize: 10, fontFamily: 'OpenSans-Regular', transform: [{ rotate: '0deg' }], }, }))

  if (isLoading) {
    return (
      <View style={{ height: 200, width: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: "center", elevation: 1, borderRadius: 5 }}>
        <ActivityIndicator size={'large'} color={'#63ce78'} />
      </View>
    )
  }

  return (
    <Fragment>
      {isGraph ?
        <>
          <View style={{ overflow: 'scroll', paddingTop: 20 }}>
            <LineChart
              data={speedArr}
              data2={batteryArr}
              data3={ignitionArr}
              height={130}
              rotateLabel={false}
              isAnimated={true}
              adjustToWidth={true}
              showVerticalLines={false}
              spacing={64}
              yAxisSide={'left'}
              noOfSections={5}
              color1="#00FF00"
              color2="#434348"
              color3="#7CB5EC"
              dataPointsHeight={6}
              dataPointsWidth={6}
              dataPointsColor1="#90ED7D"
              dataPointsColor2="#434348"
              dataPointsColor3="#7CB5EC"
              dataPointsColor4="#90ED77"
              dataPointsShape1='rectangular'
              dataPointsShape2='rectangular'
              dataPointsShape3='circular'
              dataPointsShape4='circular'
              textShiftY={-2}
              textShiftX={-5}
              textFontSize={13}
              showScrollIndicator={false}
              initialSpacing={50}
              yAxisThickness={0}
              xAxisThickness={1}
              disableScroll={false}
              rulesType="solid"
              rulesColor="gray"
              yAxisTextStyle={{ color: '#67748E', fontSize: 9, fontFamily: 'OpenSans-Regular' }}
              pointerConfig={{
                pointerStripHeight: 160,
                pointerStripColor: 'lightgray',
                pointerStripWidth: 2,
                pointerColor: 'lightgray',
                radius: 6,
                shiftPointerLabelY: 50,
                showPointerStrip: false,
                pointerLabelWidth: 100,
                pointerLabelHeight: 90,
                activatePointersOnLongPress: true,
                activatePointersDelay: 10,
                autoAdjustPointerLabelPosition: false,
                pointerLabelComponent: (items, index) => {

                  return (
                    <Fragment>
                      <View key={index} style={{ backgroundColor: '#ffffff', borderWidth: 1, padding: 10, borderRadius: 5, borderColor: '#67748E', zIndex: 99999, right: speedArr[speedArr?.length - 1]?.value === items[0]?.value ? 100 : 20 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>{items[0]?.label}</Text>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Battery: {items[0]?.value?.toFixed(2)}</Text>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Speed: {items[1]?.value?.toFixed(2)}</Text>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Ingnition: {items[2]?.value === 0 ? 'off' : 'on'}</Text>
                      </View>
                    </Fragment>
                  );
                },
              }}
            />
          </View>

          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', paddingTop: 20 }}>
            <View style={{ flexGrow: 1 }} />
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
              <Octicons name='dot-fill' size={17} color={'#7CB5EC'} />
              <Text h6 style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 11, marginLeft: 6 }}>Ignition</Text>
            </View>
            <View style={{ flexGrow: .3 }} />
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
              <Octicons name='dot-fill' size={17} color={'#434348'} />
              <Text h6 style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 11, marginLeft: 6 }}>Speed</Text>
            </View>
            <View style={{ flexGrow: .3 }} />
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
              <Octicons name='dot-fill' size={17} color={'#90ED7D'} />
              <Text h6 style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 11, marginLeft: 6 }}>Battery</Text>
            </View>
            <View style={{ flexGrow: 1 }} />
          </View>

          <TouchableOpacity onPress={() => setIsGraph(isGraph => !isGraph)} activeOpacity={0.50} style={{ backgroundColor: "#7171F3", height: 40, alignItems: 'center', width: "100%", justifyContent: "center", borderRadius: 5, marginTop: 20 }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Hide Graph</Text>
          </TouchableOpacity>
        </>
        :
        <View style={{ height: 200, width: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: "center", elevation: 1, borderRadius: 5 }}>
          <TouchableOpacity onPress={() => setIsGraph(isGraph => !isGraph)} activeOpacity={0.50} style={{ backgroundColor: "#7171F3", height: 40, alignItems: "center", width: "50%", justifyContent: "center", borderRadius: 5 }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Show Graph</Text>
          </TouchableOpacity>
        </View>
      }
    </Fragment>
  )
}

export default TrailsChart;