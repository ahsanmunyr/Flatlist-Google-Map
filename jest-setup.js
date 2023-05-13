import {jest} from '@jest/globals';
import * as ReactNative from "react-native";
jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      // Redefine an export, like a component
      Button: 'Button',
      // Mock out properties of an already mocked export
      LayoutAnimation: {
        ...ReactNative.LayoutAnimation,
        configureNext: jest.fn(),
      },
      Platform: {
        ...ReactNative.Platform,
        OS: 'android',
        Version: 123,
        isTesting: true,
        select: objs => objs['android'],
      },
      // Mock a native module
      NativeModules: {
        ...ReactNative.NativeModules,
        Override: {great: 'success'},
      },
    },
    ReactNative,
  );
});

jest.mock('react-native-maps', () => {
  const React = require('react');
  const {View} = require('react-native');
  class MockMapView extends React.Component {
    render() {
      const {testID, children, ...props} = this.props;

      return (
        <View
          {...{
            ...props,
            testID,
          }}>
          {children}
        </View>
      );
    }
  }

  const mockMapTypes = {
    STANDARD: 0,
    SATELLITE: 1,
    HYBRID: 2,
    TERRAIN: 3,
    NONE: 4,
    MUTEDSTANDARD: 5,
  };

  return {
    __esModule: true,
    default: MockMapView,
    MAP_TYPES: mockMapTypes,
    PROVIDER_DEFAULT: 'default',
    PROVIDER_GOOGLE: 'google',
  };
});
