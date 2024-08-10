import React, { useState } from "react";

// Static conversion rate
const USD_TO_INR = 83;

// Methods for cost calculation
const calculateReadCost = (reads: number): number => {
  const readCostPerMillion = 0.1;
  return (reads / 1_000_000) * readCostPerMillion;
};

const calculateWriteCost = (writes: number): number => {
  const writeCostPerMillion = 1.0;
  return (writes / 1_000_000) * writeCostPerMillion;
};

const calculateStorageCost = (storageGB: number): number => {
  const storageCostPerGB = 0.25;
  return storageGB * storageCostPerGB;
};

const calculateDataTransferCost = (dataTransferMB: number): number => {
  const dataTransferCostPerGB = 0.01;
  const dataTransferGB = dataTransferMB / 1024; // Convert MB to GB
  return dataTransferGB * dataTransferCostPerGB;
};

const calculateBackupCost = (backupHours: number): number => {
  const backupCostPerHour = 2.5;
  return backupHours * backupCostPerHour;
};

const calculateTotalCost = (
  reads: number,
  writes: number,
  storageGB: number,
  dataTransferMB: number,
  standardBackup: boolean,
  continuousBackup: boolean
): number => {
  const backupHours = standardBackup ? 10 : 0; // Assuming 10 hours of backup usage if selected
  const continuousBackupCost = continuousBackup ? 0.2 * storageGB : 0;

  const readCost = calculateReadCost(reads);
  const writeCost = calculateWriteCost(writes);
  const storageCost = calculateStorageCost(storageGB);
  const dataTransferCost = calculateDataTransferCost(dataTransferMB);
  const backupCost = calculateBackupCost(backupHours);

  return (
    readCost +
    writeCost +
    storageCost +
    dataTransferCost +
    backupCost +
    continuousBackupCost
  );
};

