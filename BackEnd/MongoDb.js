const mongodb=require('mongodb')

// const connectionUrl = "mongodb+srv://devanshkhetan9:eGujuNNcNbF2UZda@cluster0.iamg6.mongodb.net/NoteGo?retryWrites=true&w=majority";
const connectionUrl = "mongodb://localhost:27017/GoogleDrive"
const client=new mongodb.MongoClient(connectionUrl)

var db;

try{
    
    client.connect();
    console.log("Connected to Mongodb")
    db=client.db()
}

catch(err)
{
    console.log(err)
}

module.exports=db