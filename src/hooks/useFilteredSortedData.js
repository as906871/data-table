import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "./useDebounce";


export const useFilteredSortedData = () => {
  const data = useSelector((s) => s.table.data);
  const filters = useSelector((s) => s.table.filters);
  const sort = useSelector((s) => s.table.sort);

  const debouncedGlobal = useDebounce(filters.global, 250);

  return useMemo(() => {
    let result = data;

    if (debouncedGlobal.trim()) {
      const q = debouncedGlobal.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((v) => String(v).toLowerCase().includes(q))
      );
    }

    Object.entries(filters.columns).forEach(([key, val]) => {
      if (val && val.trim()) {
        const q = val.toLowerCase();
        result = result.filter((row) => String(row[key]).toLowerCase().includes(q));
      }
    });

    if (sort.key && sort.direction) {
      result = [...result].sort((a, b) => {
        const av = a[sort.key];
        const bv = b[sort.key];
        const numA = Number(av);
        const numB = Number(bv);
        const isNum = !isNaN(numA) && !isNaN(numB);
        const cmp = isNum ? numA - numB : String(av).localeCompare(String(bv));
        return sort.direction === "asc" ? cmp : -cmp;
      });
    }

    return result;
  }, [data, debouncedGlobal, filters.columns, sort]);
};
