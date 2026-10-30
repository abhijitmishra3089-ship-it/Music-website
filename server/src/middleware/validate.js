export function validate(schema, target = "body") {
  return (req, res, next) => {
    const parsed = schema.safeParse(req[target]);
    if (!parsed.success) {
      return res.status(400).json({
        success: false, message: "Validation failed",
        errors: parsed.error.issues.map(({ path, message }) => ({ path, message }))
      });
    }
    req[target] = parsed.data;
    next();
  };
}
