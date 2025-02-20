import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/shared/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from "./components/ui/sonner";
import AuthGuard from "./lib/hooks/authGaurd";
import GuestGuard from "./lib/hooks/guestGuard";
import BlogsPage from "./pages/BlogsPage";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <BrowserRouter>
      <Toaster expand={true} richColors />
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/blogs' element={<BlogsPage />} />
            <Route path='/create' element={<CreateBlog />} />
          </Route>
        </Route>

        <Route element={<GuestGuard />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
