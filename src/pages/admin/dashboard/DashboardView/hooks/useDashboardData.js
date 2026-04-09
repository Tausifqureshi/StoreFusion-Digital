import { useState, useMemo, useEffect, useCallback, useRef } from 'react';

export const useDashboardData = (allProducts, allOrders, allUsers, selectedRange, calendarDate) => {
  // 👉 External range and date are now passed as parameters to ensure sync across components

  // 👉 Ye function array ko date aur selected range ke hisaab se filter karega
  const filterByDate = useCallback((items) => {
    // 👉 Agar data khali hai to blank array return kardo
    if (!items || items.length === 0) return [];

    // 👉 Agar user ne "All Time" select kiya hai to filter mat lagao, seedha sab return kardo
    if (selectedRange === "All Time") return items;

    // 👉 Calendar wali date ko base maan ke end of the day set kar rahe hain
    const anchorTime = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate(), 23, 59, 59, 999).getTime();
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
  }, [selectedRange, calendarDate]);
  // 👉 Hum refs use kar rahe hain taake parent render hone pe bhi references stable rahein
  const lastOrder = useRef([]);
  const lastProduct = useRef([]);
  const lastUser = useRef([]);

  const order = useMemo(() => {
    const filtered = filterByDate(allOrders || []);
    // 👉 Deep check: agar data badla nahi hai toh purana reference hi return kardo
    const isSame = lastOrder.current.length === filtered.length && 
                   filtered.every((item, i) => item.id === lastOrder.current[i]?.id);
    if (!isSame) lastOrder.current = filtered;
    return lastOrder.current;
  }, [allOrders, filterByDate]);

  const product = useMemo(() => {
    const filtered = filterByDate(allProducts || []);
    const isSame = lastProduct.current.length === filtered.length && 
                   filtered.every((item, i) => item.id === lastProduct.current[i]?.id);
    if (!isSame) lastProduct.current = filtered;
    return lastProduct.current;
  }, [allProducts, filterByDate]);

  const user = useMemo(() => {
    const filtered = filterByDate(allUsers || []);
    const isSame = lastUser.current.length === filtered.length;
    if (!isSame) lastUser.current = filtered;
    return lastUser.current;
  }, [allUsers, filterByDate]);

  const [monthlyOrders, setMonthlyOrders] = useState(Array(12).fill(0)); // 🟡 Page load pe chart zero se start karo — data aane se pehle kuch show na ho
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0)); // 🟡 Page load pe revenue chart zero se start karo — data aane se pehle kuch show na ho

  // -------------------------------------------------------------------------
  // USER EXACT USE-EFFECT LOGIC PRESERVED BELOW
  // -------------------------------------------------------------------------
  useEffect(() => {

    // 👉 agar order empty hai ya undefined hai to chart ke arrays ko khali (zero) kardo
    if (!order || order.length === 0) {
      setMonthlyOrders(Array(12).fill(0));  // 🔴 Order empty hai → chart wapas zero pe reset karo, purana data mat dikhao
      setMonthlyRevenue(Array(12).fill(0)); // 🔴 Order empty hai → revenue chart bhi zero pe reset karo, purana data mat dikhao
      return;
    }

    // 👉 12 months ke liye array bana rahe hain (Jan–Dec)
    // har index ek month ko represent karega (0 = Jan, 11 = Dec)
    const ordersCount = Array(12).fill(0);   // 🟢 Data aa gaya — 12 months ke liye fresh khali array, orders count yahan store hoga
    const revenueAcc = Array(12).fill(0);    // 🟢 Data aa gaya — 12 months ke liye fresh khali array, revenue amount yahan store hoga

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

    // 👉 Final data state mein tabhi save hoga jab koi change milega
    setMonthlyOrders(prev => {
      return prev.join(',') === ordersCount.join(',') ? prev : ordersCount;
    });
    setMonthlyRevenue(prev => {
      return prev.join(',') === revenueAcc.join(',') ? prev : revenueAcc;
    });

    // 👉 Ye code sirf tab dobara chalega jab "order" array badlega
  }, [order]);
  // -------------------------------------------------------------------------

  const totalRevenue = useMemo(() => monthlyRevenue.reduce((a, b) => a + b, 0), [monthlyRevenue]);
  const newDiscounts = useMemo(() => product?.filter(p => p.discount)?.length || 0, [product]);

  return {
    selectedRange, setSelectedRange,
    calendarDate, setCalendarDate,
    order, product, user,
    monthlyOrders, monthlyRevenue,
    totalRevenue, newDiscounts
  };
};





