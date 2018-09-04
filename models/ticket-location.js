module.exports = (sequelize, DataTypes) => {
  const TicketLocation = sequelize.define('TicketLocation', {
    location: DataTypes.GEOMETRY('POINT'),
  });
  return TicketLocation;
};
