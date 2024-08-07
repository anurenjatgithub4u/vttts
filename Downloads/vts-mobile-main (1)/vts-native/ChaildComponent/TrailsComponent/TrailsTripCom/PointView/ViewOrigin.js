import React, { Fragment } from 'react'
import { point } from '@turf/helpers';
import MapplsGL from 'mappls-map-react-native';

const ViewOrigin = ({ route, routeCoordinates }) => {
  if (!route) {
    return null;
  }

  return (
    <Fragment>
      <MapplsGL.ShapeSource
        id="origin"
        shape={point(routeCoordinates[0])}>
        <MapplsGL.Animated.CircleLayer
          id="originInnerCircle"
          style={{ circleRadius: 8, circleColor: '#4646F2', circleStrokeWidth: 2.5, circleStrokeColor: '#FFFFFF', }}
        />
      </MapplsGL.ShapeSource>

      <MapplsGL.ShapeSource id="routeSource" shape={route}>
        <MapplsGL.LineLayer
          id="routeFill"
          belowLayerID="originInnerCircle"
          style={{ lineColor: '#4646F2', lineCap: 'round', lineWidth: 3, lineOpacity: 0.84, lineJoin: 'round', }}
        />
      </MapplsGL.ShapeSource>

      <MapplsGL.ShapeSource
        id="destination"
        shape={point(routeCoordinates[routeCoordinates.length - 1])}>
        <MapplsGL.CircleLayer
          id="destinationInnerCircle"
          style={{ circleRadius: 8, circleColor: '#4646F2', circleStrokeWidth: 2.5, circleStrokeColor: '#FFFFFF', }} //#8AC37D
        />
      </MapplsGL.ShapeSource>
    </Fragment>
  )
}

export default ViewOrigin