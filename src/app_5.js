
import { createServer } from 'http';
import { resolve } from 'path';
import { existsSync, mkdirSync, appendFileSync } from 'fs';


import pkg from 'pg';

const { Client } = pkg;

const logsDir = 'logs';
const logsPath = resolve('./logs');
if (!existsSync(logsPath)) {
    mkdirSync(logsDir, {recursive: true});
}
const instanceId = process.env.INSTANCE_ID || 'unknown';
const file = `access-log-${instanceId}.log`;
const logFilePath = resolve(logsPath, file);
const port = process.env.PORT || 3000;

if (!port) {
    throw new Error('PORT variable not set!');
}
const createdAt = new Date();
const server = createServer((req, res) => {
    const logMessage = `${new Date().toISOString()}: request to instance ${instanceId}\n`;
    appendFileSync(logFilePath, logMessage);
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World from instance ${instanceId}, started at ${createdAt.toISOString()}`);

});
server.listen(port, () => {
    console.log(`Server ${instanceId} running at http://localhost:${port}/`);
});

const client = new Client({
    host: 'postgres_db',
    port: 5432,
    database: 'mydb',
    user: 'admin',
    password: 'postgres'
});

async function testDatabase() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');

        // Создаем таблицу
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Вставляем тестовые данные
        await client.query(`
            INSERT INTO users (name, email) 
            VALUES 
            ('John Doe', 'john@example.com'),
            ('Jane Smith', 'jane@example.com')
            ON CONFLICT DO NOTHING
        `);

        // Читаем данные
        const result = await client.query('SELECT * FROM users');
        console.log('Users in database:');
        result.rows.forEach(user => {
            console.log(`- ${user.name} (${user.email})`);
        });

        await client.end();
    } catch (error) {
        console.error('Database error:', error);
    }
}

testDatabase();
