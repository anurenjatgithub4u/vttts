import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, LayoutAnimation, Platform, UIManager, Pressable, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Select, CheckIcon, } from 'native-base';

import { useHeader } from '../../ApiHeader';
import { useNavigation, useRoute } from '@react-navigation/native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const EditAlarm = () => {
  let navigation = useNavigation()
  const location = useRoute();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [loader, setLoader] = useState(false);
  const [loaderSelect, setLoaderSelect] = useState(false);
  const [alartType, setAlartType] = useState([])
  const [alarmType, setAlarmType] = useState(false);
  const [customModal, setCustomModal] = useState({ modal: false, message: '', status: null })
  const [value, setValue] = useState({
    id: '',
    AlarmType: '',

    notiWeb: false,
    notiEmail: false,
    notiSms: false,

    attributes: '',
    calendarId: '',
    createdon: ''
  });

  const onChangeAlarmType = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, AlarmType: Text });
      setAlarmType(false);
    } else {
      setValue({ ...value, AlarmType: Text });
      setAlarmType(false)
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
    if (checkStringNullEmpty(value.AlarmType)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setAlarmType(true)
    }
  };

  const notificatorsV = `${value?.notiSms === true ? 'sms,' : null}${value?.notiEmail === true ? 'email,' : null}${value?.notiWeb === true ? 'web,' : null}`

  var alarmObj = JSON.stringify({
    id: value?.id,
    attributes: { Bulk: value.attributes },
    calendarId: value?.calendarId,
    type: value?.AlarmType,
    notificators: notificatorsV.replace(null, '').replace(null, ''),
    createdon: value?.createdon,
    lastupdate: new Date()
  })
  const onSubmit = async () => {
    validate();
    if (validation === '') {
      setLoader(true)
      await ApiRequestAuthorizationHook.put(`/notifications/${value?.id}`, alarmObj)
        .then(function (res) {
          if (res.status === 200) {
            setLoader(false)
            setCustomModal({ ...customModal, modal: true, message: 'Alarm Updated Successfully', status: 1 })
          }
        })
        .catch(function (err) {
          console.log('edit alarm', err)
          setLoader(false)
          setCustomModal({ ...customModal, modal: true, message: 'Alarm Updated failed', status: 0 })
        })
    }
  }

  const gettypes = async () => {
    setLoaderSelect(true)
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/notifications/types`, { signal: signal })
      .then(function (res) {
        if (res?.status === 200) {
          setAlartType(res?.data);
        }
      })
      .catch(function (err) {
        console.log(err)
        setLoaderSelect(false)
      })
      .finally(() => {
        setLoaderSelect(false)
      })

    return () => {
      controller.abort();
    };
  }
  const getData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoader(true)
    await ApiRequestAuthorizationHook.get(`/notifications/${location?.params?.alarm_id}`, { signal: signal })
      .then(function (res) {
        if (res?.status === 200) {
          var arr = []
          const notificator = res?.data?.notificators
          const splitdata = notificator.split(',');
          for (let i = 0; i < splitdata.length; i++) {
            arr.push(splitdata[i])
          }
          setValue({
            id: res?.data?.id,
            AlarmType: res?.data?.type,
            notiSms: arr[0] === 'sms' ? true : false,
            notiEmail: arr[1] === 'email' ? true : arr[0] === 'email' ? true : false,
            notiWeb: arr[2] === 'web' ? true : arr[1] === 'web' ? true : arr[0] === 'web' ? true : false,

            attributes: res?.data?.attributes?.Bulk,
            calendarId: res?.data?.calendarId,
            createdon: res?.data?.createdon
          });

          // setValue({ ...value, notiSms: arr[0] === 'sms' ? true : false, notiEmail: arr[0] === 'sms' ? true : false, notiWeb: arr[0] === 'sms' ? true : false, })
        }
      })
      .catch(function (err) {
        console.log(err)
        setLoader(false)
      })
      .finally(() => {
        setLoader(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    gettypes();
    getData();
  }, []);

  const onRoute = () => {
    navigation.goBack()
    setCustomModal({ ...customModal, modal: false, message: '', status: null })
  }

  return (
    <Fragment>

      <Modal visible={customModal.modal} transparent={true}>
        <View style={{ flex: 1, backgroundColor: '#0000ff4d', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', paddingTop: 15, paddingBottom: 15, backgroundColor: '#ffffff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>TrackoLet</Text>
            <Text style={{ color: customModal?.status === 1 ? 'green' : 'red', fontFamily: 'OpenSans-Bold', fontSize: 12, paddingBottom: 15, paddingTop: 15 }}>{customModal?.message}</Text>
            <Pressable onPress={() => onRoute()} style={{ width: '100%', backgroundColor: 'blue', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={loader} transparent={true}>
        <View style={{ flex: 1, backgroundColor: '#0000ff21', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={'#63CE78'} size={'large'} />
        </View>
      </Modal>

      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 10, padding: 10, elevation: 12, borderWidth: 0.5, borderColor: '#707070' }}>
        <View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Alarm Type</Text>
            <Select style={{ height: 40, backgroundColor: '#f4f4fd', fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} borderWidth={0} placeholderTextColor={'#7D8EAB'} selectedValue={value.AlarmType} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
              bg: "#f4f4fd",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#f4f4fd"
            }} _dark={{
              bg: "coolGray.800"
            }}
              onValueChange={itemValue => onChangeAlarmType(itemValue)}
              _actionSheetBody={{
                ListHeaderComponent:
                  <View>
                    {loaderSelect === true ?
                      <ActivityIndicator color={'#63ce78'} size={'large'} />
                      :
                      <View></View>
                    }
                  </View>,
                ListEmptyComponent:
                  <View>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                  </View>,
              }}
            >
              {loaderSelect ?
                <View style={{ flex: 1, backgroundColor: '#0000ff21', justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator color={'#63CE78'} size={'large'} />
                </View>
                :
                alartType?.map((value, id) => (
                  <Select.Item key={id} shadow={2} label={value?.type} value={value?.type} />
                ))}
            </Select>
            {alarmType ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Alarm Type is required</Text>
              </View>
              : null
            }
          </View>

          <View style={{ paddingTop: 20 }}>
            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Additional Notification</Text>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#000000', paddingRight: 10 }}>SMS</Text>
                <TouchableOpacity
                  style={[styles.toggleContainer, { backgroundColor: value.notiSms ? '#8AC37D' : '#67748E' }]}
                  onPress={() => { LayoutAnimation.easeInEaseOut(); setValue({ ...value, notiSms: !value.notiSms }); }}
                  activeOpacity={1}
                >
                  <View
                    style={[styles.toggleBtn, value.notiSms ? { backgroundColor: '#ffffff', alignSelf: 'flex-end' } : { backgroundColor: '#ffffff' }]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexGrow: .5 }} />
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#000000', paddingRight: 10 }}>Email</Text>
                <TouchableOpacity
                  style={[styles.toggleContainer, { backgroundColor: value.notiEmail ? '#8AC37D' : '#67748E' }]}
                  onPress={() => { LayoutAnimation.easeInEaseOut(); setValue({ ...value, notiEmail: !value.notiEmail }); }}
                  activeOpacity={1}
                >
                  <View
                    style={[styles.toggleBtn, value.notiEmail ? { backgroundColor: '#ffffff', alignSelf: 'flex-end' } : { backgroundColor: '#ffffff' }]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexGrow: .5 }} />
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#000000', paddingRight: 10 }}>Web</Text>
                <TouchableOpacity
                  style={[styles.toggleContainer, { backgroundColor: value.notiWeb ? '#8AC37D' : '#67748E' }]}
                  onPress={() => { LayoutAnimation.easeInEaseOut(); setValue({ ...value, notiWeb: !value.notiWeb }); }}
                  activeOpacity={1}
                >
                  <View
                    style={[styles.toggleBtn, value.notiWeb ? { backgroundColor: '#ffffff', alignSelf: 'flex-end' } : { backgroundColor: '#ffffff' }]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </View>
      <Pressable onPress={() => onSubmit()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15, marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Edit Alarm</Text>
      </Pressable>
    </Fragment>
  )
}

export default EditAlarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  status: {
    width: 100,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  toggleContainer: {
    width: 70,
    borderRadius: 50,
    overflow: 'hidden',
    padding: 5,
  },
  toggleBtn: {
    height: 25,
    width: 25,
    borderRadius: 50,
  }
})