import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const TrackListVehicle = ({ category }) => {
  let categorybus = <FontAwesome5 name='bus' size={13} color={'#4646F2'} />;
  let categorycar = <FontAwesome5 name='car-alt' size={13} color={'#4646F2'} />;
  let categorytruck = <FontAwesome5 name='truck' size={13} color={'#4646F2'} />;
  let categorymotorcycle = <FontAwesome5 name='motorcycle' size={13} color={'#4646F2'} />;
  let categorytaxi = <FontAwesome5 name='taxi' size={13} color={'#4646F2'} />;
  let categorypickup = <MaterialCommunityIcons name={'car-pickup'} size={13} color={'#4646F2'} />;

  let iconUrl;

  if (category === "Bus") {
    iconUrl = categorybus
  } else if (category === "Truck") {
    iconUrl = categorytruck
  } else if (category === "Bike") {
    iconUrl = categorymotorcycle
  } else if (category === "Pickups") {
    iconUrl = categorypickup
  } else if (category === "Car") {
    iconUrl = categorycar
  } else if (category === "Taxi") {
    iconUrl = categorytaxi
  } else if (category === "HVC") {
    iconUrl = categorytruck
  } else {
    // iconUrl = categorybus
  }

  return iconUrl
}
