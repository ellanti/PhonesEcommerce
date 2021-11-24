import { ChangeEvent, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUrl } from '../../redux/Products/ProductsAction'
import { RootState } from '../../redux/store'

import { Product, ProductsResponse } from '../../redux/Products/ProductsTypes'
import ProductCard from '../Home/ProductCard'

const ProductsDiv = styled('div')({
  border: '1px solid #ecf0f1',
  width: '72%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    width: '100%',
  },
})

const StyledDiv = styled('div')({
  marginTop: '5vh',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '0.6em',
})

const StyledPagination = styled(Pagination)({
  margin: '5vh',
})

const BASE_HOME_URL = 'http://localhost:5000/api/v1/phones/'

function Products() {
  const dispatch = useDispatch()
  let { keyword = '' }: { keyword: any } = useParams()
  const [page, setPage] = useState(1)
  const [priceRange, setPriceRange] = useState<number[]>([1, 1000])

  const setPageNo = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    console.log('PageNumber:', page)
  }

  const url = `${BASE_HOME_URL}?keyword=${keyword}&page=${page}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`
  console.log('url:', url)

  useEffect(() => {
    dispatch(fetchUrl(url))
  }, [dispatch, keyword, page, priceRange])

  const ProductsState = useSelector((state: RootState) => state.product)
  const { loading, data, error } = ProductsState

  let products: Product[] = []
  let paginationCount = 1
  if (data) {
    const productsResponse = data as ProductsResponse
    products = productsResponse.phones
    const resultPerPage = productsResponse.productsPerPage
    const productCount = productsResponse.productsCount
    const noPages = Math.ceil(productCount / resultPerPage)
    console.log(
      'resultsPerPage, productCount, noPages',
      resultPerPage,
      productCount,
      noPages
    )
    paginationCount = noPages === 0 ? 1 : noPages
  }
  return (
    <ProductsDiv>
      <StyledDiv>
        {products.map((product: Product) => {
          return <ProductCard key={product._id} product={product}></ProductCard>
        })}
      </StyledDiv>
      <div>
        <StyledPagination
          count={paginationCount}
          shape="rounded"
          variant="outlined"
          page={page}
          onChange={setPageNo}
        />
      </div>
    </ProductsDiv>
  )
}

export default Products
