const dotenv = require('dotenv');
const express = require('express')
require('dotenv/config.js')
dotenv.config();
exports.forget_password_email_template = async (data) => {

    const logo = express.static(__dirname + '/storage/book_default_image.png')
    const code = data.code;
    const thanking_message = "Thank you";
    const final_greeting_message = "Your team bookstore";
    const ignoring_message = "If you did not ask to change your password you can simply ignre this email";
    return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <title>
    </title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>

    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
            }
        }
    </style>


    <style type="text/css">
    </style>
</head>
<body style="background-color:#f9f9f9;">
<div style="background-color:#f9f9f9;">
    <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">

        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
            <tbody>
            <tr>
                <td style="border-bottom:#009ECD solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;">
            <tbody>
            <tr>
                <td style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:bottom;" width="100%">
                            <tr>
                                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                        <tbody>
                                        <tr>
                                            <td style="width:150px;">

                                                <img height="auto" src=${logo} style="border:0;display:block;outline:none;text-decoration:none;width:100%;"  />

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">

                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:38px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                        Oops!
                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">

                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:18px;line-height:1;text-align:center;color:#555;">
                                       <p> Thank you for your trust  </p>
                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">

                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                        <tbody>
                                        <tr>
                                            <td style="width:128px;">

                                                <img height="auto" src="https://i.imgur.com/247tYSw.png" style="border:0;display:block;outline:none;text-decoration:none;width:100%;" width="128" />

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </td>
                            </tr>

                            <tr>
                                <td align="center" style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">

                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                        <tr>
                                        
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="font-size:0px;padding:10px 10px;padding-bottom:40px;word-break:break-word;">

                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:18px;line-height:1;text-align:center;color:#555;">
                                    
                                    </div>

                                </td>

                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 20px 10px 20px 30px; color: #666666; font-family:'Helvetica Neue',Arial,sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"><a href="#" target="_blank" style="color: #009ECD;">${code}</a></p>
                                </td>
                            </tr>
                            <tr>

                                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:20px;word-break:break-word;">

                                    <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#555;">
                                        ${ignoring_message}
                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td bgcolor="#ffffff" align="left" style=" font-weight:bold ;padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family:'Helvetica Neue',Arial,sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">${thanking_message},<br>${final_greeting_message}</p>
                                </td>
                            </tr>

                        </table>

                    </div>

                    <!--[if mso | IE]>
                    </td>

                    </tr>

                    </table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>

    </div>
    <div style="Margin:0px auto;max-width:600px;">

        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
            <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</div>

</body>

           </html>`

}