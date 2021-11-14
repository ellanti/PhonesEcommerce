import styled from 'styled-components'

const FilterDiv = styled.div`
  background: #ecf0f1;
  text-align: center;
  width: 24vw;
  color: #1d426f;
  display: flex;
  align-items: start;
  justify-content: space-around;
`
const MobileFilterButton = styled.button`
  border: none;
  background: none;
  color: #1d426f;
`
const FilterClearButton = styled.button`
  border: none;
  background: none;
  color: #1d426f;
`

function Filters() {
  return (
    <FilterDiv>
      <div>Filters</div>
      <FilterClearButton>CLEAR ALL</FilterClearButton>
      <MobileFilterButton>
        <i className="material-icons">filter_list</i>
      </MobileFilterButton>
    </FilterDiv>
  )
}

export default Filters
