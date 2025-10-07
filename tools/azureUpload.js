// azureUpload.js - Upload local art/sound assets to Azure Blob Storage
// Usage: node azureUpload.js <localAssetFolder> <containerName>

const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');
const fs = require('fs');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) throw new Error('Missing AZURE_STORAGE_CONNECTION_STRING env var');

async function uploadFolder(localFolder, containerName) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  const files = fs.readdirSync(localFolder);
  for (const file of files) {
    const filePath = path.join(localFolder, file);
    if (fs.statSync(filePath).isFile()) {
      const blockBlobClient = containerClient.getBlockBlobClient(file);
      await blockBlobClient.uploadFile(filePath);
      console.log(`Uploaded: ${file}`);
    }
  }
}

const [,, localFolder, containerName] = process.argv;
if (!localFolder || !containerName) {
  console.error('Usage: node azureUpload.js <localAssetFolder> <containerName>');
  process.exit(1);
}

uploadFolder(localFolder, containerName).then(() => {
  console.log('Upload complete.');
}).catch(err => {
  console.error('Error:', err);
});
