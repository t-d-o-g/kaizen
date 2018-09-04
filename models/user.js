module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING(100),
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return User;
};
