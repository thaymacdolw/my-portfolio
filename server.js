const express = require ('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/', (req, res)=> {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service: 'yahoo',
        secure: false,
        auth: {
            user: 'thaymacdolw@yahoo.com',
            pass: '4u;V0a3)Z:9];'
        },
        debug: false,
        logger: true 
    });

    const mailOptions = {
        from: req.body.email,
        to: 'thaymacdolw@gmail.com',
        subject: `Message from ${req.body.email} on my Portfolio`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent:' + info.reponse);
            res.send('sucess')
        }
    })
});


app.listen(PORT, ()=> {
    console.log(`Server running on' ${PORT}`)
});