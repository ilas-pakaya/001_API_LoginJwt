const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = db.user;

async function register(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email dan Password harus diisi."
            });
        }
        const existingUser = await user.findOne({ 
            where: { email } 
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Email sudah terdaftar."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Registrasi berhasil.",
            data: {
                id: user.id,
                email: user.email
            }
        });
    }
        
    