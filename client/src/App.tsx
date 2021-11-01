import axios from 'axios'
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles'
import { green, purple } from '@mui/material/colors'
import GoogleLogin from 'react-google-login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './component/layout/Header'
import Footer from './component/layout/Footer'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'
type Response = {
  token: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff176',
    },
    secondary: {
      main: '#212121',
    },
  },
})

function App() {
  // const responseGoogle = async (response: any) => {
  //   console.log('Response from Google:', response)
  //   const tokenId = response.tokenId
  //   const result = await axios.post<Response>('/googlelogin', {
  //     id_token: tokenId,
  //   })

  //   if (result) {
  //     localStorage.setItem('token', result.data.token)
  //   }
  //   if (result.status === 200) {
  //     //history.pushState()
  //   }
  // }
  // return (
  //   <div className="App">
  //     <GoogleLogin
  //       clientId={process.env.REACT_APP_CLIENT_ID as string}
  //       buttonText="Login"
  //       onSuccess={responseGoogle}
  //       onFailure={responseGoogle}
  //       cookiePolicy={'single_host_origin'}
  //     />
  //   </div>
  // )

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
