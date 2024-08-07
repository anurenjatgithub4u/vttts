import React from 'react';
import MapplsGL from 'mappls-map-react-native';
import carIcon from '../../../../assets/images/VTS/GRCar.png';

const RenderCurrentPoint = ({ currentPoint }) => {
  if (!currentPoint) {
    return;
  }

  return (
    <MapplsGL.ShapeSource
      id="symbolLocationSource"
      shape={currentPoint}>
      <MapplsGL.SymbolLayer
        id="symbolLocationSymbols"
        minZoomLevel={1}
        style={{
          iconRotationAlignment: 'map',
          iconImage: carIcon,
          iconIgnorePlacement: true,
          iconAllowOverlap: true,
          iconAnchor: 'center',
          iconRotate: ["get", "bearing"],
          iconSize: 0.8,
        }}
      />
    </MapplsGL.ShapeSource>
  )
}

export default RenderCurrentPoint