import { ChangeEvent, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import ProductCard from './ProductCard'
import useFetchUrl from '../../CustomHooks/useFetchUrl'
import { Product, ProductsResponse } from '../../redux/Products/ProductsTypes'
import Loader from '../layout/Loader/Loader'
import ErrorPage from '../layout/Error'
import { useParams } from 'react-router'

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

const StyledPagination = styled(Pagination)({ marginLeft: '38vw' })

const BASE_HOME_URL = 'http://localhost:5000/api/v1/phones/'

function Home() {
  let { keyword = '' }: { keyword: any } = useParams()
  const [page, setPage] = useState(1)

  const setPageNo = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    console.log('PageNumber:', page)
  }
  console.log('PageNumber:', page)
  const url = `${BASE_HOME_URL}?keyword=${keyword}&page=${page}`
  useEffect(() => {
    if (keyword) {
      console.log('changeinkeyword')
    }
    if (page) {
      console.log('changeinpage')
    }
  }, [keyword, page])
  //const url = `BASE_HOME_URL?keyword=${keyword}&page=${page}&price[gte]=${priceStart}&price[lte]=${priceEnd}}`
  const ProductsState = useFetchUrl(url)
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
            onChange={() => setPageNo}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Home
