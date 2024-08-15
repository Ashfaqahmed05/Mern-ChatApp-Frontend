import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LayoutLoader } from "./components/Layout/Loaders";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { server } from "./constants/config";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { SocketProvider } from "./socket";
import { Toaster } from "react-hot-toast"

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/Admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/Admin/MessageManagement"));



function App() {
  const { user, loader } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${server}/api/v1/user/profile`, { withCredentials: true })
      .then((res) => {
        dispatch(userExists(res.data.data))
      })
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);


  return loader ? <LayoutLoader /> : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={
            <SocketProvider>
              <ProtectedRoute user={user} />
            </SocketProvider>}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/group" element={<Group />} />
          </Route>

          <Route path="/login" element={
            <ProtectedRoute user={!user} redirect="/" >
              <Login />
            </ProtectedRoute>} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users-management" element={<UserManagement />} />
          <Route path="/admin/chats-management" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />



          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
