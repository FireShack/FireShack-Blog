import JWT from "jsonwebtoken";

export const generateToken = (id: string) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    JWT.sign(
      payload,
      process.env.PRIVATE_KEY as string,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          return reject("There was an error, please try again");
        }
        resolve(token);
      }
    );
  });
};
