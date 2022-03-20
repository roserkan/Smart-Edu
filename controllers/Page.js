const nodemailer = require('nodemailer');

const getIndexPage = (req,res) => {
    res.status(200).render('index', {
        page_name: 'index'
    })
}

const getAboutPage = (req,res) => {
    res.status(200).render('about', {
        page_name: 'about'
    })
}

const getContactPage = (req,res) => {
    res.status(200).render('contact', {
        page_name: 'contact'
    })
}


const getRegisterPage = (req,res) => {
    res.status(200).render('register', {
        page_name: 'register'
    })
}

const getLoginPage = (req,res) => {
    res.status(200).render('login', {
        page_name: 'login'
    })
}

const sendEmail = async (req,res) => {
   const output = `
    <h1>Mail Details</h1>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
   `

   let transporter = nodemailer.createTransport({
       host: "smpt.gmail.com",
       port: 465,
       secure: true,
       auth: {
           user: "serkancamkertendev@gmail.com", // gmail account
           pass: "sjdkgldfkfgjkmdmdmasdj" // gmail password
       }
   })

   let info = await transporter.sendMail({
       from: '"Smart Edu Contact Form" <serkannrose@gmail.com>',
       to: "serkannrose@gmail.com",
        subject: "Smart Edu Contact Form New Message",
        html: output    
    })

    res.status(200).redirect('/contact');
}



module.exports = {
    getIndexPage,
    getAboutPage,
    getRegisterPage,
    getLoginPage,
    getContactPage,
    sendEmail
}