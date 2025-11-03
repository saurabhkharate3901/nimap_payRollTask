import React from 'react';
import { Box, Button } from '@mui/material';

const CustomPagination = ({ page, rowsPerPage, setPage, totalCount }) => {
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
      <Button
        variant="contained"
        onClick={handlePrevious}
        disabled={page === 0}
        sx={{ marginRight: 2 }}
      >
        Previous
      </Button>
      <Box>
        Page {page + 1} of {totalPages}
      </Box>
      <Button
        variant="contained"
        onClick={handleNext}
        disabled={page === totalPages - 1}
        sx={{ marginLeft: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default CustomPagination;
