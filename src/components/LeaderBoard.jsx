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
    if (data && data.length > 0) {
      return data.sort((a, b) => a.time - b.time).slice(0, 10);
    } else {
      return [];
    }
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
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table sx={{ minWidth: 280 }}>
          <TableHead sx={{ bgcolor: "primary.light" }}>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              sortedRows.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export { LeaderBoard };
