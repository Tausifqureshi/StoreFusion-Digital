// ✅ CENTRALIZED TAILWIND UTILITIES: Eliminate repetitive strings and bundle waste
export const cardClasses = {
  containerLight: "bg-white border-gray-100 shadow-xl shadow-gray-200/50",
  containerDark: "bg-[#1e293b] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
  baseContainer: "rounded-[30px] border transition-all overflow-hidden flex flex-col relative z-10",
};

export const buttonClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 active:scale-95 transition-all",
  secondaryLight: "border-gray-200 text-gray-500 hover:bg-gray-100",
  secondaryDark: "border-gray-700 text-gray-400 hover:bg-gray-800",
  base: "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300",
};

export const textClasses = {
  h1: "text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none",
  h2: "text-2xl font-black uppercase tracking-tighter",
  subtitle: "text-[10px] font-bold uppercase tracking-widest",
};

export const getCardClasses = (isDark) => {
  return `${cardClasses.baseContainer} ${isDark ? cardClasses.containerDark : cardClasses.containerLight}`;
};
