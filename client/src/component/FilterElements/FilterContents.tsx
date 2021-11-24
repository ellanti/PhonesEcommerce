import styled from 'styled-components'
import PriceFilter from './PriceFilter'

const FilterContentsDiv = styled.div`
  margin: 0 auto;
  padding: 1px 6px;
`

function FilterContents() {
  return (
    <FilterContentsDiv>
      <PriceFilter></PriceFilter>
    </FilterContentsDiv>
  )
}

export default FilterContents
