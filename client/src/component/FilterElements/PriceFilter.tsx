import { SyntheticEvent } from 'react'
import Slider from '@mui/material/Slider'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setPriceRange } from '../../redux/PriceRange/PriceRangeAction'

const PriceSlider = styled(Slider)({
  width: '50%',
  color: '#1d426f',
  '& .MuiSlider-valueLabel': {
    fontSize: 10,
    fontWeight: 'normal',
    top: -4,
    backgroundColor: '#fab720',
    color: '#1d426f',
    '&:before': {
      display: 'none',
    },
  },
})

const PriceFilterDiv = styled('div')({
  width: '12em',
  padding: '0 12px',
  borderBottom: '1px solid #ecf0f1',
  margin: '1.8em 0.6em',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1.2em',
})

const PriceHeading = styled('div')({
  fontWeight: 'bold',
  fontFamily: 'Montserrat, sans-serif',
})

function PriceFilter() {
  //const [priceRange, setPriceRange] = useState<number[]>([1, 1000])
  const priceRange = useSelector(
    (state: RootState) => state.priceRange.priceRange
  )
  const dispatch = useDispatch()

  const handlePriceRange = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    dispatch(setPriceRange(newValue))
  }

  function priceValueText(value: number) {
    return `${value}€`
  }
  return (
    <PriceFilterDiv>
      <PriceHeading>Price</PriceHeading>
      <PriceSlider
        size="small"
        getAriaLabel={() => 'Temperature range'}
        valueLabelDisplay="on"
        value={priceRange}
        onChangeCommitted={handlePriceRange}
        getAriaValueText={priceValueText}
        min={1}
        max={1000}
      />
    </PriceFilterDiv>
  )
}

export default PriceFilter
