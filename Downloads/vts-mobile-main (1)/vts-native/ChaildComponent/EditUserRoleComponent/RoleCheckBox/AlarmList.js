import React, { useState, useRef } from 'react'
import { ScrollView, Animated, } from 'react-native';
import { View } from 'react-native';
import { Text, Pressable } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Divider } from 'native-base'


const AlarmList = ({ value, setValue }) => {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight)
      / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    extrapolate: 'clamp',
    inputRange: [0, difference],
    outputRange: [0, difference],
  });

  const onContentSizeChange = (_, contentHeight) =>
    setCompleteScrollBarHeight(contentHeight);

  const onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    setVisibleScrollBarHeight(height);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={{ backgroundColor: '#F7F7F7', flexDirection: 'row', width: '100%', height: 300, padding: 10 }}>
        <ScrollView
          contentContainerStyle={{ paddingRight: 14 }}
          onContentSizeChange={onContentSizeChange}
          onLayout={onLayout}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Menu</Text>
            <View style={{ flexGrow: 1 }} />
            <Text style={{ color: '#7D8EAB', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Read</Text>
          </View>
          <Divider orientation='horizontal' style={{ marginTop: 5, marginBottom: 5 }} />
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>general</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.general ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, general: !value?.general })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>sos</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.sos ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, sos: !value?.sos })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>vibration</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.vibration ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, vibration: !value?.vibration })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>movement</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.movement ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, movement: !value?.movement })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>low speed</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.low_speed ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, low_speed: !value?.low_speed })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>over speed</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.overspeed ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, overspeed: !value?.overspeed })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>fall down</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.fall_down ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, fall_down: !value?.fall_down })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>low power</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.low_power ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, low_power: !value?.low_power })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>low battery</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.low_battery ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, low_battery: !value?.low_battery })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>fault</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.fault ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, fault: !value?.fault })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>power off</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.power_off ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, power_off: !value?.power_off })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>power on</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.power_on ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, power_on: !value?.power_on })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>door</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.door ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, door: !value?.door })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>lock</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.lock ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, lock: !value?.lock })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>unlock</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.unlock ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, unlock: !value?.unlock })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>geofence</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.geofence ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, geofence: !value?.geofence })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>geofence enter</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.geofence_enter ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, geofence_enter: !value?.geofence_enter })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>geofence exit</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.geofence_exit ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, geofence_exit: !value?.geofence_exit })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>gps antenna cut</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.gps_antenna_cut ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, gps_antenna_cut: !value?.gps_antenna_cut })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>accident</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.accident ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, accident: !value?.accident })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>tow</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.tow ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, tow: !value?.tow })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>idle</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.idle ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, idle: !value?.idle })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>high_rpm</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.high_rpm ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, high_rpm: !value?.high_rpm })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>acceleration</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.acceleration ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, acceleration: !value?.acceleration })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>braking</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.braking ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, braking: !value?.braking })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>cornering</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.cornering ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, cornering: !value?.cornering })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>lane change</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.lane_change ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, lane_change: !value?.lane_change })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>fatigue driving</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.fatigue_driving ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, fatigue_driving: !value?.fatigue_driving })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>power cut</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.power_cut ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, power_cut: !value?.power_cut })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>power restored</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.power_restored ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, power_restored: !value?.power_restored })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>jamming</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.jamming ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, jamming: !value?.jamming })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>temperature</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.temperature ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, temperature: !value?.temperature })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>parking</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.parking ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, parking: !value?.parking })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>bonnet</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.bonnet ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, bonnet: !value?.bonnet })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>foot brake</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.foot_brake ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, foot_brake: !value?.foot_brake })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>fuel leak</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.fuel_leak ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, fuel_leak: !value?.fuel_leak })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>tampering</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.tampering ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, tampering: !value?.tampering })}
            />
          </Pressable>
          <Pressable style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>removing</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.removing ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, removing: !value?.removing })}
            />
          </Pressable>
        </ScrollView>
        <View style={{ backgroundColor: '#D8D8D8', borderRadius: 50, height: '100%', width: 8, }}>
          <Animated.View
            style={[
              { backgroundColor: '#7D8EAB', borderRadius: 50, width: 8, },
              {
                height: scrollIndicatorSize,
                transform: [{ translateY: scrollIndicatorPosition }],
              },
            ]}
          />
        </View>
      </View>
    </View >
  )
}

export default AlarmList;