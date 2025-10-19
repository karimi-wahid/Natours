import nodemailer from 'nodemailer';

const sendEmail = async options => {
    // 1) create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) define the email options
    const mailOptions = {
        from: 'Wahidullah Karimi <' + process.env.EMAIL_FROM + '>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // 3) actully send the email
    await transporter.sendMail(mailOptions);
}

export default sendEmail;