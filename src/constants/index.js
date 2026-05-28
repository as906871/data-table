
export const COLUMNS = [
  { key: "id",         label: "ID",         type: "number",  editable: false, width: 70  },
  { key: "name",       label: "Name",        type: "text",    editable: true,  width: 180 },
  { key: "email",      label: "Email",       type: "text",    editable: true,  width: 220 },
  { key: "department", label: "Department",  type: "text",    editable: true,  width: 150 },
  { key: "salary",     label: "Salary",      type: "number",  editable: true,  width: 120 },
  { key: "quantity",   label: "Qty",         type: "number",  editable: true,  width: 90  },
  { key: "status",     label: "Status",      type: "select",  editable: true,  width: 110 },
];

export const STATUS_OPTIONS = ["Active", "Inactive", "Pending", "On Leave"];

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const SORT_DIRECTIONS = { ASC: "asc", DESC: "desc", NONE: null };

export const VIEW_MODES = { VIRTUAL: "virtual", PAGINATED: "paginated" };

export const STORAGE_KEY = "adt_table_state";
