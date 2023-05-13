import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {AnimatedRegion, MarkerAnimated,} from 'react-native-maps';

const MarkerView = ({ coordinate }) => {
  const duration = 1000;
  const marker = useRef(null);


  const [coords] = useState(
    new AnimatedRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }),
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (marker.current) {
        marker.current?.animateMarkerToCoordinate(coordinate, duration);
      }
    } else {
      coords
        .timing({
          latitude: coordinate?.latitude,
          longitude: coordinate?.longitude,
          duration,
          useNativeDriver: true,
        })
        .start();
    }
  }, [marker, coordinate, coords]);

  return <MarkerAnimated  ref={marker} coordinate={coords} />;
};

export default MarkerView;