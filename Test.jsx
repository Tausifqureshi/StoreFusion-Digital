setProducts({
  title: '',
  price: '',
  imageUrl: '',
  category: '',
  description: '',
  time: Timestamp.now(),
  date: new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
});

