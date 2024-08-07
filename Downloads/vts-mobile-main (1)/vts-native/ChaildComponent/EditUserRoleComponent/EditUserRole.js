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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

const EditUserRole = () => {
  let Navigation = useNavigation();
  let Route = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [tabIndex, setTabIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [updateModal, setUpdateModal] = useState({ modal: false, message: '', status: null });
  const [valueTab, setValueTab] = useState({
    audit_trail_Read: false,

    command_Create: false,//Create	Read	Edit	Delete
    command_Read: false,//Create	Read	Edit	Delete
    command_Edit: false,//Create	Read	Edit	Delete
    command_Delete: false,//Create	Read	Edit	Delete

    dashboard_Read: false,

    device_Create: false,//Create	Read	Edit	Delete
    device_Read: false,//Create	Read	Edit	Delete
    device_Edit: false,//Create	Read	Edit	Delete
    device_Delete: false,//Create	Read	Edit	Delete

    driver_Create: false,//Create	Read	Edit	Delete
    driver_Read: false,//Create	Read	Edit	Delete
    driver_Edit: false,//Create	Read	Edit	Delete
    driver_Delete: false,//Create	Read	Edit	Delete

    event_Read: false,

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

    statistic_Read: false,//Read

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

  const GetRoleData = async () => {
    setLoader(true)
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/user_roles/${Route?.params?.Role_Id}`, { signal: signal })
      .then(function (ress) {
        if (ress.status === 200) {
          setValue({
            createdon: ress?.data?.createdon,
            id: ress?.data?.id,
            rolename: ress?.data?.rolename,
            general: ress?.data?.roles?.alarm?.general,
            sos: ress?.data?.roles?.alarm?.sos,
            vibration: ress?.data?.roles?.alarm?.vibration,
            movement: ress?.data?.roles?.alarm?.movement,
            low_speed: ress?.data?.roles?.alarm?.low_speed,
            overspeed: ress?.data?.roles?.alarm?.overspeed,
            fall_down: ress?.data?.roles?.alarm?.fall_down,
            low_power: ress?.data?.roles?.alarm?.low_power,
            low_battery: ress?.data?.roles?.alarm?.low_battery,
            fault: ress?.data?.roles?.alarm?.fault,
            power_off: ress?.data?.roles?.alarm?.power_off,
            power_on: ress?.data?.roles?.alarm?.power_on,
            door: ress?.data?.roles?.alarm?.door,
            lock: ress?.data?.roles?.alarm?.lock,
            unlock: ress?.data?.roles?.alarm?.unlock,
            geofence: ress?.data?.roles?.alarm?.geofence,
            geofence_enter: ress?.data?.roles?.alarm?.geofence_enter,
            geofence_exit: ress?.data?.roles?.alarm?.geofence_exit,
            gps_antenna_cut: ress?.data?.roles?.alarm?.gps_antenna_cut,
            accident: ress?.data?.roles?.alarm?.accident,
            tow: ress?.data?.roles?.alarm?.tow,
            idle: ress?.data?.roles?.alarm?.idle,
            high_rpm: ress?.data?.roles?.alarm?.high_rpm,
            acceleration: ress?.data?.roles?.alarm?.acceleration,
            braking: ress?.data?.roles?.alarm?.braking,
            cornering: ress?.data?.roles?.alarm?.cornering,
            lane_change: ress?.data?.roles?.alarm?.lane_change,
            fatigue_driving: ress?.data?.roles?.alarm?.fatigue_driving,
            power_cut: ress?.data?.roles?.alarm?.power_cut,
            power_restored: ress?.data?.roles?.alarm?.power_restored,
            jamming: ress?.data?.roles?.alarm?.jamming,
            temperature: ress?.data?.roles?.alarm?.temperature,
            parking: ress?.data?.roles?.alarm?.parking,
            bonnet: ress?.data?.roles?.alarm?.bonnet,
            foot_brake: ress?.data?.roles?.alarm?.foot_brake,
            fuel_leak: ress?.data?.roles?.alarm?.fuel_leak,
            tampering: ress?.data?.roles?.alarm?.tampering,
            removing: ress?.data?.roles?.alarm?.removing,
          });

          setValueReport({
            ...valueReport,
            all: ress?.data?.roles?.report?.all === 4 ? true : false,
            route: ress?.data?.roles?.report?.route === 4 ? true : false,
            trip: ress?.data?.roles?.report?.trip === 4 ? true : false,
            summary: ress?.data?.roles?.report?.summary === 4 ? true : false,
            event: ress?.data?.roles?.report?.event === 4 ? true : false,
            stop: ress?.data?.roles?.report?.stop === 4 ? true : false,
          });
          setValueView({
            ...valueView,
            dashboard_overall: ress?.data?.roles?.view?.dashboard_overall === 1 ? true : false,
            dashboard: ress?.data?.roles?.view?.dashboard === 1 ? true : false,
            dashboard_vehicle_summary: ress?.data?.roles?.view?.dashboard_vehicle_summary === 1 ? true : false,
            vehicle_list: ress?.data?.roles?.view?.vehicle_list === 1 ? true : false,
            vehicle_map: ress?.data?.roles?.view?.vehicle_map === 1 ? true : false,
            trails: ress?.data?.roles?.view?.trails === 1 ? true : false,
            trip_trail: ress?.data?.roles?.view?.trip_trail === 1 ? true : false,
            by_vehicle: ress?.data?.roles?.view?.by_vehicle === 1 ? true : false,
            by_group: ress?.data?.roles?.view?.by_group === 1 ? true : false,
            schedule: ress?.data?.roles?.view?.schedule === 1 ? true : false,
            panic_status: ress?.data?.roles?.view?.panic_status === 1 ? true : false,
            panic_sos: ress?.data?.roles?.view?.panic_sos === 1 ? true : false,
            entity: ress?.data?.roles?.view?.entity === 1 ? true : false,
            group: ress?.data?.roles?.view?.group === 1 ? true : false,
            audit_trail: ress?.data?.roles?.view?.audit_trail === 1 ? true : false,
            route_list: ress?.data?.roles?.view?.route_list === 1 ? true : false,
            route_assign: ress?.data?.roles?.view?.route_assign === 1 ? true : false,
            geofence_configuration: ress?.data?.roles?.view?.geofence_configuration === 1 ? true : false,
            alarm_configuration: ress?.data?.roles?.view?.alarm_configuration === 1 ? true : false,
            alarm_log: ress?.data?.roles?.view?.alarm_log === 1 ? true : false,
            user: ress?.data?.roles?.view?.user === 1 ? true : false,
            role: ress?.data?.roles?.view?.role === 1 ? true : false,
            control_panel: ress?.data?.roles?.view?.control_panel === 1 ? true : false
          });
          setLoader(false);
        }
      })
      .catch(function (err) {
        console.log('editrol', err);
        setLoader(false)
      })


    return () => {
      controller.abort();
    };
  };

  useEffect(() => {
    GetRoleData();
  }, [Route?.params?.Role_Id])


  const EditRoleObj = JSON.stringify({
    id: value.id,
    roles: {
      alarm: {
        alarm_general: value?.alarm_general,
        alarm_sos: value?.alarm_sos,
        alarm_vibration: value?.alarm_vibration,
        alarm_movement: value?.alarm_movement,
        alarm_low_speed: value?.alarm_low_speed,
        alarm_overspeed: value?.alarm_overspeed,
        alarm_fall_down: value?.alarm_fall_down,
        alarm_low_power: value?.alarm_low_power,
        alarm_low_battery: value?.alarm_low_battery,
        alarm_fault: value?.alarm_fault,
        alarm_power_off: value?.alarm_power_off,
        alarm_power_on: value?.alarm_power_on,
        alarm_door: value?.alarm_door,
        alarm_lock: value?.alarm_lock,
        alarm_unlock: value?.alarm_unlock,
        alarm_geofence: value?.alarm_geofence,
        alarm_geofence_enter: value?.alarm_geofence_enter,
        alarm_geofence_exit: value?.alarm_geofence_exit,
        alarm_gps_antenna_cut: value?.alarm_gps_antenna_cut,
        alarm_accident: value?.alarm_accident,
        alarm_tow: value?.alarm_tow,
        alarm_idle: value?.alarm_idle,
        alarm_high_rpm: value?.alarm_high_rpm,
        alarm_acceleration: value?.alarm_acceleration,
        alarm_braking: value?.alarm_braking,
        alarm_cornering: value?.alarm_cornering,
        alarm_lane_change: value?.alarm_lane_change,
        alarm_fatigue_driving: value?.alarm_fatigue_driving,
        alarm_power_cut: value?.alarm_power_cut,
        alarm_power_restored: value?.alarm_power_restored,
        alarm_jamming: value?.alarm_jamming,
        alarm_temperature: value?.alarm_temperature,
        alarm_parking: value?.alarm_parking,
        alarm_bonnet: value?.alarm_bonnet,
        alarm_foot_brake: value?.alarm_foot_brake,
        alarm_fuel_leak: value?.alarm_fuel_leak,
        alarm_tampering: value?.alarm_tampering,
        alarm_removing: value?.alarm_removing
      },
      report: {
        report_export: value?.report_export,
        export_report_route: value?.export_report_route,
        export_report_trip: value?.export_report_trip,
        export_report_summary: value?.export_report_summary,
        export_report_event: value?.export_report_event,
        export_report_stop: value?.export_report_stop,
      },
      tab: {
        audittrail: value?.audittrail,
        command: value?.command,
        device: value?.device,
        driver: value?.driver,
        event: value?.event,
        geofence: value?.geofence,
        group: value?.group,
        leg: value?.leg,
        notification: value?.notification,
        permission: value?.permission,
        report: value?.report,
        report_route: value?.report_route,
        report_trip: value?.report_trip,
        report_summary: value?.report_summary,
        report_event: value?.report_event,
        report_stop: value?.report_stop,
        position: value?.position,
        route: value?.route,
        schedule: value?.schedule,
        server: value?.server,
        sos: value?.sos,
        statistic: value?.statistic,
        trip: value?.trip,
        userrole: value?.userrole,
        user: value?.user,
        vehiclereg: value?.vehiclereg,
        dashboard_overall: value?.dashboard_overall,
        dashboard_vehicle_summary: value?.dashboard_vehicle_summary,
        vehicle_list: value?.vehicle_list,
        vehicle_map: value?.vehicle_map,
        trails: value?.trails,
        trip_trail: value?.trip_trail,
        report_vehicle: value?.report_vehicle,
        report_group: value?.report_group,
        report_schedule: value?.report_schedule,
        panic_status: value?.panic_status,
        panic_sos: value?.panic_sos,
        ga_entity: value?.ga_entity,
        ga_group: value?.ga_group,
        ga_audit_trail: value?.ga_audit_trail,
        route_route: value?.route_route,
        route_create: value?.route_create,
        geofence_config: value?.geofence_config,
        alarm_config: value?.alarm_config,
        alarm_log: value?.alarm_log,
        user_role_user: value?.user_role_user,
        user_role_role: value?.user_role_role,
      }
    },
    rolename: value?.rolename,
    createdon: value?.createdon,
    lastupdate: new Date(),
  })

  const onSubmitEdit = async () => {
    if (value.rolename !== '') {
      setLoader(true)
      await ApiRequestAuthorizationHook.put(`/user_roles/${value?.id}`, EditRoleObj)
        .then(function (res) {
          if (res.status === 200) {
            setUpdateModal({ ...updateModal, modal: true, message: 'Role Updated Successfully', status: 1 })
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
    Navigation.goBack();
    setUpdateModal({ ...updateModal, modal: false, message: '', status: null })
  }

  return (
    <Fragment>
      <Modal isVisible={updateModal?.modal} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
          <Text style={{ color: 'gray', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>TrackoLet</Text>
          <Text style={{ color: updateModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{updateModal?.message}</Text>
          <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
            <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal isVisible={loader}>
        <ActivityIndicator color={'#63CE78'} size={'large'} />
      </Modal>


      <View style={{ backgroundColor: '#ffffff', borderRadius: 5, paddingBottom: 10, elevation: 22, marginHorizontal: 15 }}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
          <View style={{ flexGrow: 1 }} />
          <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 18, color: "#252F40", }}>Edit Roles</Text>
          <View style={{ flexGrow: 1 }} />
          <AntDesign onPress={() => Navigation.goBack()} name='closecircleo' size={20} color={'#252F40'} />
        </View>
        <View style={{ paddingTop: 15, padding: 10 }}>
          <Text style={{ color: '#000000', fontFamily: 'OpenSans-SemiBold', fontSize: 12, paddingBottom: 8, color: '#252F40' }}>Role Name</Text>
          <Input variant={'unstyled'} placeholder='Enter Role Name' placeholderTextColor={'#7D8EAB'} value={value.rolename} onChangeText={(Text) => setValue({ ...value, rolename: Text })} style={{ backgroundColor: '#f4f4fd', color: '#252F40', height: 40, fontFamily: 'OpenSans-Regular', fontSize: 14, }} />
        </View>
        <Divider thickness={1} style={{ marginTop: 8, marginBottom: 8 }} />

        <SegmentedControlTab
          values={["Alarm", "Report", "Tabs", 'View']}
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
          <Pressable onPress={() => onSubmitEdit()} style={{ backgroundColor: '#4646F2', padding: 10, borderRadius: 5, marginTop: 10 }} >
            <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 14, fontFamily: 'OpenSans-Semibold' }}>Update Role</Text>
          </Pressable>
        </View>
      </View>
    </Fragment>
  )
}

export default EditUserRole