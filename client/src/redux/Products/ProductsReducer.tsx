import {
  URL_FETCH_REQUEST,
  URL_FETCH_SUCCESS,
  URL_FETCH_FAILURE,
  urlState,
} from './ProductsTypes'
import { AllActions } from './ProductsAction'

export const urlInitialState: urlState = {
  loading: false,
  data: [],
  error: '',
}

const urlFetchReducer = (state = urlInitialState, action: AllActions) => {
  switch (action.type) {
    case URL_FETCH_REQUEST:
      return { ...state, loading: true }
    case URL_FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case URL_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default urlFetchReducer
