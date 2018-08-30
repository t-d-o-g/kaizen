module.exports = function(sequelize, DataTypes) {
    var Ticket = sequelize.define("Ticket", {
      ticket: DataTypes.STRING(1023)
    });

    Ticket.associate = function(models) {
        Ticket.belongsTo(models.Category, {
          foreignKey: {
            allowNull: true
          }
        });
      };

      Ticket.associate = function(models) {
        Ticket.belongsTo(models.TicketLocation, {
          foreignKey: {
            allowNull: false
          }
        });
      };

      Ticket.associate = function(models) {
        Ticket.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

      Ticket.associate = function(models) {
        Ticket.belongsTo(models.Status, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Ticket;
  };
  