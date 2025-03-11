import Ticket from '../models/ticketModel.js';

class TicketController {
  async createTicket(req, res) {
    const { amount, purchaser } = req.body;
    try {
      const newTicket = await Ticket.create({ amount, purchaser });
      res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.status(500).json({ message: 'Error creating ticket', error });
    }
  }

}

export default TicketController;