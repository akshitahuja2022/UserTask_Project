import Joi from "joi";

const signupValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      fullname: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": "Password do not match",
          "string.empty": "Confirm password is required",
        }),
      role: Joi.string().valid("admin", "user").optional(),
      status: Joi.string().valid("active", "inactive").optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("signup validation error ", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const loginValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details[0].message, success: false });
    }
    next();
  } catch (error) {
    console.log("login validation error ", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
export { signupValidation, loginValidation };
