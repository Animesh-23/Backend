import { nanoid } from "nanoid";

const generateNewUrl = () => {
  const id = nanoid();
  return id;
};

export { generateNewUrl };
