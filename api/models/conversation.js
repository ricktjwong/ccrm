const conversation = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('conversation', {
    message: DataTypes.STRING,
    from: DataTypes.STRING,
  }, { underscored: true })

  Conversation.associate = models => {
    Conversation.belongsTo(models.Case)
  }

  return Conversation
}

module.exports = conversation
