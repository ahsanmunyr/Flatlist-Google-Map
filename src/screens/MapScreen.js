import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native';
import * as actions from '../store/actions/venueGet';
import {connect} from 'react-redux';
import MapView, {
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  responsiveWidth,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Card from '../components/Card';
import Loader from '../components/Loader';
import MarkerView from '../components/MarkerView';
const {width} = Dimensions.get('window');
const ITEM_SIZE = Platform?.OS === 'ios' ? width * 0.72 : width * 0.95;

const MapScreen = ({venueGet, venueSet}) => {
  const [page, onChangePage] = useState(2);
  const [loader, onChangeLoader] = useState(false);
  const [apiCall, onChangeApiCall] = useState(false);
  const flatListRef = useRef(null);
  const mapRef = useRef(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [region, onChangeRegion] = useState({
    latitude: 25.324117,
    longitude: 55.4048353,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });



  useEffect(() => {
    onChangeLoader(true);
    venueGet(1).then(() => {
      onChangeLoader(false);
    });
  }, []);

  const onScroll = useCallback(({viewableItems}) => {
    if (viewableItems[0]?.item) {
      onChangeRegion({
        latitude: viewableItems[0]?.item?.lat,
        longitude: viewableItems[0]?.item?.lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      mapRef.current?.animateCamera({
        center: {
          latitude: viewableItems[0]?.item?.lat,
          longitude: viewableItems[0]?.item?.lon,
        },
        duration: 1000,
      });
    }
  }, []);

  const renderItem = useCallback(
    ({item, index}) => (
      <Card
        index={index}
        data={item}
        image={item?.featured_image}
        lat={item?.lat}
        long={item?.lon}
        thumbnail={item?.thumbnail}
        scrollX={scrollX}
      />
    ),
    [],
  );

  const LoadMore = useCallback(() => {
    if (venueSet?.total_pages >= page && !apiCall) {
      onChangeApiCall(true);
      venueGet(page, 'loadmore').then(() => {
        onChangePage(pre => pre + 1);
        onChangeApiCall(false);
      });
    }
  }, [page, venueSet, apiCall]);

  if (loader) {
    return <Loader />;
  }

  function renderFooter() {
    return (
      <>
        {venueSet?.total_pages >= page ? (
          <View style={styles.renderFooter}>
            <View style={styles.renderFooterContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
              <ActivityIndicator
                color="black"
                size={responsiveScreenFontSize(1.5)}
              />
            </View>
          </View>
        ) : (
          <View style={styles.empty} />
        )}
      </>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <MapView.Animated
        provider={
          Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        style={styles.map}
        ref={mapRef}
        initialRegion={region}>
        <MarkerView  coordinate={region} />
      </MapView.Animated>
      <View style={styles.outerFlatlist}>
        <Animated.FlatList
          bounces={false}
          testID={"testByAhsan"}
          decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
          renderToHardwareTextureAndroid
          contentContainerStyle={{alignItems: 'center'}}
          snapToInterval={ITEM_SIZE}
          snapToAlignment="start"
          onEndReachedThreshold={0.2}
          onEndReached={LoadMore}
          ListFooterComponent={renderFooter}
          ListFooterComponentStyle={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          horizontal
          ref={flatListRef}
          pagingEnabled={true}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          viewabilityConfig={{
            minimumViewTime: 1000,
            itemVisiblePercentThreshold: 90,
          }}
          keyExtractor={(item, i) => item.id}
          data={venueSet?.results}
          onViewableItemsChanged={onScroll}
        />
      </View>
    </View>
  );
};

function mapStateToProps({venueSet}) {
  return {venueSet};
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  outerFlatlist: {
    position: 'absolute',
    width: '100%',
    height: responsiveScreenHeight(40),
  },
  renderFooter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderFooterContainer: {
    padding: responsiveScreenFontSize(1),
    paddingHorizontal: responsiveScreenFontSize(2),
    borderRadius: responsiveScreenFontSize(1),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: responsiveScreenFontSize(1.4),
    textAlign: 'center',
    color: 'black',
  },
  empty: {
    width: responsiveWidth(10),
    height: responsiveScreenHeight(10),
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps, actions)(MapScreen);
// return (
// <MarkerView  coordinate={region} />
// <MarkerAnimated
//   key={index}
//   ref={markerRef}
//   focusable
//   coordinate={{
//     latitude: marker.lat,
//     longitude: marker.lon,
//   }} />
// );
// })}
