module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idusuari: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nomusuari: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN
        }
    },{tableName: 'tokens'});
    return Token;
}