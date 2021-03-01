const movieDAL = require('../DAL/moviesDAL')

// add new movie --> connected with movieDAL
exports.createMovie = async function(name, language, geners)
{

    //build an object
    let  movieData = {
        Name: name, 
        Language: language, 
        Generes: geners}

        console.log(movieData)

        // Add the new OBJ movieData to newMovies.json file
        let result = await movieDAL.addNewMovie(movieData)
        return result
}

// Get all movies data from json file
exports.searchMovieJsonFile = async function(){
    try{
        let readFile = await movieDAL.readFileMoies()
        return(readFile)
    }
    catch(err){
        return(err)
    }

}

// Get all movies data from REST API (web services)
exports.searchMovieRestApiUtil = async function(nameSearchMovie,languageSearch,genreSearch){
    let resp1 = await movieDAL.searchMovieRestApi();
    let MoviesData = resp1.data;
    let finalData2 = await MoviesData.filter(x=> x.name == nameSearchMovie && x.language == languageSearch)
    let getAllDataGenrs = await MoviesData.filter(function(element){
        element.geners.forEach(x => {
            if(x == genreSearch)
                return element
        });
    })
    // console.log('testing')
    // console.log(finalData2)
    // console.log(getAllDataGenrs)

    console.log('testing')
    console.log(finalData2)
    console.log('testing')

    console.log(getAllDataGenrs)
    return resp1
    // try{
    //     let moviesAPI = await movieDAL.searchMovieRestApi()
    //     return(moviesAPI)
    // }
    // catch(err){
    //     return(err)
    // }

}




// exports.getLastId = async function(){
//     try{
//         let data = await movieDAL.readFileMoies()
//         console.log(data)
//         let current = filtered = data.filter((_, index) =>{
//             index >= data.length 
//         })
//         return current
//     }
//     catch(err){
//         return 1;
//     }
// }
