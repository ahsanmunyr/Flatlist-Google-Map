import axios from 'axios';
import * as types from './types';
import config from '../../config/config';

export const venueGet = (page, loadMore) => async dispatch => {
  try {
    const response = await axios.get(`${config.base_url}?p=${page}`);
    console.log('API CALL');
    if (response?.data?.status) {
      if (loadMore == 'loadmore') {
        dispatch({
          type: types.VENUE_DATA_MORE,
          payload: response.data,
        });
      } else {
        dispatch({
          type: types.VENUE_DATA,
          payload: response.data,
        });
      }
    }
  } catch (e) {
    dispatch({
      type: types.VENUE_ERROR,
      payload: 'ERROR',
    });
    console.log(e.response.data);
  }
};
