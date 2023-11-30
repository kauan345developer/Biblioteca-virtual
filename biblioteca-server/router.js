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
    generateTokenForUser,
    checkIfUserHasBook,
    checkIfUserIsLoggedIn,
    createUser,
    getUserByEmail,
    createBook,
} from "./DB/functions.js";
import { error } from "console";
import fs from "fs";
import fileUpload from "express-fileupload";
import { livros } from "./DB/structure.js";

const app = express();
const port = 3000;
app.use(cors());
app.use(json());
app.use(fileUpload());

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
        try {
            fs.rmSync(`./public/livros/epubs/${id}.epub`);
        } catch {};
        try {
            fs.rmSync(`./public/livros/capas/${id}.png`);
        } catch {};
        res.status(200).send({ sucess: true, message: `Livro ${id} deletado` });
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
            const token = await generateTokenForUser(user.id);
            res.status(200).send({
                success: true,
                message: "Login bem-sucedido",
                token: token,
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

//cadastro livro -------------------------------------------

app.post("/api/books/cadastro", async (req, res) => {
    const bookInfo = req.body;
    try {
        if (
            !bookInfo.titulo ||
            !bookInfo.sinopse ||
            !bookInfo.editora ||
            !bookInfo.autores ||
            !bookInfo.generos ||
            !bookInfo.capa ||
            !bookInfo.ePub
        ) {
            return res
                .status(400)
                .json({ success: false, message: "Preencha todos os campos." });
        }

        await createBook(bookInfo)
            .then(async (createdLivro) => {
                return createdLivro.id;
            })
            .then((id) => {
                res.status(200).json({
                    success: true,
                    message: "Livro cadastrado com sucesso.",
                    bookId: id,
                });
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Erro no cadastro do livro.",
        });
    }
});

app.post("/api/books/upload/:bookId", async (req, res) => {
    const { bookId } = req.params;
    try {
        let ePub = req.files.ePub;
        let capa = req.files.capa;

        ePub.mv(`./public/livros/epubs/${bookId}.epub`);
        capa.mv(`./public/livros/capas/${bookId}.png`);

        await livros.update({ disponivel: true }, { where: { id: bookId } });

        res.status(200).json({
            success: true,
            message: "Arquivos upados com sucesso.",
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Erro no upload do livro.",
        });
        console.log(error);
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

app.get("/api/auth/checkIfUserHasBook/:userId/:bookId", async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        await checkIfUserHasBook(userId, bookId).then((query) => {
            if (query) {
                res.status(200).send({
                    loggedIn: true,
                    id: query.usuarioId,
                });
            } else {
                res.status(200).send({
                    loggedIn: false,
                });
            }
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

app.get("/api/auth/checkIfUserIsLoggedIn/:token", async (req, res) => {
    const { token } = req.params;
    try {
        await checkIfUserIsLoggedIn(token).then((query) => {
            res.status(200).send(query);
        });
    } catch {
        console.log(error);
    }
});

// fornecendo imagens
app.use("/api/books/capas", express.static("./public/livros/capas"));

// fornecendo os arquivos epub
app.use("/api/books/read", express.static("./public/livros/epubs"));

try {
    app.listen(port);
    console.log(`Server running on port ${port}\nhttp://localhost:${port}`);
} catch {
    console.log("Error on server");
}

export default app;
