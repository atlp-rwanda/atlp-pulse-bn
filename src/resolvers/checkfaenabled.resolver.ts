// import { authenticator } from 'otplib';
// import sendEmaile from '../utils/sendotp'; // Corrected the function name

// // Interfaces for user and twoFactorCode
// interface IUser {
//   twoFactorAuth: boolean;
//   twoFactorSecret: string;
//   email: string;
//   oneTimeCode?: string;
//   save: () => Promise<void>;
// }

// type TwoFactorCode = string | null;

// // Async function to handle 2FA
// async function check2FA(user: IUser, twoFactorCode: TwoFactorCode): Promise<string> {
//   try {
//     if (user.twoFactorAuth) {
//       if (!twoFactorCode) {
//         const secret = user.twoFactorSecret;
//         const verificationCode = authenticator.generate(secret);

//         await sendEmaile({
//           to: user.email,
//           subject: 'Your One-Time Verification Code',
//           text: `Your verification code is: ${verificationCode}`,
//         });

//         user.oneTimeCode = verificationCode;
//         await user.save();

//         // Return message that 2FA is enabled and the code has been sent to the email
//         return 'Two-factor authentication is enabled. A code has been sent to your email address. Please check your inbox and enter the code to complete login.';
//       }
//     }

//     if (twoFactorCode && twoFactorCode === user.oneTimeCode) {
//       user.oneTimeCode = null;
//       await user.save();
//       return 'Two-factor authentication verified. Login successful.';
//     } else {
//       return 'Invalid verification code. Please try again or request a new code.';
//     }
//   } catch (error) {
//     console.error(`Error in check2FA: ${error}`);
//     return 'An error occurred during the 2FA check. Please try again later.';
//   }
// }

// export default check2FA;
