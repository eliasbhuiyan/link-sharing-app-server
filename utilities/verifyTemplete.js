module.exports = function verifyTemplete(token) {
  return `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #643DFC; font-weight: bold; margin-bottom: 20px; text-align: center;">Verify Your Email Address</h2>
    <p style="color: #353535; font-size: 16px;">Thanks for signing up! We just need to verify your email address.</p>
    <p style="background-color: #643DFC; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: block; width: 100px; text-align: center; margin: 20px auto;">${token}</p>
  </div>
  `;
};

