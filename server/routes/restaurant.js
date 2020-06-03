const router = require('express').Router();
const auth = require('../middleware/auth');
const Restaurant = require('../models/Restaurant');
const { canAdd, canEdit, canDelete } = require('../permissions/restaurant');
const { addValidation, editValidation } = require('../validation/restaurant');

router.get('/', auth, async ({ query, user }, res) => {
  let filter = {};

  if (query.minRating) {
    filter.rating = { $gte: query.minRating };
  }
  if (Number(query.own)) {
    filter.ownerId = user._id;
  }

  try {
    const restaurants = await Restaurant.find(filter, null, { sort: { rating: -1 } });

    res.json(restaurants);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', auth, findById, (req, res) => {
  res.json(res.restaurant);
});

router.post('/', auth, authPost, async ({ body, user }, res) => {
  const { error } = addValidation(body);

  if (error) {
    return res.status(400).send(error?.details[0]?.message);
  }

  const restaurant = new Restaurant({
    name: body.name,
    ownerId: user._id,
  });

  try {
    const newRestaurant = await restaurant.save();

    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch('/:id', auth, findById, authPatch, async ({ body }, res) => {
  const { error } = editValidation(body);

  if (error) {
    return res.status(400).send(error?.details[0]?.message);
  }

  res.restaurant.name = body.name;

  try {
    const updatedRestaurant = await res.restaurant.save();

    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', auth, findById, authDelete, async (req, res) => {
  try {
    const removedRestaurant = await res.restaurant.remove();

    res.json(removedRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////

async function findById({ params }, res, next) {
  try {
    const restaurant = await Restaurant.findById(params.id);

    if (!restaurant) {
      return res.status(404).send(`Restaurant ${params.id} not found`);
    }

    res.restaurant = restaurant;
  } catch (err) {
    res.status(500).json(err);
  }

  next();
}

async function authPost(req, res, next) {
  if (!canAdd(req.user)) {
    return res.status(403).send(`Not allowed to add restaurant`);
  }
  next();
}

async function authPatch(req, res, next) {
  if (!canEdit(req.user, res.restaurant)) {
    return res.status(403).send(`Not allowed to edit restaurant ${res.restaurant.id}`);
  }
  next();
}

async function authDelete(req, res, next) {
  if (!canDelete(req.user, res.restaurant)) {
    return res.status(403).send(`Not allowed to delete restaurant ${res.restaurant.id}`);
  }
  next();
}

module.exports = router;
