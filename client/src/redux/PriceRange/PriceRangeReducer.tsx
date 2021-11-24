import { CHANGE_PRICE_RANGE } from './PriceRangeTypes'

const initialPriceRange = {
  priceRange: [1, 1000],
}

function PriceRangeReducer(state = initialPriceRange, action: any) {
  switch (action.type) {
    case CHANGE_PRICE_RANGE:
      return { ...state, priceRange: action.range }
    default:
      return state
  }
}
