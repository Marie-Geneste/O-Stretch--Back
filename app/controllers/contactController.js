const nodemailer = require("nodemailer");

const contactController = {

    contact: (req, res) => {

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.WINDOWSPASS || process.env.MACPASS
            },
            tls: {
                rejectUnauthorized: false
            }

        })
        const mailOptions = {
            from: req.body.email,
            to: process.env.GMAIL_USER,
            subject: `Message de la part de ${req.body.name} (${req.body.email}) : ${req.body.subject}`,
            text: `${req.body.message}`
        }

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(error);
                return res.send(error);
            }
            res.send("success");
            console.log("email send !!");
        });
    }
};





module.exports = contactController;