const dot=require("dotenv")

dot.configDotenv();

export const port=process.env.port;
export const URi=process.env.mongURI;
export const tk=process.env.TK;
export const test=process.env.TESTING;