const App: React.FC = () => {
  const [reads, setReads] = useState<number>(1000);
  const [writes, setWrites] = useState<number>(7);
  const [storageGB, setStorageGB] = useState<number>(2);
  const [dataTransferMB, setDataTransferMB] = useState<number>(200);
  const [standardBackup, setStandardBackup] = useState<boolean>(false);
  const [continuousBackup, setContinuousBackup] = useState<boolean>(false);

  const estimatedCostUSD = calculateTotalCost(
    reads,
    writes,
    storageGB,
    dataTransferMB,
    standardBackup,
    continuousBackup
  );
  const estimatedCostINR = estimatedCostUSD * USD_TO_INR;

  return (
    <>
      <div className="flex justify-center items-center  flex-col xl:flex-row-reverse min-h-screen w-full">
        <div className="w-full h-full flex mt-10 mb-10">
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-5">
            <div className="flex justify-center mb-6">
              <img
                src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-2.svg"
                alt="MongoDB"
                className="h-32"
              />
            </div>
            <h1 className="text-2xl font-bold text-center mb-6">
              MongoDB serverless Cost Estimator (Monthly Based)
            </h1>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="reads"
                  className="block text-sm font-medium text-gray-700"
                >
                  Read Operations:
                </label>
                <input
                  type="number"
                  id="reads"
                  value={reads}
                  onChange={(e) => setReads(parseInt(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="writes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Write Operations:
                </label>
                <input
                  type="number"
                  id="writes"
                  value={writes}
                  onChange={(e) => setWrites(parseInt(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="storageGB"
                  className="block text-sm font-medium text-gray-700"
                >
                  Storage (GB):
                </label>
                <input
                  type="number"
                  id="storageGB"
                  value={storageGB}
                  onChange={(e) => setStorageGB(parseInt(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="dataTransferMB"
                  className="block text-sm font-medium text-gray-700"
                >
                  Data Transfer (MB):
                </label>
                <input
                  type="number"
                  id="dataTransferMB"
                  value={dataTransferMB}
                  onChange={(e) => setDataTransferMB(parseInt(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="standardBackup"
                  className="inline-flex items-center"
                >
                  <input
                    type="checkbox"
                    id="standardBackup"
                    checked={standardBackup}
                    onChange={(e) => setStandardBackup(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Standard Backup
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="continuousBackup"
                  className="inline-flex items-center"
                >
                  <input
                    type="checkbox"
                    id="continuousBackup"
                    checked={continuousBackup}
                    onChange={(e) => setContinuousBackup(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Continuous Backup
                  </span>
                </label>
              </div>
            </form>

            <div className="text-center mt-6">
              <h2 className="text-xl font-semibold">Estimated Cost:</h2>
              <p className="text-lg text-gray-700">
                USD: ${estimatedCostUSD.toFixed(6)}
              </p>
              <p className="text-lg text-gray-700">
                INR: ₹{estimatedCostINR.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md h-screen overflow-auto w-full ">
          <p className="mb-4 text-gray-800">
            <strong>Read Processing Unit (RPU):</strong> The number of read
            operations performed and the number of documents or indexes scanned
            during those operations. <br />
            <em>
              Example: If you open a book and read 10 pages, that's like reading
              10 documents. If each page is 4KB, you'd be charged for reading
              those pages.
            </em>
          </p>
          <p className="mb-4 text-gray-800">
            <strong>Write Processing Unit (WPU):</strong> The number of write
            operations to the database, which includes writing documents and
            indexes. <br />
            <em>
              Example: If you write a letter and save it on your computer,
              that’s like writing a document to the database. If the letter is
              1KB, you'd be charged for writing it.
            </em>
          </p>
          <p className="mb-4 text-gray-800">
            <strong>Storage:</strong> The amount of data and indexes stored in
            the database. <br />
            <em>
              Example: If you have a 2GB movie saved on your computer, that’s
              similar to storing 2GB of data in the database. You pay for the
              space it takes up.
            </em>
          </p>
          <p className="mb-4 text-gray-800">
            <strong>Standard Backup:</strong> The download and restoration of
            backup snapshots of your data. Two free daily snapshots are included
            per serverless instance. <br />
            <em>
              Example: Think of this as taking a daily picture of your computer
              files so you can restore them if something goes wrong. The first
              two pictures each day are free.
            </em>
          </p>
          <p className="mb-4 text-gray-800">
            <strong>Serverless Continuous Backup:</strong> A backup service that
            keeps daily snapshots of your data for 35 days. <br />
            <em>
              Example: This is like having a security camera that records
              everything every day, and keeps those recordings for a month in
              case you need to look back at them.
            </em>
          </p>
          <p className="mb-4 text-gray-800">
            <strong>Data Transfer:</strong> The amount of data transferred to
            and from the database. This includes inbound and outbound data, and
            the cost varies depending on the source and destination of the
            traffic. <br />
            <em>
              Example: If you download a 100MB file from the internet, that’s
              like transferring 100MB of data. The cost depends on where the
              data is coming from or going to.
            </em>
          </p>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full">
            <table className="min-w-full bg-white w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                    Pricing
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Read Processing Unit (RPU)
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Number of read operations and documents scanned* per
                    operation.
                    <br />
                    <em>
                      *4KB chunks for documents, 256 byte chunks for indexes
                    </em>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    $0.10 / million for the first 50 million per day
                    <br />
                    Next 500 million: $0.05/ million
                    <br />
                    Reads thereafter: $0.01/ million
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Write Processing Unit (WPU)
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Number of write operations* to the database.
                    <br />
                    <em>*1KB chunks for documents and indexes</em>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    $1.00/million
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Storage
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Data and indexes stored on the database.
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    $0.25/GB-month
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Standard Backup
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Download and restore of backup snapshots.*
                    <br />
                    <em>
                      *2 free daily snapshots included per serverless instance
                    </em>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    $2.50/hour*
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Serverless Continuous Backup
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    35-day backup retention for daily snapshots.
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    $0.20/GB-month
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Data Transfer
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    Inbound/outbound data to/from the database.
                    <br />
                    <em>*Depending on traffic source and destination</em>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    $0.01 - $0.20/GB
                    <br />
                    Regional: $0.01 per GB
                    <br />
                    Cross-Region: $0.02 - $0.20 per GB
                    <br />
                    Public Internet: $0.09 - $0.20 per GB
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
