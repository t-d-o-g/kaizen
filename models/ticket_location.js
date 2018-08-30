module.exports = function(sequelize, DataTypes) {
    var TicketLocation = sequelize.define("TicketLocation", {
      category: DataTypes.STRING,
      location: DataTypes.GEOMETRY('POINT')
    });
    return TicketLocation;
  };
  