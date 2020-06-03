const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { canEdit, canDelete } = require('../permissions/user');
const User = require('../models/User');
const { registerValidation, loginValidation, editValidation } = require('../validation/user');

router.post('/register', async ({ body }, res) => {
  const { error } = registerValidation(body);

  if (error) return res.status(400).send(error?.details[0]?.message);

  const salt = await bcrypt.genSalt();
  const pwdHash = await bcrypt.hash(body.password, salt);
  const user = new User({
    name: body.name,
    role: body.role,
    email: body.email,
    password: pwdHash,
  });

  try {
    const { _id, name, role, email } = await user.save();

    res.status(201).json({ _id, name, role, email });
  } catch (err) {
    if (err?.code === 11000 && err?.keyPattern?.email) {
      res.status(400).send('This email is already taken');
    } else {
      res.status(500).json(err);
    }
  }
});

router.post('/login', async ({ body }, res) => {
  const { error } = loginValidation(body);
  if (error) return res.status(400).send(error?.details[0]?.message);

  let user = null;

  try {
    user = await User.findOne({ email: body.email });
  } catch (err) {
    res.status(500).json(err);
  }
  try {
    const pwdValid = await bcrypt.compare(body.password, user?.password);

    if (!user || !pwdValid) throw new Error();

    const { _id, email, name, role } = user;
    const accessToken = jwt.sign({ _id, email, name, role }, process.env.JWT_SECRET, {
      expiresIn: '12h',
    });
    const refreshToken = jwt.sign({ _id, email, name, role }, process.env.JWT_REFRESH_SECRET);

    res.json({ userId: _id, displayName: name, role, accessToken, refreshToken });
  } catch (err) {
    res.status(401).send('Email or Password is invalid');
  }
});

router.post('/logout', async ({ body }, res) => {
  res.send();
});

router.post('/token', async ({ body }, res) => {
  res.send();
});

router.patch('/:id', auth, findById, authPatch, async ({ body }, res) => {
  const { error } = editValidation(body);

  if (error) {
    return res.status(400).send(error?.details[0]?.message);
  }

  res.user.name = body.name;
  res.user.role = body.role;
  res.user.email = body.email;

  try {
    const updatedUser = await res.user.save();

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', auth, findById, authDelete, async (req, res) => {
  try {
    const removedUser = await res.user.remove();

    res.json(removedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

async function findById({ params }, res, next) {
  try {
    const user = await User.findById(params.id);

    if (!user) {
      return res.status(404).send(`User ${params.id} not found`);
    }

    res.user = user;
  } catch (err) {
    res.status(500).json(err);
  }

  next();
}

async function authPatch(req, res, next) {
  if (!canEdit(req.user)) {
    return res.status(403).send(`Not allowed to edit user ${res.user.id}`);
  }
  next();
}

async function authDelete(req, res, next) {
  if (!canDelete(req.user)) {
    return res.status(403).send(`Not allowed to delete user ${res.user.id}`);
  }
  next();
}

module.exports = router;
