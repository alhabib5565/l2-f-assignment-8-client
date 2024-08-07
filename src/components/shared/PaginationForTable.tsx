import { TMeta } from "@/type";
import { TablePagination } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type TPaginationInfo = {
  rowsPerPage: number;
  page: number;
  searchTerm: string;
  sortOrder: string;
};

type TPaginationForTableProps = {
  meta: TMeta;
  paginationInfo: TPaginationInfo;
  setPaginationInfo: Dispatch<SetStateAction<TPaginationInfo>>;
};

const PaginationForTable = ({
  meta,
  paginationInfo,
  setPaginationInfo,
}: TPaginationForTableProps) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPaginationInfo((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPaginationInfo((prev) => ({
      ...prev,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  };
  return (
    <TablePagination
      count={meta?.total || 0}
      component="div"
      page={paginationInfo.page}
      onPageChange={handleChangePage}
      rowsPerPage={paginationInfo.rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default PaginationForTable;
