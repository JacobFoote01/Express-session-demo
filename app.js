import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'

const app = express()
const PORT = 7676

app.use(express.urlencoded({extended: false}))
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "shhhh it's a secret"
}))

nunjucks.configure('views', {
    autoescape: true,
    express: app,
})

//routes
app.get('/', (req, res) => {

    if (req.session.username){
        res.render('index.html', {username: req.session.username})
    } else {
        res.render('index.html')
    }
})

app.get('/profile', (req, res) => {
    res.render('profile.html')
})

app.post('/login', (req, res) => {
    const {username, password} = req.body
    req.session.username = username
    req.session.password = password
    res.redirect('/')
})


//listen
app.listen(PORT, () => console.log(`Listening on https://localhost:${PORT}`))

