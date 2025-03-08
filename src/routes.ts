import express from 'express';
import { receiveMessage } from './services/twilioService';

const router = express.Router();

router.post( '/webhook', async ( req, res ) => {
  const { From, Body } = req.body;
  const response = await receiveMessage( From, Body );

  res.set( 'Content-Type', 'text/xml' );
  res.send( response );
} );

export default router;