import React, { Fragment, useState, } from 'react'
import { View } from 'react-native';
import { Text, Pressable } from 'react-native';
import { Divider, Input, } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import { ActivityIndicator, } from 'react-native'
import SegmentedControlTab from "react-native-segmented-control-tab";
import AlarmList from './RoleCheckBox/AlarmList';
import ReportList from './RoleCheckBox/ReportList';
import TabList from './RoleCheckBox/TabList';
import ViewList from './RoleCheckBox/ViewList';
import { useHeader } from '../../ApiHeader';
import { useNavigation } from '@react-navigation/native';

const AddUserRole = () => {
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [tabIndex, setTabIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [updateModal, setUpdateModal] = useState({ modal: false, message: '', status: null });
  const [valueTab, setValueTab] = useState({
    audit_trail_Read: 0,

    command_Create: false,//Create	Read	Edit	Delete
    command_Read: false,//Create	Read	Edit	Delete
    command_Edit: false,//Create	Read	Edit	Delete
    command_Delete: false,//Create	Read	Edit	Delete

    dashboard_Read: 0,

    device_Create: false,//Create	Read	Edit	Delete
    device_Read: false,//Create	Read	Edit	Delete
    device_Edit: false,//Create	Read	Edit	Delete
    device_Delete: false,//Create	Read	Edit	Delete

    driver_Create: false,//Create	Read	Edit	Delete
    driver_Read: false,//Create	Read	Edit	Delete
    driver_Edit: false,//Create	Read	Edit	Delete
    driver_Delete: false,//Create	Read	Edit	Delete

    event_Read: 0,

    geofence_Create: false,//Create	Read	Edit	Delete
    geofence_Read: false,//Create	Read	Edit	Delete
    geofence_Edit: false,//Create	Read	Edit	Delete
    geofence_Delete: false,//Create	Read	Edit	Delete

    group_Create: false,//Create	Read	Edit	Delete
    group_Read: false,//Create	Read	Edit	Delete
    group_Edit: false,//Create	Read	Edit	Delete
    group_Delete: false,//Create	Read	Edit	Delete

    notification_Create: false,//Create	Read	Edit	Delete
    notification_Read: false,//Create	Read	Edit	Delete
    notification_Edit: false,//Create	Read	Edit	Delete
    notification_Delete: false,//Create	Read	Edit	Delete

    control_panel_Create: false,//Create	Read	Edit	Delete
    control_panel_Delete: false,//Create	Read	Edit	Delete

    position_Read: false,//Readd

    route_Create: false,//Create	Read	Edit	Delete
    route_Read: false,//Create	Read	Edit	Delete
    route_Edit: false,//Create	Read	Edit	Delete
    route_Delete: false,//Create	Read	Edit	Delete

    schedule_Create: false,//Create	Read	Edit	Delete
    schedule_Read: false,//Create	Read	Edit	Delete
    schedule_Edit: false,//Create	Read	Edit	Delete
    schedule_Delete: false,//Create	Read	Edit	Delete

    server_Create: false,//Create	Read	Edit	Delete
    server_Read: false,//Create	Read	Edit	Delete
    server_Edit: false,//Create	Read	Edit	Delete
    server_Delete: false,//Create	Read	Edit	Delete

    sos_Create: false,//Create	Read	Edit	Delete
    sos_Read: false,//Create	Read	Edit	Delete
    sos_Edit: false,//Create	Read	Edit	Delete
    sos_Delete: false,//Create	Read	Edit	Delete

    statistic_Read: 0,//Read

    trip_Create: false,//Create	Read	Edit	Delete
    trip_Read: false,//Create	Read	Edit	Delete
    trip_Edit: false,//Create	Read	Edit	Delete
    trip_Delete: false,//Create	Read	Edit	Delete

    role_Create: false,//Create	Read	Edit	Delete
    role_Read: false,//Create	Read	Edit	Delete
    role_Edit: false,//Create	Read	Edit	Delete
    role_Delete: false,//Create	Read	Edit	Delete

    user_Create: false,//Create	Read	Edit	Delete
    user_Read: false,//Create	Read	Edit	Delete
    user_Edit: false,//Create	Read	Edit	Delete
    user_Delete: false,//Create	Read	Edit	Delete

    vehicle_registration_Create: false,//Create	Read	Edit	Delete
    vehicle_registration_Read: false,//Create	Read	Edit	Delete
    vehicle_registration_Edit: false,//Create	Read	Edit	Delete
    vehicle_registration_Delete: false,//Create	Read	Edit	Delete
  })
  const [valueView, setValueView] = useState({
    dashboard_overall: false,
    dashboard: false,
    dashboard_vehicle_summary: false,
    vehicle_list: false,
    vehicle_map: false,
    trails: false,
    trip_trail: false,
    by_vehicle: false,
    by_group: false,
    schedule: false,
    panic_status: false,
    panic_sos: false,
    entity: false,
    group: false,
    audit_trail: false,
    route_list: false,
    route_assign: false,
    geofence_configuration: false,
    alarm_configuration: false,
    alarm_log: false,
    user: false,
    role: false,
    control_panel: false
  })
  const [valueReport, setValueReport] = useState({
    all: false,
    route: false,
    trip: false,
    summary: false,
    event: false,
    stop: false,
  })
  const [value, setValue] = useState({
    id: '',
    createdon: '',
    rolename: '',
    general: false,
    sos: false,
    vibration: false,
    movement: false,
    low_speed: false,
    overspeed: false,
    fall_down: false,
    low_power: false,
    low_battery: false,
    fault: false,
    power_off: false,
    power_on: false,
    door: false,
    lock: false,
    unlock: false,
    geofence: false,
    geofence_enter: false,
    geofence_exit: false,
    gps_antenna_cut: false,
    accident: false,
    tow: false,
    idle: false,
    high_rpm: false,
    acceleration: false,
    braking: false,
    cornering: false,
    lane_change: false,
    fatigue_driving: false,
    power_cut: false,
    power_restored: false,
    jamming: false,
    temperature: false,
    parking: false,
    bonnet: false,
    foot_brake: false,
    fuel_leak: false,
    tampering: false,
    removing: false,
  });

  const RoleObj = JSON.stringify({
    roles: {
      alarm: {
        general: value?.general,
        sos: value?.sos,
        vibration: value?.vibration,
        movement: value?.movement,
        low_speed: value?.low_speed,
        overspeed: value?.overspeed,
        fall_down: value?.fall_down,
        low_power: value?.low_power,
        low_battery: value?.low_battery,
        fault: value?.fault,
        power_off: value?.power_off,
        power_on: value?.power_on,
        door: value?.door,
        lock: value?.lock,
        unlock: value?.unlock,
        geofence: value?.geofence,
        geofence_enter: value?.geofence_enter,
        geofence_exit: value?.geofence_exit,
        gps_antenna_cut: value?.gps_antenna_cut,
        accident: value?.accident,
        tow: value?.tow,
        idle: value?.idle,
        high_rpm: value?.high_rpm,
        acceleration: value?.acceleration,
        braking: value?.braking,
        cornering: value?.cornering,
        lane_change: value?.lane_change,
        fatigue_driving: value?.fatigue_driving,
        power_cut: value?.power_cut,
        power_restored: value?.power_restored,
        jamming: value?.jamming,
        temperature: value?.temperature,
        parking: value?.parking,
        bonnet: value?.bonnet,
        foot_brake: value?.foot_brake,
        fuel_leak: value?.fuel_leak,
        tampering: value?.tampering,
        removing: value?.removing
      },
      report: {
        all: valueReport?.all === false ? 0 : 1,
        route: valueReport?.route === false ? 0 : 1,
        trip: valueReport?.trip === false ? 0 : 1,
        summary: valueReport?.summary === false ? 0 : 1,
        event: valueReport?.event === false ? 0 : 1,
        stop: valueReport?.stop === false ? 0 : 1,
      },
      tab: {
        audit_trail: valueTab?.audit_trail_Read === false ? 0 : 4,
        command: 0,
        dashboard: valueTab?.dashboard_Read === false ? 0 : 4,
        device: 0,
        driver: 0,
        event: valueTab?.event_Read === false ? 0 : 4,
        geofence: 0,
        group: 0,
        notification: 0,
        control_panel: (valueTab?.control_panel_Create === false ? 0 : 8) + (valueTab?.control_panel_Delete === false ? 0 : 1),
        position: valueTab?.position_Read === false ? 0 : 4,
        route: 0,
        schedule: 0,
        server: 0,
        sos: 0,
        statistic: valueTab?.statistic_Read === false ? 0 : 4,
        trip: 0,
        role: 0,
        user: 0,
        vehicle_registration: 0,
      },
      view: {
        dashboard_overall: valueView?.dashboard_overall === false ? 0 : 1,
        dashboard: valueView?.dashboard === false ? 0 : 1,
        dashboard_vehicle_summary: valueView?.dashboard_vehicle_summary === false ? 0 : 1,
        vehicle_list: valueView?.vehicle_list === false ? 0 : 1,
        vehicle_map: valueView?.vehicle_map === false ? 0 : 1,
        trails: valueView?.trails === false ? 0 : 1,
        trip_trail: valueView?.trip_trail === false ? 0 : 1,
        by_vehicle: valueView?.by_vehicle === false ? 0 : 1,
        by_group: valueView?.by_group === false ? 0 : 1,
        schedule: valueView?.schedule === false ? 0 : 1,
        panic_status: valueView?.panic_status === false ? 0 : 1,
        panic_sos: valueView?.panic_sos === false ? 0 : 1,
        entity: valueView?.entity === false ? 0 : 1,
        group: valueView?.group === false ? 0 : 1,
        audit_trail: valueView?.audit_trail === false ? 0 : 1,
        route_list: valueView?.route_list === false ? 0 : 1,
        route_assign: valueView?.route_assign === false ? 0 : 1,
        geofence_configuration: valueView?.geofence_configuration === false ? 0 : 1,
        alarm_configuration: valueView?.alarm_configuration === false ? 0 : 1,
        alarm_log: valueView?.alarm_log === false ? 0 : 1,
        user: valueView?.user === false ? 0 : 1,
        role: valueView?.role === false ? 0 : 1,
        control_panel: valueView?.control_panel === false ? 0 : 1
      }
    },
    rolename: value?.rolename,
    createdon: new Date(),
  });

  const onSubmit = async () => {
    if (value.rolename !== '') {
      setLoader(true)
      await ApiRequestAuthorizationHook.post(`/user_roles`, RoleObj)
        .then(function (res) {
          if (res.status === 200) {
            setUpdateModal({ ...updateModal, modal: true, message: 'Role Created Successfully', status: 1 })
          }
        })
        .catch(function (err) {
          console.log('roleAdd', err)
          setLoader(false)
          setUpdateModal({ ...updateModal, modal: true, message: 'Role Updated failed', status: 0 })
        })
    }
  }

  const onRoute = () => {
    Navigation.goBack()
    setUpdateModal({ ...updateModal, modal: false, message: '', status: null })
  }

  return (
    <Fragment>
      <Modal isVisible={updateModal?.modal} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
          <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>TrackoLet</Text>
          <Text style={{ color: updateModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{updateModal?.message}</Text>
          <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
            <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal isVisible={loader}>
        <ActivityIndicator color={'#63CE78'} size={'large'} />
      </Modal>

      <View style={{ backgroundColor: '#ffffff', borderRadius: 5, paddingBottom: 10, elevation: 12, marginHorizontal: 15 }}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
          <View style={{ flexGrow: 1 }} />
          <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 18, color: "#252F40", }}>Add Roles</Text>
          <View style={{ flexGrow: 1 }} />
          <AntDesign onPress={() => Navigation.goBack()} name='closecircleo' size={20} color={"#252F40"} />
        </View>
        <View style={{ paddingTop: 15, padding: 10 }}>
          <Text style={{ color: '#000000', fontFamily: 'OpenSans-SemiBold', fontSize: 12, paddingBottom: 8, color: '#252F40' }}>Role Name</Text>
          <Input variant={'unstyled'} placeholder='Enter Role Name' placeholderTextColor={'#7D8EAB'} value={value.rolename} onChangeText={(Text) => setValue({ ...value, rolename: Text })} style={{ backgroundColor: '#f4f4fd', color: '#252F40', height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, }} />
        </View>
        <Divider thickness={1} style={{ marginTop: 8, marginBottom: 8 }} />

        <SegmentedControlTab
          values={["Alarm", "Report", "Tabs", "View"]}
          selectedIndex={tabIndex}
          onTabPress={(index) => { setTabIndex(index) }}
          borderRadius={5}
          tabsContainerStyle={{ height: 45, backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5, marginBottom: 5 }}
          tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderRadius: 5, borderColor: 'transparent' }}
          activeTabStyle={{ backgroundColor: '#7171F3', borderRadius: 5, elevation: 12 }}
          tabTextStyle={{ color: '#7171F3', fontFamily: 'OpenSans-Regular', fontSize: 14 }}
          activeTabTextStyle={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}
        />

        {tabIndex === 0 ?
          <AlarmList value={value} setValue={setValue} />
          : null}
        {tabIndex === 1 ?
          <ReportList value={valueReport} setValue={setValueReport} />
          : null}
        {tabIndex === 2 ?
          <TabList valueTab={valueTab} setValueTab={setValueTab} />
          : null}
        {tabIndex === 3 ?
          <ViewList value={valueView} setValue={setValueView} />
          : null}

        <Divider thickness={1} style={{ marginTop: 8 }} />
        <View style={{ paddingHorizontal: 15 }}>
          <Pressable onPress={() => onSubmit()} style={{ backgroundColor: '#4646F2', padding: 10, borderRadius: 5, marginTop: 10 }} >
            <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 14, fontFamily: 'OpenSans-Semibold' }}>Add New Role</Text>
          </Pressable>
        </View>
      </View>
    </Fragment>
  )
}

export default AddUserRole