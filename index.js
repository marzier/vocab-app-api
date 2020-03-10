const express = require('express');
const server = express();

server.use(express.json());

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
   console.log(`server running on port ${PORT}`)
});