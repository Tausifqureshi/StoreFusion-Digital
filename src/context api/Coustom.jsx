<p className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
{`Total items: ${cartItems.reduce((total, item) => total + item.quantity, 0)}`}
{quantity}
</p>