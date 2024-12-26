// src/config/db.ts
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Product from '../models/Product.model.ts'; 
import { __dirname } from './pathUtils.ts'; // Import __dirname from the utility file

// Load environment variables
dotenv.config();

// Configure Sequelize
const db = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres', // Or your chosen dialect (postgres, sqlite, etc.)
  models: [Product], // Register models directly
  logging: false,    // Disable logging if not needed
});

// Sync the database
export const connectDB = async () => {
  try {
    await db.sync(); // Wait for the database sync to complete
    console.log('Connected to the database'); // Log success message
  } catch (error) {
    console.error('Error connecting to the database:', error); // Log error message
  }
};
// Export the database connection
export default db;
