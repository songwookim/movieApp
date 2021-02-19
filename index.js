const express = require('express')
 // expresss 모듈을 node_modules로 부터 갖고 온다.
const app = express()
const port = 5000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://songwoo:dkapflzksh@cluster0.dvolc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then( ()=> console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))
 // '/'에 오면 'Hello World' 출력
 app.listen(port, () => console.log(`Example app listening on port ${port}`))
