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
import { lime } from "@mui/material/colors";

import React, { useMemo } from "react";

const LeaderBoard = ({ level, data }) => {
  const sortedRows = useMemo(() => {
    return data.sort((a, b) => a.time - b.time).slice(0, 10);
  }, [data]);

  return (
    <Box id="leader-board" mt={5}>
      <Typography
        variant="h6"
        textAlign="center"
        mb={2}
        sx={{
          color: lime[600],
        }}
      >
        {level} Leader Board
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 280 }}>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell>Ranking</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.name}</TableCell>
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
