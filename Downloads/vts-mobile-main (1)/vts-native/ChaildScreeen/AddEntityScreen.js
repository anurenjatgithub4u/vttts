import React, { lazy, Fragment, useState, } from 'react';
import { View, ScrollView, StatusBar, Dimensions, Pressable, TouchableOpacity, } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import { Row, Col } from 'react-native-responsive-grid-system';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';

const DeviceDetails = ComponentLoadable(lazy(() => import('../ChaildComponent/AddEntityComponent/DeviceDetails')));
const SimDetails = ComponentLoadable(lazy(() => import('../ChaildComponent/AddEntityComponent/SimDetails')));
const VehicleDetails = ComponentLoadable(lazy(() => import('../ChaildComponent/AddEntityComponent/VehicleDetails')));
const PermitHolder = ComponentLoadable(lazy(() => import('../ChaildComponent/AddEntityComponent/PermitHolder')));

const AddEntityScreen = ({ navigation }) => {
  const [deviceDetailsView, setDeviceDetailsView] = useState(true);
  const [simDetailsView, setSimDetailsView] = useState(false);
  const [vehicleDetailsView, setVehicleDetailsView] = useState(false);
  const [permitHolderView, setPermitHolderView] = useState(false);

  const [deviceDetailsColor, setDeviceDetailsColor] = useState(true);
  const [simDetailsColor, setSimDetailsColor] = useState(false);
  const [vehicleDetailsColor, setVehicleDetailsColor] = useState(false);
  const [permitHolderColor, setPermitHolderColor] = useState(false);

  return (
    <Fragment>
      <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
      <View style={{
        paddingHorizontal: 15, paddingTop: 25, backgroundColor: '#ebebfd', width: Dimensions.get('window').width, shadowColor: '#470000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 1
      }}>
        <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
          <Center>
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#000000' }}>Add New Entity</Text>
          </Center>
          <View style={{ position: 'absolute', left: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
            <Pressable onPress={() => navigation.goBack(-1)}>
              <Center style={{ backgroundColor: '#d0d0fb', width: 40, height: 40, borderRadius: 5 }}>
                <Ionicons name='chevron-back-outline' color={'blue'} size={18} />
              </Center>
            </Pressable>
          </View>
        </Box>
      </View>
      <View style={{ alignItems: 'flex-start' }}></View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#f5f6fa', width: Dimensions.get('window').width, flex: 1 /* height: Dimensions.get('window').height, */ }}
        scrollEnabled={true}
      >

        <View style={{ marginHorizontal: 15, marginTop: 15, backgroundColor: '#e2e2e2', borderRadius: 50 }}>
          <Row>
            <Col xs={3} sm={3} md={3} lg={3}>
              <View style={{ backgroundColor: deviceDetailsColor ? '#a1a1f8' : 'transparent', borderRadius: 50 }}>
                <View style={{ backgroundColor: simDetailsColor ? 'blue' : '#ffffff', width: 12, height: 12, borderRadius: 50, margin: 1 }} />
              </View>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <View style={{ backgroundColor: simDetailsColor ? '#a1a1f8' : 'transparent', borderRadius: 50 }}>
                <View style={{ backgroundColor: vehicleDetailsColor ? 'blue' : '#ffffff', width: 12, height: 12, borderRadius: 50, margin: 1 }} />
              </View>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <View style={{ backgroundColor: vehicleDetailsColor ? '#a1a1f8' : 'transparent', borderRadius: 50 }}>
                <View style={{ backgroundColor: permitHolderColor ? 'blue' : '#ffffff', width: 12, height: 12, borderRadius: 50, margin: 1 }} />
              </View>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              <View style={{ backgroundColor: permitHolderColor ? '#a1a1f8' : 'transparent', borderRadius: 50 }}>
                <View style={{ backgroundColor: '#ffffff', width: 12, height: 12, borderRadius: 50, margin: 1 }} />
              </View>
            </Col>
          </Row>
        </View>
        <View style={{ marginHorizontal: 15, }}>
          <Row>
            <Col xs={3} sm={3} md={3} lg={3}>
              {deviceDetailsColor ?
                <TouchableOpacity onPress={() => {
                  setDeviceDetailsView(true)
                  setSimDetailsView(false)
                  setVehicleDetailsView(false)
                  setPermitHolderView(false)

                  setDeviceDetailsColor(true)
                  setSimDetailsColor(false)
                  setVehicleDetailsColor(false)
                  setPermitHolderColor(false)
                }} >
                  <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>Device Details</Text>
                </TouchableOpacity>
                :
                <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'OpenSans-Regular' }}>Device Details</Text>
              }
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              {simDetailsColor ?
                <TouchableOpacity onPress={() => {
                  setDeviceDetailsView(false)
                  setSimDetailsView(true)
                  setVehicleDetailsView(false)
                  setPermitHolderView(false)

                  setDeviceDetailsColor(true)
                  setSimDetailsColor(true)
                  setVehicleDetailsColor(false)
                  setPermitHolderColor(false)
                }} >
                  <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>Sim Details</Text>
                </TouchableOpacity>
                :
                <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'OpenSans-Regular' }}>Sim Details</Text>
              }
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              {vehicleDetailsColor ?
                <TouchableOpacity onPress={() => {
                  setDeviceDetailsView(false)
                  setSimDetailsView(false)
                  setVehicleDetailsView(true)
                  setPermitHolderView(false)

                  setDeviceDetailsColor(true)
                  setSimDetailsColor(true)
                  setVehicleDetailsColor(true)
                  setPermitHolderColor(false)
                }} >
                  <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>Vehicle Details</Text>
                </TouchableOpacity>
                :
                <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'OpenSans-Regular' }}>Vehicle Details</Text>
              }
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
              {permitHolderColor ?
                <TouchableOpacity onPress={() => { }} >
                  <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'OpenSans-SemiBold' }}>Permit Holder</Text>
                </TouchableOpacity>
                :
                <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'OpenSans-Regular' }}>Permit Holder</Text>
              }
            </Col>
          </Row>
        </View>

        {deviceDetailsView ?
          <DeviceDetails
            setDeviceDetailsView={setDeviceDetailsView}
            setSimDetailsView={setSimDetailsView}
            setVehicleDetailsView={setVehicleDetailsView}
            setPermitHolderView={setPermitHolderView}
            deviceDetailsView={deviceDetailsView}
            simDetailsView={simDetailsView}
            vehicleDetailsView={vehicleDetailsView}
            permitHolderView={permitHolderView}
            navigation={navigation}

            setDeviceDetailsColor={setDeviceDetailsColor}
            setSimDetailsColor={setSimDetailsColor}
            setVehicleDetailsColor={setVehicleDetailsColor}
            setPermitHolderColor={setPermitHolderColor}
          />
          : null}
        {simDetailsView ?
          <SimDetails
            setDeviceDetailsView={setDeviceDetailsView}
            setSimDetailsView={setSimDetailsView}
            setVehicleDetailsView={setVehicleDetailsView}
            setPermitHolderView={setPermitHolderView}
            deviceDetailsView={deviceDetailsView}
            simDetailsView={simDetailsView}
            vehicleDetailsView={vehicleDetailsView}
            permitHolderView={permitHolderView}
            navigation={navigation}

            setDeviceDetailsColor={setDeviceDetailsColor}
            setSimDetailsColor={setSimDetailsColor}
            setVehicleDetailsColor={setVehicleDetailsColor}
            setPermitHolderColor={setPermitHolderColor}
          />
          : null}
        {vehicleDetailsView ?
          <VehicleDetails
            setDeviceDetailsView={setDeviceDetailsView}
            setSimDetailsView={setSimDetailsView}
            setVehicleDetailsView={setVehicleDetailsView}
            setPermitHolderView={setPermitHolderView}
            deviceDetailsView={deviceDetailsView}
            simDetailsView={simDetailsView}
            vehicleDetailsView={vehicleDetailsView}
            permitHolderView={permitHolderView}
            navigation={navigation}

            setDeviceDetailsColor={setDeviceDetailsColor}
            setSimDetailsColor={setSimDetailsColor}
            setVehicleDetailsColor={setVehicleDetailsColor}
            setPermitHolderColor={setPermitHolderColor}
          />
          : null}
        {permitHolderView ?
          < PermitHolder
            setDeviceDetailsView={setDeviceDetailsView}
            setSimDetailsView={setSimDetailsView}
            setVehicleDetailsView={setVehicleDetailsView}
            setPermitHolderView={setPermitHolderView}
            deviceDetailsView={deviceDetailsView}
            simDetailsView={simDetailsView}
            vehicleDetailsView={vehicleDetailsView}
            permitHolderView={permitHolderView}
            navigation={navigation}

            setDeviceDetailsColor={setDeviceDetailsColor}
            setSimDetailsColor={setSimDetailsColor}
            setVehicleDetailsColor={setVehicleDetailsColor}
            setPermitHolderColor={setPermitHolderColor}
          />
          : null}

      </ScrollView>
    </Fragment>
  )
}

export default AddEntityScreen