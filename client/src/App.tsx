import axios from 'axios'
import GoogleLogin from 'react-google-login'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'
type Response = {
  token: string
}

function App() {
  const responseGoogle = async (response: any) => {
    console.log('Response from Google:', response)
    const tokenId = response.tokenId
    const result = await axios.post<Response>('/googlelogin', {
      id_token: tokenId,
    })

    if (result) {
      localStorage.setItem('token', result.data.token)
    }
    if (result.status === 200) {
      //history.pushState()
    }
  }
  return (
    <div className="App">
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID as string}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default App