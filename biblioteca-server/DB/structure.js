import { Sequelize, client } from "./client.js";

const livros = client.define(
    "livros",
    {
        titulo: {
            type: Sequelize.STRING,
        },
        sinopse: {
            type: Sequelize.STRING,
        },
        editora: {
            type: Sequelize.STRING,
        },
        views: {
            type: Sequelize.INTEGER,
        },
    },
    { timestamps: false }
);

const generos = client.define(
    "generos",
    {
        nome: {
            type: Sequelize.STRING,
        },
        descricao: {
            type: Sequelize.STRING,
        },
    },
    { timestamps: false }
);

const autores = client.define(
    "autores",
    {
        nome: {
            type: Sequelize.STRING,
        },
        sobrenome: {
            type: Sequelize.STRING,
        },
    },
    { timestamps: false }
);

const livros_generos = client.define(
    "livros_generos",
    {},
    { timestamps: false }
);

const livros_autores = client.define(
    "livros_autores",
    {},
    { timestamps: false }
);

// relações
livros.belongsToMany(generos, { through: livros_generos });
generos.belongsToMany(livros, { through: livros_generos });

livros.belongsToMany(autores, { through: livros_autores });
autores.belongsToMany(livros, { through: livros_autores, foreignKey: 'autorId' });

export { livros, generos, autores, livros_generos, livros_autores };
