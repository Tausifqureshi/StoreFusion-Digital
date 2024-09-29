const edithandle = (item) => {
  setProducts(item)
}
// update product
const updateProduct = async (item) => {
  setLoading(true)
  try {
    await setDoc(doc(fireDb, "products", products.id), products);
    toast.success("Product Updated successfully")
    getProductData();
    setLoading(false)
    window.location.href = '/dashboard'
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
  setProducts("")
}

const deleteProduct = async (item) => {
  try {
    setLoading(true)
    await deleteDoc(doc(fireDb, "products", item.id));
    toast.success('Product Deleted successfully')
    setLoading(false)
    getProductData()
  } catch (error) {
    // toast.success('Product Deleted Falied')
    setLoading(false)
  }
}