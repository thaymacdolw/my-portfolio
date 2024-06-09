const express = require ('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/', (req, res)=> {
    console.log(req.body);
    
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
        debug: true ,
        logger: true 
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'thaymacdolw@gmail.com',
        subject: `Message from ${req.body.email} on my Portfolio`,
        text: req.body.message
    };
    console.log('Attempting to send email...');
    transporter.sendMail(mailOptions, (error, info)=> {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent:' + info.response);
            res.send('success')
        }
    })
});


app.listen(PORT, ()=> {
    console.log(`Server running on' ${PORT}`)
});