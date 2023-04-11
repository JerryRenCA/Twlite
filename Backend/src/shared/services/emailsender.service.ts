import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'attagg.verify@gmail.com',
    pass: 'Rt12345678.',
  },
});

const mailOptions = {
  from: 'attagg.verify@gmail.com',
  to: 'online2jerry@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email sent from NestJS using nodemailer.',
};

const mailSender = () => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.info(error);
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.info('Email sent: ' + info.response);
    }
  });
};

export default mailSender;
