const movieDAL = require('../DAL/moviesDAL')

// add new movie --> connected with usersDAL
exports.createMovie = async function(name, language, geners)
{
    //build json with the neccasry details 
    let movieData = {
        'Name': name, 
        'Language': language, 
        'Generes': geners}
    
    try{
        let readFile = await movieDAL.readFileMoies();
        console.log(readFile)

        let newData = [readFile['Movies'], movieData];
        // let newDataS = {"Movie": newData}
        console.log(newData)
        
        let results = await movieDAL.addNewMovie(newData)
        return(results)
    }
    catch(err){
        let results = await movieDAL.addNewMovie({"Movies" : movieData})
        return(results)
    }

}