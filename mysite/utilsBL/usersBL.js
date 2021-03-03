const userDAL = require('../DAL/usersDAL')
var dateFormat = require('dateformat');

//Validation if user exist
exports.validateUser = async function(user,pass){
    let data = await userDAL.getAllUsers();
    let valid = data.filter(x=> x.username == user && x.password ==pass);
    return(valid) 
}

// Get a list of all user data
exports.getAllUsersData = async function(){
    let usersData = await userDAL.getAllUsers();
    return(usersData)
}

// Delete a user from out data
exports.deleteUser = async function(idd){
    let usersData = await userDAL.getAllUsers();
    let allUsers = await usersData.filter(x=>x.id != idd)
    let d = {users : allUsers}
    let result = await userDAL.deleteUserJSON(d);
    return result;
}

exports.getUserById = async function(idd){
    let usersData = await userDAL.getAllUsers();    
    let user = await usersData.filter(x=>x.id == idd)
    console.log(user[0])
    return user[0]
}

exports.updateUsers = async function(idd,name,pwd,txid){
    let allUsersData = await userDAL.getAllUsers();
    let userBeforeChange = await allUsersData.filter(x=>x.id == idd)
    let allExceptOne = await allUsersData.filter(x=>x.id != idd)
    let userAfterChange ={
        id: idd,
        username: name,
        password: pwd,
        creatdData: userBeforeChange.creatdData,
        numOfTransaction: txid,
        isAdmin: userBeforeChange.isAdmin
    }
    let d = {users : allExceptOne}
    let results = await userDAL.updateUserJSON(userAfterChange, d)
    return results
}

//Add new user to our data
exports.addNewUserJson = async function(user, pass){
    let data = await userDAL.getAllUsers();
    let count = 1
    let currentDate = dateFormat(new Date(), "yyy-mm-dd h:MM:ss");
    let lastID = await data.filter(element => {
        if(count> element.id){
            return element
        }
        else {
            count +=1
        }
    });

    let userData = {
        id: count,
        username: user,
        password: pass,
        createData: currentDate,
        numOfTransaction: 5,
        isAdmin: false
    }
    let result = await userDAL.createNewUser(userData);
    return result;
}

