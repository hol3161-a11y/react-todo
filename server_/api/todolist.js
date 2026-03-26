const express = require('express')
const { getDB } = require('../db/db_todolist.js');
const { ObjectId } = require('mongodb');

const todolist = express.Router(); // 페이지 분리




// todolist.get(); 클라이언트 요청시 처리할 함수

// http://localhost:4000/todo
todolist.get('/', async (req, res) => {
  const sort = req.query.sort;

  let filter;
  switch (sort) {
    case 'all': filter = {}; break;
    case 'true': filter = { isdone: true }; break;
    default : filter = { isdone: false }; 
  }


  console.log(10000);

  //실데이터가 들어 있는 클랙션 조회
  const data = await getDB().collection('todos').find(filter).toArray();

  res.send(data);


})


todolist.post('/', async (req, res) => {
  try {
    const result = await getDB().collection('todos').insertOne(req.body)
    const data = { ...req.body, _id: result.insertedId }
    res.send({ success: true, data })
  }


  catch (err) {
    res.send({ success: false, msg: err.message })

  }

})

todolist.put('/state', async (req, res) => {
  const { id } = req.query;


  try {

    const result = await getDB().collection('todos').updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.send({ success: true });
  }

  catch (err) {
    res.send({ success: false });
  }

})

todolist.delete('/', async (req, res) => {
  const { id } = req.query
  console.log(id);

  try {

    const result = await getDB().collection('todos').deleteOne({ _id: new ObjectId(id) });
    res.send({ success: true });


  }
  catch (err) {
    res.send({ success: false });
  }

})




todolist.put('/state', async (req, res) => {
  const { id } = req.query;
  const { isdone } = req.body;
  console.log(id, isdone)


  try {

    const result = await getDB().collection('todos').updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.send({ success: true });


  }
  catch (err) {
    res.send({ success: false });
  }

})

module.exports = todolist;