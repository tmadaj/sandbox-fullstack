function canAdd(user) {
  return user.role === 'owner';
}

function canEdit(user, restaurant) {
  return (
    user.role === 'admin' || (user.role === 'owner' && restaurant.ownerId.toString() === user._id)
  );
}

function canDelete(user, restaurant) {
  return (
    user.role === 'admin' || (user.role === 'owner' && restaurant.ownerId.toString() === user._id)
  );
}

module.exports = { canAdd, canEdit, canDelete };
