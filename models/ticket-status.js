module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  return Status;
};
