import GoogleTokenStrategy from 'passport-google-id-token'

//const LocalStrategy = passportLocal.Strategy

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  (parsedToken: any, googleId: any, done: any) => {
    console.log('ParsedToken:', parsedToken)
    const { email, given_name, family_name } = parsedToken.payload
    const user = {
      firstName: `${given_name}`,
      lastName: `${family_name}`,
      email: `${email}`,
    }
    done(null, user) // error and object to be passed to next
  }
)
