import removeDuplicate from '../../../utils/removeDuplicate';
import {
  VENUE_DATA,
  VENUE_DATA_MORE,
  VENUE_DATA_CLEAR,
  VENUE_ERROR,
} from '../../actions/types';

const initialState = {
  results: []
};

export default function venueSet(state = initialState, action) {
  switch (action.type) {
    case VENUE_DATA:
      return action.payload;
    case VENUE_DATA_MORE:
      return {
        ...action.payload,
        results: removeDuplicate([...state.results, ...action.payload.results], "id"),
      };
    case VENUE_ERROR:
      return action.payload;
    case VENUE_DATA_CLEAR:
      return [];
    default:
      return state;
  }
}
