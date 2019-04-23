const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash= ''){
        //index: optional tells us where the block sits on the chain
        //timestamp: when the block was created
        //data: data housed by the block
        //previous: conntection to the previous block

        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,"April,23,2019","Genesis Block", null);
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        //NOTE ADDING NEW BLOCK TO A CHAIN IS MUCH MORE DIFFICULT
        //CODE HERE IS ONLY USED FOR UNDERSTANDING BLOCKCHAINS.
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let testerCoin = new Blockchain();

testerCoin.addBlock(new Block(1,"January,23,2019",{amount: 4}));
testerCoin.addBlock(new Block(2,"Feburary,23,2019",{amount: 10}));

console.log(JSON.stringify(testerCoin,null,4));
