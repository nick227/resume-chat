require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'resume-chat',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test and initialize database connection
const initializeDatabase = async() => {
    try {
        // First try to connect without database to check if it exists
        const tempPool = mysql.createPool({
            ...dbConfig,
            database: undefined
        });

        // Check if database exists
        const [rows] = await tempPool.query(
            'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', [dbConfig.database]
        );

        if (rows.length === 0) {
            // Create database if it doesn't exist - using backticks for database name
            await tempPool.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
        }

        // Close temporary connection
        await tempPool.end();

        // Test connection with the actual database
        const connection = await pool.getConnection();

        // Create tables if they don't exist
        await connection.query(`
            CREATE TABLE IF NOT EXISTS chat_messages (
                id BIGINT PRIMARY KEY AUTO_INCREMENT,
                user_id VARCHAR(255) NOT NULL,
                session_id VARCHAR(255) NOT NULL DEFAULT 'default-session',
                message TEXT NOT NULL,
                role ENUM('user', 'assistant', 'system') NOT NULL DEFAULT 'user',
                model VARCHAR(100) NOT NULL DEFAULT 'unknown',
                tokens INT NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_user_id (user_id),
                INDEX idx_session_id (session_id),
                INDEX idx_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        const [columnRows] = await connection.query(
            `
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = ?
              AND TABLE_NAME = 'chat_messages'
            `,
            [dbConfig.database]
        );

        const existingColumns = new Set(columnRows.map((row) => row.COLUMN_NAME));
        const pendingColumnAdds = [];

        if (!existingColumns.has('session_id')) {
            pendingColumnAdds.push(
                "ALTER TABLE chat_messages ADD COLUMN session_id VARCHAR(255) NOT NULL DEFAULT 'default-session'"
            );
        }

        if (!existingColumns.has('model')) {
            pendingColumnAdds.push(
                "ALTER TABLE chat_messages ADD COLUMN model VARCHAR(100) NOT NULL DEFAULT 'unknown'"
            );
        }

        if (!existingColumns.has('tokens')) {
            pendingColumnAdds.push(
                'ALTER TABLE chat_messages ADD COLUMN tokens INT NOT NULL DEFAULT 0'
            );
        }

        for (const alterStatement of pendingColumnAdds) {
            await connection.query(alterStatement);
        }
        connection.release();

    } catch (err) {
        console.error('Database initialization error:', err);
        process.exit(1); // Exit if we can't connect to database
    }
};

// Initialize the database
initializeDatabase();

module.exports = pool;