require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Config do servidor
const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexão bem-sucedida ao MongoDB"))
    .catch(err => console.log("Erro ao tentar conexão ao MongoDB: ", err));

// Modelo do user
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
});

// Rota de cadastro
app.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Verificar o email se existe
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({error: "Email já cadastrado!"});
        }

        // Cripto da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // criar o usuario
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Avisar a criação do user
        res.status(201).json({
            success: true,
            message: "Usuario criado",
            user: {id: user._id, name: user.name}
        });
    } catch (error) {
        res.status(500).json({error: "erro no servidor"});
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        // verificar se o usuario vai existir
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: "Email não cadastrado"});
        }

        // comparar a senha criptografada
        const isSenhaValida = await bcrypt.compare(password, user.password);
        if (!isSenhaValida) {
            return res.status(400).json({error: "Senha incorreta"});
        }

        res.json({
            success: true,
            message: "Login feito",
            user: { id: user._id, name: user.name, email: user.email}
        });
    } catch(error) {
        res.status(500).json({error: "Erro no servidor"});
    }
});

// Rota do dashboard
app.get('/dashboard/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado!" });
        }
        
        res.json({
            success: true,
            message: `Bem-vindo, ${user.name}!`,
            user: { id: user._id, name: user.name }
        });
    } catch (error) {
        res.status(500).json({error: "erro no servidor"});
    }
});

// Iniciar o server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
