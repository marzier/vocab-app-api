const express = require('express');
const server = express();

server.use(express.json());

const wordsRouter = require('./routes/words.js');
server.use('/api', wordsRouter);

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
   console.log(`server running on port ${PORT}`)
});