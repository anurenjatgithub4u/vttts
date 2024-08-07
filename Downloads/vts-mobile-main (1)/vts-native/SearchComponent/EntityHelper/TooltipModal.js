import React, { Fragment } from 'react';
import { Modal, View, Pressable, Text } from 'react-native'
import { Col, Row } from "react-native-responsive-grid-system";
import moment from 'moment';
import BlurViewScreen from '../../../BlurViewScreen';

const TooltipModal = ({ tooltipICCID, setTooltipICCID }) => {
  return (
    <Fragment>
      <Modal visible={tooltipICCID !== null} transparent on onRequestClose={() => setTooltipICCID(null)} >
        <BlurViewScreen />
        <Pressable onPress={() => setTooltipICCID(null)} style={{ backgroundColor: '#353232d1', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ backgroundColor: '#ffffff', width: '90%', borderRadius: 5, padding: 10, elevation: 12 }}>
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, color: '#252F40' }}>{tooltipICCID?.name === null ? '-' : tooltipICCID?.name}</Text>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>SIM1 number</Text>
                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{tooltipICCID?.simno1 === null ? '-' : tooltipICCID?.simno1}</Text>
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>SIM1 expiry</Text>
                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{tooltipICCID?.sim1_expiry === null ? '-' : moment(tooltipICCID?.sim1_expiry).format('DD/MM/YYYY')}</Text>
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>SIM2 number</Text>
                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{tooltipICCID?.simno2 === null ? '-' : tooltipICCID?.simno2}</Text>
                </View>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>SIM2 expiry</Text>
                  <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{tooltipICCID?.sim2_expiry === null ? '-' : moment(tooltipICCID?.sim2_expiry).format('DD/MM/YYYY')}</Text>
                </View>
              </Col>
            </Row>
          </View>
        </Pressable>
      </Modal>
    </Fragment>
  )
}

export default TooltipModal