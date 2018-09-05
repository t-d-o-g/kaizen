module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING(100),
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = function(models) {
    // Associating User with Tickets
    // When an User is deleted, also delete any associated Tickets
    User.hasMany(models.Tickets, {
      onDelete: "cascade"
    });
  };
  return User;
  
};
