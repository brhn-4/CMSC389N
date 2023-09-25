// define routes for the ticket model in this file
const express = require('express');
const ticketRouter = express.Router();


const ticketController = require('../../../controllers/ticketController');


ticketRouter.route('/')
    .get(ticketController.getTicketList) 
    .post(ticketController.createTicket);


ticketRouter.route('/:id')
    .get(ticketController.getTicket)
    .put(ticketController.updateTicket)
    .delete(ticketController.deleteTicket);
    


module.exports = ticketRouter;


