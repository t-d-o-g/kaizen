module.exports = (sequelize, DataTypes) => {
  const TicketLocation = sequelize.define('TicketLocation', {
    category: DataTypes.STRING,
    location: DataTypes.GEOMETRY('POINT'),
  });
  return TicketLocation;
};
