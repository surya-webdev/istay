import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Applayout from "./ui/Applayout";
import Login from "./pages/Login";
import GlobalStyles from "./styles/globalStyles";
import BookingDetail from "./features/bookings/BookingDetail";
import Checkin from "./pages/Checkin";
import PageNotFound from "./pages/PageNotFound";
import ProctedUser from "./pages/ProctedUser";
import { DarkModeContext } from "./context/DarkModeContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <DarkModeContext>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProctedUser>
                    <Applayout />
                  </ProctedUser>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:bookingId" element={<BookingDetail />} />
                <Route path="checking/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="accounts" element={<Account />} />
                <Route path="settings" element={<Settings />} />
                <Route path="users" element={<Users />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={12}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                duration: 5000,
                style: {
                  maxWidth: "500px",
                  fontSize: "16px",
                  background: "var( --color-grey-0)",
                  color: "var( --color-grey-700)",
                  padding: "16px 24px",
                },
                // Default options for specific types
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
              }}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </DarkModeContext>
    </>
  );
}

export default App;
