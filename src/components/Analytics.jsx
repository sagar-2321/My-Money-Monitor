import { Progress } from 'antd';
import React from 'react'
import '../resources/analytics.css'

// this is the sause of the project
// comments are extremely important 
// as there are going to be many complex calculations

function Analytics({ transactions }) {
    // display total transactions
    const totalTransactions = transactions.length

    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === "income");
    const totalExpneseTransactions = transactions.filter(transactions => transactions.type === "expense");

    // calculate the percentage
    const incomePercentage = (totalIncomeTransactions.length / totalTransactions) * 100;
    const expesnsePercentage = (totalExpneseTransactions.length / totalTransactions) * 100;

    // calculating turnover
    //reducer to acc total 
    // 0 is given to initialize the acc with zero
    const totalTurnOver = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)

    const incomeTurnOver = transactions.filter(transactions => transactions.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expenseTurnOver = transactions.filter(transaction => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const incomeTurnOverPercentage = (incomeTurnOver / totalTurnOver) * 100;
    const expsenseTurnOverPercentage = (expenseTurnOver / totalTurnOver) * 100;

    // progress bar calculations end

    // now time to render categories on basis of income and expense
    const category = [
        "salary",
        "freelance",
        "food",
        "tax",
        "rent",
        "bills",
        "cash-in",
        "cash-out",
        "shopping",
        "entertainment",
        "medical",
        "education",
        "travel",
        "investment"
    ]

    return (
        <div className='analytics'>
            <div className="row">
                <div className="col-md-4 mt-3">
                    <div className="transactions-count">
                        <h4>Total Transactions: {totalTransactions}</h4>
                        <hr />
                        <h5>Income: {totalIncomeTransactions.length}</h5>
                        <h4>Expense: {totalExpneseTransactions.length}</h4>
                        <div className="d-flex flex-row progress-bar">
                            <Progress className='mx-2'
                                type='circle'
                                percent={incomePercentage.toFixed(0)}
                                strokeColor='green'
                            />
                            <Progress type='circle'
                                percent={expesnsePercentage.toFixed(0)}
                                strokeColor='red'
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-3">
                    <div className="transactions-count">
                        <h4>Total Turn-Over: ₹{totalTurnOver}</h4>
                        <hr />
                        <h5>Income: ₹{incomeTurnOver}/-</h5>
                        <h4>Expense: ₹{expenseTurnOver}/-</h4>
                        <div className="d-flex flex-row progress-bar">
                            <Progress className='mx-2'
                                type='circle'
                                percent={incomeTurnOverPercentage.toFixed(0)}
                                strokeColor='green'
                            />
                            <Progress type='circle'
                                percent={expsenseTurnOverPercentage.toFixed(0)}
                                strokeColor='red'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="category-analysis">
                        <h4>Income Category-Wise</h4>
                        {category.map((category)=>{
                            const amount = transactions
                                            .filter(t=>t.type==="income" && t.category===category)
                                            .reduce((acc,t)=>acc+t.amount,0);
                            return amount>0 &&<div className='category-card'>
                                <h5>{category}</h5>
                                <Progress percent={((amount/incomeTurnOver)*100).toFixed(0)}/>
                            </div>
                        })}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="category-analysis">
                        <h4>Expense Category-Wise</h4>
                        {category.map((category)=>{
                            const amount = transactions
                                            .filter(t=>t.type==="expense" && t.category===category)
                                            .reduce((acc,t)=>acc+t.amount,0);
                            return amount>0 &&<div className='category-card'>
                                <h5>{category}</h5>
                                <Progress 
                                    percent={((amount/expenseTurnOver)*100).toFixed(0)}
                                    strokeColor={"orange"}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics