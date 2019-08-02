const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, { underscored: true })

  User.associate = models => {
    User.hasMany(models.Case, { onDelete: 'CASCADE' })
  }

  return User
}

module.exports = user
