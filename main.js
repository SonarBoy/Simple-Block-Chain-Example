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

        //nonce: random value assinged to a block to build in proof of work
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    //This method will now be used to calculate the hash inside the block chain
    mineBlock( difficulty){
        while(this.hash.substring(0,difficulty) != Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mind: " + this.hash);
    }
}

//Implementation of Proof-Of-Work 
//Used to validate that the block chain took time and is not tampered with 
//by making the hash start with specific numbers (CASE: BITCOIN)

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
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
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let runner = 1 ;runner < this.chain.length ; runner++){
            const currentBlock = this.chain[runner];
            const previousBlock = this.chain[runner - 1];

            //Check for the hash of the current block is still valid.
            if(currentBlock.hash !== currentBlock.calculateHash() ){
                return false;
            }

            if(previousBlock.hash !==  currentBlock.previousHash){
                return false;
            }
        } 

        return true;
    }
}

let testerCoin = new Blockchain();

console.log("Mining Block 1: ");
testerCoin.addBlock(new Block(1,"January,23,2019",{amount: 4}));

console.log("Mining Block 2:")
testerCoin.addBlock(new Block(2,"Feburary,23,2019",{amount: 10}));


/* OLD TAMERING EXAMPLE
//Here the block chain goes through the initial check
console.log(JSON.stringify(testerCoin,null,4));
console.log('Is the Block chain valid: ' + testerCoin.isChainValid());


//Lines of code used to try and tamper with the block chain
testerCoin.chain[2].data = {amount: 152};
console.log('Is the Block chain valid: ' + testerCoin.isChainValid());
*/