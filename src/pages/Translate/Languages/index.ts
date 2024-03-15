import { messages as portugueseMessages } from "./pt";
import { messages as englishMessages } from "./en";
import { messages as spanishMessages } from "./es";
import { messages as frenchMessages } from "./fr";
import { messages as germanMessages } from "./de";
import { messages as indianMessages } from "./hi";
import { messages as mandarinMessages } from "./zh";
const messages = Object.assign(
  {},
  portugueseMessages,
  englishMessages,
  spanishMessages,
  frenchMessages,
  germanMessages,
  indianMessages,
  mandarinMessages
);

export { messages };
