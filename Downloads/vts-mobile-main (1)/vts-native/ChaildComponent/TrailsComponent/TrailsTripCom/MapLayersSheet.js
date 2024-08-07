import React, { Fragment } from "react";
import { Actionsheet } from "native-base";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import imagePath from '../../../constants/imagePath';
import { Col, Row } from "react-native-responsive-grid-system";

const MapLayersSheet = ({ mapLayers, setMapLayers, isOpen, onClose }) => {

  return (
    <Fragment>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{ width: '100%' }}>
          <ScrollView nestedScrollEnabled={true} scrollEnabled={true} showsVerticalScrollIndicator={false} style={{ width: '100%', }}>
            <View style={{ paddingHorizontal: 10 }}>
              <View style={{ paddingBottom: 15 }}>
                <Text style={{ color: '#252F40', paddingBottom: 15, fontFamily: 'OpenSans-SemiBold', fontSize: 16 }}>Map Style</Text>

                <Row>
                  <Col xs={4}>
                    <TouchableOpacity onPress={() => setMapLayers('standard_day')} style={{ borderRadius: 5, /* width: '100%', */ height: 80, overflow: 'hidden', }}>
                      <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 9999, display: mapLayers === 'standard_day' ? 'flex' : 'none' }}>
                        <AntDesign name="checkcircle" size={20} color={'#63CE78'} />
                      </View>
                      <Image source={imagePath?.mapLight} resizeMode={'cover'} style={{ width: '100%', height: 80, borderRadius: 5, overflow: 'hidden' }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Default Map</Text>
                  </Col>
                  <Col xs={4}>
                    <TouchableOpacity onPress={() => setMapLayers('standard_night')} style={{ borderRadius: 5, width: '100%', height: 80, overflow: 'hidden', }}>
                      <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 9999, display: mapLayers === 'standard_night' ? 'flex' : 'none' }}>
                        <AntDesign name="checkcircle" size={20} color={'#63CE78'} />
                      </View>
                      <Image source={imagePath?.mapDark} resizeMode={'cover'} style={{ width: '100%', height: 80, borderRadius: 5, overflow: 'hidden' }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Dark Map</Text>
                  </Col>
                  <Col xs={4}>
                    <TouchableOpacity onPress={() => setMapLayers('standard_hybrid')} style={{ borderRadius: 5, width: '100%', height: 80, overflow: 'hidden', }}>
                      <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 9999, display: mapLayers === 'standard_hybrid' ? 'flex' : 'none' }}>
                        <AntDesign name="checkcircle" size={20} color={'#63CE78'} />
                      </View>
                      <Image source={imagePath?.mapHybrid} resizeMode={'cover'} style={{ width: '100%', height: 80, borderRadius: 5, overflow: 'hidden' }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Hybrid Map</Text>
                  </Col>
                  <Col xs={4}>
                    <TouchableOpacity onPress={() => setMapLayers('grey_day')} style={{ borderRadius: 5, width: '100%', height: 80, overflow: 'hidden', marginTop: 15 }}>
                      <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 9999, display: mapLayers === 'grey_day' ? 'flex' : 'none' }}>
                        <AntDesign name="checkcircle" size={20} color={'#63CE78'} />
                      </View>
                      <Image source={imagePath?.mapGray} resizeMode={'cover'} style={{ width: '100%', height: 80, borderRadius: 5, overflow: 'hidden' }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Grey Map</Text>
                  </Col>
                </Row>
              </View>
            </View>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  )
}

export default MapLayersSheet