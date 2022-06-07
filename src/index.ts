import express from 'express'
const app = express()
const port = process.env.PORT || 3003

const normalResponse = {
    msg: 'App running.'
}
const exceptionalResponse= {
    msg: 'Wow! you\'re a deep digger'
}
app.use('/', (req, res) => {
    res.json(normalResponse)
})

app.use('*', (req, res) => {
    
    res.json(exceptionalResponse)
})

app.listen(port, () => {
    console.info(port)
})