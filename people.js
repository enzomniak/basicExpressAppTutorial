//First object
const people = ["Jack", "Marcus", "John", "Tony", "George"];

//Second object
function logger(x){
    console.log(x);
}

//Run when import this module
logger(people); 

//The key: value pair are done behind the scene
//So, we can just type in the key of all objects we want to export
module.exports = {
    people, logger
};

