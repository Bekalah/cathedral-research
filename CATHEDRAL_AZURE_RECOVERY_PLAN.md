# Cathedral Art & Sound Recovery Plan (Azure)

## 1. Azure Storage Setup
- Create an Azure Storage Account (Blob Storage)
- Create containers: `art-assets`, `sound-assets`

## 2. Local Asset Inventory
- Scan all local asset folders for missing/corrupted files
- Prepare a manifest of available and missing assets

## 3. Asset Upload & Backup
- Use Azure SDK to upload all valid local assets to Azure Blob Storage
- Document upload script and usage

## 4. Asset Retrieval & Fallback
- Refactor generative system to load assets from Azure if local files are missing/corrupted
- Provide sample code for asset retrieval

## 5. Documentation & Resilience
- Update system documentation to reflect Azure integration
- Add troubleshooting and recovery steps

## 6. LinkedIn Article Update
- Add a section describing the recovery, resilience, and Azure-powered installation

---

## Next Steps
- Scaffold upload/retrieval scripts
- Refactor generative code for Azure fallback
- Document everything for user transparency
