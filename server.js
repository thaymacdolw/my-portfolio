const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

//CORS
const corsOptions = {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


//Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-email', (req, res) => {
    console.log(req.body);
    console.log('Recebendo solicitação POST /send-email');
    console.log('Corpo da solicitação:', req.body);

    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        debug: true,
        logger: true
    });
    // Adicionando eventos de debug
    transporter.on('debug', (info) => {
        console.log('Debug:', info);
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'thaymacdolw@gmail.com',
        subject: `Message from ${req.body.email} on my Portfolio`,
        text: req.body.message
    };
    console.log('Attempting to send email...');
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar email:', error.message);
            res.json({ status: 'error', message: error.message });
        } else {
            console.log('Email sent:', info.response);
            res.json({ status: 'success' });
        }
    });
});


//---------Download CV------------
app.get('/download-cv', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'assets', 'ThaynaMacDolwCV.pdf');

    res.setHeader('Content-Disposition', 'attachment; filename="ThaynaMacDolwCV.pdf"');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao baixar o currículo.');
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});