
// creating own module 

module.exports.getDate = function() {
    let options ={
        weekday : "long",
        
        day : "2-digit",
        month : "long"
    }
    let today = new Date();
    
    let day = today.toLocaleDateString("en-US",options);

    return day;

}

module.exports.getDay = function () {
    let options = {
        weekday : "long",
    }
    let today = new Date();
    
    let day = today.toLocaleDateString("en-US",options);

    return day;
    
}



