import { View, Text } from 'react-native'
import React from 'react'

const DemoScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#000000', fontSize: 20, fontFamily: "OpenSans-Bold", textAlign: "center", textTransform: 'capitalize' }}>demo version expired</Text>
    </View>
  )
}

export default DemoScreen



/* import { View, Text } from 'react-native'
import React from 'react';
// import Slider from '@react-native-community/slider';
import { Slider } from 'react-native-elements';
import { useState } from 'react';

const DemoScreen = () => {
  const [index, seIndex] = useState(0)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Slider
        style={{ width: 200, height: 40 }}
        step={1}
        minimumValue={0}
        maximumValue={100}
        value={index}
        onValueChange={(val) => seIndex(val)}
        minimumTrackTintColor={"#4646f2"}
        maximumTrackTintColor={"#62676f"}
        trackStyle={{ height: 7, borderRadius: 50 }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: '#FFFFFF', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation: 5, }}
      />
      <Text style={{ color: '#000000', fontSize: 20, fontFamily: "OpenSans-Bold", textAlign: "center", textTransform: 'capitalize' }}>{index}</Text>
    </View>
  )
}

export default DemoScreen */