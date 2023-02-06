async function validateName(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
}

async function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number') {
    return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (age % 1 !== 0) {
    return res.status(400).json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
}

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;

async function validateWatchedAt(req, res, next) {
  const { talk } = req.body;
  const { watchedAt } = talk;

  if (!watchedAt) {
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
}

async function validateRate(req, res, next) {
  const { talk } = req.body;
  const { rate } = talk;

  if (!rate) {
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate > 5 && rate % 1 !== 0) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
}

async function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
}

module.exports = {
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
};
