import styled from 'styled-components'
import FilterContents from '../FilterElements/FilterContents'
import FilterHead from '../FilterElements/FilterHead'

const FilterDiv = styled.div`
  border: 1px solid #ecf0f1;
  width: 24%;
  @media (max-width: 768px) {
    width: 100%;
  }
`

function Filters() {
  return (
    <FilterDiv>
      <FilterHead></FilterHead>
      <FilterContents></FilterContents>
    </FilterDiv>
  )
}

export default Filters
