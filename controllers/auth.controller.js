import bcryptjs from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import Mustache from "mustache";
import Email from "../utils/Email.js";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import User from "../models/User.js";

export const signup = async (req, res) => {
	const { email, password, first_name, last_name } = req.body;

	try {
		if (!email || !password || !first_name || !last_name) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			email,
			password: hashedPassword,
			first_name,
			last_name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();

		// jwt
		generateTokenAndSetCookie(res, user._id);

		// Email sending
		const template = fs.readFileSync(
			"./emailTemplates/email_verification.mustache",
			"utf8"
		);

		const userName = first_name + " " + last_name;
		const body = Mustache.render(template, { name: userName, verificationToken });

		// send link to user by email including validation token
		let emailSettings = {
			email: process.env.FROM_EMAIL,
			fromName: process.env.FROM_NAME,
		}

		await Email.sendEmail({
			emailSettings,
			to: email,
			subject: "Career Pilot Email Verification",
			body,
			//   cc: "contact@caisol.com"
		});

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in signup ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid verification code" });
		}

		user.emailVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		// Email sending
		const template = fs.readFileSync(
			"./emailTemplates/welcome.mustache",
			"utf8"
		);

		const userName = user.first_name + " " + user.last_name;
		const body = Mustache.render(template, { name: userName });

		// send link to user by email including validation token
		let emailSettings = {
			email: process.env.FROM_EMAIL,
			fromName: process.env.FROM_NAME,
		}

		await Email.sendEmail({
			emailSettings,
			to: user.email,
			subject: "Welcome to career pilot",
			body,
			//   cc: "contact@caisol.com"
		});

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		if (user.emailVerified) {
			return res.status(400).json({ success: false, message: "Email already verified" });
		}

		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
		user.verificationToken = verificationToken;
		user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
		await user.save();

		// Email sending

		const template = fs.readFileSync(
			"./emailTemplates/email_verification.mustache",
			"utf8"
		);

		const userName = user.first_name + " " + user.last_name;
		const body = Mustache.render(template, { name: userName, verificationToken });

		// send link to user by email including validation token
		let emailSettings = {
			email: process.env.FROM_EMAIL,
			fromName: process.env.FROM_NAME,
		}

		await Email.sendEmail({
			emailSettings,
			to: email,
			subject: "Career Pilot Email Verification",
			body,
			//   cc: " ",
		});

		res.status(200).json({
			success: true,
			message: "Verification email sent successfully",
		});
	} catch (error) {
		console.log("Error in reverifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
	  const user = await User.findOne({ email }).select("+password");
  
	  if (!user) {
		return res.status(400).json({ success: false, message: "Invalid credentials" });
	  }
  
	  if (!user.password) {
		return res.status(400).json({ success: false, message: "Password not set for this user" });
	  }
  
	  const isPasswordValid = await bcryptjs.compare(password, user.password);
	  
	  if (!isPasswordValid) {
		return res.status(400).json({ success: false, message: "Invalid credentials" });
	  }
  
	  const token = generateTokenAndSetCookie(res, user._id);
	  console.log(token)
  
	  user.lastLogin = new Date();
	  await user.save();
  
	  res.status(200).json({
		success: true,
		message: "Logged in successfully",
		user: {
		  ...user._doc,
		  password: undefined,
		},
	  });
	} catch (error) {
	  console.log("Error in login ", error);
	  res.status(400).json({ success: false, message: error.message });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};