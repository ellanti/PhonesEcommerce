import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUrl } from '../redux/Products/ProductsAction'
import { RootState } from '../redux/store'

function useFetchUrl(url: string) {
  const ProductsState = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('In Use effect')
    dispatch(fetchUrl(url))
  }, [dispatch])
  console.log('FetchURl State:', ProductsState)
  return ProductsState
}

export default useFetchUrl
