"use client"
import { useRPC } from "@/context/RPCContext";
import { getTransaction } from "@/web3/transacion";
import { useEffect, useState } from "react";

interface TransactionDataProps {
  txHash: string;
}

interface TransactionDataDetails {
  rawData: string;
  functionName: string;
  parameters: {
    to: string;
    amount: string;
  };
}

export default function TransactionData({ txHash }: TransactionDataProps) {
  const [txData, setTxData] = useState<TransactionDataDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { rpcUrl } = useRPC();


  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        setLoading(true);
        
        if (!txHash.startsWith('0x')) {
            throw new Error('交易哈希非法')
        }
        console.log(rpcUrl)
        const transaction = await getTransaction(rpcUrl, txHash);
        
        // TODO functionName和parameters暂时假数据
        const data: TransactionDataDetails = {
          rawData: transaction?.data ?? '',
          functionName: 'transfer(address to, uint256 amount)',
          parameters: {
            to: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
            amount: '10'
          }
        };

        setTxData(data);
      } catch (error) {
        console.error("获取交易Data失败:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [txHash]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p>加载中...</p>
      </div>
    );
  }

  if (!txData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p>未获取到数据</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">交易Data</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* 左侧原始数据 */}
        <div>
          <p className="text-gray-600 mb-2">Raw Data:</p>
          <p className="font-mono text-sm break-all bg-gray-50 p-3 rounded">
            {txData.rawData}
          </p>
        </div>

        {/* 右侧解析数据 */}
        <div>
          <div className="mb-2">
            <p className="text-gray-600">Function:</p>
            <p className="font-medium">
              {txData.functionName}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Parameters:</p>
            <div className="space-y-1 pl-4">
              <div>
                <span className="text-gray-600">to: </span>
                <span className="font-medium">
                  {txData.parameters.to}
                </span>
              </div>
              <div>
                <span className="text-gray-600">amount: </span>
                <span className="font-medium">{txData.parameters.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 