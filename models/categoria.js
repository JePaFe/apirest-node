module.exports = (sequelize, DataTypes) => {
    return sequelize.define('categoria', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: DataTypes.STRING,
    }, {
        tableName: 'categorias'
    })
}