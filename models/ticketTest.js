module.exports = (sequelize, DataTypes) => {
    const Tickets = sequelize.define('Tickets', {
        category: DataTypes.STRING,
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        location:DataTypes.GEOMETRY('POINT'),
        status: DataTypes.STRING,
    });

    Tickets.associate = function(models) {
        // We're saying that a ticket should belong to an Author
        // A ticket can't be created without an User due to the foreign key constraint
        Tickets.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Tickets;
  };
