import React, { lazy } from 'react';
import Loadable from '../Suspense_Component/Loadable';
import { createStackNavigator } from '@react-navigation/stack';


const RootStack = createStackNavigator();

const DemoScreen = Loadable(lazy(() => import('../DemoStackScree/DemoScreen')))

const DemoStackNavigation = () => {

  return (
    <RootStack.Navigator>
      <RootStack.Screen initialParams={{ userToken: 'Basic dHJhbnNwb3J0MDAwMTFAZ21haWwuY29tOlRyYWNrb2xldEAxMjMj' }} options={{ headerShown: false }} name="DemoScreen" component={DemoScreen} />
    </RootStack.Navigator>
  )
}

export default DemoStackNavigation