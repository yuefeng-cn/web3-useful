import FundFlow from '../components/FundFlow';

export default function Home() {
  // 示例数据
  const transfers = [
    {
      from: "A",
      to: "B",
      amount: "100",
      token: {
        address: "U",
        symbol: "USDT"
      }
    },
    {
      from: "B",
      to: "A",
      amount: "99",
      token: {
        address: "U",
        symbol: "USDT"
      }
    }
  ];

  return (
    <div className="min-h-screen p-8">
      {/* 搜索区域 */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="输入交易哈希值"
            className="flex-1 p-3 border rounded-lg"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            查询
          </button>
        </div>
      </div>

      {/* 交易详情 */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 基本信息 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">交易详情</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              <p className="text-gray-600">交易状态:</p>
              <p className="font-medium">成功</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-600">交易时间:</p>
              <p className="font-medium">2024-03-20 14:30:45</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-600">区块高度:</p>
              <p className="font-medium">18234567</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-600">区块哈希:</p>
              <p className="font-medium truncate">0x1234...5678</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-600">From:</p>
              <p className="font-medium truncate">0xabcd...efgh</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-600">To:</p>
              <p className="font-medium truncate">0xijkl...mnop</p>
            </div>
          </div>
        </div>

        {/* 交易Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">交易Data</h2>
          <div className="grid grid-cols-2 gap-6">
            {/* 左侧原始数据 */}
            <div>
              <p className="text-gray-600 mb-2">Raw Data:</p>
              <p className="font-mono text-sm break-all bg-gray-50 p-3 rounded">
                0xa9059cbb000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266000000000000000000000000000000000000000000000000000000000000000a
              </p>
            </div>

            {/* 右侧解析数据 */}
            <div>
              <div className="mb-2">
                <p className="text-gray-600">Function:</p>
                <p className="font-medium">transfer(address to, uint256 amount)</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Parameters:</p>
                <div className="space-y-1 pl-4">
                  <div>
                    <span className="text-gray-600">to: </span>
                    <span className="font-medium">0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266</span>
                  </div>
                  <div>
                    <span className="text-gray-600">amount: </span>
                    <span className="font-medium">10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Logs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Event Logs</h2>
          <div className="space-y-4">
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
                  <span className="font-medium">Transfer(address indexed from, address indexed to, uint256 value)</span>
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
                  <span className="font-medium">Transfer(address indexed from, address indexed to, uint256 value)</span>
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

         <FundFlow transfers={transfers} />

      </div>
    </div>
  );
}