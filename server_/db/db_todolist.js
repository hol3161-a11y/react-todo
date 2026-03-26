const { MongoClient } = require('mongodb');
//const url = "mongodb+srv://hol3161_db_user:lee0529!!@cluster0.coeapgh.mongodb.net/?appName=Cluster0";
const url = "mongodb://hol3161_db_user:lee0529!!@ac-h9jgbgm-shard-00-00.coeapgh.mongodb.net:27017,ac-h9jgbgm-shard-00-01.coeapgh.mongodb.net:27017,ac-h9jgbgm-shard-00-02.coeapgh.mongodb.net:27017/?ssl=true&replicaSet=atlas-rqjc13-shard-0&authSource=admin&appName=Cluster0"
const client = new MongoClient(url);

let db;
async function connectDB() {
    try {
        await client.connect(); //몽고접속
        db = client.db('todolist'); //프로젝트db 활성화
        console.log('접속완료');
    }
    catch (err) {
        console.error(err)
     }


}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };