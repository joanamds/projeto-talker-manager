const express = require('express');
const crypto = require('crypto');
const fsUtils = require('./fsUtils');

const validateLogin = require('./middlewares/validateLogin');
const validateToken = require('./middlewares/validateToken');
const { validateAge,
  validateTalk,
  validateName,
  validateWatchedAt,
  validateRate,
  validateNumber } = require('./middlewares/validateTalker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await fsUtils.readTalkers();
  const results = talkers.filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase()));
  if (results.length === 0) {
    res.status(200).send([]);
  }
  res.status(200).send(results);
});

app.get('/talker', async (req, res) => {
  const talkersList = await fsUtils.readTalkers();
  if (!talkersList) {
    return res.status(200).send([]);
  }
  return res.status(200).send(talkersList);
});

app.get('/talker/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talker = await fsUtils.readTalkersById(id);
  if (talker) {
    return res.status(200).send(talker);
  } 
  return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(16).toString('hex').slice(0, 16);
  const newLogin = { email, password };
  return res.status(200).json({ newLogin, token });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateNumber, async (req, res) => {
    const talkers = await fsUtils.readTalkers();
    const lastId = talkers.length;
    const newTalker = { id: lastId + 1, ...req.body };
    talkers.push(newTalker);
    await fsUtils.writeTalkers(talkers);
  res.status(201).json(newTalker);
});

app.put('/talker/:id', validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateNumber, async (req, res) => {
    const talkerId = Number(req.params.id);
    const editedTalker = req.body;
    const talkers = await fsUtils.readTalkers();
    const index = talkers.findIndex((talker) => talker.id === talkerId);
    const updatedTalker = { id: talkerId, ...editedTalker };
    talkers.splice(index, 1, updatedTalker);
    await fsUtils.writeTalkers(talkers);
    res.status(200).send(updatedTalker);
});
  
app.delete('/talker/:id', validateToken, async (req, res) => {
  const talkerId = Number(req.params.id);
  const talkers = await fsUtils.readTalkers();
  const updatedTalkers = talkers.filter((talker) => talker.id !== talkerId);
  await fsUtils.writeTalkers(updatedTalkers);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log('Online');
});
