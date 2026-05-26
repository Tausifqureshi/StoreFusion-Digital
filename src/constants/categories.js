/**
 * 🏷️ CENTRALIZED CATEGORIES CONFIGURATION
 * 
 * Logic: Ye file humari app ki saari categories aur subcategories ka single source of truth hai.
 * Isse Navbar aur Filters fast load hote hain kyunki unhe DB ka intezar nahi karna padta.
 */

export const CATEGORIES = [
  { 
    name: "Electronic", 
    subcategories: ["Mobile", "Laptop", "Accessories", "Watche", "Headphones", "Refrigerator"]
  },
  {
    name: "Fashion",
    subcategories: ["Shirt", "Jacket", "Jeans", "T-Shirt", "Shoes"]
  },
  {
    name: "Home",
    subcategories: ["Bedding", "Decor", "Kitchen", "Furniture"]
  },
  {
    name: "Beauty",
    subcategories: ["Skincare", "Makeup", "Fragrance"]
  },
  {
    name: "Sports",
    subcategories: ["Fitness", "Outdoor", "Equipment"]
  }
];

// 💡 Helper to get flat list of category names (uppercase for consistency)
export const CATEGORY_NAMES = CATEGORIES.map(c => c.name.toUpperCase());

// 💡 Helper to get all subcategories across all categories
export const ALL_SUBCATEGORIES = CATEGORIES.reduce((acc, curr) => {
  return [...acc, ...curr.subcategories];
}, []);
