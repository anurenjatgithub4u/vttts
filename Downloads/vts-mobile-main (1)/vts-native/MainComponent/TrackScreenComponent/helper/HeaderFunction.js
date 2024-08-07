import React, { Fragment } from 'react';
import { View, Pressable, Text, } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Box, Center, Input } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Row, Col } from 'react-native-responsive-grid-system';
import { useRoute } from '@react-navigation/native';

const HeaderFunction = ({ setValueSearch, valueSearch, onResetFunc, onSetFilter, setSearchBar, onOpen, onCloseSearchBar, setCloseButton, closeButton, searchBar, listComView, setListComView, setMapIdVehicle, setSelectedData }) => {
  let Location = useRoute();

  return (
    <Fragment>
      <View style={{ paddingHorizontal: 15, paddingTop: 20, }}>
        {searchBar ?
          <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', height: 40, backgroundColor: '#ffffff', borderRadius: 5, }}>
            <Input
              variant={'unstyled'}
              InputRightElement={
                closeButton === true ?
                  <Pressable onPress={() => { onSetFilter(); setCloseButton(closeButton => !closeButton); }}>
                    <Center style={{ backgroundColor: '#4646f2', width: 40, height: 40, borderRadius: 5 }}>
                      <FontAwesome name='search' color={'#ffffff'} size={18} />
                    </Center>
                  </Pressable>
                  :
                  <Pressable onPress={() => { valueSearch.name === '' ? onCloseSearchBar() : onResetFunc(); }}>
                    <Center style={{ width: 40, height: 40, borderRadius: 5 }}>
                      <AntDesign name='close' color={'#000000'} size={18} />
                    </Center>
                  </Pressable>
              }
              placeholder='Search here'
              keyboardType="default"
              onSubmitEditing={() => { onSetFilter() }}
              returnKeyType='search'
              style={{ color: '#252F40', height: 40, width: '100%', fontFamily: 'OpenSans-Regular' }}
              placeholderTextColor='#7D8EAB'
              value={valueSearch?.name}
              onChangeText={(Text) => setValueSearch({ ...valueSearch, name: Text })}
            />
          </View>
          :
          <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
            <Center>
              <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#000000' }}>Vehicle</Text>
            </Center>

            {listComView === true ?
              Location?.params?.userRole?.view?.vehicle_list === 1 ?
                <View style={{ position: 'absolute', right: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                  <Pressable onPress={() => { onOpen() }}>
                    <Center style={{ backgroundColor: '#ffffff', width: 40, height: 40, borderRadius: 5, marginRight: 5 }}>
                      <Feather name='filter' color={'#000000'} size={18} />
                    </Center>
                  </Pressable>
                  <Pressable onPress={() => { setSearchBar(true) }}>
                    <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                      <FontAwesome name='search' color={'blue'} size={18} />
                    </Center>
                  </Pressable>
                </View> : null : null}
            {listComView === false ?
              Location?.params?.userRole?.view?.vehicle_map === 1 ?
                <View style={{ position: 'absolute', right: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                  <Pressable onPress={() => { onOpen() }}>
                    <Center style={{ backgroundColor: '#ffffff', width: 40, height: 40, borderRadius: 5, marginRight: 5 }}>
                      <Feather name='filter' color={'#000000'} size={18} />
                    </Center>
                  </Pressable>
                  <Pressable onPress={() => { setSearchBar(true) }}>
                    <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                      <FontAwesome name='search' color={'blue'} size={18} />
                    </Center>
                  </Pressable>
                </View> : null : null}
          </Box>
        }
      </View>
      <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
        <Box style={{ backgroundColor: '#ffffff', width: '100%', marginTop: 20, borderRadius: 3, paddingLeft: 5, paddingRight: 5, paddingBottom: 5, paddingTop: 5 }}>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Pressable onPress={() => { setListComView(true); setMapIdVehicle(null); setSelectedData([]); setSearchBar(false); setCloseButton(false); }} style={[{ backgroundColor: listComView === true ? '#7171f3' : 'transparent', padding: 5, borderRadius: 3, width: '100%' }]}>
                <Text style={{ textAlign: 'center', color: listComView === true ? '#ffffff' : 'blue', fontSize: 14, fontFamily: listComView === true ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>
                  Vehicle List
                </Text>
              </Pressable>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Pressable onPress={() => { setListComView(false); setMapIdVehicle(null); setSelectedData([]); setSearchBar(false); setCloseButton(false); }} style={[{ backgroundColor: listComView === false ? '#7171f3' : 'transparent', padding: 5, borderRadius: 3, width: '100%' }]}>
                <Text style={{ textAlign: 'center', color: listComView === false ? "#ffffff" : 'blue', fontSize: 14, fontFamily: listComView === false ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>
                  Map
                </Text>
              </Pressable>
            </Col>
          </Row>
        </Box>
      </View>
    </Fragment>
  )
}

export default HeaderFunction