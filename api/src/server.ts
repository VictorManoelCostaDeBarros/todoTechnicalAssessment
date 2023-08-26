import app from "./app"
import { env } from "./env"

app.listen({
  port: env.PORT,
}, (err, address) => {
  if (err) {
    return console.log('ERROR', err)
  }

  console.log(`server listening on ${address}`)
})