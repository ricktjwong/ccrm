const msfCase = (sequelize, DataTypes) => {
  const Case = sequelize.define('case', {
    clientName: DataTypes.STRING,
    caseDesc: DataTypes.STRING,
    assignedAgency: DataTypes.STRING,
    agencyPoc: DataTypes.STRING,
  }, { underscored: true })

  Case.associate = models => {
    Case.belongsTo(models.User)
    Case.hasOne(models.Client)
    Case.hasMany(models.Conversation, { onDelete: 'CASCADE' })
    Case.hasMany(models.Actionplan, { onDelete: 'CASCADE' })
  }

  return Case
}

module.exports = msfCase
