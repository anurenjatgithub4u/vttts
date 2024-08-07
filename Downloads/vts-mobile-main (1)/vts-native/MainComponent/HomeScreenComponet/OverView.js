import React from 'react';
import OverViewCard from './OverViewComponents/OverViewCard';
import PanicStatus from './OverViewComponents/PanicStatus';
import OngoingTrip from './OverViewComponents/OngoingTrip';
import TodayAlarm from './OverViewComponents/TodayAlarm';
import CommunicatingDevice from './OverViewComponents/CommunicatingDevice';
import PanicMessage from './OverViewComponents/PanicMessage';
// import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

const OverView = () => {

  return (
    <React.Fragment>
      <View style={{ paddingHorizontal: 15, }}>
        <OverViewCard

        />
      </View>
      <View style={{ paddingHorizontal: 15, }}>
        <View>
          <PanicStatus

          />
        </View>
        <View>
          <PanicMessage

          />
        </View>
        <View>
          <TodayAlarm

          />
        </View>
        <View>
          <OngoingTrip

          />
        </View>
        <View>
          <CommunicatingDevice

          />
        </View>
      </View>
    </React.Fragment>
  )
}

export default OverView