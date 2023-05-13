import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  responsiveWidth,
  responsiveScreenHeight,
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.95;

const Card = ({index, data, image, lat, long, thumbnail, scrollX}) => {
  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
  ];

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [40, 30, 20],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.main}>
      <Animated.View style={[styles.animatedView, {transform: [{translateY}]}]}>
        <ImageBackground
          style={styles.posterImage}
          borderTopRightRadius={responsiveScreenFontSize(1)}
          borderTopLeftRadius={responsiveScreenFontSize(1)}
          source={{uri: image}}>
          <View style={styles.imageView}>
            <Text style={styles.name} numberOfLines={2}>
              {data?.name}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.content}>
          <Text style={styles.foodPolicy}>Food Policy</Text>
          <Text
            numberOfLines={2}
            style={{fontSize: responsiveScreenFontSize(1.2), color: 'grey'}}>
            {data?.food_policy == ''
              ? "We don't have any food policy."
              : data?.food_policy}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    opacity: 0.8,
    height: responsiveScreenHeight(20),
    resizeMode: 'cover',
    borderRadius: responsiveScreenFontSize(1),
    margin: 0,
    backgroundColor: 'white',
    // marginBottom: 30,
  },
  content: {
    height: responsiveScreenHeight(12),
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: responsiveScreenFontSize(1),
    paddingVertical: responsiveScreenFontSize(0.1),
    borderBottomRightRadius: responsiveScreenFontSize(1),
    borderBottomLeftRadius: responsiveScreenFontSize(1),
  },
  imageView: {
    alignSelf: 'center',
    left: 0,
    borderTopRightRadius: responsiveScreenFontSize(3),
    borderBottomRightRadius: responsiveScreenFontSize(3),
    // height: responsiveScreenHeight(5),
    backgroundColor: '#592dfa',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    top: responsiveScreenHeight(2),
    paddingHorizontal: responsiveScreenFontSize(1),
    paddingVertical: responsiveScreenFontSize(1),
  },
  name: {
    color: 'white',
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: '500',
  },
  animatedView: {
    marginHorizontal: SPACING,
    borderRadius: responsiveScreenHeight(1),
  },
  main: {
    width: ITEM_SIZE,
    height: responsiveScreenHeight(40),
  },
  foodPolicy: {
    color: 'black',
    fontWeight: '400',
    fontSize: responsiveScreenFontSize(1.5),
  },
});

export default Card;
