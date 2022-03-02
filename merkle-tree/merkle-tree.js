const { getHash, createRoot } = require('./merkle-utils');

class MerkleTree {
  constructor(root, size) {
    this.root = root;
    this.size = size;
  }

  static create(transactions) {
    const size = Math.ceil(Math.log2(transactions.length)) + 1;
    const root = createRoot(
      transactions.map((t) => new MerkleTree(getHash(t)))
    );

    return new MerkleTree(root, size);
  }

  findSiblingsOf(hash, node = this.root) {
    if (hash === node.value) return { node };

    if (!node.left && !node.right) return null;

    if (hash === node.left?.value) return { node: node.left, left: false };

    if (hash === node.right?.value) return { node: node.left, left: true };
  }

  verify(data) {
    let hash = getHash(data);
    let sibling = this.findSiblingsOf(hash);
    while (sibling !== null && sibling.node.value !== this.root.value) {
      let val = sibling.left
        ? sibling.node.value + hash
        : hash + sibling.node.value;
      hash = getHash(val);
      sibling = this.findSiblingsOf(hash);
    }

    return sibling && sibling.node.value === this.root.value;
  }
}

module.exports = MerkleTree;
