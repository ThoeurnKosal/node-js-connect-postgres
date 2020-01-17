const postgres = require("../config/db.config");


const getUsers = async (req, res) => {
    const response =  await postgres.query('SELECT * FROM account ORDER BY id ASC');
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

 const getUserById = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await postgres.query('SELECT * FROM account WHERE id = $1' , [id]);
        // res.send('User ID ' + req.params.id);
        // res.json(response.rows);
        res.json({
            result : true,
            statusCode: 200,
            body:{
                user: response.rows
            }
        })
    } catch(error){
        res.json({
            result: false,
            statusCode: 404,
            message: `Can not get user`
        })
    };    
};

const createUser = async (req, res) => {
    try{
        const {username, password , email} = req.body;
        const response = await postgres.query('INSERT INTO account (username , password , email) VALUES ($1,$2,$3)', [username , password, email]);
        res.json({
            result: true,
            statusCode: 201,
            message: 'User was created suceesfully',
            body: {
                user: {username , password , email}
            }
        })
    }   
    catch(error){
        res.json({
            result: false,
            statusCode: 404,
            message: `User can not add`
        })
    };
};

const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const {username , password , email} = req.body;
        const response = await postgres.query('UPDATE account SET username = $1 , password = $2 , email = $3 WHERE id = $4', [
            username , password , email , id
        ]);

        console.log(id);
        // res.json('User Updated Successfully');

        res.json({
            result: true,
            statusCode: 200,
            message: `User ${id} was updated sucessfully`,
            body:{
                user : {username , password , email}
            }
        })

    } catch(error){
        res.json({
            result: false,
            statusCode: 404,
            message: `User can not update`
        })
    };
};



const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await postgres.query('DELETE FROM account WHERE id = $1', [id]);
        // console.log(response);
        // res.json(`User ${ldid} was deleted sucessfully`);
        // res.send('USER DELETED ' + req.params.ldid);
        res.json({
            result: true,
            statusCode: 200,
            message: `User ${id} was deleted sucessfully.`
        })
    } catch(error){
        res.json({
            result: false,
            statusCode: 404,
            message: `User can not delete.`
        })
    }
};

 

 module.exports = {
     getUsers,
     getUserById,
     createUser,
     updateUser,
     deleteUser
 }