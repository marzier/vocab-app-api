const express = require('express');
const cors = require('cors');
//const db = require('./data/db.js');

const server = express();

server.use(cors());

server.use(express.json());

const authRouter = require('./auth/auth-router.js');
server.use('/auth', authRouter);

const decksRouter = require('./Decks/decks-rtr.js');
server.use('/decks', decksRouter);

const wordsRouter = require('./Words/words-rtr.js');
server.use('/words', wordsRouter);

const port = 6001;
server.listen(port, () => console.log(`Server on ${port}`));


// var fs = require('fs');  // req for natural and wordnet-db
// const natural = require('natural');
// const wordnet = new natural.WordNet();

// const outputDefs = word => {
//    let wordObj = {};
//    wordObj.definition = "";

//    wordnet.lookup(word, function(entries) {
//       entries.forEach((entry)=>{
//          wordObj.word = word;
//          wordObj.definition += entry.gloss.replace(/"/g, "'"  ).trim() + '***' ; 
//          //console.log('"gloss":', '"' + entry.gloss.replace(/"/g, "'"  ).trim() + '",');
//          //console.log('"synonyms":', entry.synonyms, ',');
//          //console.log("expression:", entry.exp);
//          //console.log("def:", entry.def);
//          //console.log('\n');
//       });
//       //console.log(Object.keys(entries[0]));
//   });
//   return wordObj;
// }

// const mockWordList = ["timid", "errant", "missive"];
// mockWordList.forEach((word)=>{
//    outputDefs(word);
// });





// let sampleStr = "apple \n banana \n crabs \n";
// let sampleStrArry = sampleStr.split('\n').map(word=>word.trim());
// console.log(sampleStrArry);





















// const natural = require('natural');
// const _ = require('lodash')

// const wordnet = new natural.WordNet();
// const tokenizer = new natural.WordTokenizer();

// const sent = "Welcome to callback hell."
// const setSyns = {}

// const handleLookup = (word, syns) => {
//     setSyns[word] = syns
// }

// const doLast = () => {
//     console.log(setSyns)
// }

// // callback to wordnet.lookup gets passed an array of objects
// // one property of which is `synonyms`

// // also, use a tokenizer

// tokenizer.tokenize(sent).forEach((word, idx, words) => {
//     wordnet.lookup(word, x => {
//         synsList = _.flatMapDeep(x, y => y.synonyms)
//         handleLookup(word, _.uniq(synsList))
//         if (idx == words.length - 1) {
//             doLast()
//         }
//     })
// })