import express from 'express'

const app = express()

app.use(express.json())

import createRouter from './routes/create-user.js'
import readRouter from './routes/read-user.js'
import updateRouter from './routes/update-user.js'
import deleteRouter from './routes/delete-user.js'

app.use('/create-user', createRouter)
app.use('/read-user', readRouter)
app.use('/update-user', updateRouter)
app.use('/delete-user', deleteRouter)


const PORT = 3000

app.listen(PORT, () => {
  console.log(`APP running on port ${PORT}`)
})