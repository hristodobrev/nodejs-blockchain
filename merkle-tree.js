const crypto = require('crypto');
const MerkleNode = require('./merkle-node');

const getHash = (value) =>
  crypto.createHash('sha256').update(value.toString()).digest('hex');

function createTree(arr) {
  if (arr.length === 0) return null;

  if (arr.length === 1) return arr[0];

  let list = [];
  for (let i = 0; i < arr.length; i += 2) {
    let currentNode = arr[i];
    if (i + 1 >= arr.length) {
      list.push(currentNode);
      break;
    }

    let nextNode = arr[i + 1];
    let value = currentNode.value + nextNode.value;
    let newNode = new MerkleNode(getHash(value), currentNode, nextNode);
    list.push(newNode);
  }

  return createTree(list);
}
