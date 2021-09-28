const  nodemailer =require('nodemailer');
const contact =process.env.CONTACT_EMAIL;
const password =process.env.EMAIL_PASSWORD;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
        user: contact,
        pass: password
    },
    tls: {
        rejectUnauthorized: false
    }
});


exports.send_mail= async (data)=>{
    /*
    *   data:{
        email: the email to sendto,
        subject: the subject of the email, 
        html: the html code of the email
    * }
    * 
    * */
console.log('on email')
    let mailOptions = {
        from: contact,
        to: data.email,
        subject: data.subject,
        text: 'BookStore',
        html: data.html
    };

    await transporter.sendMail(mailOptions).then(async (info, error)=> {
     console.log('info', info)
        if (error) {
            console.log('on erropor', error)
            return ('error')
        }
        else {
            console.log('on done')
            return ('done', info)
        }
    }).catch(function (err) {
        return (err)
    });
};
