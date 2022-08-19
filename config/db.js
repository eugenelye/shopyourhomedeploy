const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://eugenelye:eugene546933@shopyourhome.jgaln0l.mongodb.net/shopyourhome?retryWrites=true&w=majority" , {useNewUrlParser: true});
    mongoose.connection.once('open', function(){
    console.log('Conection has been made!');
        }).on('error', function(error){
     console.log('Error is: ', error);
      });
    console.log("DB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
