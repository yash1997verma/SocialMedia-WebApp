const mongoose = require('mongoose');

async function main() {
  try {
    // for atlas server
    await mongoose.connect('mongodb+srv://root:root@yashdb.ptmfvsc.mongodb.net/'); 
    // for local mongoDB server
    // await mongoose.connect('mongodb://127.0.0.1:27017/'); 
    
    console.log("DB connected");
   
  } catch (error) {
    console.log(`Error connecting to DB ${error}`);
    
  }
}

main();