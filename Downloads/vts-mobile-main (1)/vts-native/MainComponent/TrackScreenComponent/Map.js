
        import React, { Fragment, useRef, useState, useEffect } from 'react';
        import {View, ScrollView, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
        import CookieManager from '@react-native-cookies/cookies';
        import MapplsMarkerActivity from './helper/MapplsMarkerActivity';
        import MapDataList from './helper/MapDataList';
        import MapDataListCount from './helper/MapDataListCount';
        import MovingVehicleDataList from './Moving/MovingVehicleDataList';
        import MovingVehicleMap from './Moving/MovingVehicleMap';
        import { useHeader } from '../../ApiHeader';
        



        const Map= ({ selectedData, setSelectedData, loaderVehicle, vehicle_listMap, mapIdVehicle, setMapIdVehicle }) => {
          const ScrollRef = useRef();
          const { ApiDownload } = useHeader();
          const [socketData, setSocketData] = useState(null);
          const [zoomLevel, setZoomLevel] = useState(1);
          const data = socketData;
          // const styles = StyleSheet.create({
          //   container: {
          //     flex: 1,
          //     justifyContent: 'center',
          //     alignItems: 'center',
          //     backgroundColor: 'blue',
          //   },
          //   text: {
          //     fontSize: 16,
          //     color: 'white',
          //     fontWeight: 'bold',
          //   },
          // });


          // const MapComponent = ({ pos }) => {
          //   const mapRef = useRef(null);
          //   const [mapReady, setMapReady] = useState(true);
            
          //   const LabelPage = () => {
          //     return (
          //       <View style={styles.container}>
          //         <Text style={styles.label}>Hello, this is a label page!</Text>
          //         {/* Add more text elements or components here if needed */}
          //       </View>
          //     );
          //   };

//             const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// })

//             useEffect(() => {
//               if (mapReady && mapRef.current) {
//                 mapRef.current.animateToRegion({
//                   latitude: pos[0],
//                   longitude: pos[1],
//                   latitudeDelta: 0.002,
//                   longitudeDelta: 0.002,
//                 });
//               }
//             }, [mapReady, pos]);

//             const onMapReady = () => {
//               setMapReady(true);
//               if (mapRef.current) {
//                 mapRef.current.setZoom(17);
//               }
//             };
          
//             return (
//               <MapView
//                 style={{ flex: 1 }}
//                 ref={mapRef}
//                 onMapReady={onMapReady}
//                 initialRegion={{
//                   latitude: pos[0],
//                   longitude: pos[1],
//                   latitudeDelta: 0.002,
//                   longitudeDelta: 0.002,
//                 }}
//               >
//                 <Marker coordinate={{ latitude: pos[0], longitude: pos[1] }} />
//               </MapView>
//             );
//           };
        
          



          const mapListFilter = vehicle_listMap?.filter(function (monthYear) { return (monthYear?.position?.latitude === 0.0 || monthYear?.position?.longitude === 0.0 ? false : true); });
          const nullMapListFilter = mapListFilter?.filter(function (monthYear) { return (monthYear?.position === null ? false : true); });
          const handleZoomIn = () => {
            
            const newZoomLevel = zoomLevel + zoomIncrement;
          setZoomLevel(newZoomLevel);
          console.log('Zoom Level:', newZoomLevel);
          };
          
          const handleZoomOut = () => {
            
            const newZoomLevel = zoomLevel - zoomIncrement;;
            setZoomLevel(Math.max(newZoomLevel, 30/ 156543.03392));
          };
          
          
          <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleZoomIn}>
              <Text>Zoom In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleZoomOut}>
              <Text>Zoom Out</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 10 }} />

          {socketData ? (
            <MovingVehicleMap
              socketData={socketData}
              AllItemsData={selectedData}
              OneItemsData={mapIdVehicle}
              zoomLevel={zoomLevel}
            />
          ) : (
            <MovingVehicleMap
              socketData={data}
              AllItemsData={selectedData}
              OneItemsData={mapIdVehicle}
              zoomLevel={zoomLevel}
            />
          )}

          {socketData ? (
            <MovingVehicleDataList
              setSelectedData={setSelectedData}
              nullMapListFilter={selectedData}
              setMapIdVehicle={setMapIdVehicle}
              ScrollRef={ScrollRef}
              socketData={socketData}
              zoomLevel={zoomLevel}
            />
          ) : (
            <MovingVehicleDataList
              setSelectedData={setSelectedData}
              nullMapListFilter={selectedData}
              setMapIdVehicle={setMapIdVehicle}
              ScrollRef={ScrollRef}
              socketData={data}
              zoomLevel={zoomLevel}
            />
          )}
        </View>
          
          useEffect(() => {
            if (selectedData?.length) {
              CookieManager.get(ApiDownload?.baseURL)
                .then(function (Cookiess) {
                  var ws = new WebSocket(`wss://cgvtsapi.trackolet.in/api/socket?deviceId=${selectedData[0]?.device?.id}`, { headers: { Cookie: `JSESSIONID=${Cookiess?.JSESSIONID?.value};` } });
                  ws.onopen = (e) => { console.log('onopen', e); };
                  ws.onerror = (e) => { console.log('onerror', e); };
                  ws.onmessage = (e) => {
                    if (e?.data) {
                      const data = JSON.parse(e?.data);
                      if (data?.positions) {
                        setSocketData(...data?.positions);
                      }
                    }
                  };
                });
            }
          }, [selectedData]);

          if (loaderVehicle) {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <ActivityIndicator size={'large'} color={'#63CE78'} />
              </View>
            )
          }
          if (selectedData?.length) {
            const data = selectedData[0]?.position
            return (
              <Fragment>
                <MapDataListCount
                  nullMapListFilter={selectedData}
                />
                <View style={{ backgroundColor: '#f2f3f8', paddingHorizontal: 15, }}>
                  <ScrollView
                    ref={ScrollRef}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={30}
                    scrollEventThrottle={100}
                  >
                    <View style={{ height: 10 }} />
                    {socketData ?
                      <MovingVehicleMap socketData={socketData} AllItemsData={selectedData} OneItemsData={mapIdVehicle} />
                      :
                      <MovingVehicleMap socketData={data} AllItemsData={selectedData} OneItemsData={mapIdVehicle} />
                    }

                    {socketData ?
                      <MovingVehicleDataList setSelectedData={setSelectedData} nullMapListFilter={selectedData} setMapIdVehicle={setMapIdVehicle} ScrollRef={ScrollRef} socketData={socketData} />
                      :
                      <MovingVehicleDataList setSelectedData={setSelectedData} nullMapListFilter={selectedData} setMapIdVehicle={setMapIdVehicle} ScrollRef={ScrollRef} socketData={data} />
                    }
                  </ScrollView>
                </View>
              </Fragment >
            )
          }


          return (
            <Fragment>
              <View>
                <MapDataListCount
                  nullMapListFilter={nullMapListFilter}
                />
                <View style={{ marginTop: 10, backgroundColor: '#f2f3f8', paddingHorizontal: 15, }}>
                  <View>
                    <ScrollView
                      ref={ScrollRef}
                      showsVerticalScrollIndicator={false}
                      initialNumToRender={30}
                      scrollEventThrottle={100}
                    >
                      <MapplsMarkerActivity
                        AllItemsData={nullMapListFilter}
                        OneItemsData={mapIdVehicle}
                      />
                      <MapDataList
                        setSelectedData={setSelectedData}
                        nullMapListFilter={nullMapListFilter}
                        setMapIdVehicle={setMapIdVehicle}
                        ScrollRef={ScrollRef}
                      />
                    </ScrollView>
                  </View>
                </View>
              </View>
            </Fragment >
          )
        }
        export default Map;
