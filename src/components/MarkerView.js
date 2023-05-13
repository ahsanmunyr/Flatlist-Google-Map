import React, {useEffect, useRef, useState} from 'react';
import {Platform, Image,View} from 'react-native';
import {AnimatedRegion, MarkerAnimated} from 'react-native-maps';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';

const MarkerView = ({coordinate, data}) => {
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
          useNativeDriver: false,
        })
        .start();
    }
  }, [marker, coordinate, coords]);

  return <MarkerAnimated ref={marker}  coordinate={coords}>
    <View style={{borderWidth: responsiveScreenFontSize(0.4), backgroundColor:'white', borderColor: 'white', borderRadius:responsiveScreenFontSize(50) }}>
      <Image style={{height: 50, width: 50,borderRadius:responsiveScreenFontSize(50)}} resizeMode='cover' source={{uri:data?.thumbnail}} />
      </View>
  </MarkerAnimated>;
};

export default MarkerView;
