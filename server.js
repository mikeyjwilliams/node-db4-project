const express = require('express');
const helmet = require('helmet');
const recipesRouter = require('./recipes/recipes-router');
const router = express();

router.use(helmet());
router.use(express.json());

router.get('/', (req, res) => {
  res.send('recipe book is up and running');
});

router.use('/', recipesRouter);

router.use((req, res) => {
  res
    .status(404)
    .json({ message: '404 sorry we hit the fail whale, page not found' });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: 'internal server error' });
});

module.exports = router;
