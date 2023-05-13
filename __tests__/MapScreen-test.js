import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../src/components/Loader';
import { venueGet } from '../src/store/actions/venueGet';
test('renders loader component currectly', () => {
  const loaderView = renderer.create(<Loader />).toJSON();
  console.log(loaderView.props,  "loaderView");
  expect(loaderView).toMatchSnapshot();
});
