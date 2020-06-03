function canEdit(user) {
  return user.role === 'admin';
}

function canDelete(user) {
  return user.role === 'admin';
}

module.exports = { canEdit, canDelete };
