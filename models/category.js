module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return Category;
};
