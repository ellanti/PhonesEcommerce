import styled from 'styled-components'
import { useEffect } from 'react'
import Products from '../Products'
import Filters from '../Filters'

const ContentDiv = styled.div`
  padding: 3px 6px;
  display: flex;
  justify-content: space-around;
  gap: 0.6em;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`

function Search() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <ContentDiv>
      <Filters></Filters>
      <Products></Products>
    </ContentDiv>
  )
}

export default Search
