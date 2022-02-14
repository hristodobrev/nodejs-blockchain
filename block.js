let calculateHash = require('./utils');

class Block {
    constructor(data, previousHash) {
        this.data = data;
        this.hash = "0";
        this.previousHash = previousHash;
        this.timestamp = new Date();
        this.pow = 0;
    }

    mine(difficulty) {
        const regex = new RegExp(`^(0){${difficulty}}.*`);
        while(!this.hash.match(regex)) {
            this.pow++;
            this.hash = calculateHash(this);
        }
    }
}

module.exports = Block;