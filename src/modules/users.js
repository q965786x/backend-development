const fs = require('fs');
const path = require('path');

const getUsers = () => {
    const filePath = path.join(__dirname, '../data/users.json')
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
}

module.exports = getUsers;