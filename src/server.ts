import app from './app'
import { startDatabase } from './database'

const PORT: Number = parseInt(process.env.PORT!) || 3000

app.listen(PORT, async () => {
    await startDatabase()
    console.log(`App running on port ${PORT}.`)
})
