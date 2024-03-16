const router = require('express').Router();
const moment = require('moment/moment');
const transaction = require('../model/Transaction');

router.post('/add-transaction',async(req,res)=>{
    
    try {
        const newTransaction = new transaction(req.body);
        await newTransaction.save();
        res.send("Transaction added successfully");

    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }

})

router.post('/edit-transaction',async(req,res)=>{
    
    try {
        await transaction.findOneAndUpdate({_id : req.body.transactionId} , req.body.payload)
        res.send("Transaction updated successfully");

    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }

})

router.post("/delete-transaction", async function (req, res) {
    try {
      await transaction.findOneAndDelete({_id : req.body.transactionId})
      res.send("Transaction Updated Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.post('/get-all-transactions',async(req,res)=>{
    const {frequency, selectedRange,type} = req.body;

    try {
        // filter transactions on basis of date
        const getTransation = await transaction.find({
            ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
            
                userId:req.body.userId,
                ...(type!=='all' && { type})
               
        }
            )       
        res.send(getTransation)
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
    res.send()
})


module.exports = router;