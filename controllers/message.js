const express = require('express');
const bcrypt = require('bcrypt');
const messageRouter = express.Router();
const Message = require('../models/message.js');
const User = require('../models/user.js');

messageRouter.get('/:id', async (req, res) => {
    await Message.find({}, (error, allMessage) => {
        res.render('chat/show.ejs', {
            message: allMessage,
            currentUser: req.session.currentUser
        })
    })
})

messageRouter.get('/:id', (req, res) => {
    let user = req.params.user
    Message.find({name: user},(err, messages)=> {
      res.send(messages);
    })
  })

messageRouter.get('/:id', async (req, res) => {
    await Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })

messageRouter.post('/:id', async (req, res) => {
    try{
        let message = new Message(req.body);
  
      let savedMessage = await message.save()
        console.log('saved');
  
      let censored = await Message.findOne({message:'badword'});
        if(censored)
          await Message.remove({_id: censored.id})
        else
          io.emit('message', req.body);
        res.sendStatus(200);
    }
    catch (error){
      res.sendStatus(500);
      return console.log('error',error);
    }
    finally{
      console.log('Message Posted')
    }
  
  })


module.exports = messageRouter;