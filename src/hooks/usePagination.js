import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage, setPageSize } from "../redux/slices/tableSlice";

export const usePagination = (data) => {
  const dispatch = useDispatch();
  const { page, pageSize } = useSelector((s) => s.table.pagination);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageData = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, safePage, pageSize]);

  const goTo = (p) => dispatch(setPage(Math.max(1, Math.min(p, totalPages))));
  const changeSize = (s) => dispatch(setPageSize(s));

  return {
    page: safePage,
    pageSize,
    totalPages,
    totalRows: data.length,
    pageData,
    goTo,
    changeSize,
    goFirst: () => goTo(1),
    goLast: () => goTo(totalPages),
    goPrev: () => goTo(safePage - 1),
    goNext: () => goTo(safePage + 1),
  };
};
