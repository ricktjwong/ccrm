const actionplan = (sequelize, DataTypes) => {
  const Actionplan = sequelize.define('actionplan', {
    action: DataTypes.STRING,
    targetDate: DataTypes.DATE,
    status: DataTypes.STRING,
    poc: DataTypes.STRING,
    updates: DataTypes.STRING,
  }, { underscored: true })

  Actionplan.associate = models => {
    Actionplan.belongsTo(models.Case)
  }

  return Actionplan
}

module.exports = actionplan
