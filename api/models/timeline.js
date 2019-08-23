const timeline = (sequelize, DataTypes) => {
  const Timeline = sequelize.define('timeline', {
    subject: DataTypes.STRING,
    from: DataTypes.STRING,
    details: DataTypes.STRING,
  }, { underscored: true })

  Timeline.associate = models => {
    Timeline.belongsTo(models.Case)
  }

  return Timeline
}

module.exports = timeline
