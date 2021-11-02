import { ChangeEvent, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import ProductCard from './ProductCard'
import useFetchUrl from '../../CustomHooks/useFetchUrl'
import { Product, ProductsResponse } from '../../redux/Products/ProductsTypes'
import Loader from '../layout/Loader/Loader'
import ErrorPage from '../layout/Error'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUrl } from '../../redux/Products/ProductsAction'
import { RootState } from '../../redux/store'

const StyledDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  columnGap: '5vw',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const StyledPagination = styled(Pagination)({
  marginLeft: '38vw',
  marginBottom: '10vh',
})

const BASE_HOME_URL = 'http://localhost:5000/api/v1/phones/'

function Home() {
  const dispatch = useDispatch()
  let { keyword = '' }: { keyword: any } = useParams()
  const [page, setPage] = useState(1)
  const setPageNo = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    console.log('PageNumber:', page)
  }

  const url = `${BASE_HOME_URL}?keyword=${keyword}&page=${page}`
  console.log('url:', url)

  useEffect(() => {
    dispatch(fetchUrl(url))
  }, [dispatch, keyword, page])
  // const ProductsState = useFetchUrl(url)

  //const url = `BASE_HOME_URL?keyword=${keyword}&page=${page}&price[gte]=${priceStart}&price[lte]=${priceEnd}}`
  const ProductsState = useSelector((state: RootState) => state.product)
  const { loading, data, error } = ProductsState

  let products: Product[] = []
  if (data) {
    products = (data as ProductsResponse).phones
  }
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorPage />
      ) : data ? (
        <div>
          <StyledDiv>
            {products.map((product: Product) => {
              return (
                <ProductCard key={product._id} product={product}></ProductCard>
              )
            })}
          </StyledDiv>

          <StyledPagination
            count={5}
            shape="rounded"
            variant="outlined"
            page={page}
            onChange={setPageNo}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Home
