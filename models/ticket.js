module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    ticket: DataTypes.STRING(1023),
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Category, {
      foreignKey: {
        allowNull: true,
      },
    });
  };

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.TicketLocation, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Status, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Ticket;
};
