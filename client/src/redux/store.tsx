import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import ProductReducer from './Products/ProductsReducer'
import PriceRangeReducer from './PriceRange/PriceRangeReducer'

const rootReducer = combineReducers({
  product: ProductReducer,
  priceRange: PriceRangeReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>

export default store
