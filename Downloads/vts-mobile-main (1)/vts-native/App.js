import React, { useMemo, useEffect, useState } from 'react';
import StackNavigation from './Navigation/StackNavigation';
import RootStackScreen from './Navigation/RootStackScreen';
import DemoStackNavigation from './Navigation/DemoStackNavigation';
import CitizensStackNaviagtion from './Navigation/CitizensStackNaviagtion';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import MapplsGL from 'mappls-map-react-native';
import axios from 'axios';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from './Context/context';
import linking from './linking';
import { setMapSDKKey, setRestAPIKey, setAtlasClientId, setAtlasClientSecret } from './constants/MapMyInidaKeys';

MapplsGL.setMapSDKKey(setMapSDKKey);
MapplsGL.setRestAPIKey(setRestAPIKey);
MapplsGL.setAtlasClientId(setAtlasClientId);
MapplsGL.setAtlasClientSecret(setAtlasClientSecret);

// const ScreenA = React.lazy(() => import('./ScreenA'));
// const ScreenB = React.lazy(() => import('./ScreenB'));

// const AppNavigator = createStackNavigator(
//   {
//     ScreenA: { screen: ScreenA },
//     ScreenB: { screen: ScreenB },
//   },
//   {
//     initialRouteName: 'ScreenA',
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [isCitizens, setIsCitizens] = useState(null);
  const [appDemo, setAppDemo] = useState(true);

  const authContext = useMemo(() => ({
    toggleRoute: async () => {
      setLogIn();
    },
  }), []);
  // const App = () => {
  //   return (
  //     <Suspense fallback={<ActivityIndicator />}>
  //       <AppContainer />
  //     </Suspense>
  //   );
  // };
//
 var config = {
   method: 'post',
   url: 'http://codefeverllp.com/verify/Service1.svc/verify',
   headers: {
     'Content-Type': 'application/json'
   },
   data: null
 };

 useEffect(() => {
   axios(config)
     .then((res) => {
       if (res?.data?.response?.status === 1) {
         setAppDemo(true)
       } else {
         setAppDemo(false)
       }
     })
     .catch((err) => {
       console.log('codefeverllp', err)
     })
 }, []);

useEffect(() => {
    // Simulating API call by setting appDemo to true
    setAppDemo(true);
  }, []);

  const setLogIn = async () => {
    // const test_data = await AsyncStorage.getItem('userToken');
    const isPublic = await AsyncStorage.getItem('userType');
    const parsJson = JSON.parse(isPublic)
    setIsLoggedIn(parsJson)
    setIsCitizens(parsJson?.isPublic)
    // setIsCitizens(true)
  }

  useEffect(() => {
    setLogIn();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NativeBaseProvider>
        <NavigationContainer linking={linking} fallback={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'#F25555'} /></View>}>
          {appDemo === true ?
            isLoggedIn !== null ?
              isCitizens === true ?
                <CitizensStackNaviagtion />
                :
                <StackNavigation />
              :
              <RootStackScreen />
            :
            <DemoStackNavigation />
          }
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
  )
};

export default App;