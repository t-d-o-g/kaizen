module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    login_id: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return User;
};
