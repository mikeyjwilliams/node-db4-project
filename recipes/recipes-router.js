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

/**
 *  api/recipes/:id/ingredients
 */

router.post('/:id/ingredients', async (req, res, next) => {
  const recipe_id = req.params.id;

  const { ingredient_name, quantity } = req.body;
  if (!ingredient_name) {
    res.status(400).json({ message: 'ingredient_name required' });
  }
  if (!quantity) {
    res.status(400).json({ message: 'quantity required' });
  }
  const ing = {
    ingredient_name: ingredient_name,
  };

  try {
    const ingred = await recipeModel.postIngredientRecipe(
      recipe_id,
      ing,
      quantity
    );
    res.status(201).json(ingred);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
