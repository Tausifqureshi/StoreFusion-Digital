const [order, setOrder] = useState([]);

const getOrderData = async () => {
  setLoading(true)
  try {
    const result = await getDocs(collection(fireDb, "orders"))
    const ordersArray = [];
    result.forEach((doc) => {
      ordersArray.push(doc.data());
      setLoading(false)
    });
    setOrder(ordersArray);
    console.log(ordersArray)
    setLoading(false);
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}


useEffect(() => {
  getProductData();
  getOrderData()

}, []);