import express, { json } from "express";
import cors from "cors";
import {
    getAllBooks,
    getBookById,
    getBookByName,
    incrementView,
    addBookToUser,
    getAllBooksFromUser,
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

app.get("/api/books/incrementView/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await incrementView(id);
        res.status(200).send("ok");
    } catch {
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

app.post("/api/auth/addBookToUser/:bookId/:userId", async (req, res) => {
    const { bookId, userId } = req.params;
    try {
        await addBookToUser(bookId, userId);
        res.status(200).send();
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
