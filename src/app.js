const express = require('express')

require('../db/mongoose')
const Test = require('../models/test') // optional
const testRouter = require('../routers/test')

const port = process.env.PORT

// express app
const app = express()

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
})

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// web server
app.get('/', async (req, res) => {
    try {
        const tests = await Test.find({})
        res.render('index', { title: 'title', tests });
    } catch (error) {
        res.render('index', {title: 'title', tests: []})
    }
})

app.get('/formulario', (req, res) => {
  res.render('formulario', { title: 'Crear test' });
});


// api's
app.use(express.json())
app.use('/api', testRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})