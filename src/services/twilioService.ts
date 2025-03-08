import { twiml } from "twilio";
import { sessionStore, Session } from './sessionStore';
import { saveAppointment, getAppointments } from '../db';
import { isValid, parseISO, format } from 'date-fns';

const { MessagingResponse } = twiml;

export const receiveMessage = async ( from: string, message: string ) => {
  const response = new MessagingResponse();
  let session: Session = sessionStore.get( from ) || { step: 'init' };

  console.log( `Current Step: ${session.step}` );

  switch ( session.step ) {
    case 'init':
      if ( message.toLowerCase().includes( 'book' ) ) {
        console.log( 'User wants to book an appointment.' );

        session = { step: 'name' };
        sessionStore.set( from, session );

        response.message( 'Sure! What is your **Name**?' );
      } else if ( message.toLowerCase() === 'list' ) {
        console.log( 'User requested appointment list.' );

        const appointments = await getAppointments();
        if ( appointments.length === 0 ) {
          response.message( "No appointments found." );
        } else {
          const list = appointments.map( a => `${a.name} - ${a.date}` ).join( "\n" );
          response.message( `📅 Your Appointments:\n${list}` );
        }
      } else {
        response.message( 'Welcome to *BOYLOSO Booking Bot!* Reply with **Book** to schedule an appointment or **List** to see your bookings.' );
      }
      break;

    case 'name':
      session = { ...session, name: message, step: 'date' };
      sessionStore.set( from, session );
      response.message( `Thanks ${session.name}! Please provide your appointment **Date (YYYY-MM-DD)**.` );
      break;

    case 'date':
      if ( isValid( parseISO( message ) ) ) {
        session = { ...session, date: message, step: 'confirm' };
        sessionStore.set( from, session );
        response.message( `Great! You want to book on **${format( parseISO( message ), 'MMMM do, yyyy' )}**. Reply **Yes** to confirm or **No** to cancel.` );
      } else {
        response.message( 'Invalid date format! Please provide a date in **YYYY-MM-DD** format.' );
      }
      break;

    case 'confirm':
      if ( message.toLowerCase() === 'yes' ) {
        await saveAppointment( from, session.name!, session.date! );
        response.message( `✅ Your appointment is confirmed for **${session.date}** under the name **${session.name}**. Thank you!` );
        sessionStore.del( from );
      } else if ( message.toLowerCase() === 'no' ) {
        response.message( 'Booking cancelled! Start again by replying **Book**.' );
        sessionStore.del( from );
      } else {
        response.message( 'Invalid response! Reply **Yes** to confirm or **No** to cancel.' );
      }
      break;

    default:
      response.message( 'Sorry, I didn\'t understand that. Reply **Book** to start the booking process or **List** to see your bookings.' );
      break;
  }

  // ✅ Debugging: Log TwiML Response
  console.log( "Generated TwiML:", response.toString() );

  return response.toString();
};
