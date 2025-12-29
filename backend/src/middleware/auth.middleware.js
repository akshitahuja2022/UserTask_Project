import Joi from "joi";

const signupValidation = async (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .message({
        "any.only": "Password do not match",
        "string.empty": "Confirm password is required",
      }),
    role: Joi.string().valid("admin", "user"),
    status: Joi.string().valid("active", "inactive"),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const loginValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
export { signupValidation, loginValidation };
