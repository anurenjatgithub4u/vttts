import React, { useState, useRef, Fragment, useEffect } from 'react';
import { Dimensions, BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Pressable } from 'react-native';
import { Divider, } from 'native-base';
import Feather from 'react-native-vector-icons/Feather'
import { FlatList, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Row, Col } from 'react-native-responsive-grid-system';
import moment from 'moment';
import { StyleSheet, Modal, } from 'react-native';
import MapView, { ProviderPropType, PROVIDER_GOOGLE, Circle, Polygon, Polyline, } from 'react-native-maps';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 3.400; // 0.99
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Geofence = ({ toggleView, setToggleView, geofenceData, geofenceDataCount, loading, loadMore, fetchMoreData, }) => {
  const navigation = useNavigation();
  const mapRef = useRef()
  const [expanded, setExpanded] = React.useState();
  const [mapMaximize, setMapMaximize] = useState(false);

  const handlePress = (id) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(id)
  };

  const onZoomInPress = () => {
    mapRef?.current?.getCamera().then((cam) => {
      cam.zoom += 1;
      mapRef?.current?.animateCamera(cam);
    });
  };
  const onZoomOutPress = () => {
    mapRef?.current?.getCamera().then((cam) => {
      cam.zoom -= 1;
      mapRef?.current?.animateCamera(cam);
    });
  };

  const allListFilter = geofenceData?.filter(
    valueType => {
      return (
        valueType
          .area
          .toLowerCase()
          .includes("CIRCLE".toLowerCase())
      )
    }
  );
  const CIRCLE_DATA = allListFilter.map((value) => (value?.area))
  const arr_circle = [];
  for (let i = 0; i < CIRCLE_DATA.length; i++) {
    const strData = CIRCLE_DATA[i].match(/[^()]+/g);
    const str1 = strData[1].split(",")
    const coord = str1[0].split(" ");
    const radius = str1[1]
    arr_circle.push({ latt: parseFloat(coord[0]), long: parseFloat(coord[1]), radius: parseFloat(radius) })
  }


  const Filter_LINESTRING = geofenceData?.filter(
    valueType => {
      return (
        valueType
          .area
          .toLowerCase()
          .includes("LINESTRING".toLowerCase())
      )
    }
  );
  const LINESTRING_DATA = Filter_LINESTRING.map((value) => (value?.area))
  const arr_LINESTRING_DATA = [];
  for (let i = 0; i < LINESTRING_DATA.length; i++) {
    const strData = LINESTRING_DATA[i].match(/[^()]+/g);
    const str1 = strData[1].split(",")
    const str3 = str1.map((value) => (value.split(" ")))
    const latt = str3.map((value) => ({ latt: value[0] }))
    const long = str3.map((value) => ({ long: value[1] }))
    const coord = latt.map((value, i) => ({ latitude: parseFloat(latt[i].latt), longitude: parseFloat(long[i].long) }));
    arr_LINESTRING_DATA.push({ coord: coord })
  }


  const Filter_POLYGON = geofenceData?.filter(
    valueType => {
      return (
        valueType
          .area
          .toLowerCase()
          .includes("POLYGON".toLowerCase())
      )
    }
  );
  const POLYGON_DATA = Filter_POLYGON.map((value) => (value?.area))
  const arr_POLYGON_DATA = [];
  for (let i = 0; i < POLYGON_DATA.length; i++) {
    const strData = POLYGON_DATA[i].match(/[^()]+/g);
    const str1 = strData[1].split(",")
    const str3 = str1.map((value) => (value.split(" ")))
    const latt = str3.map((value) => (value[0]))
    const long = str3.map((value) => (value[1]))
    const coord = latt.map((value, i) => ({ latitude: parseFloat(latt[i]), longitude: parseFloat(long[i]) }));
    arr_POLYGON_DATA.push({ coord: coord })
  }

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [])


  const newData = Array.from(new Set(geofenceData.map(a => a.id)))
    .map(id => {
      return geofenceData.find(a => a.id === id)
    })

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  return (
    <View>
      <View style={{ backgroundColor: '#ebebfd', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 15, paddingBottom: 10 }}>
          <Divider bg={'#4646f2'} thickness="7" orientation='vertical' style={{ height: 30, borderRadius: 2 }} />
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 8 }}>{geofenceDataCount}</Text>
          <Text style={{ color: '#252F40', fontSize: 14, fontFamily: 'OpenSans-Regular', paddingLeft: 8 }}>Results Found </Text>
          <View style={{ flexGrow: 1 }} />
          <Pressable onPress={() => navigation.navigate('UploadBulkScreen')} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#ffffff', borderRadius: 5, paddingRight: 6, paddingLeft: 6, paddingTop: 7, paddingBottom: 9, marginRight: 5, elevation: 12 }}>
            <Text style={{ color: 'green', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Upload</Text>
            <Feather name='upload' color={'green'} size={16} style={{ paddingLeft: 4 }} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('CreateGeofenceScreen')} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#4646f2', borderRadius: 5, paddingRight: 6, paddingLeft: 6, paddingTop: 7, paddingBottom: 9 }}>
            <Text style={{ color: '#ffffff', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>Create Geofence</Text>
          </Pressable>
        </View>
      </View>
      {toggleView === false ?
        <View style={{ paddingTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 15 }}>
          <Pressable onPress={() => setToggleView(true)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <Ionicons name={toggleView === true ? 'radio-button-on' : 'radio-button-off-sharp'} color={toggleView === true ? '#4646f2' : 'gray'} size={22} />
            <Text style={{ color: '#252F40', fontSize: 16, fontFamily: toggleView === true ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>List</Text>
          </Pressable>
          <Pressable onPress={() => setToggleView(false)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
            <Ionicons name={toggleView === false ? 'radio-button-on' : 'radio-button-off-sharp'} color={toggleView === false ? '#4646f2' : 'gray'} size={22} />
            <Text style={{ color: '#252F40', fontSize: 16, fontFamily: toggleView === false ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>Map</Text>
          </Pressable>
        </View>
        :
        null
      }

      <View>
        {toggleView ?
          <Fragment>
            {loading ?
              <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <ActivityIndicator color={'#63CE78'} size={'large'} />
              </View>
              :
              <View style={{ paddingHorizontal: 15, paddingBottom: 350 }}>
                <FlatList
                  ListHeaderComponent={() => {
                    return (
                      <Fragment>
                        <View style={{ paddingTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 15 }}>
                          <Pressable onPress={() => setToggleView(true)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                            <Ionicons name={toggleView === true ? 'radio-button-on' : 'radio-button-off-sharp'} color={toggleView === true ? '#4646f2' : 'gray'} size={22} />
                            <Text style={{ color: '#252F40', fontSize: 16, fontFamily: toggleView === true ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>List</Text>
                          </Pressable>
                          <Pressable onPress={() => setToggleView(false)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 15 }}>
                            <Ionicons name={toggleView === false ? 'radio-button-on' : 'radio-button-off-sharp'} color={toggleView === false ? '#4646f2' : 'gray'} size={22} />
                            <Text style={{ color: '#252F40', fontSize: 16, fontFamily: toggleView === false ? 'OpenSans-SemiBold' : 'OpenSans-Regular' }}>Map</Text>
                          </Pressable>
                        </View>
                        <Text style={{ paddingLeft: 25, textAlign: 'left', fontSize: 12, fontFamily: 'OpenSans-SemiBold', color: '#000000', paddingBottom: 10, }}>ID</Text>
                      </Fragment>
                    )
                  }}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={() => {
                    return (
                      <>
                        {loadMore ?
                          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>Fetching More Data....</Text>
                          </View>
                          :
                          <View style={{ height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                            <Text style={{ color: '#252F40', fontFamily: 'OpenSans-Regular', fontSize: 14 }}>No Data at the moment</Text>
                          </View>

                        }
                      </>
                    )
                  }}
                  onEndReachedThreshold={0.1}
                  onEndReached={fetchMoreData}
                  horizontal={false}
                  data={newData}
                  progressViewOffset={100}
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
                              <Text numberOfLines={1} style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 14, }}>{item?.name === null ? '-' : item?.name}</Text>
                            </Col>
                          </Row>
                        </Pressable>

                        {expanded === item?.id ?
                          <View style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20 }}>
                            <View style={{ marginHorizontal: 20 }}>
                              <Row>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Type</Text>
                                    {item?.area?.match(/[^()]+/g)[0] === "CIRCLE" ?
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#4646F2', paddingRight: 8 }}>{item?.area?.match(/[^()]+/g)[0]}</Text>
                                        <FontAwesome name='circle' size={18} color={'#4646F2'} />
                                      </View>
                                      : null}
                                    {item?.area?.match(/[^()]+/g)[0] === "POLYGON" ?
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name='square' size={18} color={'#000000'} />
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', paddingLeft: 8 }}>{item?.area?.match(/[^()]+/g)[0]}</Text>
                                      </View>
                                      : null}
                                    {item?.area?.match(/[^()]+/g)[0] === "LINESTRING" ?
                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name='vector-polyline' size={18} color={'#000000'} />
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40', paddingLeft: 8 }}>{item?.area?.match(/[^()]+/g)[0] === "LINESTRING" ? 'Polyline' : '-'}</Text>
                                      </View>
                                      : null}
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Name</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.name === null ? '-' : item?.name}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Speed Limit</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.attributes?.speedLimit}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Created By</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.createdByUser === null ? '-' : item?.createdByUser}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Created on</Text>
                                    {item?.createdon === null ?
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#40b657' }}>-</Text>
                                      :
                                      <View>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.createdon).getDate()} ${months[new Date(item?.createdon).getMonth()]} ${new Date(item?.createdon).getFullYear()} ${moment(item?.createdon)?.format('hh:mm A')}`}</Text>
                                      </View>
                                    }
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Modified By</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.modifiedByUser === null ? '-' : item?.modifiedByUser}</Text>
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Modified On</Text>
                                    {item?.lastupdate === null ?
                                      <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#40b657' }}>-</Text>
                                      :
                                      <View>
                                        <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{`${new Date(item?.lastupdate).getDate()} ${months[new Date(item?.lastupdate).getMonth()]} ${new Date(item?.lastupdate).getFullYear()} ${moment(item?.lastupdate)?.format(' hh:mm A')}`}</Text>
                                      </View>
                                    }
                                  </View>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                  <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 12, color: '#67748E' }}>Description</Text>
                                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, color: '#252F40' }}>{item?.description === null ? '-' : item?.description}</Text>
                                  </View>
                                </Col>
                              </Row>
                            </View>
                            <View style={{ marginHorizontal: 20, marginTop: 55 }}>
                              <View style={{ position: 'absolute', lrft: 0, bottom: 0, }}>
                                <Pressable onPress={() => navigation.navigate({ name: 'EditGeofenceScreen', params: { edit_id: item?.id } })} style={{ alignSelf: 'flex-start', backgroundColor: '#7474f5', paddingTop: 10, paddingBottom: 10, paddingLeft: 25, paddingRight: 25, borderRadius: 5, marginTop: 30, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                  <FontAwesome5 name='edit' size={15} color={'#ffffff'} />
                                  <Text style={{ paddingLeft: 5, color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Edit</Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                          : null}
                      </View>
                    )
                  }}
                  keyExtractor={(item) => item.id}
                />
              </View>
            }
          </Fragment >
          :
          <Fragment>
            <View style={{ paddingHorizontal: 15 }}>
              {loading ?
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 450, width: '100%', marginTop: 25, marginBottom: 25, borderRadius: 10, overflow: 'hidden', }}>
                  <Text>Map Loading...</Text>
                </View>
                :
                <View style={[styles.container]}>
                  <MapView
                    ref={mapRef}
                    customMapStyle={mapDarkStyle}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                      latitude: arr_circle[0]?.latt,
                      longitude: arr_circle[0]?.long,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                    loadingEnabled={true}
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    showsCompass={false}
                    userInterfaceStyle="dark"
                    scrollEnabled={true}
                    zoomEnabled={true}
                    rotateEnabled={true}
                    zoomControlEnabled={false}
                    minZoomLevel={0}
                    maxZoomLevel={50}
                    fullscreenControl={true}
                  >
                    {arr_circle?.map((value, id) => (
                      <Circle
                        key={id}
                        center={{
                          latitude: value?.latt,
                          longitude: value?.long,
                        }}
                        radius={700}
                        strokeWidth={2}
                        strokeColor="#4646F2"
                        fillColor="#6d6d6c"
                      />
                    ))}

                    {arr_POLYGON_DATA?.map((value, i) => (
                      <Polygon
                        key={i}
                        coordinates={value?.coord}
                        strokeWidth={2}
                        strokeColor={'blue'}
                        fillColor={'#d0d7de00'}
                        lineCap={'round'}
                        miterLimit={1}
                        tappable={true}
                        geodesic={true}
                        lineDashPhase={2}
                      />
                    ))}

                    {arr_LINESTRING_DATA?.map((value, i) => (
                      <Polyline
                        key={i}
                        coordinates={value?.coord}
                        strokeWidth={2}
                        strokeColor={'#ffffff'}
                        lineCap={'round'}
                        lineJoin={'round'}
                        miterLimit={1}
                        lineDashPhase={1}
                      />
                    ))}

                  </MapView>


                  <View style={{ position: 'absolute', bottom: 40, right: 15, }}>
                    <Pressable onPress={() => onZoomInPress()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 30, height: 30, marginTop: 5 }}>
                      <AntDesign name='plus' size={17} color={'#67748e'} />
                    </Pressable>
                    <Pressable onPress={() => onZoomOutPress()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 30, height: 30, marginTop: 5 }}>
                      <AntDesign name='minus' size={17} color={'#67748e'} />
                    </Pressable>
                    <Pressable onPress={() => setMapMaximize(mapMaximize => !mapMaximize)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 30, height: 30, marginTop: 5 }}>
                      <SimpleLineIcons name='size-fullscreen' size={17} color={'#67748e'} />
                    </Pressable>
                  </View>

                </View>
              }
            </View>

            <Modal
              animationType="slide"
              visible={mapMaximize}
              transparent={true}
              onRequestClose={() => {
                setMapMaximize(mapMaximize => !mapMaximize);
              }}
            >
              <View style={{ flex: 1, }}>
                <MapView
                  ref={mapRef}
                  customMapStyle={mapDarkStyle}
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={{
                    latitude: arr_circle[0]?.latt,
                    longitude: arr_circle[0]?.long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  loadingEnabled={true}
                  loadingIndicatorColor="#666666"
                  loadingBackgroundColor="#eeeeee"
                  showsCompass={false}
                  userInterfaceStyle="dark"
                  scrollEnabled={true}
                  zoomEnabled={true}
                  rotateEnabled={true}
                  zoomControlEnabled={false}
                  minZoomLevel={0}
                  maxZoomLevel={50}
                  fullscreenControl={true}
                >
                  {arr_circle.map((value, id) => (
                    <Circle
                      key={id}
                      center={{
                        latitude: value.latt,
                        longitude: value.long,
                      }}
                      radius={700}
                      strokeWidth={2}
                      strokeColor="#4646F2"
                      fillColor="#6d6d6c"
                    />
                  ))}

                  {arr_POLYGON_DATA.map((value, i) => (
                    <Polygon
                      key={i}
                      coordinates={value?.coord}
                      strokeWidth={2}
                      strokeColor={'blue'}
                      fillColor={'#d0d7de00'}
                      lineCap={'round'}
                      miterLimit={1}
                      tappable={true}
                      geodesic={true}
                      lineDashPhase={2}
                    />
                  ))}

                  {arr_LINESTRING_DATA.map((value, i) => (
                    <Polyline
                      key={i}
                      coordinates={value?.coord}
                      strokeWidth={2}
                      strokeColor={'#ffffff'}
                      lineCap={'round'}
                      lineJoin={'round'}
                      miterLimit={1}
                      lineDashPhase={1}
                    />
                  ))}
                </MapView>

                <View style={{ position: 'absolute', bottom: 30, right: 15, }}>
                  <Pressable onPress={() => onZoomInPress()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 30, height: 30, marginTop: 5 }}>
                    <AntDesign name='plus' size={17} color={'#67748e'} />
                  </Pressable>
                  <Pressable onPress={() => onZoomOutPress()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 30, height: 30, marginTop: 5 }}>
                    <AntDesign name='minus' size={17} color={'#67748e'} />
                  </Pressable>
                  <Pressable onPress={() => setMapMaximize(mapMaximize => !mapMaximize)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, width: 30, height: 30, marginTop: 5 }}>
                    <Feather name='minimize' size={17} color={'#67748e'} />
                  </Pressable>
                </View>
              </View>
            </Modal>
          </Fragment>
        }
      </View>
    </View >
  )
}

Geofence.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 550,
    width: '100%',
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 10, overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    //height: 400,
    borderRadius: 20
  },
});

export default Geofence;

const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];