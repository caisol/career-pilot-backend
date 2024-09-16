const User = require("../models/User");

var self = (module.exports = {

    async getUser(req, res) {
        return res.json({ status: true, message: "Working!!!" });
    },

    // async storeUser(req, res) {

    //     const { email, password, name, external, iframeValue, picture, company } = req.body;

    //     this.emailVerified = false;
    //     try {
    //         let user = await User.findOne({ email });
    //         // console.log('user', user)
    //         if (user) {
    //             if (external != "" && (external == "google" || external == "linkedin")) {
    //                 return res.status(200).json({ success: true, message: external });
    //             } else {
    //                 return res
    //                     .status(200)
    //                     .json({ success: false, message: "Email already exists" });
    //             }
    //         }
    //         if (external != "" && (external == "google" || external == "linkedin")) {
    //             this.emailVerified = true;
    //             this.company_name = name;
    //             this.company_phone = " ";
    //         } else {
    //             this.emailVerified = false;
    //             this.company_name = req.body.company_name;
    //             this.company_phone = req.body.company_phone;
    //         }
    //         if (iframeValue) {
    //             this.iframeValue = true;
    //         }
    //         if (picture) {
    //             this.picture = picture;
    //         }
    //         if (external) {
    //             this.external = external;
    //         }

    //         var tenantObj = {
    //             company_name: this.company_name,
    //             company_phone: this.company_phone,
    //             trial_end_date: moment(Date.now()).add(15, "days").toDate()
    //         };

    //         if (req.body.enable_card) {
    //             tenantObj = {
    //                 ...tenantObj,
    //                 address_line_1: req.body.address_line_1,
    //                 address_line_2: req.body.address_line_2,
    //                 city: req.body.city,
    //                 state: req.body.state,
    //                 zipcode: req.body.zipcode,
    //                 country: req.body.country,
    //                 enable_card: req.body.enable_card
    //             };
    //         }

    //         const tenant = new Tenant(tenantObj);

    //         let role = new Role({
    //             tenant_id: tenant._id,
    //             role_name: "Admin",
    //             permissions: req.body.permissions
    //         });

    //         user = new User({
    //             tenant_id: tenant._id,
    //             role_id: role._id,
    //             name,
    //             email,
    //             password,
    //             emailVerified: this.emailVerified,
    //             external: this.external,
    //             iframeValue: this.iframeValue,
    //             externalPicture: this.picture,
    //             company
    //         });

    //         role.added_by = user._id;

    //         const stripe = require("stripe")(
    //             "sk_test_51O7MzlBfBTgdr0VajKj20vblIoqGSXWMGCaCiFviaEsh34rUwCw4h3RqG3Ryxr86jTaD5Mn2olwNx11WenyrO9s800QQQRO7H8"
    //         );
    //         stripe.customers
    //             .create({
    //                 email: user.email
    //             })
    //             .then(async customer => {
    //                 tenant.stripe_customer_id = customer.id;
    //                 // await tenant.save();

    //                 if (await tenant.save()) {
    //                     const randomNumber = Math.floor(10000 + Math.random() * 90000);
    //                     // create vendor for tenant
    //                     const vendor = new Vendor({
    //                         tenant_id: tenant._id,
    //                         id: randomNumber,
    //                         company_name: tenant.company_name,
    //                         email: tenant.email || "",
    //                         phone: tenant.company_phone || "",
    //                         address: tenant.address_line_1 + " " + tenant.country || "",
    //                         city: tenant.city || "",
    //                         state: tenant.state || "",
    //                         zipcode: tenant.zipcode || ""
    //                     });

    //                     // Save the vendor to the database
    //                     await vendor.save();
    //                 }
    //             })
    //             .catch(error => console.error(error));

    //         await role.save();
    //         // hash password
    //         const salt = await bcrypt.genSalt(10);
    //         user.password = await bcrypt.hash(password, salt);
    //         await user.save();

    //         // generate random string
    //         const validationTokenObj = {
    //             token: `${user._id}${tenant._id}${Date.now()}`,
    //             user_id: user._id,
    //             expired: false
    //         };

    //         // save userid and random string to table validation tokens
    //         const token = await new EmailValidationToken(validationTokenObj).save();
    //         let userId = 'req.user.id'
    //         if (this.emailVerified) {
    //             const template = fs.readFileSync(
    //                 "./emailTemplates/welcome.mustache",
    //                 "utf8"
    //             );
    //             const body = Mustache.render(template, { name: user.name });

    //             // send link to user by email including validation token
    //             EmailSetting.findOne({
    //                 added_by: userId
    //             }).exec(async (err, emailSettings) => {

    //                 emailSettings = {
    //                     email: "contact@caisol.com",
    //                     fromName: "Vantage360"
    //                 }

    //                 Email.sendEmail({
    //                     emailSettings,
    //                     to: user.email,
    //                     subject: "Welcome to Vantage 360",
    //                     body,
    //                     cc: "contact@caisol.com"
    //                 });
    //             });

    //             // <--------------------------------------------------------------------------->
    //             // var transporter = nodemailer.createTransport({
    //             //   service: 'live.smtp.mailtrap.io',
    //             //   host: 'live.smtp.mailtrap.io',
    //             //   port: 587,
    //             //   secure: false,
    //             //   requireTLS: true,
    //             //   auth: {
    //             //     user: 'api',
    //             //     pass: '210f5936e1d44a948cd5126a13703e29'
    //             //   }
    //             // });

    //             // var mailOptions = {
    //             //   from: "contact@caisol.com",
    //             //   to: req.body.email,
    //             //   cc: "contact@caisol.com",
    //             //   subject: "Account Creation Email | Vantage 360",
    //             //   html: body,
    //             // };

    //             // const sendEmailMailTrap = await transporter.sendMail(mailOptions);

    //             // const { info: mailTrapInfo, error: mailTrapError } = sendEmailMailTrap;

    //             // if (mailTrapError) {
    //             //   res.status(500).json({ status: false, error: mailTrapError });
    //             //   return;
    //             // }
    //             // <--------------------------------------------------------------------------->

    //             // Create a stripe customer

    //             // setup JWT
    //             // const payload = {
    //             //   user: {
    //             //     id: user.id,
    //             //     tenant_id: user.tenant_id
    //             //   },
    //             // };

    //             res.json({ success: true, msg: "Account Creation Email Sent.", user });
    //         } else {
    //             const verifyUrl = process.env.NODE_ENV || config.get('NODE_ENV');
    //             let link = `https://dashboard.vantage360.app/verfiy-email/${token.token}`;
    //             if (verifyUrl === 'PRODUCTION') {
    //                 link = `https://dashboard.vantage360.app/verfiy-email/${token.token}`;
    //             } else {
    //                 link = `https://vantage360.web.app/verfiy-email/${token.token}`;
    //             }
    //             const template = fs.readFileSync(
    //                 "./emailTemplates/verification.mustache",
    //                 "utf8"
    //             );
    //             const body = Mustache.render(template, { link, name: user.name });

    //             // send link to user by email including validation token
    //             EmailSetting.findOne({
    //                 added_by: userId
    //             }).exec((err, emailSettings) => {

    //                 emailSettings = {
    //                     email: "contact@caisol.com",
    //                     fromName: "Vantage360"
    //                 }

    //                 Email.sendEmail({
    //                     emailSettings,
    //                     to: user.email,
    //                     subject: "Activation Email | Vantage 360",
    //                     body,
    //                     // cc: "contact@caisol.com"
    //                 });
    //             });

    //             // <--------------------------------------------------------------------------->
    //             // var transporter = nodemailer.createTransport({
    //             //   service: 'live.smtp.mailtrap.io',
    //             //   host: 'live.smtp.mailtrap.io',
    //             //   port: 587,
    //             //   secure: false,
    //             //   requireTLS: true,
    //             //   auth: {
    //             //     user: 'api',
    //             //     pass: '210f5936e1d44a948cd5126a13703e29'
    //             //   }
    //             // });

    //             // var mailOptions = {
    //             //   from: "contact@caisol.com",
    //             //   to: req.body.email,
    //             //   cc: "contact@caisol.com",
    //             //   subject: "Account Creation Email | Vantage 360",
    //             //   html: body,
    //             // };

    //             // const sendEmailMailTrap = await transporter.sendMail(mailOptions);

    //             // const { info: mailTrapInfo, error: mailTrapError } = sendEmailMailTrap;

    //             // if (mailTrapError) {
    //             //   res.status(500).json({ status: false, error: mailTrapError });
    //             //   return;
    //             // }
    //             // <--------------------------------------------------------------------------->

    //             // Create a stripe customer

    //             // setup JWT
    //             // const payload = {
    //             //   user: {
    //             //     id: user.id,
    //             //     tenant_id: user.tenant_id
    //             //   },
    //             // };

    //             // <------------------ Email setup ------------------>
    //             let emailSteup = req.body.emailSteup;

    //             if (emailSteup === true) {
    //                 try {
    //                     let email = req.body.GoogleAppEmail;
    //                     let password = req.body.GoogleAppPassword;
    //                     let fromName = req.body.GoogleAppFromName;

    //                     EmailSetting.updateOne({
    //                         added_by: user._id
    //                     }, {
    //                         email,
    //                         password,
    //                         fromName
    //                     }, { upsert: true }).exec((error, settings) => {

    //                     });
    //                 } catch (e) {
    //                     res.json({
    //                         status: false,
    //                         error: 500,
    //                         message: e.message
    //                     });
    //                 }
    //             }

    //             res.json({ success: true, msg: "An Activation Email Sent.", user });
    //         }

    //         // jwt.sign(
    //         //   payload,
    //         //   process.env.JWT_SECRET || config.get("JWT_SECRET"),
    //         //   { expiresIn: 360000 },
    //         //   (err, token) => {
    //         //     if (err) throw err;
    //         //     res.json({ user, token, permissions: role.permissions });
    //         //   }
    //         // );
    //     } catch (err) {
    //         console.error(err.message);
    //         res.status(500).send("Server error");
    //     }
    // },

});