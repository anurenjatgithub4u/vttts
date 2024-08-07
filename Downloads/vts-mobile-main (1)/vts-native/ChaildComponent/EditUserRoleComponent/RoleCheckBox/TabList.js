import React, { useState, useRef } from 'react'
import { ScrollView, Animated, } from 'react-native';
import { View } from 'react-native';
import { Text, } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Divider } from 'native-base';

import { Row, Col } from 'react-native-responsive-grid-system'

const TabList = ({ valueTab, setValueTab}) => {
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
            <Text style={{ color: '#7D8EAB', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingRight: 5 }}>Create</Text>
            <Text style={{ color: '#7D8EAB', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingRight: 5 }}>Read</Text>
            <Text style={{ color: '#7D8EAB', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingRight: 5 }}>Edit</Text>
            <Text style={{ color: '#7D8EAB', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Delete</Text>
          </View>
          <Divider orientation='horizontal' style={{ marginTop: 5, marginBottom: 5 }} />

          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>audit trail</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.audit_trail_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, audit_trail_Read: !valueTab?.audit_trail_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>command</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.command_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, command_Create: !valueTab?.command_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.command_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, command_Read: !valueTab?.command_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.command_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, command_Edit: !valueTab?.command_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.command_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, command_Delete: !valueTab?.command_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>dashboard</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.dashboard_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, dashboard_Read: !valueTab?.dashboard_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>device</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.device_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, device_Create: !valueTab?.device_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.device_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, device_Read: !valueTab?.device_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.device_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, device_Edit: !valueTab?.device_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.device_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, device_Delete: !valueTab?.device_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>driver</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.driver_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, driver_Create: !valueTab?.driver_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.driver_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, driver_Read: !valueTab?.driver_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.driver_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, driver_Edit: !valueTab?.driver_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.driver_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, driver_Delete: !valueTab?.driver_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>event</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.event_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, event_Read: !valueTab?.event_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>geofence</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.geofence_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, geofence_Create: !valueTab?.geofence_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.geofence_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, geofence_Read: !valueTab?.geofence_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.geofence_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, geofence_Edit: !valueTab?.geofence_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.geofence_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, geofence_Delete: !valueTab?.geofence_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>group</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.group_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, group_Create: !valueTab?.group_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.group_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, group_Read: !valueTab?.group_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.group_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, group_Edit: !valueTab?.group_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.group_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, group_Delete: !valueTab?.group_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>notification</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.notification_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, notification_Create: !valueTab?.notification_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.notification_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, notification_Read: !valueTab?.notification_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.notification_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, notification_Edit: !valueTab?.notification_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.notification_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, notification_Delete: !valueTab?.notification_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>control panel</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.control_panel_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, control_panel_Create: !valueTab?.control_panel_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.control_panel_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, control_panel_Delete: !valueTab?.control_panel_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>position</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.position_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, position_Read: !valueTab?.position_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>route</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.route_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, route_Create: !valueTab?.route_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.route_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, route_Read: !valueTab?.route_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.route_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, route_Edit: !valueTab?.route_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.route_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, route_Delete: !valueTab?.route_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>schedule</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.schedule_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, schedule_Create: !valueTab?.schedule_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.schedule_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, schedule_Read: !valueTab?.schedule_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.schedule_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, schedule_Edit: !valueTab?.schedule_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.schedule_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, schedule_Delete: !valueTab?.schedule_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>server</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.server_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, server_Create: !valueTab?.server_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.server_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, server_Read: !valueTab?.server_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.server_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, server_Edit: !valueTab?.server_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.server_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, server_Delete: !valueTab?.server_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>sos</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.sos_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, sos_Create: !valueTab?.sos_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.sos_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, sos_Read: !valueTab?.sos_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.sos_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, sos_Edit: !valueTab?.sos_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.sos_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, sos_Delete: !valueTab?.sos_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>statistic</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.statistic_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, statistic_Read: !valueTab?.statistic_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
                <Col xs={3} sm={3} md={3} lg={3}></Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>trip</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.trip_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, trip_Create: !valueTab?.trip_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.trip_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, trip_Read: !valueTab?.trip_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.trip_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, trip_Edit: !valueTab?.trip_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.trip_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, trip_Delete: !valueTab?.trip_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>role</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.role_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, role_Create: !valueTab?.role_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.role_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, role_Read: !valueTab?.role_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.role_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, role_Edit: !valueTab?.role_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.role_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, role_Delete: !valueTab?.role_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>user</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.user_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, user_Create: !valueTab?.user_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.user_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, user_Read: !valueTab?.user_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.user_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, user_Edit: !valueTab?.user_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.user_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, user_Delete: !valueTab?.user_Delete })}
                  />
                </Col>
              </Row>
            </View>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <Text style={{ paddingLeft: 0, fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#000000', textTransform: 'capitalize' }}>vehicle registration</Text>
            </View>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.vehicle_registration_Create ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, vehicle_registration_Create: !valueTab?.vehicle_registration_Create })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.vehicle_registration_Read ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, vehicle_registration_Read: !valueTab?.vehicle_registration_Read })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.vehicle_registration_Edit ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, vehicle_registration_Edit: !valueTab?.vehicle_registration_Edit })}
                  />
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <Checkbox
                    uncheckedColor='#554F60'
                    color='#252F40'
                    status={valueTab?.vehicle_registration_Delete ? 'checked' : 'unchecked'}
                    onPress={() => setValueTab({ ...valueTab, vehicle_registration_Delete: !valueTab?.vehicle_registration_Delete })}
                  />
                </Col>
              </Row>
            </View>
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

export default TabList;