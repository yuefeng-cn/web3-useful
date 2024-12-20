"use client"
import { useState } from "react";
import { useRPC } from "../context/RPCContext";
import FundFlow from "../components/FundFlow";
import Button from "../components/Button";
import { Flow } from "@/util/flow";
import TransactionInfo from "../components/TransactionInfo";
import TransactionData from "../components/TransactionData";

const flows: Flow[] = [
  {
    from: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    to: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE",
    amount: 5000000000000000,
    tokenName: "WBNB",
    token: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
  },
  {
    from: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE",
    to: "0xc5a202d380028eC0dE708a09299D30342C73fDE7",
    amount: 3572506953399170195,
    tokenName: "USDT",
    token: "0x55d398326f99059ff775485246999027b3197955",
  },
  {
    from: "0xc5a202d380028eC0dE708a09299D30342C73fDE7",
    to: "0x755223e5113F5d5041722ea2FB2082DC46832025",
    amount: 16037984720716503605,
    tokenName: "GS",
    token: "0x755223e5113f5d5041722ea2fb2082dc46832025",
  },
  {
    from: "0xc5a202d380028eC0dE708a09299D30342C73fDE7",
    to: "0x000000000000000000000000000000000000dEaD",
    amount: 1924558166485980432,
    tokenName: "GS",
    token: "0x755223e5113f5d5041722ea2fb2082dc46832025",
  },
  {
    from: "0xc5a202d380028eC0dE708a09299D30342C73fDE7",
    to: "0xD8Db782c4A3ffCb14e4928f43f01F3bC3FBe2AB0",
    amount: 302797151527127588078,
    tokenName: "GS",
    token: "0x755223e5113f5d5041722ea2fb2082dc46832025",
  },
];
export default function Home() {
  const [txHash, setTxHash] = useState("");
  const { rpcUrl, setRpcUrl } = useRPC();

  return (
    <div className="min-h-screen p-8">
      {/* 搜索区域 */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="输入RPC节点URL"
            className="flex-1 p-3 border rounded-lg"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="输入交易哈希值"
            className="flex-1 p-3 border rounded-lg"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
          />
        </div>
      </div>

      <div className="flex">
      
        <div className="w-1/2 pr-4">
          {/* 交易详情 */}
          <div className="max-w-4xl mx-auto space-y-6">
            <TransactionInfo txHash={txHash} />
            <TransactionData txHash={txHash} />
          </div>
          {/* 资金流向 */}
          <FundFlow flows={flows} />
        </div>

        {/* Event Logs */}
        <div className="w-1/2 pl-4">
          <div className="bg-white p-6 rounded-lg shadow h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Event Logs</h2>
            <div className="space-y-4">
              {/* 第一个 Log 示例 */}
              <div className="border rounded-lg p-4">
                {/* Event基本信息 */}
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 第二个 Log 示例 */}
              <div className="border rounded-lg p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Log Index:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Address:</span>
                    <span className="font-medium">0xcontract...1234</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-20">Name:</span>
                    <span className="font-medium">
                      Transfer(address indexed from, address indexed to, uint256
                      value)
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-medium mb-2">Topics:</p>
                  <div className="space-y-1 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <p className="font-medium mb-2">Data:</p>
                  <div className="space-y-2 pl-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">0:</span>
                      <span className="break-all">0x7d5e7bd8...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">1:</span>
                      <span className="break-all">0x8b3c5427...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 w-8">2:</span>
                      <span className="break-all">0x9a4f2d68...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
