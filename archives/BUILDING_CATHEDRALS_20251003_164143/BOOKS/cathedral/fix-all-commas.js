// Comprehensive fix for ALL missing commas between object methods
import fs from 'fs';

const htmlFile = '/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS/cathedral/cathedral-of-circuits-main-platform.html';

console.log('🔧 Comprehensively fixing ALL JavaScript method syntax errors...');

try {
    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // Split into lines for easier processing
    const lines = content.split('\n');
    const fixedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i];
        const nextLine = lines[i + 1];
        const nextNextLine = lines[i + 2];
        
        // Look for pattern: } followed by method declaration
        if (currentLine.trim() === '}' && 
            nextLine && nextLine.trim() === '' &&
            nextNextLine && nextNextLine.match(/^\s+(get\s+\w+\(\)|[\w]+\([^)]*\))\s*\{/)) {
            
            // Add comma to current line
            fixedLines.push(currentLine.replace('}', '},'));
        } else if (currentLine.trim() === '}' && 
                   nextLine && nextLine.match(/^\s+(get\s+\w+\(\)|[\w]+\([^)]*\))\s*\{/)) {
            
            // Add comma to current line (no empty line between)
            fixedLines.push(currentLine.replace('}', '},'));
        } else {
            fixedLines.push(currentLine);
        }
    }
    
    const fixedContent = fixedLines.join('\n');
    
    // Count how many fixes were made
    const originalCommas = (content.match(/},/g) || []).length;
    const fixedCommas = (fixedContent.match(/},/g) || []).length;
    const fixesMade = fixedCommas - originalCommas;
    
    // Write the fixed content back
    fs.writeFileSync(htmlFile, fixedContent);
    
    console.log(`✅ Successfully added ${fixesMade} missing commas!`);
    console.log('📁 Updated file:', htmlFile);
    
} catch (error) {
    console.error('❌ Error fixing syntax:', error.message);
}