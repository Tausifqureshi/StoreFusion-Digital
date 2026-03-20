import { useState, useMemo, useEffect, useCallback } from 'react';

export const useDashboardData = (allProducts, allOrders, allUsers) => {
  // 👉 Default range 'All Time' set kar diya, taake refresh pe saara data show ho
  const [selectedRange, setSelectedRange] = useState("All Time");
  const [selectedDate, setSelectedDate] = useState(new Date("2026-03-20"));

  // 👉 Ye function array ko date aur selected range ke hisaab se filter karega
  const filterByDate = useCallback((items) => {
    // 👉 Agar data khali hai to blank array return kardo
    if (!items || items.length === 0) return [];
    
    // 👉 Agar user ne "All Time" select kiya hai to filter mat lagao, seedha sab return kardo
    if (selectedRange === "All Time") return items;

    // 👉 Calendar wali date ko base maan ke end of the day set kar rahe hain
    const anchorTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59, 999).getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    
    // 👉 Check kar rahe hain ki kitne din peeche ka data chahiye
    let daysToSubtract = 0;
    if (selectedRange === "Last 7 days") daysToSubtract = 7;
    else if (selectedRange === "Last 30 days") daysToSubtract = 30;
    else if (selectedRange === "Last 90 days") daysToSubtract = 90;
    else if (selectedRange === "Last year") daysToSubtract = 365;
    else if (selectedRange === "Today") daysToSubtract = 1;

    // 👉 Threshold nikal rahe hain jaha tak history check karni hai
    const thresholdTime = anchorTime - (daysToSubtract * oneDay);

    // 👉 Final return jo dates match karegi us limit ke andar
    return items.filter(item => {
      const itemDate = new Date(item.date || item.createdAt || item.time || Date.now()).getTime();
      return itemDate >= thresholdTime && itemDate <= anchorTime; 
    });
  }, [selectedRange, selectedDate]);

  const order = useMemo(() => filterByDate(allOrders || []), [allOrders, filterByDate]);
  const product = useMemo(() => filterByDate(allProducts || []), [allProducts, filterByDate]);
  const user = useMemo(() => filterByDate(allUsers || []), [allUsers, filterByDate]);

  const [monthlyOrders, setMonthlyOrders] = useState(Array(12).fill(0));
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0));

  // -------------------------------------------------------------------------
  // USER EXACT USE-EFFECT LOGIC PRESERVED BELOW
  // -------------------------------------------------------------------------
  useEffect(() => {

    // 👉 agar order empty hai ya undefined hai to kuch mat karo
    if (!order || order.length === 0) return;

    // 👉 12 months ke liye array bana rahe hain (Jan–Dec)
    // har index ek month ko represent karega (0 = Jan, 11 = Dec)
    const ordersCount = Array(12).fill(0);   // orders count store karega
    const revenueAcc = Array(12).fill(0);    // revenue store karega

    // 👉 har order pe loop chala rahe hain
    order.forEach((item) => {

      // 👉 order ki date nikal rahe hain
      // agar item.date hai to use karo, warna createdAt use karo
      const date = new Date(item.date || item.createdAt);

      // 👉 agar date invalid hai to us order ko skip karo
      if (isNaN(date)) return;

      // 👉 month nikal rahe hain (0 = Jan, 1 = Feb ... 11 = Dec)
      const month = date.getMonth();

      // 👉 us month ke index pe order count +1 kar rahe hain
      ordersCount[month]++;

      // 👉 amount nikal rahe hain (jo bhi field available ho)
      const amount = Number(
        item.grandTotal || item.totalAmount || item.price || 0
      );

      // 👉 us month me revenue add kar rahe hain
      revenueAcc[month] += amount; //revenueAcc[month] += amount ka matlab hai — us month ke box me amount add kar do
    });

    // 👉 final calculated data state me save kar rahe hain
    setMonthlyOrders(ordersCount);   // chart ke liye orders data
    setMonthlyRevenue(revenueAcc);   // chart ke liye revenue data

    // 👉 ye code sirf tab chalega jab "order" change hoga
  }, [order]);
  // -------------------------------------------------------------------------

  const totalRevenue = useMemo(() => monthlyRevenue.reduce((a, b) => a + b, 0), [monthlyRevenue]);
  const newDiscounts = useMemo(() => product?.filter(p => p.discount)?.length || 0, [product]);

  return {
    selectedRange, setSelectedRange,
    selectedDate, setSelectedDate,
    order, product, user,
    monthlyOrders, monthlyRevenue,
    totalRevenue, newDiscounts
  };
};
