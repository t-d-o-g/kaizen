// This defines schema of TicketXrefXref table. This table is
// mainly used to define relationship with other tables in
// the db
module.exports = (sequelize, DataTypes) => {
  const TicketXref = sequelize.define('TicketXref', {
  });

  TicketXref.associate = (models) => {
    TicketXref.belongsTo(models.Ticket, {
      foreignKey: {
        allowNull: false,
      },
    });

    TicketXref.belongsTo(models.Category, {
      foreignKey: {
        allowNull: true,
      },
    });

    TicketXref.belongsTo(models.TicketLocation, {
      foreignKey: {
        allowNull: false,
      },
    });

    TicketXref.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });

    TicketXref.belongsTo(models.Status, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return TicketXref;
};
