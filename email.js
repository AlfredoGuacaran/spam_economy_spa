import NodeMailer from 'nodemailer';

function enviarEmail(destinatario, asunto, texto) {
  let transporter = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tests.alfredo@gmail.com',
      pass: 'test.1234',
    },
  });

  let mailOptions = {
    from: 'tests.alfredo@gmail.com',
    to: destinatario,
    subject: asunto,
    text: texto,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err);
    if (data) console.log(data);
  });
}

export default enviarEmail;
