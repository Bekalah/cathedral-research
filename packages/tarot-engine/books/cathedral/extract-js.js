// Extract and fix the JavaScript from the HTML file
import fs from 'fs';

const htmlFile = '/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS/cathedral/cathedral-of-circuits-main-platform.html';

console.log('🔧 Extracting JavaScript from HTML for separate fixing...');

try {
    const content = fs.readFileSync(htmlFile, 'utf8');
    
    // Extract the script content
    const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
    if (scriptMatch) {
        const jsContent = scriptMatch[1];
        
        // Save to separate JS file for easier fixing
        fs.writeFileSync('/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS/cathedral/extracted-script.js', jsContent);
        console.log('✅ JavaScript extracted to extracted-script.js');
        console.log('📝 Now you can fix this file separately and reinsert it');
    } else {
        console.log('❌ No script tag found');
    }
    
} catch (error) {
    console.error('❌ Error:', error.message);
}