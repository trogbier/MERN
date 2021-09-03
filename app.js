const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const PORT = config.get('port') || 5000
const URLMongoose = config.get('URLMongoose')
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routs/auth.routes'))
app.use('/api/link', require('./routs/link.routes'))
app.use('/t', require('./routs/redirect.routs'))
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect(URLMongoose)
        app.listen(PORT, () => console.log(`app has been started... ${PORT}`))
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()

