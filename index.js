const express = require("express");
const nodemailer = require("nodemailer");
const smtpPool = require("nodemailer-smtp-pool");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

// setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// ====================

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.render("index", { ssg: false });
});

app.post("/", async (req, res) => {
  try {
    let { name, formMail, massage } = req.body;
    const transporter = nodemailer.createTransport(
      smtpPool({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,

        auth: {
          user: "lebriact@gmail.com",
          pass: "1234lebriact..",
        },
      })
    );

    let info = await transporter.sendMail({
      from: "lebriact@gmail.com",
      to: `${formMail}`,
      subject: `A mail from ${name}`,
      text: `${massage}`,
    });
    res.render("index", { ssg: true });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT + "...");
});
