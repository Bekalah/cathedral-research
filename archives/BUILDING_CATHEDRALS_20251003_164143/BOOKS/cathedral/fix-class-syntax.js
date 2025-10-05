// Fix the syntax by removing commas from class methods and keeping them only for object literals
import fs from 'fs';

const htmlFile = '/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS/cathedral/cathedral-of-circuits-main-platform.html';

console.log('🔧 Fixing class method vs object literal syntax...');

try {
    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // Remove commas after class method closing braces
    // Class methods should NOT have commas, object properties should
    
    // Pattern: }, followed by method name (
    content = content.replace(/(\s*)\},(\s*\n\s*)([\w]+\([^)]*\)\s*\{)/g, '$1}$2$3');
    content = content.replace(/(\s*)\},(\s*\n\s*)(get\s+[\w]+\(\)\s*\{)/g, '$1}$2$3');
    
    // Write the fixed content back
    fs.writeFileSync(htmlFile, content);
    
    console.log('✅ Successfully fixed class method syntax!');
    console.log('📁 Updated file:', htmlFile);
    
} catch (error) {
    console.error('❌ Error fixing syntax:', error.message);
}