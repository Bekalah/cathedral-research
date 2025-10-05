// Fix missing commas between object methods in HTML file
import fs from 'fs';
import path from 'path';

const htmlFile = '/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS/cathedral/cathedral-of-circuits-main-platform.html';

console.log('🔧 Fixing JavaScript method syntax in HTML file...');

try {
    // Read the file
    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // Pattern to match method endings followed by new method declarations
    // This matches cases like:
    // }
    // 
    // methodName() {
    const methodPattern = /(\s*}\s*)\n\s*(\w+(?:\([^)]*\))?\s*{)/g;
    
    // Replace with comma after the closing brace
    const fixedContent = content.replace(methodPattern, '$1,\n\n            $2');
    
    // Also fix getter methods specifically
    const getterPattern = /(\s*}\s*)\n\s*(get\s+\w+\(\)\s*{)/g;
    const finalContent = fixedContent.replace(getterPattern, '$1,\n\n            $2');
    
    // Write the fixed content back
    fs.writeFileSync(htmlFile, finalContent);
    
    console.log('✅ Successfully fixed method syntax!');
    console.log('📁 Updated file:', htmlFile);
    
} catch (error) {
    console.error('❌ Error fixing syntax:', error.message);
}