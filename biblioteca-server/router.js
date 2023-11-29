import express, { json } from "express";
import cors from "cors";
import {
    getAllBooks,
    getBookById,
    getBookByName,
    getMostSoldBooks,
    incrementView,
    activateBook,
    deactivateBook,
    deleteBook,
    addBookToUser,
    getAllBooksFromUser,
    createUser,
    getUserByEmail,
} from "./DB/functions.js";
import { error } from "console";
import { Sequelize } from "sequelize";

const app = express();

app.use(cors());
app.use(json());

app.get("/api/books/searchById/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        if (isNaN(id)) {
            await getAllBooks()
                .then((query) => {
                    return query.map((book) => {
                        return book.dataValues;
                    });
                })
                .then((query) => {
                    res.status(200).send(query);
                });
        } else {
            await getBookById(id).then((query) => {
                res.status(200).send(query);
            });
        }
    } catch {
        console.log(error);
    }
});

app.get("/api/books/searchByName/:name", async (req, res) => {
    const { name } = req.params;
    let { limit } = req.query;
    if (isNaN(limit)) limit = 1;

    await getBookByName(name, limit).then(async (query) => {
        res.status(200).send(query);
    });
});

app.get("/api/books/mostSold", async (req, res) => {
    let { limit } = req.query;
    if (isNaN(limit)) limit = 1;
    try {
        await getMostSoldBooks(limit).then((query) => {
            console.log("a");
            res.status(200).send(query);
        });
    } catch {
        console.log(error);
    }
});

app.get("/api/books/incrementView/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await incrementView(id);
        res.status(200).send("ok");
    } catch {
        console.log(error);
    }
});

app.post("/api/books/activate/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await activateBook(id);
        res.status(200).send(`Livro ${id} ativado`);
    } catch {
        console.log(error);
    }
});

app.post("/api/books/deactivate/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await deactivateBook(id);
        res.status(200).send(`Livro ${id} desativado`);
    } catch {
        console.log(error);
    }
});

app.delete("/api/books/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await deleteBook(id);
        res.status(200).send(`Livro ${id} deletado`);
    } catch {
        console.log(error);
    }
});

// users ----------------------------------
app.post("/api/users/cadastro", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Validação e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({
                success: false,
                message: "Formato de e-mail inválido",
            });
        }

        // Verificar se o e-mail já está cadastrado
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "Este e-mail já está cadastrado",
            });
        }

        await createUser({ nome, email, senha });

        res.status(200).send({
            success: true,
            message: "Cadastro bem-sucedido",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Erro no cadastro" });
    }
});

app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (user && user.senha === password) {
            res.status(200).send({
                success: true,
                message: "Login bem-sucedido",
                id: user.id
            });
        } else {
            res.status(401).send({
                success: false,
                message: "Credenciais inválidas",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Erro no login" });
    }
});

// auth ----------------------------------
app.get("/api/auth/getAllBooksFromUser/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        await getAllBooksFromUser(userId).then((query) => {
            res.status(200).send(query);
        });
    } catch {
        console.log(error);
    }
});

app.post("/api/auth/addBookToUser/:bookId/:userId", async (req, res) => {
    const { bookId, userId } = req.params;
    try {
        await addBookToUser(bookId, userId);
        res.status(200).send(`Livro ${bookId} adicionado ao usuário ${userId}`);
    } catch {
        console.log(error);
    }
});

// fornecendo imagens
app.use("/api/books/capas", express.static("./public/livros/capas"));

// fornecendo os arquivos epub
app.use("/api/books/read", express.static("./public/livros/epubs"));

try {
    app.listen(3000);
    console.log("Server running on port 3000\nhttp://localhost:3000");
} catch {
    console.log("Error on server");
}

export default app;
