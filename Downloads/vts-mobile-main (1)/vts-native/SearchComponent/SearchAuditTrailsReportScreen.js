import React, { Fragment, useState, useEffect } from 'react';
import { View, StatusBar, Pressable } from 'react-native';
import { Text, Divider } from 'native-base';
import { useHeader } from '../ApiHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Center } from 'native-base'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Col, Row } from "react-native-responsive-grid-system";
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchAuditTrailsReportScreen = () => {
  const Location = useRoute();
  let Navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [expanded, setExpanded] = React.useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [loadMore, setLoadMore] = useState(false);
  const [audit_data_count, setAudit_data_count] = useState('0');
  const [audit_data, setAudit_data] = useState([]);
  const [loader, setLoader] = useState(true);


  const pageSize = 20;
  const requestApi = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await ApiRequestAuthorizationHook.get(`/search/audit/trails/?search_key=${Location?.params?.search_key}&currentPage=${page}&pageSize=${pageSize}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setAudit_data(oldArray => [...oldArray, ...response.data.data]);
          setAudit_data_count(response.data.noRecords)
          setTotalPage(response.data.totalPage)
        } else {

        }
      })
      .catch(function (error) {
        console.log("audit_trails", error);
      })
      .finally(function () {
        setLoader(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    requestApi()
  }, [page])

  const fetchMoreData = async () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  const newDataAuditTrails = Array?.from(new Set(audit_data.map(a => a?.id)))
    ?.map(id => {
      return audit_data.find(a => a?.id === id)
    })

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  return (
    <Fragment>
      <StatusBar barStyle='dark-content' backgroundColor="#ebebfd" />
      <View style={[{ paddingHorizontal: 15, backgroundColor: '#ebebfd', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 6, }]}>
        <Pressable onPress={() => Navigation.goBack()}>
          <Center style={{ backgroundColor: '#d0d0fb', width: 35, height: 35, borderRadius: 5 }}>
            <Entypo name='chevron-thin-left' color={'#7171F3'} size={20} />
          </Center>
        </Pressable>
        <View style={{ flexGrow: 1 }} />
        <Center style={{ height: 40 }}>
          <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', textTransform: 'capitalize', color: '#000000' }}>Audit Trails</Text>
        </Center>
        <View style={{ flexGrow: 1 }} />
        <Pressable>
          <Center style={{ width: 40, height: 40, borderRadius: 5 }}>

          </Center>
        </Pressable>
      </View>
      <View style={{ backgroundColor: '#ebebfd', paddingHorizontal: 15, alignItems: 'center', flexDirection: 'row', paddingTop: 15, paddingBottom: 15, }}>
        <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
        <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{audit_data_count}</Text>
        <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Search Result</Text>
      </View>

      <View style={{ paddingHorizontal: 15, }}>
        {loader ?
          <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: "center", display: 'flex' }}>
            <ActivityIndicator color={'#63CE78'} size={'large'} />
          </View>
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              return (
                <>
                  {audit_data.length === 0 ?
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 130 }}>
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                    </View>
                    :
                    loadMore ?
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 130 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                      </View>
                      :
                      <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 130 }}>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                      </View>
                  }
                </>
              )
            }}
            initialNumToRender={30}
            onEndReachedThreshold={.2}
            onEndReached={fetchMoreData}
            horizontal={false}
            data={newDataAuditTrails}
            renderItem={({ item, index }) => {
              return (
                <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 4, paddingTop: 12, paddingBottom: 12, }}>
                  <Pressable onPress={() => expanded === item?.id ? handlePress(0) : handlePress(item?.id)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10 }}>
                    <Row>
                      <Col xs={1} sm={1} md={1} lg={1}>
                        {expanded === item?.id ?
                          <AntDesign onPress={() => handlePress(0)} name={"minuscircleo"} size={20} color={'#7D8EAB'} />
                          :
                          <AntDesign onPress={() => handlePress(item?.id)} name={"pluscircleo"} size={20} color={'#7D8EAB'} />
                        }
                      </Col>
                      <Col xs={11} sm={11} md={11} lg={11}>
                        <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.username}</Text>
                      </Col>
                    </Row>
                  </Pressable>

                  {expanded === item?.id ?
                    < View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                      <View style={{ marginHorizontal: 20 }}>
                        <Row>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Component</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.component}</Text>
                            </View>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Activity</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.activity}</Text>
                            </View>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Description</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.description}</Text>
                            </View>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Platform</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.platform}</Text>
                            </View>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Status Code</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.statuscode}</Text>
                            </View>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Ip Address</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.ipaddress}</Text>
                            </View>
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6}>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Created on</Text>
                              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.createdon).getDate()} ${months[new Date(item?.createdon).getMonth()]} ${new Date(item?.createdon).getFullYear()}, ${moment(item?.createdon)?.format('hh:mm A')}`}</Text>
                            </View>
                          </Col>
                        </Row>
                      </View>
                    </View>
                    : null}
                </View>
              )
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    </Fragment >
  )
}

export default SearchAuditTrailsReportScreen