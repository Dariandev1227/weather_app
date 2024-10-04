import { Home } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "./components";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
