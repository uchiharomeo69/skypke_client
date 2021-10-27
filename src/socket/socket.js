const { io } = require("socket.io-client");

// eslint-disable-next-line no-undef

export const client = io(`${process.env.REACT_APP_ENDPOINT_URL}`, {
  transports: ["websocket"],
});
