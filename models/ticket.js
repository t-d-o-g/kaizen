module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    ticket: DataTypes.STRING,
  });
  return Ticket;
};
