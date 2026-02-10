// hexagram data generator
// Will be built in segments then run to produce hexagrams.json

const fs = require('fs');
const path = '/Users/ss/Documents/Project/Web/liuyao/data/hexagrams.json';

const hexagrams = [];

// Helper to push hexagram
function h(obj) { hexagrams.push(obj); }

