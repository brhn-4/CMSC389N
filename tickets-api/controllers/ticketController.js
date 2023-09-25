// Define all of your ticket controller methods in this file that
// will be used as callbacks to your endpoints

const ticket = require('../models/ticket');

exports.getTicketList = function(req,res){
    ticket.find({},(err,tickets)=>{
        if(err){
            res.status(500).send('getTicketList Error Caught');
        }else{
            res.json(tickets)
        }     
    })
};

exports.createTicket = function (req,res){
    let tick = new ticket(req.body); //could be wrong catch of err

    tick.save(err=>{
        if(err){
            res.status(500).send(err);
        }else{ 
            res.status(201).json(tick);
        }
    })

   
};

exports.getTicket = function(req,res){
    ticket.findById(req.params.id,(err,tick)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(tick);
        }
    })
};


exports.updateTicket = function(req,res){
    ticket.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true}, function(err,result){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).json(result);
        }
    });
};


exports.deleteTicket = function(req,res){
    ticket.findById(req.params.id,(err1,tick)=>{
        if(err1){
            res.status(500).send(err2);
        }else{
            tick.remove(err2 =>{
                if(err2){
                    res.status(500).send(err2);
                }else{
                    res.status(204).send('ticket deleted');
                }
            })
        }
    })
};

