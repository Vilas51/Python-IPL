const Joi = require('joi');

const formSchema = Joi.object({
  FirstTeam: Joi.string().required(),
  SecondTeam: Joi.string().required(),
  FromYear: Joi.number().integer().min(2008).max(2025).required(),
  ToYear: Joi.number().integer().min(2008).max(2025).required()
});

const validateForm = (req, res, next) => {
  const { error } = formSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next(); 
};

module.exports = validateForm;
