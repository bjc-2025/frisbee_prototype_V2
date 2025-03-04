import React, { useState } from 'react';

const AnimalProfilePage = () => {
  const [status, setStatus] = useState("active");
  const [price, setPrice] = useState("");
  const [lockedPrice, setLockedPrice] = useState("");
  const [isEditingPedigree, setIsEditingPedigree] = useState(false);
  const [isEditingEBVs, setIsEditingEBVs] = useState(false);

  // New states for "Assign To Client"
  const [clientInput, setClientInput] = useState("");
  const [assignedClient, setAssignedClient] = useState("");

  // Dummy client list for auto-complete
  const clients = ["Acme Corp", "Beta Inc", "Gamma LLC", "Delta Solutions"];

  // Pedigree data state (as before)
  const [pedigreeData, setPedigreeData] = useState({
    sireName: "Summit NMMS213",
    sirePaternalName: "Quest NMMQ295",
    sirePaternalPaternal: "Neptune NMMP362",
    sirePaternalMaternal: "Queen 308 NMMQ175",
    damName: "Diamond 347 NMMQ196",
    damPaternal: "Prophet NMMP342",
    damMaternal: "Duchess 212 NMMP215",
    dam2Name: "Lady 401 NMMR218",
    dam2PaternalName: "Ranger NMMR258",
    dam2PaternalPaternal: "Pinnacle NMMP335",
    dam2PaternalMaternal: "Pearl 660 NMMQ204",
    dam2MaternalName: "Legacy 125 NMMR102",
    dam2MaternalPaternal: "Patriot NMMP368",
    dam2MaternalMaternal: "Rose 285 NMMP243",
  });

  // EBV data state (as before)
  const [ebvData, setEbvData] = useState({
    ebv: ["EBV", "+3.2", "+2.8", "-4.1", "+4.2", "+45", "+82", "+106", "+92", "+14", "+1.8", "+0.6", "+62", "+8.4", "-0.8", "-1.2", "+2.1", "+2.6", "-0.46"],
    acc: ["ACC", "65%", "60%", "78%", "84%", "85%", "84%", "81%", "74%", "72%", "78%", "51%", "76%", "74%", "72%", "72%", "68%", "66%", "62%"],
    rank: ["#Rank", "28", "32", "46", "54", "18", "22", "14", "38", "56", "26", "72", "16", "12", "58", "64", "32", "24", "18"],
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-green-800">Animal ID: NMMT001</h1>
          <span className="ml-2 text-xl font-semibold">Thunder</span>
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="py-2 px-4 border rounded-md text-sm"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              // Reset sold-related info when status changes
              if (e.target.value !== "sold") {
                setLockedPrice("");
                setPrice("");
                setAssignedClient("");
                setClientInput("");
              }
            }}
          >
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="assignToSale2025">Assign to Sale 2025</option>
          </select>
          {status === "sold" && (
            <div>
              <input
                type="text"
                placeholder="Assign To Client"
                value={clientInput}
                onChange={(e) => setClientInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && clientInput.trim() !== "") {
                    setAssignedClient(clientInput.trim());
                    setClientInput("");
                  }
                }}
                list="clientList"
                className="py-2 px-4 border rounded-md text-sm"
              />
              <datalist id="clientList">
                {clients.map((client) => (
                  <option key={client} value={client} />
                ))}
              </datalist>
            </div>
          )}
          {status === "assignToSale2025" && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
              Create sharable link
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row p-4 bg-gray-100 overflow-auto">
        {/* Left Section - Image and Details */}
        <div className="md:w-2/3 mb-4 md:mb-0 md:pr-4">
          {/* Animal Image */}
          <div className="bg-white rounded-lg overflow-hidden mb-4 relative">
            <div className="bg-gray-300 h-96 flex items-center justify-center relative">
              <img
                src="/Images/Ascot-Bull.jpg"
                alt="Thunder"
                className="w-full h-full object-cover"
              />
              <button className="absolute inset-0 m-auto w-16 h-16 bg-green-600 bg-opacity-80 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 flex flex-col">
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">NMMT001 Thunder</div>
                {status === "sold" && lockedPrice && (
                  <div className="text-green-600 font-semibold">
                    ${lockedPrice}
                  </div>
                )}
              </div>
              {/* Removed Assigned Client display from here */}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Notes</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">
                New Note
              </button>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-gray-700">
                Thunder is one of our top performing bulls with excellent temperament and structural soundness.
                His calves have shown exceptional growth rates and carcass quality.
                Due to his balanced EBVs, he's suited for both heifer mating and producing high-quality steers.
              </p>
            </div>
          </div>

          {/* EBV Table */}
          <div className="bg-white rounded-lg p-4 overflow-x-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">EBV Updates 15/02/2025</h2>
              <button
                onClick={() => setIsEditingEBVs(!isEditingEBVs)}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                {isEditingEBVs ? "Save EBV's" : "Edit EBV's"}
              </button>
            </div>
            <table className="min-w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-1 border">EBV</th>
                  <th className="p-1 border">CE-Dir</th>
                  <th className="p-1 border">CE-Dtrs</th>
                  <th className="p-1 border">GL</th>
                  <th className="p-1 border">BW</th>
                  <th className="p-1 border">200D</th>
                  <th className="p-1 border">400D</th>
                  <th className="p-1 border">600D</th>
                  <th className="p-1 border">MCW</th>
                  <th className="p-1 border">Milk</th>
                  <th className="p-1 border">SS</th>
                  <th className="p-1 border">DC</th>
                  <th className="p-1 border">CWT</th>
                  <th className="p-1 border">EMA</th>
                  <th className="p-1 border">Rib</th>
                  <th className="p-1 border">P8</th>
                  <th className="p-1 border">RBY</th>
                  <th className="p-1 border">IMF</th>
                  <th className="p-1 border">NFI-F</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {ebvData.ebv.map((cell, index) => (
                    <td key={index} className="p-1 border text-center font-semibold">
                      {isEditingEBVs && index !== 0 ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            const newEbv = [...ebvData.ebv];
                            newEbv[index] = e.target.value;
                            setEbvData({ ...ebvData, ebv: newEbv });
                          }}
                          className="w-full text-center"
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  {ebvData.acc.map((cell, index) => (
                    <td key={index} className="p-1 border text-center">
                      {isEditingEBVs && index !== 0 ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            const newAcc = [...ebvData.acc];
                            newAcc[index] = e.target.value;
                            setEbvData({ ...ebvData, acc: newAcc });
                          }}
                          className="w-full text-center"
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  {ebvData.rank.map((cell, index) => (
                    <td key={index} className="p-1 border text-center">
                      {isEditingEBVs && index !== 0 ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            const newRank = [...ebvData.rank];
                            newRank[index] = e.target.value;
                            setEbvData({ ...ebvData, rank: newRank });
                          }}
                          className="w-full text-center"
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="grid grid-cols-4 mt-4 gap-4 text-sm">
              <div className="bg-gray-100 p-2 rounded text-center">
                <div className="font-semibold">$222</div>
                <div className="text-xs text-gray-600">$Index</div>
              </div>
              <div className="bg-gray-100 p-2 rounded text-center">
                <div className="font-semibold">$316</div>
                <div className="text-xs text-gray-600">$A</div>
              </div>
              <div className="bg-gray-100 p-2 rounded text-center">
                <div className="font-semibold">$184</div>
                <div className="text-xs text-gray-600">$L</div>
              </div>
              <div className="bg-gray-100 p-2 rounded text-center">
                <div className="font-semibold">$218</div>
                <div className="text-xs text-gray-600">$GN</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Info and Pedigree */}
        <div className="md:w-1/3">
          {/* Animal Info Card */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <table className="min-w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Reg. No.</td>
                  <td className="py-2 font-semibold text-right">NMMT001</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Born</td>
                  <td className="py-2 font-semibold text-right">12/04/22</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Birth Weight</td>
                  <td className="py-2 font-semibold text-right">42kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Weight on The Farm</td>
                  <td className="py-2 font-semibold text-right">780kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Weight as of 21/08/24</td>
                  <td className="py-2 font-semibold text-right">846kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Scrotal Size</td>
                  <td className="py-2 font-semibold text-right">42cm</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Status</td>
                  <td className="py-2 font-semibold text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      status === "active"
                        ? "bg-green-100 text-green-800"
                        : status === "sold"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {status === "active"
                        ? "Active"
                        : status === "sold"
                        ? "Sold"
                        : "Upcoming Sale"}
                    </span>
                  </td>
                </tr>
                {status === "sold" && (
                  <tr className="border-t">
                    <td className="py-2 text-gray-600">Price</td>
                    <td className="py-2 font-semibold text-right">
                      {lockedPrice ? (
                        <span>${lockedPrice}</span>
                      ) : (
                        <input
                          type="text"
                          placeholder="Enter sold price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && price) {
                              setLockedPrice(price);
                            }
                          }}
                          className="text-right border rounded px-2 py-1 text-sm"
                        />
                      )}
                    </td>
                  </tr>
                )}
                {status === "sold" && assignedClient && (
                  <tr className="border-t">
                    <td className="py-2 text-gray-600">Assigned Client</td>
                    <td className="py-2 font-semibold text-right">{assignedClient}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pedigree Section */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Pedigree</h2>
              <button
                onClick={() => setIsEditingPedigree(!isEditingPedigree)}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                {isEditingPedigree ? "Save Pedigree" : "Edit Pedigree"}
              </button>
            </div>
            {/* First pedigree block */}
            <div className="border p-3 mb-3 text-sm">
              {isEditingPedigree ? (
                <div>
                  <div>
                    <label className="font-medium">Sire:</label>
                    <input
                      type="text"
                      value={pedigreeData.sireName}
                      onChange={(e) =>
                        setPedigreeData({ ...pedigreeData, sireName: e.target.value })
                      }
                      className="ml-2 border rounded px-1"
                    />
                  </div>
                  <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                    <div>
                      <label className="font-medium">Sire:</label>
                      <input
                        type="text"
                        value={pedigreeData.sirePaternalName}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, sirePaternalName: e.target.value })
                        }
                        className="ml-2 border rounded px-1"
                      />
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <input
                        type="text"
                        value={pedigreeData.sirePaternalPaternal}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, sirePaternalPaternal: e.target.value })
                        }
                        className="border rounded px-1"
                      />
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <input
                        type="text"
                        value={pedigreeData.sirePaternalMaternal}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, sirePaternalMaternal: e.target.value })
                        }
                        className="border rounded px-1"
                      />
                    </div>
                  </div>
                  <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                    <div>
                      <label className="font-medium">Dam:</label>
                      <input
                        type="text"
                        value={pedigreeData.damName}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, damName: e.target.value })
                        }
                        className="ml-2 border rounded px-1"
                      />
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <input
                        type="text"
                        value={pedigreeData.damPaternal}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, damPaternal: e.target.value })
                        }
                        className="border rounded px-1"
                      />
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <input
                        type="text"
                        value={pedigreeData.damMaternal}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, damMaternal: e.target.value })
                        }
                        className="border rounded px-1"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">Sire: {pedigreeData.sireName}</div>
                  <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                    <div className="font-medium">Sire: {pedigreeData.sirePaternalName}</div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <div>{pedigreeData.sirePaternalPaternal}</div>
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <div>{pedigreeData.sirePaternalMaternal}</div>
                    </div>
                  </div>
                  <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                    <div className="font-medium">Dam: {pedigreeData.damName}</div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <div>{pedigreeData.damPaternal}</div>
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <div>{pedigreeData.damMaternal}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Second pedigree block */}
            <div className="border p-3 text-sm">
              {isEditingPedigree ? (
                <div>
                  <div>
                    <label className="font-medium">Dam:</label>
                    <input
                      type="text"
                      value={pedigreeData.dam2Name}
                      onChange={(e) =>
                        setPedigreeData({ ...pedigreeData, dam2Name: e.target.value })
                      }
                      className="ml-2 border rounded px-1"
                    />
                  </div>
                  <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                    <div>
                      <label className="font-medium">Sire:</label>
                      <input
                        type="text"
                        value={pedigreeData.dam2PaternalName}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, dam2PaternalName: e.target.value })
                        }
                        className="ml-2 border rounded px-1"
                      />
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <input
                        type="text"
                        value={pedigreeData.dam2PaternalPaternal}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, dam2PaternalPaternal: e.target.value })
                        }
                        className="border rounded px-1"
                      />
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <input
                        type="text"
                        value={pedigreeData.dam2PaternalMaternal}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, dam2PaternalMaternal: e.target.value })
                        }
                        className="border rounded px-1"
                      />
                    </div>
                  </div>
                  <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                    <div>
                      <label className="font-medium">Dam:</label>
                      <input
                        type="text"
                        value={pedigreeData.dam2MaternalName}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, dam2MaternalName: e.target.value })
                        }
                        className="ml-2 border rounded px-1"
                      />
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <input
                        type="text"
                        value={pedigreeData.dam2MaternalPaternal}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, dam2MaternalPaternal: e.target.value })
                        }
                        className="border rounded px-1"
                      />
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <input
                        type="text"
                        value={pedigreeData.dam2MaternalMaternal}
                        onChange={(e) =>
                          setPedigreeData({ ...pedigreeData, dam2MaternalMaternal: e.target.value })
                        }
                        className="border rounded px-1"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">Dam: {pedigreeData.dam2Name}</div>
                  <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                    <div className="font-medium">Sire: {pedigreeData.dam2PaternalName}</div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <div>{pedigreeData.dam2PaternalPaternal}</div>
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <div>{pedigreeData.dam2PaternalMaternal}</div>
                    </div>
                  </div>
                  <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                    <div className="font-medium">Dam: {pedigreeData.dam2MaternalName}</div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <div>{pedigreeData.dam2MaternalPaternal}</div>
                    </div>
                    <div className="ml-4 mt-1 border-l-2 pl-2 border-gray-300">
                      <div>{pedigreeData.dam2MaternalMaternal}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfilePage;