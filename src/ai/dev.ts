import { config } from 'dotenv';
config();

// Import flows
import './flows/cv-cover-letter-generation';
import './flows/get-cv-cover-letter-improvements';

// This file serves as the entry point for genkit development mode
// Running `npm run genkit:dev` will start the development server
// Make sure to set up your MISTRAL_API_KEY in .env file