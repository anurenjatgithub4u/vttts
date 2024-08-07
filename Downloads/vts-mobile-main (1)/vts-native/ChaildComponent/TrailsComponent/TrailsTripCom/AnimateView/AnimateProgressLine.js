import MapplsGL from 'mappls-map-react-native';
import React, { Fragment } from 'react';
import { lineString as makeLineString } from '@turf/helpers';


const AnimateProgressLine = ({ currentPoint, route }) => {
  if (!currentPoint) {
    return null;
  }

  const { nearestIndex } = currentPoint.properties;
  const coords = route.coordinates.filter(
    (c, i) => i <= nearestIndex,
  );
  coords.push(currentPoint.geometry.coordinates);

  if (coords.length < 2) {
    return null;
  }

  const lineString = makeLineString(coords);
  return (
    <Fragment>
      <MapplsGL.Animated.ShapeSource id="progressSource" shape={lineString}>
        <MapplsGL.Animated.LineLayer
          id="progressFill"
          aboveLayerID="routeFill"
          style={{
            lineColor: '#8AC37D',
            lineWidth: 3,
          }}
        />
      </MapplsGL.Animated.ShapeSource>
    </Fragment>
  )
}

export default AnimateProgressLine