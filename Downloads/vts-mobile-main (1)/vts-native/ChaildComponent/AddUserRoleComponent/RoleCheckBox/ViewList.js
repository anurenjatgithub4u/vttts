import React, { useState, useRef } from 'react'
import { ScrollView, Animated, } from 'react-native';
import { View } from 'react-native';
import { Text, } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Divider } from 'native-base';

import { Row, Col } from 'react-native-responsive-grid-system'

const ViewList = ({ value, setValue }) => {
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
      <View style={{ backgroundColor: '#F7F7F7', flexDirection: 'row', width: '100%', height: 300, padding: 5 }}>
        <ScrollView
          contentContainerStyle={{ paddingRight: 3 }}
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
            <Text style={{ color: '#7D8EAB', fontSize: 14, fontFamily: 'OpenSans-Regular', }}>Read</Text>
          </View>
          <Divider orientation='horizontal' style={{ marginTop: 5, marginBottom: 5 }} />

          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>dashboard overall</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.dashboard_overall ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, dashboard_overall: !value?.dashboard_overall })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>dashboard</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.dashboard ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, dashboard: !value?.dashboard })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>dashboard vehicle summary</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.dashboard_vehicle_summary ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, dashboard_vehicle_summary: !value?.dashboard_vehicle_summary })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>vehicle list</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.vehicle_list ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, vehicle_list: !value?.vehicle_list })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>vehicle map</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.vehicle_map ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, vehicle_map: !value?.vehicle_map })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>trails</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.trails ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, trails: !value?.trails })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>trip trail</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.trip_trail ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, trip_trail: !value?.trip_trail })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>by vehicle</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.by_vehicle ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, by_vehicle: !value?.by_vehicle })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>by group</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.by_group ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, by_group: !value?.by_group })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>schedule</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.schedule ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, schedule: !value?.schedule })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>panic status</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.panic_status ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, panic_status: !value?.panic_status })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>panic sos</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.panic_sos ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, panic_sos: !value?.panic_sos })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>entity</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.entity ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, entity: !value?.entity })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>group</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.group ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, group: !value?.group })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>audit trail</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.audit_trail ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, audit_trail: !value?.audit_trail })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>route list</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.route_list ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, route_list: !value?.route_list })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>route assign</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.route_assign ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, route_assign: !value?.route_assign })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>geofence configuration</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.geofence_configuration ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, geofence_configuration: !value?.geofence_configuration })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>alarm configuration</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.alarm_configuration ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, alarm_configuration: !value?.alarm_configuration })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>alarm log</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.alarm_log ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, alarm_log: !value?.alarm_log })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>user</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.user ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, user: !value?.user })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>role</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.role ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, role: !value?.role })}
            />
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>control panel</Text>
            <View style={{ flexGrow: 1 }} />
            <Checkbox
              uncheckedColor='#554F60'
              color='#252F40'
              status={value?.control_panel ? 'checked' : 'unchecked'}
              onPress={() => setValue({ ...value, control_panel: !value?.control_panel })}
            />
          </View>

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
    </View>
  )
}

export default ViewList