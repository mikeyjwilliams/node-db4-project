const express = require('express');
const router = express.Router();
const recipeModel = require('./recipes-model');

router.get('/api/recipes', async (req, res, next) => {
  try {
    const recipes = await recipeModel.getRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
