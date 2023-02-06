const fs = require('fs').promises;
const path = require('path');

const fileName = 'talker.json';
const filePath = path.join(__dirname, fileName);

const readTalkers = async () => {
    const talkers = await fs.readFile(filePath);
    return JSON.parse(talkers);
};

module.exports = {
  readTalkers,
};