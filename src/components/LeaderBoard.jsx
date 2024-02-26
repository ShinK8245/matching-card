import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const LeaderBoard = ({ level, data }) => {
  const sortedRows = rows.sort((a, b) => a.time - b.time);

  return (
    <Box id="leader-board">
      <Typography color="white" variant="h6" textAlign="center" mb={1}>
        {level} Leader Board
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 280 }}>
          <TableHead
            sx={{
              bgcolor: "primary.light",
            }}
          >
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export { LeaderBoard };

const rows = [
  {
    name: "John",
    time: 6000,
  },
  {
    name: "Doe",
    time: 4000,
  },
  {
    name: "Lee",
    time: 2000,
  },
];
