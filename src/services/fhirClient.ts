// src/services/fhirClient.ts
import { oauth2 as SMART } from 'fhirclient';
import Client from 'fhirclient/lib/Client';

export const initializeClient = async (): Promise<Client> => {
    const storedClientState = localStorage.getItem('fhirClient');
    if (storedClientState) {
        // Restore client from stored state
        const state = JSON.parse(storedClientState);
        console.log('Restoring client from stored state:', state);
        const client = new Client(state, state);
        return Promise.resolve(client);
    }
    // Otherwise, initialize a new client
    console.log('Initializing new client...');
    return SMART.ready();
};
