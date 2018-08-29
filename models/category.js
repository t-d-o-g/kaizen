module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
      category: DataTypes.STRING
    });
    return Category;
  };
  