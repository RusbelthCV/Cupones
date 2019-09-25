module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        _uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        nacimiento: DataTypes.STRING,
        admin: {
            type: DataTypes.BOOLEAN
        }
    }, { tableName: 'usuario' });
    return Usuario;
};