const fs = require('fs').promises;
const path = require('path');

const fileName = 'talker.json';
const filePath = path.join(__dirname, fileName);

const readTalkers = async () => {
  const talkers = await fs.readFile(filePath);
  return JSON.parse(talkers);
};

const readTalkersById = async (id) => {
  const talkers = await fs.readFile(filePath);
  const parsedTalkers = JSON.parse(talkers);
  const getById = parsedTalkers.find((talker) => talker.id === id);
  return getById;
};

const writeTalkers = async (talkers) => {
  const newTalkers = await fs.writeFile(filePath, JSON.stringify(talkers));
  return newTalkers;
};

module.exports = {
  readTalkers,
  readTalkersById,
  writeTalkers,
};