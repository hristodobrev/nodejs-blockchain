let Block = require('./block');
let Blockchain = require('./blockchain');

(function () {
  const blockchain = Blockchain.create(2);
  blockchain.addBlock('Gosho', 'Pesho', 20);
  blockchain.addBlock('Toshko', 'Ivan', 150);
  blockchain.addBlock('Bob', 'Alice', 1500);
  blockchain.addBlock('Tom', 'John', 200);
  //blockchain.chain[1].data.amount = 120;
  //console.log(blockchain.isValid());
  blockchain.addBlock('Jimmy', 'Jessica', 300);
  console.log(blockchain);
  console.log('Is Valid Blockchain: ', blockchain.isValid());
})();
