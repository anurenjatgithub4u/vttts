import React, { useState, useEffect } from 'react';
import { Actionsheet, Select, CheckIcon } from 'native-base';
import { View, Pressable, ActivityIndicator, Text, } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useHeader } from '../../../ApiHeader';
import { useNavigation } from '@react-navigation/native';
import {Center } from 'native-base';

const FilterFunction = ({
setValueSearch,
valueSearch,
isOpen,
onClose,
setIsFilter,
onSetFilter,
}) => {
  const navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [groupData, setGroupData] = useState([]);
  const [loadeing, setLoadeing] = useState(true);
  const [rtoList, setRtoList] = useState([]);
  const [rtoLoader, setRtoLoader] = useState(true);

  const getGroupData = async () => {
    setLoadeing(true)
    await ApiRequestAuthorizationHook.get(`/groups`)
      .then(function (ress) {
        if (ress.status === 200) {
          setGroupData(ress?.data?.data)
          setLoadeing(false)
          // onClose();
        }
      })
      .catch(function (err) {
        console.log('group data', err)
        setLoadeing(false)
      })
  }

  const getRtoData = async () => {
    setRtoLoader(true)
    await ApiRequestAuthorizationHook.get(`/rtos`)
      .then(function (ress) {
        if (ress.status === 200) {
          setRtoList(ress?.data)
          setRtoLoader(false)
          // onClose();
        }
      })
      .catch(function (err) {
        console.log('group data', err)
        setRtoLoader(false)
      })
  }

  useEffect(() => {
    getGroupData();
  }, []);
  useEffect(() => {
    getRtoData();
  }, []);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 10 }}>
          <Pressable onPress={onClose}>
            <Center style={{ width: 35, height: 35, backgroundColor: '#ededff', borderRadius: 5 }}>
              <Feather name='chevron-left' size={20} color={'#5252f2'} />
            </Center>
          </Pressable>
          <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#5252f2', paddingLeft: 15, }}>Filters</Text>
          <View style={{ flexGrow: 1 }} />
          <Pressable onPress={() => { navigation.setParams({ panicDevice: undefined }); navigation.setParams({ panicname: undefined }); /* setIsSearch(false); */ setIsFilter(false); setValueSearch({ ...valueSearch, name: '', groupId: '', rtocode: '' }); /* onClose() */ }} style={{ backgroundColor: '#ececef', borderRadius: 5 }}>
            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#252F40', paddingTop: 8, paddingBottom: 8, paddingLeft: 15, paddingRight: 15 }}>Clear all</Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 15, minWidth: '100%' }}>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Group</Text>
            <Select /* onOpen={() => groupData?.length === 0 ? getGroupData() : null} */ placeholderTextColor={'#7D8EAB'} style={{ height: 40, backgroundColor: '#f4f4fd', color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} borderWidth={0} selectedValue={valueSearch?.groupId} minWidth="200" accessibilityLabel="All Group" placeholder="All Group" _selectedItem={{
              bg: "#f4f4fd",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#f4f4fd"
            }} _dark={{
              bg: "coolGray.800"
            }}
              onValueChange={itemValue => setValueSearch({ ...valueSearch, groupId: itemValue })}
              _actionSheetBody={{
                ListHeaderComponent:
                  <View>
                    {loadeing === true ?
                      <ActivityIndicator color={'#63ce78'} size={'large'} />
                      :
                      null
                    }
                  </View>,
                ListEmptyComponent:
                  <View>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>No Option</Text>
                  </View>,
              }}
            >
              {loadeing ?
                <View>
                  <ActivityIndicator color={'#63CE78'} size={'large'} />
                </View>
                :
                groupData?.map((value, index) => (
                  <Select.Item key={index} shadow={2} label={value?.name} value={value?.id.toString()} />
                ))
              }
            </Select>
          </View>

          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: '#000000', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>RTO Code</Text>
            <Select /* onOpen={() => rtoList?.length === 0 ? getRtoData() : null} */ style={{ height: 40, backgroundColor: '#f4f4fd', color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }} placeholderTextColor={'#7D8EAB'} borderWidth={0} selectedValue={valueSearch?.rtocode} minWidth="200" accessibilityLabel="Select RTO" placeholder="Select RTO" _selectedItem={{
              bg: "#f4f4fd",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#f4f4fd"
            }} _dark={{
              bg: "coolGray.800"
            }}
              onValueChange={itemValue => setValueSearch({ ...valueSearch, rtocode: itemValue })}
              _actionSheetBody={{
                ListHeaderComponent:
                  <View>
                    {rtoLoader === true ?
                      <ActivityIndicator color={'#63ce78'} size={'large'} />
                      :
                      null
                    }
                  </View>,
                ListEmptyComponent:
                  <View>
                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#252F40', textAlign: 'center' }}>No Option</Text>
                  </View>,
              }}
            >
              {rtoLoader ?
                <View>
                  <ActivityIndicator color={'#63CE78'} size={'large'} />
                </View>
                :
                rtoList?.map((value, index) => (
                  <Select.Item key={index} shadow={2} label={`${value?.name} (${value?.code})`} value={value?.name} />
                ))
              }
            </Select>
          </View>

          <View style={{ paddingTop: 25, paddingBottom: 25 }}>
            {valueSearch.groupId === '' && valueSearch?.rtocode === '' ?
              <Pressable style={{ backgroundColor: '#A1A1F8', borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 10, paddingBottom: 10 }}>Search</Text>
              </Pressable>
              :
              <Pressable onPress={() => { onSetFilter(); onClose() }} /* onPress={() => { onResetFunc(); filterApiData(); onClose() }} */ style={{ backgroundColor: '#4646f2', borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 10, paddingBottom: 10 }}>Search</Text>
              </Pressable>
            }
          </View>
        </View>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default FilterFunction