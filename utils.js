const crypto = require('crypto');

const calculateHash = (block) => {
    const data = JSON.stringify(block.data);
    const blockData = 
        data + 
        block.previousHash +
        block.timestamp.toISOString() +
        block.pow.toString();

    return crypto.createHash('sha256').update(blockData).digest('hex');
};

module.exports = calculateHash;