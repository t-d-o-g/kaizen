module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    status: DataTypes.STRING,
  });
  return Status;
};
