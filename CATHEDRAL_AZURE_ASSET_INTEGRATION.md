# Cathedral Azure Asset Integration

## How to Upload Art/Sound Assets
1. Set your Azure Storage connection string:
   ```sh
   export AZURE_STORAGE_CONNECTION_STRING="<your-connection-string>"
   ```
2. Run the upload script:
   ```sh
   node tools/azureUpload.js assets/images art-assets
   node tools/azureUpload.js assets/audio sound-assets
   ```

## How to Load Assets in Code
- Use the provided loader:
   ```js
   const { getAzureAssetUrl } = require('./tools/azureAssetLoader');
   const url = getAzureAssetUrl('my-art.png', 'art-assets');
   // Use url in your app (img src, audio src, etc.)
   ```

## Fallback Logic Example
```js
function loadAsset(assetName, containerName, localPath) {
  const fs = require('fs');
  if (fs.existsSync(localPath)) {
    return localPath;
  } else {
    const { getAzureAssetUrl } = require('./tools/azureAssetLoader');
    return getAzureAssetUrl(assetName, containerName);
  }
}
```

## Troubleshooting
- If your computer freezes or assets are missing, you can always recover from Azure.
- All uploads are backed up in the cloud for resilience.

## Next Steps
- Upload your real art and sound files to Azure for permanent recovery.
- Refactor your generative system to use this fallback logic.
