import { useParams } from 'react-router'
import useFetchUrl from '../../CustomHooks/useFetchUrl'
import Rating from '@mui/material/Rating'
import { Product } from '../../redux/Products/ProductsTypes'
import Loader from '../layout/Loader/Loader'
import ErrorPage from '../layout/Error'

function PhonePage() {
  const { phoneId }: { phoneId: string } = useParams()
  const ProductState = useFetchUrl(
    `http://localhost:5000/api/v1/phones/phone/${phoneId}`
  )
  const { loading, data, error } = ProductState
  let product = null
  if (data !== []) {
    product = data as Product
  }
  console.log('ProductState:**************', ProductState)
  console.log('Product:********', product)
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorPage />
      ) : product ? (
        <div>
          <img src={product.images[0]} alt={product.model} height="150px" />
          <p>{product.model}</p>
          <div>
            <Rating
              value={product.ratings}
              precision={0.5}
              size="small"
              readOnly
            />
            <span>{product.noReviews} reviews</span>
          </div>
          <p>{`€ ${product.price}`}</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default PhonePage
