const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(400).json({
                message: "Authorization token tidak ditemukan."
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(400).json({
                message: "Format token tidak valid."
            });
        }