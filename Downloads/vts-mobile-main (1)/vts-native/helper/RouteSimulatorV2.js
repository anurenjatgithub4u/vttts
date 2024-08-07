import { Animated } from 'react-native';
import along from '@turf/along';
import findDistance from '@turf/distance';
import { point } from '@turf/helpers';
import bearing from '@turf/bearing';

class Polyline {
  constructor(lineStringFeature) {
    this._coordinates = lineStringFeature.coordinates;
    this._lineStringFeature = lineStringFeature;

    this._totalDistance = 0;
    for (let i = 1; i < this._coordinates.length; i++) {
      this._totalDistance += findDistance(this.get(i - 1), this.get(i));
    }
  }

  coordinateFromStart(distance) {
    const pointAlong = along(this._lineStringFeature, distance);
    pointAlong.properties.distance = distance;

    pointAlong.properties.nearestIndex = this.findNearestFloorIndex(distance);
    return pointAlong;
  }



  coordinateAtIndex(index) {
    if (this._coordinates.length > index) {
      const pointAlong = point(this._coordinates[index], { nearestIndex: index });
      //  this._previousDistance = findDistance(this._coordinates[0], this._coordinates[index])
      return pointAlong;
    }
    return point(this._coordinates[this._coordinates.length - 1], { nearestIndex: this._coordinates.length - 1 });

  }


  findNearestFloorIndex(currentDistance) {
    let runningDistance = 0;

    for (let i = 1; i < this._coordinates.length; i++) {
      runningDistance += findDistance(this.get(i - 1), this.get(i));

      if (runningDistance >= currentDistance) {
        return i - 1;
      }
    }

    return -1;
  }

  get(index) {
    return point(this._coordinates[index]);
  }

  get totalDistance() {
    return this._totalDistance;
  }
}

class RouteSimulator {
  constructor(lineString, speed = 0.04, mounted = false) {
    this._polyline = new Polyline(lineString);
    this._previousDistance = 0;
    this._currentDistance = 0;
    this._speed = speed;
    this._mounted = mounted;
    this.isRunning = false;
    this._isStop = false;
  }

  addListener(listener) {
    this._listener = listener;
  }
  setTrackingProgressIndex(index) {

    const currentPosition = this._polyline.coordinateAtIndex(index);
    this._currentDistance = findDistance(this._polyline._coordinates[0], this._polyline._coordinates[index])
    // let bear = bearing(currentPoint, prevPoint);
    this.emit(currentPosition);




  }
  start() {
    this.reset();
    this.tick();
    this._isStop = false;
    this.isRunning = true;
  }
  async resume() {
    this.isRunning = true;
    this._isStop = false;
    this.tick();
  }
  async pause() {
    this.isRunning = false;
    this._isStop = false;
    this._anim.stop();

  }
  async reset() {
    // this._previousDistance = this._currentDistance;
    // this._currentDistance += this._speed;
    this._previousDistance = 0;
    this._currentDistance = 0;


    // this.start();
  }

  async stop() {
    if (this._anim) {
      this.isRunning = false;
      this._isStop = true;
      await this.reset()
      this._anim.reset();
      this._anim.stop();
    }
  }


  tick() {
    // requestAnimationFrame((time) => {
    this._previousDistance = this._currentDistance;
    this._currentDistance += this._speed;

    // interpolate between previous to current distance
    const listener = step => {
      // if (this._mounted == true) {
      const currentPosition = this._polyline.coordinateFromStart(step.value);
      this.emit(currentPosition);
      // }
    };
    this._animatedValue = new Animated.Value(this._previousDistance);
    this._animatedValue.addListener(listener);

    this._anim = Animated.timing(this._animatedValue, {
      toValue: this._currentDistance,
      duration: 5,
      useNativeDriver: true,
    });

    this._anim.start(() => {
      this._animatedValue.removeListener(listener);

      if (this._currentDistance > this._polyline.totalDistance) {
        this.reset();
        return;
      }
      if (this.isRunning) {
        this.tick();
      }
      if (this._isStop) {
        this._previousDistance = 0;
        this._currentDistance = 0;
        this.tick();
      }
    });

    // });
  }

  emit(pointFeature) {
    if (this._listener) {
      this._listener(pointFeature);
    }
  }
}

export default RouteSimulator;
