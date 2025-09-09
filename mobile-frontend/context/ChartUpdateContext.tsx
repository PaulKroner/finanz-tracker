import { createContext, useContext, useState } from "react";

type ChartUpdateContextType = {
  trigger: number;
  refresh: () => void;
};

const ChartUpdateContext = createContext<ChartUpdateContextType | undefined>(undefined);

export const useChartUpdate = () => {
  const context = useContext(ChartUpdateContext);
  if (!context) {
    throw new Error("useChartUpdate must be used within a ChartUpdateProvider");
  }
  return context;
};

export const ChartUpdateProvider = ({ children }: { children: React.ReactNode }) => {
  const [trigger, setTrigger] = useState(0);
  const refresh = () => setTrigger((prev) => prev + 1);

  return (
    <ChartUpdateContext.Provider value={{ trigger, refresh }}>
      {children}
    </ChartUpdateContext.Provider>
  );
};
