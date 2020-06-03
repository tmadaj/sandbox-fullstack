const router = require('express').Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');
const { canAdd, canAddReply, canEdit, canDelete } = require('../permissions/review');
const { addValidation, editValidation, addReplyValidation } = require('../validation/review');

router.get('/', auth, async ({ query, user }, res) => {
  let filter = {};

  if (query.restaurantId) {
    filter.restaurantId = query.restaurantId;
  }

  try {
    if (Number(query.pendingReply) && user.role === 'owner') {
      if (!filter.restaurantId) {
        const myRestaurants = await Restaurant.find({ ownerId: user._id }, '_id');
        const myRestaurantsIds = myRestaurants.map((r) => r._id);

        filter.restaurantId = { $in: myRestaurantsIds };
      }
      filter.reply = { $exists: false };
    }

    const reviews = await Review.find(filter);

    res.json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', auth, findReviewById, (req, res) => {
  res.json(res.review);
});

router.post('/', auth, authPost, findRestaurantById, async ({ body, user, restaurant }, res) => {
  const { error } = addValidation(body);

  if (error) {
    return res.status(400).send(error?.details[0]?.message);
  }

  const review = new Review({
    rating: body.rating,
    comment: body.comment,
    restaurantId: body.restaurantId,
    userId: user._id,
  });

  try {
    const newReview = await review.save();

    res.status(201).json(newReview);
    recalculateRestaurantRating(restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:id/reply', auth, findReviewById, authPostReply, async ({ body }, res) => {
  const { error } = addReplyValidation(body);

  if (error) {
    return res.status(400).send(error?.details[0]?.message);
  }

  res.review.reply = body.reply;

  try {
    const updatedReview = await res.review.save();

    res.json(updatedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch('/:id', auth, findReviewById, authPatch, async ({ body }, res) => {
  const { error } = editValidation(body);

  if (error) {
    return res.status(400).send(error?.details[0]?.message);
  }

  res.review.restaurantId = body.restaurantId;
  res.review.rating = body.rating;
  res.review.comment = body.comment;

  try {
    const updatedReview = await res.review.save();

    res.json(updatedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete(
  '/:id',
  auth,
  findReviewById,
  authDelete,
  findRestaurantById,
  async ({ restaurant }, res) => {
    try {
      const removedReview = await res.review.remove();

      res.json(removedReview);

      recalculateRestaurantRating(restaurant);
    } catch (err) {
      res.status(500).json(err);
    }
  },
);

////////////////////////////////////////////////////////////////////////////////

async function findReviewById({ params }, res, next) {
  try {
    const review = await Review.findById(params.id);

    if (!review) {
      return res.status(404).send(`Review ${params.id} not found`);
    }

    res.review = review;
  } catch (err) {
    res.status(500).json(err);
  }

  next();
}

async function findRestaurantById(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.body.restaurantId);

    if (!restaurant) {
      return res.status(404).send(`Restaurant ${req.body.restaurantId} not found`);
    }

    req.restaurant = restaurant;
  } catch (err) {
    return res.status(500).json(err);
  }

  next();
}

async function authPost(req, res, next) {
  if (!canAdd(req.user)) {
    return res.status(403).send(`Not allowed to add review`);
  }
  next();
}

async function authPatch(req, res, next) {
  if (!canEdit(req.user, res.review)) {
    return res.status(403).send(`Not allowed to edit review ${res.review.id}`);
  }
  next();
}

async function authDelete(req, res, next) {
  if (!canDelete(req.user, res.review)) {
    return res.status(403).send(`Not allowed to delete review ${res.review.id}`);
  }
  next();
}

async function authPostReply(req, res, next) {
  let restaurant = null;

  try {
    restaurant = await Restaurant.findById(res.review.restaurantId);

    if (!restaurant) {
      return res.status(404).send(`Restaurant ${res.review.restaurantId} not found`);
    }
  } catch (err) {
    return res.status(500).json(err);
  }

  if (!canAddReply(req.user, restaurant)) {
    return res.status(403).send(`Not allowed to add review reply`);
  }
  if (res.review.reply) {
    return res.status(202).send(`Review ${res.review._id} was already answered`);
  }

  next();
}

async function recalculateRestaurantRating(restaurant) {
  Review.aggregate(
    [
      { $match: { restaurantId: restaurant._id } },
      { $group: { _id: restaurant._id, rating: { $avg: '$rating' } } },
    ],
    async function (err, [result]) {
      restaurant.rating = result.rating;

      try {
        restaurant.save();
      } catch (err) {
        console.error(err);
      }
    },
  );
}

module.exports = router;
