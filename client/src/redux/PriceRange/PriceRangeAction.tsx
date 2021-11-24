import { Dispatch } from 'redux'
import { CHANGE_PRICE_RANGE } from './PriceRangeTypes'

export type SetPriceRange = {
  type: typeof CHANGE_PRICE_RANGE
  priceRange: number[]
}

export const setPrice = (priceRange: number | number[]) => {
  return {
    type: CHANGE_PRICE_RANGE,
    priceRange: priceRange,
  }
}

export const setPriceRange = (priceRange: number | number[]) => {
  return (dispatch: Dispatch) => {
    dispatch(setPrice(priceRange))
  }
}
