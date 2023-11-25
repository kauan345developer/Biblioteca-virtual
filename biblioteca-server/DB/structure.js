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

const usuarios = client.define(
    "usuarios",
    {
        nome: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        senha: {
            type: Sequelize.STRING,
        },
    },
    { timestamps: false }
);

const livros_generos = client.define(
    "livros_generos",
    {
        livroId: {
            type: Sequelize.INTEGER,
            references: {
                model: livros,
                key: "id",
            },
        },
        generoId: {
            type: Sequelize.INTEGER,
            references: {
                model: generos,
                key: "id",
            },
        },
    },
    { timestamps: false }
);

const livros_autores = client.define(
    "livros_autores",
    {
        livroId: {
            type: Sequelize.INTEGER,
            references: {
                model: livros,
                key: "id",
            },
        },
        autorId: {
            type: Sequelize.INTEGER,
            references: {
                model: autores,
                key: "id",
            },
        },
    },
    { timestamps: false }
);

const usuarios_livros = client.define(
    "usuarios_livros",
    {
        usuarioId: {
            type: Sequelize.INTEGER,
            references: {
                model: usuarios,
                key: "id",
            },
        },
        livroId: {
            type: Sequelize.INTEGER,
            references: {
                model: livros,
                key: "id",
            },
        },
    },
    { timestamps: false }
);

// relações
livros.belongsToMany(generos, { through: livros_generos });
generos.belongsToMany(livros, { through: livros_generos });

livros.belongsToMany(autores, { through: livros_autores });
autores.belongsToMany(livros, {
    through: livros_autores,
    foreignKey: "autorId",
});

livros.belongsToMany(usuarios, { through: usuarios_livros });
usuarios.belongsToMany(livros, { through: usuarios_livros });

export {
    livros,
    generos,
    autores,
    usuarios,
    livros_generos,
    livros_autores,
    usuarios_livros,
};
