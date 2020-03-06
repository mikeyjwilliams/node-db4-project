const express = require('express');
const router = express.Router();
const recipeModel = require('./recipes-model');

/**
 * @type GET
 * @route /api/recipes
 * @return []
 */
router.get('/api/recipes', async (req, res, next) => {
  try {
    const recipes = await recipeModel.getRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
});

/**
 * @type: GET
 * @route /api/recipes/:id/shoppingList
 * @return []
 */
router.get('/api/recipes/:id/shoppingList', async (req, res, next) => {
  const { id } = req.params;
  try {
    const shoppingList = await recipeModel.getShoppingList(id);
    if (shoppingList) {
      res.status(200).json(shoppingList);
    } else {
      res
        .status(400)
        .json({ message: 'recipe ID not found for shopping list.' });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/api/recipes/:id/instructions', async (req, res, next) => {
  const { id } = req.params;
  try {
    const instructions = await recipeModel.getInstructions(id);
    if (instructions) {
      res.status(200).json(instructions);
    } else {
      res.status(400).json({ message: 'recipe ID for instructions not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
