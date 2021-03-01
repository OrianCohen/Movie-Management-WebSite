const userDAL = require('../DAL/usersDAL')

exports.validateUser = async function(user,pass){

    let data = await userDAL.getAllUsers();
    let valid = data.filter(x=> x.username == user && x.password ==pass);
    return(valid) 
}
