const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3003;
const baseUrl = `http://127.0.0.1:${port}`;

const server = http.createServer((request, response) => {
    const url = new URL(request.url, baseUrl);
    const searchParams = url.searchParams;
    
    if (searchParams.has('hello')) {
        const name = searchParams.get('hello');
        
        if (name && name.trim() !== '') {
            response.statusCode = 200;
            response.statusMessage = "OK";
            response.setHeader("Content-Type", "text/plain");
            response.write(`Hello, ${name}`);
            response.end();
        } else {
            response.statusCode = 400;
            response.statusMessage = "Bad Request";
            response.setHeader("Content-Type", "text/plain");
            response.write('Enter a name');
            response.end();
        }
    }     
    else if (searchParams.has('users')) {
        const filePath = path.join(__dirname, 'data/users.json');
        
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            response.statusCode = 200;
            response.statusMessage = "OK";
            response.setHeader("Content-Type", "application/json");
            response.write(data);
            response.end();
        } catch (error) {
            response.statusCode = 500;
            response.statusMessage = "Internal Server Error";
            response.setHeader("Content-Type", "text/plain");
            response.write('Error reading users data');
            response.end();
        }
    }    
    else if (Array.from(searchParams.keys()).length === 0) {
        response.statusCode = 200;
        response.statusMessage = "OK";
        response.setHeader("Content-Type", "text/plain");
        response.write("Hello World!");
        response.end();
    }     
    else {
        response.statusCode = 500;
        response.statusMessage = "Internal Server Error";
        response.setHeader("Content-Type", "text/plain");
        response.end();
    }
});

server.listen(port, () => {
    console.log(`Сервер запущен на ${baseUrl}`);
});