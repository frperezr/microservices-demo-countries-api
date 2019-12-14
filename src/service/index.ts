// node modules
import Mali from 'mali'

// internal dependencies
import NewPostgres from './database'
import Service from './service'
import RPC from './rpc'
import Store from './database/postgres/store'

// get env variables
const PORT: string = process.env.PORT || ''
if (PORT === '') {
  console.log('invalid env PORT value')
  process.exit(1)
}

const POSTGRES_DSN: string = process.env.POSTGRES_DSN || ''
if (POSTGRES_DSN === '') {
  console.log('invalid env POSTGRES_DSN value')
  process.exit(1)
}

const PROTO_PATH: string = process.env.PROTO_PATH || ''
if (PROTO_PATH === '') {
  console.log('invalid env PROTO_PATH value')
  process.exit(1)
}

// global values
let app: Mali

async function main() {
  let pgSvc: Store
  try {
    pgSvc = await NewPostgres(POSTGRES_DSN)
  } catch (err) {
    console.log('Failed connect to postgres: ', err)
    process.exit(1)
  }

  // mali grpc server
  try {
    app = new Mali(PROTO_PATH, 'CartService')
  } catch (err) {
    console.log('Failed at create Cart Service server: ', err)
    process.exit(1)
  }

  // create service
  const svc = new Service(pgSvc)

  // create RPC
  const rpc = new RPC(svc)

  // configure routes
  app.use('CartService', 'getCart', rpc.getCart)
  app.use('CartService', 'listCarts', rpc.listCarts)
  app.use('CartService', 'createCart', rpc.createCart)
  app.use('CartService', 'addItem', rpc.addItem)
  app.use('CartService', 'updateItemQuantity', rpc.updateItemQuantity)
  app.use('CartService', 'deleteItem', rpc.deleteItem)
  app.use('CartService', 'deleteCart', rpc.deleteCart)

  // running mali server
  app.start(`0.0.0.0:${PORT}`)

  console.log(`Cart Service server at running on port ${PORT}`)
}

// shutdown method used for signals events listener
function shutdown(err: any) {
  if (err) {
    console.error(err)
  }

  app
    .close()
    .then(() => process.exit())
    .catch(() => process.exit())
}

// add listener for os signals
process.on('uncaughtException', shutdown)
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

// run main method
main()
