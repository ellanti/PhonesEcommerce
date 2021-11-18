import styled from 'styled-components'

const FilterHeader = styled.div`
  border: 1px solid #ecf0f1;
  padding: 2px;
  background: #1d426f;
  color: #fab720;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: space-between;
`
const MobileFilterButton = styled.button`
  border: none;
  background: none;
  color: white;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`
const FilterClearButton = styled.button`
  border: none;
  background: none;
  padding: 0px;
  color: white;
  @media (max-width: 768px) {
    display: none;
  }
`

function FilterHead() {
  return (
    <FilterHeader>
      <div>Filters</div>
      <div>
        <FilterClearButton>CLEAR ALL</FilterClearButton>
      </div>
      <MobileFilterButton>
        <i className="material-icons">filter_list</i>
      </MobileFilterButton>
    </FilterHeader>
  )
}

export default FilterHead
