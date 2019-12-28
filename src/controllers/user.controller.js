const postgres = require("../config/db.config");


const getUsers = async (req, res) => {
    const response =  await postgres.query('SELECT * FROM users ORDER BY ldid ASC');
 //    res.status(200).json(response.rows);
 //    console.log(response.rows);
       res.status(200).json({
           result: true,
           statusCode:200,
           message: 'get user sucessfully',
           body:{
               user: response.rows
           }
       })
 };
 

 module.exports = {
     getUsers
 }