import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator, BackHandler } from 'react-native';
import { Select, CheckIcon, Input, } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import { useHeader } from '../../ApiHeader';

const VehicleDetails = ({ setDeviceDetailsColor, setSimDetailsColor, setVehicleDetailsColor, setPermitHolderColor, setDeviceDetailsView, setSimDetailsView, setVehicleDetailsView, setPermitHolderView, }) => {
  const { ApiRequestAuthorizationHook, } = useHeader();
  const [loaderS, setLoaderS] = useState(true);
  const [loaderR, setLoaderR] = useState(true);
  const [loaderV, setLoaderV] = useState(true);
  const [dataS, setDataS] = useState([]);
  const [dataR, setDataR] = useState([]);
  const [dataV, setDataV] = useState([]);
  const [state, setState] = useState(false);
  const [rTOCode, setRTOCode] = useState(false);
  const [vehicleCategory, setVehicleCategory] = useState(false);
  const [make, setMake] = useState(false);
  const [chasisNo, setChasisNo] = useState(false);
  const [engineNo, setEngineNo] = useState(false);
  const [manufacturingYear, setManufacturingYear] = useState(false);
  const [validChassis, setValidChassis] = useState(false)
  const [value, setValue] = useState({
    DeviceNumber: '',
    State: '',
    RTOCode: '',
    VehicleCategory: '',
    Make: '',
    ChasisNo: '',
    EngineNo: '',
    ManufacturingYear: '',
  });

  const onChangeState = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, State: Text });
      setState(false);
    } else {
      setValue({ ...value, State: Text });
      setState(false)
    };
  };
  const onChangeRTOCode = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, RTOCode: Text });
      setRTOCode(false);
    } else {
      setValue({ ...value, RTOCode: Text });
      setRTOCode(false)
    };
  };
  const onChangeVehicleCategory = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, VehicleCategory: Text });
      setVehicleCategory(false);
    } else {
      setValue({ ...value, VehicleCategory: Text });
      setVehicleCategory(false)
    };
  };
  const onChangeMake = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, Make: Text });
      setMake(false);
    } else {
      setValue({ ...value, Make: Text });
      setMake(false)
    };
  };
  const onChangeChasisNo = (Text) => {
    if (Text.trim().length >= 18) {
      setValue({ ...value, ChasisNo: Text });
      setChasisNo(false);
      setValidChassis(false)
    } else {
      setValue({ ...value, ChasisNo: Text });
      setChasisNo(false)
      setValidChassis(true)
    };
  };
  const onChangeEngineNo = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, EngineNo: Text });
      setEngineNo(false);
    } else {
      setValue({ ...value, EngineNo: Text });
      setEngineNo(false)
    };
  };
  const onChangeManufacturingYear = (Text) => {
    if (Text.trim().length >= 0) {
      setValue({ ...value, ManufacturingYear: Text });
      setManufacturingYear(false);
    } else {
      setValue({ ...value, ManufacturingYear: Text });
      setManufacturingYear(false)
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
    if (checkStringNullEmpty(value?.State)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setState(true)
    }
    if (checkStringNullEmpty(value?.RTOCode)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setRTOCode(true)
    }
    if (checkStringNullEmpty(value?.VehicleCategory)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setVehicleCategory(true)
    }
    if (checkStringNullEmpty(value?.Make)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setMake(true)
    }
    if (checkStringNullEmpty(value?.ChasisNo)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setChasisNo(true)
    }
    if (checkStringNullEmpty(value?.EngineNo)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setEngineNo(true)
    }
    if (checkStringNullEmpty(value?.ManufacturingYear)) {
      validation += '<li>Enter Your Confrim Password</li>';
      setManufacturingYear(true)
    }
  };

  const onNexnt = async () => {
    validate();
    if (validation === '') {
      if (validChassis === false) {
        await AsyncStorage.setItem('VehicleDetails', JSON.stringify(value))
        setDeviceDetailsView(false)
        setSimDetailsView(false)
        setVehicleDetailsView(false)
        setPermitHolderView(true)

        setDeviceDetailsColor(true)
        setSimDetailsColor(true)
        setVehicleDetailsColor(true)
        setPermitHolderColor(true)
      }
    }
  }

  const currentYear = (new Date()).getFullYear();
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
  const YearsList = range(currentYear, currentYear - 100, -1);

  const State_Name = async () => {
    const abortController = new AbortController();
    await ApiRequestAuthorizationHook.get(`/states`, { signal: abortController.signal })
      .then((result) => {
        if (result?.status === 200) {
          setDataS(result?.data);
        }
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaderS(false);
      })
    return () => {
      abortController.abort();
    };
  }
  const Vehicle_make = async () => {
    const abortController = new AbortController();
    await ApiRequestAuthorizationHook.get(`/vehicle/make`, { signal: abortController.signal })
      .then((result) => {
        if (result?.status === 200) {
          setDataS(result?.data);
        }
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaderS(false);
      })
    return () => {
      abortController.abort();
    };
  }
  const RTO_code = async () => {
    const abortController = new AbortController();
    await ApiRequestAuthorizationHook.get(`/rtos`, { signal: abortController.signal })
      .then((result) => {
        if (result?.status === 200) {
          setDataR(result?.data);
        }
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaderR(false);
      })
    return () => {
      abortController.abort();
    };
  }
  const Vehicle_Category = async () => {
    const abortController = new AbortController();
    await ApiRequestAuthorizationHook.get(`/vehicle/categories`, { signal: abortController.signal })
      .then((result) => {
        if (result?.status === 200) {
          setDataV(result?.data);
        }
      }).catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaderV(false);
      })
    return () => {
      abortController.abort();
    };
  }

  useEffect(() => {
    State_Name();
    Vehicle_make();
    RTO_code();
    Vehicle_Category();
  }, [])

  useEffect(() => {
    const getData = async () => {
      await AsyncStorage.getItem('DeviceDetails')
        .then(function (res) {
          const JSONObj = JSON.parse(res)
          console.log(JSONObj?.manufacture_year)
          setValue({
            Registration: JSONObj?.regno,
            DeviceNumber: JSONObj?.name,
            State: JSONObj?.vstate,
            RTOCode: JSONObj?.rto_code,
            VehicleCategory: JSONObj?.category,
            Make: JSONObj?.vehicleMake,
            ChasisNo: JSONObj?.chasisno,
            EngineNo: JSONObj?.engineno,
            ManufacturingYear: JSONObj?.manufacture_year?.toString(), 
          });
        })
        .catch(function (err) {
          console.log(err);
        })
    }
    getData();
  }, [])

  useEffect(() => {
    const backAction = () => {
      setDeviceDetailsView(false)
      setSimDetailsView(true)
      setVehicleDetailsView(false)
      setPermitHolderView(false)

      setDeviceDetailsColor(true)
      setSimDetailsColor(true)
      setVehicleDetailsColor(false)
      setPermitHolderColor(false)
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Fragment>
      <View style={{ backgroundColor: '#ffffff', marginHorizontal: 15, marginTop: 20, borderRadius: 5, padding: 10 }}>
        <View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Vehicle name</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4FD', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input w={{
                base: "100%",
                md: "100%"
              }} editable={true} value={value?.DeviceNumber} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder="Enter" />
            </View>
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Make</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4FD', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input w={{
                base: "100%",
                md: "100%"
              }} value={value?.Make} onChangeText={(Text) => onChangeMake(Text)} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder="Enter Make" />
            </View>
            {make ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Make is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Chassis No</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4FD', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input w={{
                base: "100%",
                md: "100%"
              }} value={value?.ChasisNo} maxLength={18} onChangeText={(Text) => onChangeChasisNo(Text)} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder="Enter Chassis No" />
            </View>
            {chasisNo ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Chassis No is required</Text>
              </View>
              : null
            }
            {validChassis ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Enter 18 digit Chasis No.</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >Engine No</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4FD', borderRadius: 5, height: 40, marginTop: 5 }}>
              <Input w={{
                base: "100%",
                md: "100%"
              }} value={value?.EngineNo} onChangeText={(Text) => onChangeEngineNo(Text)} style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} variant={'unstyled'} placeholderTextColor={'#7D8EAB'} placeholder="Enter Engine No" />
            </View>
            {engineNo ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Engine No is required</Text>
              </View>
              : null
            }
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >State</Text>
            <Select style={{ height: 40, backgroundColor: '#F4F4FD', color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', }} borderWidth={0} selectedValue={value?.State} minWidth="200" accessibilityLabel="Select" placeholderTextColor={'#7D8EAB'} placeholder="Select" _selectedItem={{
              bg: "#F4F4FD",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#F4F4FD"
            }} _dark={{
              bg: "cool#252F40.800"
            }} onValueChange={itemValue => onChangeState(itemValue)}
              _actionSheetBody={{
                ListHeaderComponent:
                  <View>
                    {loaderS === true ?
                      <ActivityIndicator color={'#63ce78'} size={'large'} />
                      :
                      null
                    }
                  </View>,
                ListEmptyComponent:
                  <View>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                  </View>,
              }}
            >
              {loaderS ?
                <View>
                  <ActivityIndicator color={'#63ce78'} size={'large'} />
                </View>
                :
                dataS?.map((value, id) => (
                  <Select.Item style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} key={id} shadow={2} label={value?.name} value={value?.name} />
                ))}
            </Select>
            {state ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>State is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }} >RTO Code</Text>
            <Select style={{ height: 40, backgroundColor: '#F4F4FD', color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', }} borderWidth={0} selectedValue={value?.RTOCode} minWidth="200" accessibilityLabel="Selct" placeholderTextColor={'#7D8EAB'} placeholder="Select" _selectedItem={{
              bg: "#F4F4FD",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#F4F4FD"
            }} _dark={{
              bg: "cool#252F40.800"
            }} onValueChange={itemValue => onChangeRTOCode(itemValue)}
              _actionSheetBody={{
                ListHeaderComponent:
                  <View>
                    {loaderR === true ?
                      <ActivityIndicator color={'#63ce78'} size={'large'} />
                      :
                      null
                    }
                  </View>,
                ListEmptyComponent:
                  <View>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                  </View>,
              }}
            >
              {loaderR ?
                <View>
                  <ActivityIndicator color={'#63ce78'} size={'large'} />
                </View>
                :
                dataR?.map((value, id) => (
                  <Select.Item style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} key={id} shadow={2} label={`${value?.name} (${value?.code})`} value={value?.name} />
                ))}
            </Select>
            {rTOCode ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>RTO Code is required</Text>
              </View>
              : null
            }
          </View>
          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Vehicle Category</Text>
            <Select style={{ height: 40, backgroundColor: '#F4F4FD', color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', }} borderWidth={0} selectedValue={value?.VehicleCategory} minWidth="200" accessibilityLabel="Selct" placeholderTextColor={value?.VehicleCategory === null || undefined || '' ? '#7D8EAB' : '#252F40'} placeholder={value?.VehicleCategory === null || undefined || '' ? 'Select' : value?.VehicleCategory} _selectedItem={{
              bg: "#F4F4FD",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#F4F4FD"
            }} _dark={{
              bg: "cool#252F40.800"
            }} onValueChange={itemValue => onChangeVehicleCategory(itemValue)}
              _actionSheetBody={{
                ListHeaderComponent:
                  <View>
                    {loaderV === true ?
                      <ActivityIndicator color={'#63ce78'} size={'large'} />
                      :
                      null
                    }
                  </View>,
                ListEmptyComponent:
                  <View>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>Data Not Found</Text>
                  </View>,
              }}
            >
              {loaderV ?
                <View>
                  <ActivityIndicator color={'#63ce78'} size={'large'} />
                </View>
                :
                dataV?.map((value, id) => (
                  <Select.Item style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40' }} key={id} shadow={2} label={value?.name} value={value?.name} />
                ))}
            </Select>
            {vehicleCategory ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Vehicle Category is required</Text>
              </View>
              : null
            }
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={{ color: '#252F40', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Manufacturing Year </Text>
            <Select style={{ height: 40, backgroundColor: '#F4F4FD', color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', }} borderWidth={0} selectedValue={value?.ManufacturingYear} minWidth="200" accessibilityLabel="Select" placeholderTextColor={'#7D8EAB'} placeholder="Select" _selectedItem={{
              bg: "#F4F4FD",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#F4F4FD"
            }} _dark={{
              bg: "coolGray.800"
            }} onValueChange={itemValue => onChangeManufacturingYear(itemValue)}>
              {YearsList?.map((value, index) => (
                <Select.Item key={index} shadow={2} label={value?.toString()} value={value?.toString()} />
              ))}
            </Select>
            {manufacturingYear ?
              <View>
                <Text style={{ color: 'red', fontSize: 11, fontFamily: 'OpenSans-Regular' }}>Manufacturing Year is required</Text>
              </View>
              : null
            }
          </View>
        </View>

      </View>

      <Pressable onPress={() => onNexnt()} style={{ backgroundColor: '#4646f2', paddingTop: 10, paddingBottom: 10, borderRadius: 5, marginTop: 15, marginHorizontal: 15, marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}>Next</Text>
      </Pressable>
    </Fragment >
  )
}

export default VehicleDetails;