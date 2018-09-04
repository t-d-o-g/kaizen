module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    category: DataTypes.STRING,
  });
  return Ticket;
};
