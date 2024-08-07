import React, { Fragment } from 'react'
import { View, Text, Pressable, LayoutAnimation, ActivityIndicator, UIManager, Platform, FlatList } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const AuditList = ({ loader, fetchMoreData, loadMore, audit_data }) => {
  const [expanded, setExpanded] = React.useState();

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  return (
    <Fragment>
      <View>
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
                  {loadMore ?
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 365 }}>
                      <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                    </View>
                    :
                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 365 }}>
                      {/* <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text> */}
                    </View>
                  }
                </>
              )
            }}
            ListEmptyComponent={() => {
              return (
                <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                  <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                </View>
              );
            }}
            initialNumToRender={30}
            onEndReachedThreshold={.2}
            onEndReached={fetchMoreData}
            horizontal={false}
            data={audit_data}
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

export default AuditList