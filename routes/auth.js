router.post("/register", async (req, res) => {

const { username, email, password } = req.body;

const existingUser = await User.findOne({ email });
if (existingUser) return res.json({ msg: "Email already exists" });

const hashedPassword = await bcrypt.hash(password, 10);

const user = new User({
  username,
  email,
  password: hashedPassword
});

await user.save();

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

res.json({ token });

});