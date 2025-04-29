const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configura servidor de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '', // E-mail que irá enviar a lista.
        pass: '' // Senha do google passwords: https://myaccount.google.com/apppasswords
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-email', (req, res) => {
    const { attendant, items } = req.body;
    const today = new Date().toLocaleDateString('pt-BR');

    const mailOptions = {
        from: '', //Novamente o email de quem vai enviar
        to: '', //E-mail de quem vai receber a lista
        subject: `Checklist Caixa ${today}`,
        text: `Atendente: ${attendant}\n\nItens Solicitados:\n- ${items.join('\n- ')}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao enviar e-mail.');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.send('Demanda enviada com sucesso!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`); // Se essa mensagem aparecer, possívelmente deu tudo certo!
});
