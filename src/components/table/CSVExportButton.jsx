import React, { useCallback } from "react";
import { RiDownloadLine } from "react-icons/ri";
import { exportToCSV } from "../../utils/csvExport";
import { Button } from "../common/Button";

export const CSVExportButton = React.memo(({ filteredData }) => {
  const handleExport = useCallback(
    () => exportToCSV(filteredData, "export.csv"),
    [filteredData]
  );

  return (
    <Button size="sm" variant="ghost" onClick={handleExport} icon={<RiDownloadLine size={14} />} title="Export visible rows">
      Export CSV
    </Button>
  );
});

CSVExportButton.displayName = "CSVExportButton";