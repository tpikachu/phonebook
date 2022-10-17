import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress />
  </Box>
);
export default LoadingSpinner;
