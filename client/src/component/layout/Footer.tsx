import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'

const FooterInfo = styled('div')({
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const PageFooter = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})
function Footer() {
  return (
    <AppBar position="static" color="primary">
      <PageFooter>
        <FooterInfo>
          <h3>ECOM_PHONES</h3>
          <p>Connecting People</p>
          <p>Copyrights 2021 &copy; Ecom-Phones</p>
        </FooterInfo>
      </PageFooter>
    </AppBar>
  )
}

export default Footer
