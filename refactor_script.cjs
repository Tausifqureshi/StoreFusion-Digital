const fs = require('fs');
const path = require('path');

const CONTEXT_VAR_MAP = {
    "mode": "ThemeContext",
    "toggleMode": "ThemeContext",
    "user": "UserContext",
    "userLoading": "UserContext",
    "loggedInUser": "UserContext",
    "setLoggedInUser": "UserContext",
    "product": "ProductContext",
    "productLoading": "ProductContext",
    "getProductData": "ProductContext",
    "products": "ProductAdminContext",
    "setProducts": "ProductAdminContext",
    "loading": "ProductAdminContext",
    "setLoading": "ProductAdminContext",
    "addProduct": "ProductAdminContext",
    "updateProduct": "ProductAdminContext",
    "deleteProduct": "ProductAdminContext",
    "edithandle": "ProductAdminContext",
    "resetProductForm": "ProductAdminContext",
    "order": "OrderContext",
    "orderLoading": "OrderContext",
    "getOrderData": "OrderContext",
    "cancelOrder": "OrderContext",
    "testimonial": "TestimonialContext",
    "addTestimonial": "TestimonialContext",
    "getTestimonialData": "TestimonialContext",
    "editTestimonial": "TestimonialContext",
    "deleteTestimonial": "TestimonialContext",
    "updateTestimonial": "TestimonialContext",
    "getAvatar": "TestimonialContext",
    "testimonialForm": "TestimonialContext",
    "setTestimonialForm": "TestimonialContext",
    "searchkey": "FilterContext",
    "setSearchkey": "FilterContext",
    "filterType": "FilterContext",
    "setFilterType": "FilterContext",
    "filterPrice": "FilterContext",
    "setFilterPrice": "FilterContext",
    "sortPrice": "FilterContext",
    "setSortPrice": "FilterContext",
};

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    if (!content.includes('MyContext')) {
        return false;
    }
    
    console.log(`Processing ${filepath}...`);
    let originalLength = content.length;
    
    // Replace const { a, b } = useContext(MyContext)
    const contextRegex = /const\s+\{([^}]+)\}\s*=\s*useContext\(\s*MyContext\s*\)/g;
    
    content = content.replace(contextRegex, (match, varsStr) => {
        let varsList = varsStr.split(',').map(v => v.trim()).filter(v => v);
        let neededContexts = {};
        
        varsList.forEach(variable => {
            let baseVar = variable.split(':')[0].split('=')[0].trim();
            let ctx = CONTEXT_VAR_MAP[baseVar] || "ProductContext";
            if (!neededContexts[ctx]) neededContexts[ctx] = [];
            neededContexts[ctx].push(variable);
        });
        
        let replacementLines = [];
        for (let ctx in neededContexts) {
            replacementLines.push(`const { ${neededContexts[ctx].join(', ')} } = useContext(${ctx});`);
        }
        return replacementLines.join('\n  ');
    });
    
    // Also handle const context = useContext(MyContext)
    content = content.replace(/useContext\(\s*MyContext\s*\)/g, "useContext(ProductContext)");
    
    // Replace import
    const importRegex = /import\s+\{?\s*[a-zA-Z]*MyContext\s*\}?\s+from\s+['"]([^'"]*)['"];?/i;
    let usedContexts = new Set();
    Object.values(CONTEXT_VAR_MAP).concat(["ProductContext"]).forEach(ctx => {
        if (content.includes(`useContext(${ctx})`)) {
            usedContexts.add(ctx);
        }
    });
    
    if (usedContexts.size > 0) {
        let importStr = `import { ${Array.from(usedContexts).sort().join(', ')} } from `;
        content = content.replace(importRegex, (match, oldPath) => {
            let parts = oldPath.split('/');
            parts[parts.length - 1] = 'AllContext';
            let newPath = parts.join('/');
            return `${importStr}'${newPath}';`;
        });
    }

    if (content.length !== originalLength || usedContexts.size > 0) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated ${filepath}`);
        return true;
    }
    return false;
}

function walkDir(dir) {
    let files = fs.readdirSync(dir);
    for (let file of files) {
        let filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walkDir(filepath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            processFile(filepath);
        }
    }
}

const srcDir = path.join(__dirname, 'src');
walkDir(srcDir);
console.log("Done");
