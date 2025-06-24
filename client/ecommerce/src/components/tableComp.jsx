import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import styled from '@emotion/styled';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#212121',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableComp = ({ columns, data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: {md: '80%', xl: '100%'},
        margin: '0 auto',
        maxHeight: '500px',  // or any height you prefer
        overflow: 'auto'
      }}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell key={col.accessor}>{col.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <StyledTableRow key={row.id || idx}>
              {columns.map((col) => (
                <StyledTableCell key={col.accessor}>
                  {col.isNested && Array.isArray(row[col.accessor]) && row[col.accessor].length > 0 ? (
                    <TableComp columns={col.nestedColumns} data={row[col.accessor]} />
                  ) : (
                    row[col.accessor] || "-"
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;