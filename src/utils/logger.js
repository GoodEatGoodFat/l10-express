const winston = require("winston");
const path = require("path");

const createLogger = (filename) => {
  const logger = winston.createLogger({
    level: "info",
    defaultMeta: {
      file: path.basename(filename),
    },
    format:winston.format.combine(
        
    )
  });
};
