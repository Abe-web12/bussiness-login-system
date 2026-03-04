router.post("/register", async (req, res) => {
  const { Username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.json({ msg: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const User = new User({ Username, email, password: hashedPassword });
  await User.save();

  const token = jwt.sign(
    { id: User._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});