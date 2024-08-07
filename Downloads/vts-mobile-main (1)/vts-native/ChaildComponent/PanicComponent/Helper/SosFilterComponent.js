import React, { Fragment, useEffect, useState } from 'react'
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { Actionsheet, Center, Select, CheckIcon, Input, Icon } from 'native-base'
import { Text, Pressable, TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { AndroidDateInputMode, AndroidPickerMode, MaterialDatetimePickerAndroid, AndroidDatePickerType, } from 'react-native-material-datetime-picker';
import moment from 'moment';
import { useRoute, useNavigation } from '@react-navigation/native';

const SosFilterComponent = ({ isOpen, onClose, onOpen, setIsFilter, setSearchPage, setSearchSosData, fetchData, statusSearch, setStatusSearch, setFromDate, setToDate, fromDate, toDate, filterValue, setFilterValue, onSearchData, }) => {
  const location = useRoute();
  const Navigation = useNavigation();
  const [searchBar, setSearchBar] = useState(false);
  const [closeButton, setCloseButton] = useState(true);
// console.log("from date-----",)fromDate
  const onPressSearch = () => {
    setSearchBar(searchBar => !searchBar)
  };

  const onCHangeStatus = (Text) => {
    Navigation.setParams({ panicname: undefined })
    if (Text.trim().length >= 0) {
      setFilterValue({ ...filterValue, Status: Text });
    } else {
      setFilterValue({ ...filterValue, Status: Text });
    };
  }

  const onCHangeFromDate = (Text) => {
    if (Text.trim().length <= 0) {
      setFilterValue({ ...filterValue, FromDate: Text });
    } else {
      setFilterValue({ ...filterValue, FromDate: Text });
    };
  }
  const onDoneDate = (e) => {
    setFromDate(e.fromDate)
    setToDate(e.toDate)
    onCHangeFromDate(moment(e?.fromDate)?.format('DD/MM/YYYY') + ' ' + '-' + ' ' + moment(e?.toDate)?.format('DD/MM/YYYY'))
  }
  const handleShowDateRangePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: fromDate,
      titleText: 'Select duration',
      mode: AndroidPickerMode.DATE,
      startDate: fromDate,
      endDate: toDate,
      positiveButtonText: 'OK',
      negativeButtonText: 'Cancel',
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.RANGE,
      onConfirmDateRange: (fromDate, toDate) => {
        onDoneDate({ fromDate, toDate })
      },
    });
  };
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  useEffect(() => {
    setFromDate(new Date(d));
    onCHangeFromDate(moment(new Date(d))?.format('DD/MM/YYYY') + ' ' + '-' + ' ' + moment(toDate)?.format('DD/MM/YYYY'))
  }, []);

  const onStateClear = () => {
    setFilterValue({ ...filterValue, Status: 'All', FromDate: moment(new Date(d))?.format('DD/MM/YYYY') + ' ' + '-' + ' ' + moment(new Date())?.format('DD/MM/YYYY'), searchName: '' });
  };

  const onClear = () => {
    setIsFilter(true);
    setSearchPage(1);
    setSearchSosData([]);
    fetchData();
    setFromDate(new Date(d))
    setToDate(new Date())
    setStatusSearch({ ...statusSearch, search: '' });
    setFilterValue({ Status: 'All', searchName: '' });
    onCHangeFromDate(moment(new Date(d))?.format('DD/MM/YYYY') + ' ' + '-' + ' ' + moment(new Date())?.format('DD/MM/YYYY'))
    // onClose();
  }
  const onSearchReset = () => {
    onPressSearch();
    onClear();
    onStateClear();
    setCloseButton(closeButton => !closeButton);
  }

  useEffect(() => {
    if (location?.params?.panicname === 'Pending') {
      setFilterValue({ ...filterValue, Status: location?.params?.panicname, FromDate: moment(new Date(d))?.format('DD/MM/YYYY') + ' ' + '-' + ' ' + moment(toDate)?.format('DD/MM/YYYY') });
      onSearchData();
    }
  }, [location])

  const onHandleSearch = () => {
    onSearchData();
    setCloseButton(closeButton => !closeButton);
  }
  return (
    <Fragment>
      {searchBar ?
        <View style={{ position: 'absolute', width: '100%', zIndex: 9999, padding: 15 }}>
          <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', height: 40, backgroundColor: '#ffffff', borderRadius: 5, }}>
            <TextInput
              autoCapitalize={'none'}
              placeholder='Search here'
              keyboardType="default"
              value={filterValue?.searchName}
              onChangeText={(Text) => setFilterValue({ ...filterValue, searchName: Text })}
              onSubmitEditing={() => { filterValue?.searchName === '' ? '' : onSearchData() }}
              returnKeyType='go'
              style={{ color: '#252F40', fontSize: 13, height: 40, width: '100%', fontFamily: 'OpenSans-Regular', position: 'absolute' }}
              placeholderTextColor="#7D8EAB"
            />
            <View style={{ flexGrow: 1 }} />
            {closeButton === true ?
              <Pressable onPress={() => { filterValue?.searchName === '' ? '' : onHandleSearch() }}>
                <Center style={{ backgroundColor: '#4646f2', width: 40, height: 40, borderRadius: 5 }}>
                  <FontAwesome name='search' color={'#ffffff'} size={18} />
                </Center>
              </Pressable>
              :
              <Pressable onPress={() => filterValue?.searchName === '' ? onSearchReset() : setFilterValue({ ...filterValue, searchName: '' })}>
                <Center style={{ width: 40, height: 40, borderRadius: 5 }}>
                  <AntDesign name='close' color={'#67748E'} size={18} />
                </Center>
              </Pressable>
            }
          </View>
        </View>
        : null}

      <View style={{ position: 'absolute', alignItems: 'center', flexDirection: 'row', top: 15, right: 15 }}>
        <Pressable onPress={() => { onOpen(); }} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', width: 40, height: 40, borderRadius: 5, marginRight: 5 }}>
          <Feather name='filter' color={'#69748C'} size={18} />
        </Pressable>
        <Pressable onPress={() => onPressSearch()} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#D0D0FB', width: 40, height: 40, borderRadius: 5 }}>
          <FontAwesome name='search' color={'#7171F3'} size={18} />
        </Pressable>
      </View>

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
            <Pressable onPress={() => { onClear(); onStateClear() }} style={{ backgroundColor: '#ececef', borderRadius: 5 }}>
              <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#000000', paddingTop: 8, paddingBottom: 8, paddingLeft: 15, paddingRight: 15 }}>Clear all</Text>
            </Pressable>
          </View>

          <View style={{ paddingHorizontal: 15, minWidth: '100%' }}>
            <View style={{ paddingTop: 10 }}>
              <Text style={{ color: '#000000', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Status</Text>
              <Select style={{ height: 40, backgroundColor: '#f4f4fd', color: '#000000', fontFamily: 'OpenSans-Regular', fontSize: 14 }} borderWidth={0} selectedValue={filterValue?.Status} minWidth="200" placeholderTextColor={'#7D8EAB'} accessibilityLabel="Status" placeholder="Status" _selectedItem={{
                bg: "#f4f4fd",
                endIcon: <CheckIcon size="5" />
              }} _light={{
                bg: "#f4f4fd"
              }} _dark={{
                bg: "coolGray.800"
              }} onValueChange={itemValue => onCHangeStatus(itemValue)}>
                <Select.Item shadow={2} label="All" value="All" />
                <Select.Item shadow={2} label="Pending" value="Pending" />
                <Select.Item shadow={2} label="Resolved" value="Resolved" />
                <Select.Item shadow={2} label="Cancelled" value="Cancelled" />
                <Select.Item shadow={2} label="Acknowledged" value="Acknowledged" />
              </Select>
            </View>
            <View style={{ paddingTop: 10 }}>
              <Text style={{ color: '#000000', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Select Date</Text>
              <Pressable onPress={handleShowDateRangePicker} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40, borderRadius: 5, backgroundColor: '#F4F4FD', }}>
                <Input
                  value={filterValue?.FromDate}
                  onChangeText={(Text) => onCHangeFromDate(Text)}
                  w={{
                    base: "100%",
                    md: "100%"
                  }}
                  editable={false}
                  variant='unstyled'
                  style={{ width: '100%', height: 40, borderRadius: 5, fontFamily: 'OpenSans-Regular', fontSize: 14, color: '#000000' }}
                  InputRightElement={<Icon as={<Feather name={'calendar'} />} size={5} mr="2" color="#67748E" />}
                  placeholder="dd/mm/yyyy - dd/mm/yyyy"
                  placeholderTextColor={'#7D8EAB'}
                />
              </Pressable>
            </View>
            <View style={{ paddingTop: 25, paddingBottom: 25 }}>
              <Pressable onPress={() => { /* filterValue?.Status === 'All' ? onClear() : */ onSearchData() }} style={{ backgroundColor: '#4646f2', borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'OpenSans-SemiBold', fontSize: 14, paddingTop: 10, paddingBottom: 10 }}>Search</Text>
              </Pressable>
            </View>
          </View>

        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  )
}

export default SosFilterComponent