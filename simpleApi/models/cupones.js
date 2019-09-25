module.exports = (sequelize,DataTypes) => {
    const Cupon = sequelize.define('Cupon', {
        nombre: DataTypes.STRING,
        caducidad: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        foto: DataTypes.STRING,
        valor: DataTypes.INTEGER,
        enVenta: DataTypes.BOOLEAN,
        usuario: DataTypes.STRING
    }, {tableName: 'cupones'});
    return Cupon;
};