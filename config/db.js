var mongoose = require("mongoose");

module.exports = {
    connect : connect
};

function connect(conn, cb){
    mongoose.connect(conn);
    mongoose.connection.once("open", function(){
      //console.log("i am connected");
      cb();
    });
};