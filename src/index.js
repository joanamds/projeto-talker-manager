const express = require('express');
const fsUtils = require('./fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
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

app.listen(PORT, () => {
  console.log('Online');
});
