import { ERROR_MESSAGES, COLUMN_LABELS } from "../utils/constants.js";
import APIError from "../error/index.js";

export async function catchError(err, req, res, next) {
  let errorMessage = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

  console.log({ err });
  if (err instanceof APIError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
      status: err.status,
      cause: err.cause || "UN_KNOWN",
    });
  } else if (err.code === "ER_DUP_ENTRY") {
    const duplicateKey = err.sqlMessage
      .match(/for key '([^']+)'/)?.[1]
      .split(".")[1];
    const duplicateValue = err.sqlMessage.match(
      /Duplicate entry '([^']+)'/
    )?.[1];
    const label = COLUMN_LABELS[duplicateKey] || duplicateKey;
    res.status(409).json({
      message: `Duplicate entry for ${label}: '${duplicateValue}' already exists.`,
    });
  } else {
    res.status(500).json({
      message: errorMessage,
    });
  }
}
