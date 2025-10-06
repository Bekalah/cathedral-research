// Fix missing commas between object methods in HTML file - better approach
import fs from 'fs';

const htmlFile = '/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS/cathedral/cathedral-of-circuits-main-platform.html';

console.log('🔧 Properly fixing JavaScript method syntax in HTML file...');

try {
    // Read the file
    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // Remove any incorrect commas that were added
    content = content.replace(/,\s*\n\s*(\w+\()/g, '\n            $1');
    content = content.replace(/,\s*\n\s*(get\s+\w+\(\))/g, '\n            $1');
    
    // Fix the specific pattern: method end followed by new method start
    // Look for } followed by newlines and then a method declaration
    const fixes = [
        // Regular methods
        { pattern: /(\s+)\}\s*\n\s*(\w+\([^)]*\)\s*\{)/, replacement: '$1},\n\n            $2' },
        // Getter methods  
        { pattern: /(\s+)\}\s*\n\s*(get\s+\w+\(\)\s*\{)/, replacement: '$1},\n\n            $2' },
        // Methods with no params
        { pattern: /(\s+)\}\s*\n\s*(\w+\(\)\s*\{)/, replacement: '$1},\n\n            $2' }
    ];
    
    let fixedContent = content;
    let fixCount = 0;
    
    fixes.forEach(fix => {
        const before = fixedContent;
        fixedContent = fixedContent.replace(fix.pattern, fix.replacement);
        const matches = (before.match(fix.pattern) || []).length;
        fixCount += matches;
    });
    
    // Write the fixed content back
    fs.writeFileSync(htmlFile, fixedContent);
    
    console.log(`✅ Successfully fixed ${fixCount} method syntax issues!`);
    console.log('📁 Updated file:', htmlFile);
    
} catch (error) {
    console.error('❌ Error fixing syntax:', error.message);
}