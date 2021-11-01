import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const StyledP = styled('p')({
  marginTop: '0px',
  marginBottom: '0px',
})
function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#fff176',
        bottom: '0px',
        position: 'absolute',
        maxWidth: 'fixed',
        width: '100%',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <h3>ECOM_PHONES</h3>
        <StyledP>Connecting People</StyledP>
        <StyledP>Copyrights 2021 &copy; Ecom-Phones</StyledP>
      </Box>
    </Box>
  )
}

export default Footer
