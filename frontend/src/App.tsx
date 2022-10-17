import { QueryClient, QueryClientProvider } from "react-query";

import { Container, ThemeProvider } from "@mui/material";
import Phonebook from "./features/Phonebook";
import theme from "./theme";
import PhoneBookContextProvider from "./context/phoneBook";
// import Task from "./Task";

const queryClient = new QueryClient();

const App = () => {
  return (
    <PhoneBookContextProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Container fixed>
            <Phonebook />
          </Container>
        </QueryClientProvider>
      </ThemeProvider>
    </PhoneBookContextProvider>
  );
};

export default App;
