import axios from 'axios'
import { Dispatch } from 'redux'
import {
  URL_FETCH_FAILURE,
  URL_FETCH_SUCCESS,
  URL_FETCH_REQUEST,
} from './ProductsTypes'

type GenericAction<T> = {
  type: T
}
type GenericActionWithPayload<T, K> = {
  type: T
  payload: K
}

type FetchUrlRequest = GenericAction<typeof URL_FETCH_REQUEST>
type FetchUrlSuccess = GenericActionWithPayload<typeof URL_FETCH_SUCCESS, any>
type FetchUrlFailure = GenericActionWithPayload<
  typeof URL_FETCH_FAILURE,
  string
>

export type AllActions = FetchUrlFailure | FetchUrlRequest | FetchUrlSuccess

const fetchUrlRequest = () => {
  return {
    type: URL_FETCH_REQUEST,
  }
}

const fetchUrlSuccess = (response: any) => {
  return {
    type: URL_FETCH_SUCCESS,
    payload: response,
  }
}

const fetchUrlFailure = (error: string) => {
  return {
    type: URL_FETCH_FAILURE,
    payload: error,
  }
}

export const fetchUrl = (url: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchUrlRequest())
    axios
      .get(url)
      .then((res) => {
        const response = res.data as any
        dispatch(fetchUrlSuccess(response))
      })
      .catch((err) => {
        dispatch(fetchUrlFailure(err.message))
      })
  }
}
