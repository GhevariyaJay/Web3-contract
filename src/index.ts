import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const port = 3000;

type Address = string;

let balances: {[address: Address]: number} = {};

let allowances:{
    [address: Address]:{
        [address: Address]: number;
    }
}={};

app.post("/create", (req, res) => {
    const { userId, initalBalance } = req.body;
    if(balances[userId]){
        return res.status(400).send("Account is already created...")

    }
    balances[userId] = initalBalance;
    res.send(`Account created for user ${userId} with balance ${initalBalance}`);
});

app.post("/transfer", (req, res) => {
    const { fromUserId, toUserId, amount } = req.body;
    if (!balances[fromUserId] || !balances[toUserId]) {
        return res.status(400).send("Account does not exist...")
        
    }

    if(balances[fromUserId] < amount){
        return res.status(400).send("Insufficient balance...")

    }
    balances[fromUserId] -= amount;
    balances[toUserId]+= amount;
    res.send(`Transferred ${amount} from ${fromUserId} to ${toUserId}`);
});

app.post('/approve', (req, res)=> {
    const { ownerId, spenderId, amount } = req.body;
    if(!balances[ownerId]|| !balances[spenderId]){
        return res.status(400).send("Account does not exist...")
    }
    if(!allowances[ownerId]){
        allowances[ownerId] = {};
    }
    allowances[ownerId][spenderId] = amount;
    res.send(`Approved ${amount} for ${spenderId} to spend from ${ownerId}`);
});

app.post('/transferFrom', (req, res) => {
    const { fromUserId, toUserId, spenderId, amount }= req.body;
    if(!balances[fromUserId] || !balances[toUserId]){
        return res.status(400).send("Account does not exist...")

    }
    const allowededAmount = allowances[fromUserId]&& allowances[fromUserId][spenderId];
    if(!allowededAmount || allowededAmount < amount){
        return res.status(400).send("Insufficient allowance...");

        }

    if(balances[fromUserId] < amount){
        return res.status(400).send("Insufficient balance...");
    }

    balances[fromUserId] -= amount;
    balances[toUserId] += amount;
    allowances[fromUserId][spenderId] -= amount;
    res.send(`Transferred ${amount} from ${fromUserId} to ${toUserId} by ${spenderId}`);
});

app.get("/balance/:userId", (req, res) => {
    const balance = balances[req.params.userId];
    if (balance === undefined) {
        return res.status(400).send("Account does not exist...");
    }
    res.send(`Balance for user ${req.params.userId}: ${balance}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});