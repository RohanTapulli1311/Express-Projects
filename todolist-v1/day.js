exports.getDate = function() {  
    const today = new Date()
    //    dayList = ["monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    //    dayType = ""
    //    day = ""
    
    const options = {
        weekday : "long",
        day: "numeric",
        month : "long"
    }
    
     const day  = today.toLocaleDateString("en-US",options)
    
    //    if(today.getDay() === 6|| today.getDay() === 7){
    //        dayType = "weekend"
    //        day = dayList[today.getDay()]
    //    }
    //    else{
    //         dayType = "weekday"
    //        day = dayList[today.getDay()]
      
    //    }
    return day;
}
exports.getDay = function () { 
    const today = new Date()
    
    const options = {
        weekday : "long",
   
    }
    
     return today.toLocaleDateString("en-US",options)


 }