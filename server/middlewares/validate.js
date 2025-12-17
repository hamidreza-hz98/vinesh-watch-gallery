async function validate(schema, data) {
  try {
    return await schema.validate(data, {
      abortEarly: false,
    });
  } catch (err) {
    const error = new Error(err.errors.join(", "));
    error.statusCode = 422;
    throw error;
  }
}

module.exports = validate;
