import Box from '@mui/material/Box'

function Footer() {
  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ backgroundColor: '#212121', color: 'white', bottom: '0px' }}
      >
        <h3>ECOM_PHONES</h3>
        <p>Connecting People</p>
        <p>Copyrights 2021 &copy; Ecom-Phones</p>
      </Box>
    </div>
  )
}

export default Footer
