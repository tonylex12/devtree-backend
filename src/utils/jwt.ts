import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.VITE_JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
}
