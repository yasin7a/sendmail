const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

// setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// ====================

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index", { ssg: false });
});

app.post("/", async (req, res) => {
  try {
    let { name, formMail, massage } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "shwapnabeesh@gmail.com",
        pass: "shwapnabeeshc17",
      },
    });

    let info = await transporter.sendMail({
      from: "shwapnabeesh@gmail.com",
      to: `${formMail}`,
      subject: `A mail from ${name}`,
      text: `${massage}`,
    });
    res.render("index", { ssg: true });

    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT + "...");
});
