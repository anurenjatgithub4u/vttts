import React, { Fragment, useState } from 'react'
import { Text, View } from 'react-native';
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator, } from 'react-native'
import { Col, Row } from "react-native-responsive-grid-system";
import { useHeader } from '../../ApiHeader';
import VehicleDataListCount from './helper/VehicleDataListCount';
import VehicleDataList from './helper/VehicleDataList';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const List = ({ setListComView, loadMoreVehicle, vehicle_list, vehicle_count, loaderVehicle, fetchMoreDataVehicle, setMapIdVehicle, setSelectedData, }) => {
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = useState();
  const [showAddress, setShowAddress] = useState(false);
  const [dataSet, setDataSet] = useState('');

  const handlePress = async (event) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(event?.id)
    setShowAddress(false)
    await ApiRequestAuthorizationHook.get(`/server/geocode?latitude=${event?.lat}&longitude=${event?.long}`)
      .then(function (response) {
        if (response?.status === 200) {
          setDataSet(response?.data)
        }
      })
      .catch(function (error) {
        setDataSet('Address not found')
      });
  };

  function uniqByKeepLast(data, key) { return [...new Map(data?.map(x => [key(x), x]))?.values()] }

  if (loaderVehicle) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <ActivityIndicator size={'large'} color={'#63CE78'} />
      </View>
    )
  }

  return (
    <Fragment>
      <View>
        <VehicleDataListCount vehicle_count={vehicle_count} />

        <View style={{ backgroundColor: loaderVehicle ? '#ebebfd' : '#F5F6FA', paddingHorizontal: loaderVehicle ? 0 : 15 }}>
          <View style={{ paddingBottom: 220, }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return (
                  <>
                    {loadMoreVehicle ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                      </View>
                    }
                  </>
                )
              }}
              ListEmptyComponent={() => {
                return (
                  <>
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 200 }}>
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>NO RECORDS</Text>
                    </View>
                  </>
                )
              }}
              ListHeaderComponent={() => {
                return (
                  <View style={{ paddingTop: 8, paddingBottom: 8 }}>
                    <Row>
                      <Col xs={1} sm={1} md={1} lg={1}>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={{ color: '#252F40', fontSize: 13, fontFamily: 'OpenSans-SemiBold' }}>Vehicle Number</Text>
                      </Col>
                      <Col xs={5} sm={5} md={5} lg={5}>
                        <Text style={{ color: '#252F40', fontSize: 13, fontFamily: 'OpenSans-SemiBold', textAlign: 'right', paddingRight: 30 }}>Type</Text>
                      </Col>
                    </Row>
                  </View>
                )
              }}
              initialNumToRender={30}
              onEndReachedThreshold={.2}
              onEndReached={fetchMoreDataVehicle}
              horizontal={false}
              // data={vehicle_list}
              data={uniqByKeepLast(vehicle_list, it => it?.device?.id)}
              renderItem={({ item, index }) => {
                return (
                  <VehicleDataList setExpanded={setExpanded} expanded={expanded} showAddress={showAddress} setShowAddress={setShowAddress} dataSet={dataSet} handlePress={handlePress} item={item} setMapIdVehicle={setMapIdVehicle} setListComView={setListComView} setSelectedData={setSelectedData} />
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    </Fragment >
  )
}

export default List;
