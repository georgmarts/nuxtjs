import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { validateUser } from '~/utils/validateUser'


export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
    events: {
      async signOut({ token, session }) {
        // Delete auth cookie on signout so it doesn't persist past log out
        res.setHeader("Set-Cookie", "");    
        // Set token/session to {}, that would update the cilentside token/session as well
        token = {}
        session = {}
    }
    },
    callbacks: {
    jwt: async ({token, user}) => {
      if (user) {
        token.id = user.id
      }
      return Promise.resolve(token);
    },
    session: async ({session, token}) => {
      session.user.id = token.id;
      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      async authorize(credentials) {
        const { email, password } = credentials
        const user = await validateUser(email, password)
        if (user.data && user.data.length > 0) {
          return user.data[0]
        } else if (user.data && user.data.length === 0) {
          throw new Error('Account does not exist. Try again')
        } else if (!user.data) {
          throw new Error('Something went wrong')
        }
      }
    })
  ]
})
