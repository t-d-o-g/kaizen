module.exports = function(sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
      status: DataTypes.STRING
    });
    return Status;
  };
  