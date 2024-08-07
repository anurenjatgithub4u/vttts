import React, { lazy, Fragment, useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Pressable, } from 'react-native';
import { Box, Text, Center, } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input, } from 'native-base'
import SegmentedControlTab from "react-native-segmented-control-tab";
import ComponentLoadable from '../Suspense_Component/ComponentLoadable';
import { useHeader } from '../ApiHeader';
import ManageFloat from '../FloatNavigation/ManageFloat';

const User = ComponentLoadable(lazy(() => import('../ChaildComponent/UserRoleComponent/User')));
const Role = ComponentLoadable(lazy(() => import('../ChaildComponent/UserRoleComponent/Role')));

const UserRoleScreen = ({ navigation }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [userView, setUserView] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [closeButton, setCloseButton] = useState(true);
  const [value, setValue] = useState({ search: '' })
  const { ApiRequestAuthorizationHook } = useHeader();

  // User
  const [pageUser, setPageUser] = useState(1);
  const [totalPageUser, setTotalPageUser] = useState(0)
  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState('0');
  const [loaderUser, setLoaderUser] = useState(true);
  const [loadMoreUser, setLoadMoreUser] = useState(false);

  //Role
  const [pageRole, setPageRole] = useState(1);
  const [totalPageRole, setTotalPageRole] = useState(0)
  const [loaderRole, setLoaderRole] = useState(true)
  const [loadMoreRole, setLoadMoreRole] = useState(false);
  const [useRolerCount, setUserRoleCount] = useState('0');
  const [userRoleList, setUserRoleList] = useState([]);

  const onPressSearch = () => {
    setSearchBar(searchBar => !searchBar)
  };

  const pageSize = 20;
  const requestUser = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/users?currentPage=${pageUser}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setUserList(oldArray => [...oldArray, ...response.data.data]);
          setUserCount(response?.data.noRecords);
          setTotalPageUser(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log('users', error);
        setLoaderUser(true)
      })
      .finally(function () {
        setLoaderUser(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    requestUser();
  }, [pageUser]);

  const fetchMoreDataUser = () => {
    setLoadMoreUser(true)
    if (totalPageUser != pageUser) {
      setPageUser(pageUser + 1)
    } else {
      setLoadMoreUser(false)
    }
  }

  const requestRole = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/user_roles?currentPage=${pageRole}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setUserRoleList(oldArray => [...oldArray, ...response.data.data]);
          setUserRoleCount(response?.data.noRecords);
          setTotalPageRole(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log('user_roles', error);
        setLoaderRole(true)
      })
      .finally(function () {
        setLoaderRole(false)
      });

    return () => {
      controller.abort();
    };
  }
  useEffect(() => {
    requestRole();
  }, [pageRole]);

  const fetchMoreDataRole = () => {
    setLoadMoreRole(true)
    if (totalPageRole != pageRole) {
      setPageRole(pageRole + 1)
    } else {
      setLoadMoreRole(false)
    }
  }

  const onChangeSearch = (Text) => {
    if (Text.trim().length !== 0) {
      setValue({ ...value, search: Text, });
      setCloseButton(false)
    } else {
      setValue({ ...value, search: Text, });
      setCloseButton(true)
    }
  }

  const onRouteSearch = () => {
    if (value.search != '') {
      navigation.navigate({ name: tabIndex === 0 ? 'SearchUserScreen' : 'SearchRoleScreen', params: { search_key: value.search } });
      setValue({ ...value, search: '', });
      onPressSearch();
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoaderUser(true)
      setLoaderRole(true)
      setPageUser(1)
      setPageRole(1)
      setUserList([])
      setUserRoleList([])
      requestUser();
      requestRole();
    });
    return unsubscribe;
  }, [navigation]);

  const newDataUserList = Array.from(new Set(userList.map(a => a.id)))
    .map(id => {
      return userList.find(a => a.id === id)
    })
  const newDataRoleList = Array.from(new Set(userRoleList.map(a => a.id)))
    .map(id => {
      return userRoleList.find(a => a.id === id)
    })

  const userRefresh = () => {
    setLoaderUser(true)
    setUserList([])
    setPageUser(1)
    requestUser();
  }
  const roleRefresh = () => {
    setLoaderRole(true)
    setUserRoleList([])
    setPageRole(1)
    requestRole();
  }

  return (
    <Fragment>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} backgroundColor="#ebebfd" />
        <View style={{ backgroundColor: '#ebebfd', paddingBottom: 15, paddingHorizontal: 15 }}>
          <View style={{ paddingTop: 20, }}>
            {searchBar ?
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', height: 40, backgroundColor: '#ffffff', borderRadius: 5, }}>
                <Input
                  variant={'unstyled'}
                  value={value.search}
                  onChangeText={(Text) => onChangeSearch(Text)}
                  InputRightElement={
                    closeButton === true ?
                      <Pressable onPress={() => setCloseButton(closeButton => !closeButton)}>
                        <Center style={{ backgroundColor: '#4646f2', width: 40, height: 40, borderRadius: 5 }}>
                          <FontAwesome name='search' color={'#ffffff'} size={18} />
                        </Center>
                      </Pressable>
                      :
                      <Pressable onPress={() => { onPressSearch(); setCloseButton(closeButton => !closeButton) }}>
                        <Center style={{ width: 40, height: 40, borderRadius: 5 }}>
                          <AntDesign name='close' color={'#000000'} size={18} />
                        </Center>
                      </Pressable>

                  }
                  placeholder='Search here'
                  keyboardType="default"
                  onSubmitEditing={() => onRouteSearch()}
                  returnKeyType='go'
                  style={{ color: '#252F40', fontSize: 13, height: 40, width: '100%', fontFamily: 'OpenSans-Regular' }}
                  placeholderTextColor="#7D8EAB"
                />
              </View>
              :
              <Box style={[{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, }]}>
                <Center>
                  <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#252F40' }}>Users/Roles</Text>
                </Center>
                <View style={{ position: 'absolute', right: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                  <Pressable onPress={() => onPressSearch()}>
                    <Center style={{ backgroundColor: '#D0D0FB', width: 40, height: 40, borderRadius: 5 }}>
                      <FontAwesome name='search' color={'#7171F3'} size={18} />
                    </Center>
                  </Pressable>
                </View>
              </Box>
            }
          </View>

          <SegmentedControlTab
            values={["User", "Role"]}
            selectedIndex={tabIndex}
            onTabPress={(index) => setTabIndex(index)}

            borderRadius={5}
            tabsContainerStyle={{ height: 40, backgroundColor: '#FFFFFF', padding: 5, borderRadius: 5, marginTop: 20 }}
            tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0, borderRadius: 5, borderColor: 'transparent' }}
            activeTabStyle={{ backgroundColor: '#7171F3', borderRadius: 5, elevation: 12 }}
            tabTextStyle={{ color: '#7171F3', fontFamily: 'OpenSans-Regular', fontSize: 14 }}
            activeTabTextStyle={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14 }}
          />
        </View>

        {tabIndex === 0 ?
          <User
            navigation={navigation}

            userList={newDataUserList}
            userCount={userCount}
            loaderUser={loaderUser}
            loadMoreUser={loadMoreUser}
            fetchMoreDataUser={fetchMoreDataUser}

            userRefresh={userRefresh}
          />
          :
          <Role
            userView={userView}
            setUserView={setUserView}
            navigation={navigation}

            loaderRole={loaderRole}
            loadMoreRole={loadMoreRole}
            useRolerCount={useRolerCount}
            userRoleList={newDataRoleList}
            fetchMoreDataRole={fetchMoreDataRole}

            roleRefresh={roleRefresh}
          />
        }
      </SafeAreaView>

      <ManageFloat />
    </Fragment >
  )
}

export default UserRoleScreen;
