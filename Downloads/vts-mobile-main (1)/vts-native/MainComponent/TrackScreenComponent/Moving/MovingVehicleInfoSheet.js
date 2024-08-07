import React, { Fragment } from "react";
import { Actionsheet } from "native-base";
import { View, Text, ScrollView } from "react-native";

const MovingVehicleInfoSheet = ({ getInfo, setGetInfo }) => {

  return (
    <Fragment>
      <Actionsheet isOpen={getInfo?.id === undefined ? false : true} onClose={() => setGetInfo(null)}>
        <Actionsheet.Content style={{ width: '100%' }}>
          <ScrollView nestedScrollEnabled={true} scrollEnabled={true} showsVerticalScrollIndicator={false} style={{ width: '100%', }}>
            <View style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 15 }}>
              <View style={{}}>
                <View style={{ flexDirection: 'row', paddingTop: 3 }}>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Vehicle Number: </Text>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{getInfo?.Vehicle_Number}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 3 }}>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Permit Holder Name: </Text>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{getInfo?.Permit_Holder_Name}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 3 }}>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Contact Number: </Text>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{getInfo?.Contact_Number}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 10, }}>
                <View style={{ flexDirection: 'row', paddingTop: 3 }}>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Chassis Number: </Text>
                  <View style={{}}>
                    <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{getInfo?.Chassis_Number}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 3 }}>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>IMEI Number: </Text>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{getInfo?.IMEI_Number}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 3 }}>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>RTO Code: </Text>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{getInfo?.RTO_Code}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 3 }}>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Company Name: </Text>
                  <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{getInfo?.Company_Name}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  )
}

export default MovingVehicleInfoSheet