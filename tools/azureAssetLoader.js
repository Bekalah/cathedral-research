// azureAssetLoader.js - Load art/sound assets from Azure Blob Storage
// Usage: Call getAzureAssetUrl(assetName, containerName)

const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) throw new Error('Missing AZURE_STORAGE_CONNECTION_STRING env var');

function getAzureAssetUrl(assetName, containerName) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(assetName);
  return blobClient.url;
}

module.exports = { getAzureAssetUrl };
