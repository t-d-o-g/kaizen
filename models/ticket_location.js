module.exports = function(sequelize, DataTypes) {
    var TicketLocation = sequelize.define("TicketLocation", {
      category: DataTypes.STRING
    });
    return TicketLocation;
  };
  