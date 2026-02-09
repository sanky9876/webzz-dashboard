
const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function approveUsers() {
  try {
    await client.connect();

    // Approve all users and make them admins for now so the user can test
    const result = await client.query(`
      UPDATE users 
      SET approved = TRUE, role = 'admin' 
      WHERE approved = FALSE
      RETURNING email, role, approved;
    `);

    if (result.rowCount > 0) {
      console.log('Successfully approved the following users:');
      result.rows.forEach(row => {
        console.log(`- ${row.email}: Role=${row.role}, Approved=${row.approved}`);
      });
    } else {
      console.log('No pending users found.');
    }

  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

approveUsers();
