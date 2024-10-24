// pages/api/logout.js
export default (req, res) => {
  res.setHeader("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0"); // Clear the token cookie
  return res.json({ message: "Logged out successfully" });
};
