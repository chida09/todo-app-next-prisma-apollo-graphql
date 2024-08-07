import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { typeDefs } from '@/graphql/schema';
import { resolvers } from '@/graphql/resolvers';
import { PrismaClient } from '@prisma/client'

const cors = Cors()
const prisma = new PrismaClient()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    prisma,
  }),
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  }
}
