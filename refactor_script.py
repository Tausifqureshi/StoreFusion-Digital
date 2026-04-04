import os
import re

CONTEXT_VAR_MAP = {
    # ThemeContext
    "mode": "ThemeContext",
    "toggleMode": "ThemeContext",
    
    # UserContext
    "user": "UserContext",
    "userLoading": "UserContext",
    "loggedInUser": "UserContext",
    "setLoggedInUser": "UserContext",
    
    # ProductContext
    "product": "ProductContext",
    "productLoading": "ProductContext",
    "getProductData": "ProductContext",
    
    # ProductAdminContext
    "products": "ProductAdminContext",
    "setProducts": "ProductAdminContext",
    "loading": "ProductAdminContext",
    "setLoading": "ProductAdminContext",
    "addProduct": "ProductAdminContext",
    "updateProduct": "ProductAdminContext",
    "deleteProduct": "ProductAdminContext",
    "edithandle": "ProductAdminContext",
    "resetProductForm": "ProductAdminContext",
    
    # OrderContext
    "order": "OrderContext",
    "orderLoading": "OrderContext",
    "getOrderData": "OrderContext",
    "cancelOrder": "OrderContext",
    
    # TestimonialContext
    "testimonial": "TestimonialContext",
    "addTestimonial": "TestimonialContext",
    "getTestimonialData": "TestimonialContext",
    "editTestimonial": "TestimonialContext",
    "deleteTestimonial": "TestimonialContext",
    "updateTestimonial": "TestimonialContext",
    "getAvatar": "TestimonialContext",
    "testimonialForm": "TestimonialContext",
    "setTestimonialForm": "TestimonialContext",
    
    # FilterContext
    "searchkey": "FilterContext",
    "setSearchkey": "FilterContext",
    "filterType": "FilterContext",
    "setFilterType": "FilterContext",
    "filterPrice": "FilterContext",
    "setFilterPrice": "FilterContext",
    "sortPrice": "FilterContext",
    "setSortPrice": "FilterContext",
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'MyContext' not in content:
        return False
        
    print(f"Processing {filepath}...")
    
    # Update standard object destruction
    use_context_pattern = re.compile(r'const\s+\{([^}]+)\}\s*=\s*useContext\(\s*MyContext\s*\)', re.MULTILINE)
    
    # We will do a full replace loop because there might be multiple useContext in one file if there are multiple components
    def replace_useContext(match):
        vars_str = match.group(1)
        vars_list = [v.strip() for v in vars_str.split(',') if v.strip()]
        needed_contexts = {}
        for var in vars_list:
            base_var = var.split(':')[0].strip().split('=')[0].strip()
            if base_var in CONTEXT_VAR_MAP:
                ctx = CONTEXT_VAR_MAP[base_var]
                if ctx not in needed_contexts:
                    needed_contexts[ctx] = []
                needed_contexts[ctx].append(var)
            else:
                # default fallback
                ctx = "ProductContext" # Or we can just log
                if ctx not in needed_contexts:
                    needed_contexts[ctx] = []
                needed_contexts[ctx].append(var)
                
        lines = []
        for ctx, vars in needed_contexts.items():
            lines.append(f"const {{ {', '.join(vars)} }} = useContext({ctx});")
        return '\n  '.join(lines)

    matches = use_context_pattern.findall(content)
    if not matches:
        # Maybe assigned to a variable: const context = useContext(MyContext)
        # We replace MyContext with ProductContext or something, just a rough fallback
        content = content.replace("useContext(MyContext)", "useContext(ProductContext)")
    else:
        content = use_context_pattern.sub(replace_useContext, content)
        
    # Replace import
    import_pattern = re.compile(r"import\s+\{?\s*[a-zA-Z]*MyContext\s*\}?\s+from\s+['\"]([^'\"]*)['\"];?", re.IGNORECASE)
    
    # Aggregate all used new contexts across the file to build that import
    used_contexts = set()
    for ctx in list(CONTEXT_VAR_MAP.values()) + ["ProductContext"]:
        if f"useContext({ctx})" in content:
            used_contexts.add(ctx)
            
    if used_contexts:
        import_str = f"import {{ {', '.join(sorted(list(used_contexts)))} }} from "
        
        def replace_import(m):
            old_path = m.group(1)
            parts = old_path.split('/')
            parts[-1] = 'AllContext'
            new_path = "/".join(parts)
            return f"{import_str}'{new_path}';"
            
        content, _ = import_pattern.subn(replace_import, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")
    return True

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx') or file.endswith('.js'):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    src_dir = r"d:\Recat-App\Complete Project\E-Commerce\src"
    walk_dir(src_dir)
    print("Done")
