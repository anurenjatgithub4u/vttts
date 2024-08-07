import React, { Fragment } from 'react'
import { point } from '@turf/helpers';
import MapplsGL from 'mappls-map-react-native';


const layerStyles = {
  origin: {
    circleRadius: 10,
    circleColor: 'white',
  },
  destination: {
    circleRadius: 10,
    circleColor: '#4646F2',
    circleRadius: 6, 
    circleStrokeWidth: 2, 
    circleStrokeColor: '#FFFFFF',
  },
  route: {
    lineColor: '#4646F2',
    lineCap: "round",
    lineWidth: 3,
    lineOpacity: 0.84,
  },
  progress: {
    lineColor: '#8AC37D',
    lineWidth: 3,
  },
};

const AnimatePointView = ({ route, currentPoint, routeCoordinates }) => {
  if (!route) {
    return null;
  }

  let backgroundColor = '#62676F';

  if (currentPoint) {
    backgroundColor = '#8AC37D';
  }

  const style = [layerStyles.origin, { circleColor: backgroundColor, circleRadius: 6, circleStrokeWidth: 2, circleStrokeColor: '#FFFFFF', }];

  return (
    <Fragment>
      <MapplsGL.ShapeSource
        id="origin"
        shape={point(routeCoordinates[0])}>
        <MapplsGL.Animated.CircleLayer
          id="originInnerCircle"
          style={style}
        />
      </MapplsGL.ShapeSource>

      <MapplsGL.ShapeSource id="routeSource" shape={route}>
        <MapplsGL.LineLayer
          id="routeFill"
          style={layerStyles.route}
          belowLayerID="originInnerCircle"
        />
      </MapplsGL.ShapeSource>

      <MapplsGL.ShapeSource
        id="destination"
        shape={point(routeCoordinates[routeCoordinates.length - 1])}>
        <MapplsGL.CircleLayer
          id="destinationInnerCircle"
          style={layerStyles.destination}
        />
      </MapplsGL.ShapeSource>
    </Fragment>
  )
}

export default AnimatePointView