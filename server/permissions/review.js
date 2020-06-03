function canAdd(user) {
  return user.role === 'regular';
}

function canEdit(user, review) {
  return (
    user.role === 'admin' || (user.role === 'regular' && review.userId.toString() === user._id)
  );
}

function canDelete(user, review) {
  return (
    user.role === 'admin' || (user.role === 'regular' && review.userId.toString() === user._id)
  );
}

function canAddReply(user, restaurant) {
  return user.role === 'owner' && restaurant.ownerId.toString() === user._id;
}

module.exports = { canAdd, canEdit, canDelete, canAddReply };
