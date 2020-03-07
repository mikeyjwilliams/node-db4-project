const express = require('express');
const router = express.Router();
const recipeModel = require('./recipes-model');

/**
 *! stretch goals accomplished after class.
 */

/**
 * @type GET
 * @route /api/recipes
 * @return []
 */
router.get('/', async (req, res, next) => {
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
router.get('/:id/shoppingList', async (req, res, next) => {
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

/**
 * @type: GET
 * @route /api/recipes/:id/instructions
 * @return []
 */
router.get('/:id/instructions', async (req, res, next) => {
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

/**
 *! Extra route added *not* in requirements for *MVP*.
 * @type POST
 * @route /api/recipes
 * @return {}
 */
router.post('/', async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'recipe_name is required' });
  }
  const recipe = {
    name: name,
  };
  try {
    const recipePost = await recipeModel.postRecipe(recipe);
    res.status(201).json(recipePost);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
