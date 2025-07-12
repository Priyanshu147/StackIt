import httpStatus from "http-status";

const validateSchema = 
  (schema, params = false) => (req, res, next) => {
  const data = params ? req.params : req.body;

  // Pre-parse known JSON stringified fields (e.g., from FormData)
  ["organizationIds", "userIds"].forEach((key) => {
    if (typeof data[key] === "string") {
      try {
        const parsed = JSON.parse(data[key]);
        if (Array.isArray(parsed)) {
          data[key] = parsed;
        }
      } catch (_) {
        // Let Joi handle any validation issues if parsing fails
      }
    }
  });

  const { error } = schema.validate(data);

  if (error) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ success: false, message: error.details[0].message });
  }

  next();
};

export default validateSchema;
