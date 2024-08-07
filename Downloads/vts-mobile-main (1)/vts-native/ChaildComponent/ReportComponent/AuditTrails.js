import React, { useEffect, useState } from 'react';
import { StyleSheet, LayoutAnimation, UIManager, Platform, ActivityIndicator, ToastAndroid, Modal } from 'react-native';
import { Divider } from 'native-base';
import { View, Text, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  AndroidDateInputMode,
  AndroidPickerMode,
  MaterialDatetimePickerAndroid,
  AndroidDatePickerType,
} from 'react-native-material-datetime-picker';
import { Select, CheckIcon, Icon, Input } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import qs from 'qs';
import { useHeader } from '../../ApiHeader';
import BlurViewScreen from '../../BlurViewScreen';
import AuditList from './AuditTrailsComponent/AuditList';


if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const AuditTrails = ({ }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [searchValue, setSearchValue] = useState('');
  const [toggleComponent, setToggleComponent] = useState(false)
  const [date, setDate] = useState(false);
  const [component, setComponent] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [apiLoading, setApiLoading] = useState(false);
  const [apiLoad, setApiLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [loadMore, setLoadMore] = useState(false);
  const [audit_data_count, setAudit_data_count] = useState('0');
  const [audit_data, setAudit_data] = useState([]);
  const [loader, setLoader] = useState(true);
  const [value, setValue] = useState({
    Date: '',
    Component: ''
  });

  var data = qs.stringify({
    from: fromDate,
    to: toDate,
    component: value?.Component
  })

  const onChangeDate = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Date: Text });
      setDate(false);
    } else {
      setValue({ ...value, Date: Text });
      setDate(false)
    };
  };
  const onChangeComponent = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Component: Text });
      setComponent(false);
    } else {
      setValue({ ...value, Component: Text });
      setComponent(false)
    };
  };

  const checkStringNullEmpty = (str) => {
    if (str != null && str !== '') {
      return false;
    } else {
      return true;
    };
  };
  var validation = '';
  const validate = () => {
    if (checkStringNullEmpty(value.Date)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setDate(true)
    }
    if (checkStringNullEmpty(value.Component)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setComponent(true)
    }
  };

  const onDoneDate = (e) => {
    setFromDate(e.fromDate)
    setToDate(e.toDate)
    onChangeDate(e.fromDate.toDateString() + ' ' + '-' + ' ' + e.toDate.toDateString())
  }

  const onSubmit = () => {
    validate();
    if (validation === '') {
      setApiLoading(true)
      setApiLoad(true)
    }
  }

  const pageSize = 20;
  const requestApi = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoadMore(true)
    await ApiRequestAuthorizationHook.get(`/audit_trails/by_dates?${data}&currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setAudit_data(oldArray => [...oldArray, ...response.data.data]);
          setAudit_data_count(response.data.noRecords)
          setTotalPage(response.data.totalPage)
          setToggleComponent(true);
        } else {

        }
      })
      .catch(function (error) {
        console.log("audit_trails", error);
        // showAlert();
        ToastAndroid.showWithGravity(
          "Data Fetching Failed",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setApiLoad(false)
      })
      .finally(function () {
        setLoader(false)
        setApiLoading(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    if (apiLoad === true) {
      requestApi()
    } else {
      setToggleComponent(false)
    }
  }, [page, apiLoad])

  const fetchMoreData = async () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }


  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  useEffect(() => {
    setFromDate(new Date(d))
  }, [])

  const handleShowDateRangePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: fromDate,
      titleText: 'Select duration',
      mode: AndroidPickerMode.DATE,
      startDate: fromDate,
      endDate: toDate,
      positiveButtonText: 'OK',
      negativeButtonText: 'Cancel',
      fullscreen: true,
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.RANGE,
      onConfirmDateRange: (fromDate, toDate) => {
        onDoneDate({ fromDate, toDate })
      },
    });
  };

  const newDataAuditTrails = Array.from(new Set(audit_data.map(a => a?.id)))
    ?.map(id => {
      return audit_data.find(a => a?.id === id)
    })

  const searchGroupData = componentData?.filter(
    DeviceItem => {
      return (
        DeviceItem
          .title
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
  );

  return (
    <>
      <Modal visible={apiLoading} transparent={true}>{/*  */}
        <BlurViewScreen />
        <View style={{ flex: 1, backgroundColor: '#000000b5', justifyContent: 'center', alignItems: 'center', }}>
          <ActivityIndicator size={'large'} color={'#63CE78'} />
        </View>
      </Modal>

      <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 15, backgroundColor: '#ebebfd', }}>
        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <Divider thickness={5} orientation='vertical' bg="emerald.500" style={{ height: 25, borderRadius: 5 }} />
          <Text style={{ color: '#252F40', fontSize: 14, paddingLeft: 10, fontFamily: 'OpenSans-Bold' }}>{audit_data_count}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, paddingLeft: 5, fontFamily: 'OpenSans-Regular' }}>Result Found</Text>
          <View style={{ flexGrow: 1 }} />
          {toggleComponent ?
            <Pressable onPress={() => { setToggleComponent(false); setApiLoad(false); setValue({ ...value, Date: '', Component: '' }); setAudit_data_count('0'); setAudit_data([]); setPage(1) }} style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ color: '#67748E', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingLeft: 8 }}>Reset</Text>
              <FontAwesome name='refresh' color={'#67748E'} size={18} style={{ paddingLeft: 10 }} />
            </Pressable>
            :
            null
          }
        </View>
      </View>
      <View style={{ backgroundColor: '#f2f3f8', paddingHorizontal: 15 }}>
        {toggleComponent ?
          <AuditList loadMore={loadMore} audit_data={newDataAuditTrails} fetchMoreData={fetchMoreData} loader={loader} />
          :
          <>
            <View style={{ backgroundColor: '#ffffff', marginTop: 20, borderRadius: 5, padding: 10 }}>
              <View style={{ marginBottom: 30 }}>
                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Date</Text>
                  <Pressable onPress={handleShowDateRangePicker} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 5 }}>
                    <Input w={{
                      base: "100%",
                      md: "100%"
                    }} value={value.Date} editable={false} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} InputRightElement={<Icon as={<Feather name="calendar" />} size={5} mr="2" color="#67748E" />} placeholder="Select Date Range" />
                  </Pressable>
                  {date ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Date is required</Text>
                    </View>
                    : null
                  }
                </View>

                <View style={{ paddingTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Component</Text>
                  <Select style={{ height: 40, backgroundColor: '#f4f4fd', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40, color: '#252F40' }} placeholderTextColor={'#7D8EAB'} borderWidth={0} selectedValue={value.Component} minWidth="200" accessibilityLabel="Selct" placeholder="Select" _selectedItem={{
                    bg: "#f4f4fd",
                    endIcon: <CheckIcon size="5" />
                  }} _light={{
                    bg: "#f4f4fd"
                  }} _dark={{
                    bg: "coolGray.800"
                  }} onValueChange={itemValue => onChangeComponent(itemValue)}
                    _actionSheetBody={{
                      ListHeaderComponent:
                        <View>
                          <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4fd', borderRadius: 5, height: 40, marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#7D8EAB' }}>
                            <Input
                              value={searchValue}
                              placeholder="Search here"
                              type='text'
                              onChangeText={(value) => {
                                setSearchValue(value);
                              }}
                              variant={'unstyled'}
                              InputRightElement={<Icon as={<MaterialIcons name="clear" onPress={() => setSearchValue('')} />} size={6} mr="2" color="#7D8EAB" />}
                              placeholderTextColor={'#7D8EAB'}
                              style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }}
                            />
                          </Pressable>
                        </View>,
                      ListEmptyComponent:
                        <View>
                          <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                        </View>,
                    }}
                  >
                    {searchGroupData?.map((value, id) => (
                      <Select.Item key={id} shadow={2} label={value?.title} value={value?.title} />
                    ))}
                  </Select>
                  {component ?
                    <View>
                      <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Component is required</Text>
                    </View>
                    : null
                  }
                </View>
              </View>
            </View>

            <Pressable onPress={() => onSubmit('MangeScreen')} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginBottom: 20 }}>
              <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Show Result</Text>
            </Pressable>
          </>
        }
      </View>
    </>
  )
}

export default AuditTrails;

const componentData = [
  { id: 1, title: 'command', value: 'command' },
  { id: 2, title: 'device', value: 'device' },
  { id: 3, title: 'driver', value: 'driver' },
  { id: 4, title: 'event', value: 'event' },
  { id: 5, title: 'geofence', value: 'geofence' },
  { id: 6, title: 'group', value: 'group' },
  { id: 7, title: 'maintenance', value: 'maintenance' },
  { id: 8, title: 'notification', value: 'notification' },
  { id: 9, title: 'order', value: 'order' },
  { id: 10, title: 'permission', value: 'permission' },
  { id: 11, title: 'position', value: 'position' },
  { id: 12, title: 'report', value: 'report' },
  { id: 13, title: 'route', value: 'route' },
  { id: 14, title: 'schedulereport', value: 'schedulereport' },
  { id: 15, title: 'server', value: 'server' },
  { id: 16, title: 'session', value: 'session' },
  { id: 17, title: 'sos', value: 'sos' },
  { id: 18, title: 'trip', value: 'trip' },
  { id: 19, title: 'user', value: 'user' },
  { id: 20, title: 'userrole', value: 'userrole' },
  { id: 21, title: 'vehiclereg', value: 'vehiclereg' },
]