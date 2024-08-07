import React, { lazy, useState, Fragment } from 'react';
import { Select, CheckIcon, } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import ComponentLoadable from '../../Suspense_Component/ComponentLoadable';

const GeofenceReport = ComponentLoadable(lazy(() => import('./MiscellaneousReports/GeofenceReport')));
const SosPanicReport = ComponentLoadable(lazy(() => import('./MiscellaneousReports/SosPanicReport')));
const LoginStatistics = ComponentLoadable(lazy(() => import('./MiscellaneousReports/LoginStatistics')));
const VltdMakeModel = ComponentLoadable(lazy(() => import('./MiscellaneousReports/VltdMakeModel')));
const ReportedViolation = ComponentLoadable(lazy(() => import('./MiscellaneousReports/ReportedViolation')));
const GeneratedViolation = ComponentLoadable(lazy(() => import('./MiscellaneousReports/GeneratedViolation')));

const Miscellaneous = () => {
  const [indexComponent, setIndexComponent] = useState('0')
  const [toggleReport, setToggleReport] = useState(false)

  return (
    <Fragment>
      <View style={toggleReport === true ? styles?.dataBg : styles?.mainBg}>
        <View style={{ paddingTop: 12, display: toggleReport === true ? 'none' : 'flex' }}>
          <View>
            <Text style={{ color: '#000000', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingBottom: 15 }} >Miscellaneous Reports</Text>

            <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'OpenSans-SemiBold', paddingBottom: 4 }} >Report</Text>
            <Select style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', height: 40 }} borderWidth={0} selectedValue={indexComponent} placeholderTextColor={'#7D8EAB'} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
              bg: "#f4f4fd",
              endIcon: <CheckIcon size="5" />
            }} _light={{
              bg: "#f4f4fd"
            }} _dark={{
              bg: "coolGray.800"
            }} onValueChange={itemValue => setIndexComponent(itemValue)}>
              {MiscellaneousList?.map((value, index) => (
                <Select.Item key={index} shadow={2} label={value?.name} value={value?.tabIndex?.toString()} />
              ))}
            </Select>
          </View>
        </View>

        {indexComponent === '1' ?
          <GeofenceReport
            setToggleReport={setToggleReport}
          />
          : null}
        {indexComponent === '2' ?
          <SosPanicReport
            setToggleReport={setToggleReport}
          />
          : null}
        {indexComponent === '3' ?
          <LoginStatistics
            setToggleReport={setToggleReport}
          />
          : null}
        {indexComponent === '4' ?
          <VltdMakeModel
            setToggleReport={setToggleReport}
          />
          : null}
        {indexComponent === '5' ?
          <ReportedViolation
            setToggleReport={setToggleReport}
          />
          : null}
        {indexComponent === '6' ?
          <GeneratedViolation
            setToggleReport={setToggleReport}
          />
          : null}
      </View>
    </Fragment>
  )
}

export default Miscellaneous;

const MiscellaneousList = [
  { id: 1, name: 'Select', tabIndex: 0 },
  { id: 2, name: 'Geofence Report', tabIndex: 1 },
  { id: 3, name: 'SOS Panic Report', tabIndex: 2 },
  { id: 4, name: 'Login statistics', tabIndex: 3 },
  { id: 5, name: 'Search by vltd Make and Model', tabIndex: 4 },
  { id: 6, name: 'Reported Violation', tabIndex: 5 },
  { id: 7, name: 'Generated Violation', tabIndex: 6 },
]

const styles = StyleSheet.create({
  mainBg: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 5,
    padding: 10,
    paddingBottom: 20
  },
  dataBg: {
    backgroundColor: '#F5F6FA',
    marginHorizontal: 0,
    marginTop: 0,
    borderRadius: 0,
    padding: 0,
    paddingBottom: 0
  }
})