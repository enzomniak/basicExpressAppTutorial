const EventEmitter = require("events");

//Create a child class of EventEmitter
class Logger extends EventEmitter {
    //Create new method
    log(msg) {
        //The message that passed in will be log
        console.log(msg);
    
        //Then an event will be riase
        //Since this class (Logger) inherit from EventEmitter we can use the "this" to get the method we want
        this.emit("Log_msg", {id: 1, url: "http://something.com"});
    }
}

//Export the child class
module.exports = Logger;

// var url = "http://test.com";