"use client"
import { getTransaction, getTransactionReceipt } from "@/web3/transacion";
import Button from "./Button";
import { useEffect, useState } from "react";

interface TransactionInfoProps {
  txHash: string;
}

interface TransactionDetails {
  status: string;
  blockHeight: number;
  blockHash: string;
  from: string;
  to: string;
}

export default function TransactionInfo({ txHash }: TransactionInfoProps) {
  const [txDetails, setTxDetails] = useState<TransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 定义异步函数
    const fetchTransactionDetails = async () => {
      try {
        setLoading(true);
        // 这里添加你的异步请求逻辑
        // 示例：
        // const response = await fetch(`/api/transaction/${txHash}`);
        // const data = await response.json();
        
        // 模拟异步请求
        txHash = '0xf087004579f43f9cecf1c088f23d27b9f92e55e7978d19b30059d199b372e74a'
        const transaction = await getTransaction(txHash)
        const receipt = await getTransactionReceipt(txHash)

        let status = transaction?.isMined() ? 'pending' : '成功'
        status = receipt?.status === 1 ? '成功' : '失败'
        
        // 示例数据
        const data: TransactionDetails = {
          status,
          blockHeight: transaction?.blockNumber ?? -1,
          blockHash: transaction?.blockHash ?? '',
          from: transaction?.from ?? '',
          to: transaction?.to ?? ''
        };

        setTxDetails(data);
      } catch (error) {
        console.error("获取交易详情失败:", error);
        // 可以添加错误处理逻辑
      } finally {
        setLoading(false);
      }
    };

    // 调用异步函数
    fetchTransactionDetails();
  }, [txHash]); // 当 txHash 改变时重新获取数据

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p>加载中...</p>
      </div>
    );
  }

  if (!txDetails) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p>获取交易详情失败</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">交易详情</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex gap-2">
          <p className="text-gray-600">交易状态:</p>
          <p className="font-medium">{txDetails.status}</p>
        </div>
        {/* <div className="flex gap-2">
          <p className="text-gray-600">交易时间:</p>
          <p className="font-medium">{txDetails.timestamp}</p>
        </div> */}
        <div className="flex gap-2">
          <p className="text-gray-600">Block:</p>
          <p className="font-medium">{txDetails.blockHeight}</p>
        </div>
        
        <div className="flex gap-2">
          <p className="text-gray-600">From:</p>
          <p className="font-medium">{txDetails.from}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-600">To:</p>
          <p className="font-medium">{txDetails.to}</p>
          <Button toAddress={txDetails.to} />
        </div>
        <div className="flex gap-2">
          <p className="text-gray-600">BlockHS:</p>
          <p className="font-medium">{txDetails.blockHash}</p>
        </div>
      </div>
    </div>
  );
} 