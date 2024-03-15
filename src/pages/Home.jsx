import { DatePicker, message, Select, Table } from 'antd';
import { UnorderedListOutlined, BarChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment/moment';
import React from 'react'
import { useState, useEffect } from 'react'
import AddEditTransaction from '../components/AddEditTransaction';


import DefaultLayout from '../components/DefaultLayout'
import '../resources/transactions.css'
import Analytics from '../components/Analytics';


function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("moneyMonitor-user"));


      const response = await axios.post(
        "https://m3-backend-api.onrender.com/api/transactions/get-all-transactions",
        {
          userId: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      setTransactionsData(response.data);

    } catch (error) {

      message.error("Something went wrong");
    }
  };

  const deleteTransaction = async (record) => {
    try {

      await axios.post("https://m3-backend-api.onrender.com/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaction Deleted successfully");
      getTransactions();

    } catch (error) {

      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => <>{(record.type === 'income') ? <span style={{ color: "green" }}>+₹ {text}</span> : <span style={{ color: "red" }}>-₹ {text}</span>}</>
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    // {
    //   title: "Type",
    //   dataIndex: "type",
    // },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined className="mx-3" onClick={() => deleteTransaction(record)} />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>

      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
        <button
            className="primary mx-2"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="8000">All</Select.Option>
              {/* <Select.Option value="custom">Custom</Select.Option> */}
            </Select>

            {frequency === "custom" && (
              <div className="mt-2">
                <DatePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          {/* select type */}
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
        </div>

        <div className="d-flex">
          <div>
            <div className="view-switch">
              <UnorderedListOutlined
                className={`mx-3 ${viewType === "table" ? "active-icon" : "inactive-icon"
                  } `}
                onClick={() => setViewType("table")}

              />

              <BarChartOutlined
                className={`${viewType === "analytics" ? "active-icon" : "inactive-icon"
                  } `}
                onClick={() => setViewType("analytics")}

              />
            </div>
          </div>
          {/* <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button> */}
        </div>
      </div>

      <div className="table-analtics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionsData} />
          </div>
        ) : (
          <Analytics transactions={transactionsData} />
        )}
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;