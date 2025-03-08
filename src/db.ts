import Datastore from 'nedb';
import { join } from 'path';

// Define data structure
type Appointment = {
  id: string;
  userId: string;
  name: string;
  date: string;
};

// Initialize NeDB
const db = new Datastore<Appointment>( {
  filename: join( __dirname, 'db.db' ), // Persistent storage
  autoload: true, // Automatically loads database
} );

export const saveAppointment = async ( userId: string, name: string, date: string ): Promise<Appointment> => {
  return new Promise( ( resolve, reject ) => {
    const newAppointment: Appointment = { id: Date.now().toString(), userId, name, date };

    db.insert( newAppointment, ( err: Error | null, doc: Appointment | undefined ) => {
      if ( err ) reject( err );
      else if ( doc ) resolve( doc );
      else reject( new Error( 'Unknown error while saving appointment' ) );
    } );
  } );
};

export const getAppointments = async (): Promise<Appointment[]> => {
  return new Promise( ( resolve, reject ) => {
    db.find( {}, ( err: Error | null, docs: Appointment[] ) => {
      if ( err ) reject( err );
      else resolve( docs );
    } );
  } );
};
