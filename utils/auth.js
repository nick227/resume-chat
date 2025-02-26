// Simple user role management
const userRoles = new Map();

// Default to 'user' role if not set
const getUserRole = async(userId) => {
    return userRoles.get(userId) || 'user';
};

// For admin purposes - set user role
const setUserRole = async(userId, role) => {
    userRoles.set(userId, role);
    return true;
};

module.exports = {
    getUserRole,
    setUserRole
};