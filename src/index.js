
const express = require('express');
const app = express();

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header('Acess-Control-Allow-Methods', 'PUT','POST','PATCH', 'DELETE','GET')
        return res.status(200).json({})
    }
    next();
});

// Route 
app.use(require('./routes/user'));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(3000);
console.log('Server on port 3000');