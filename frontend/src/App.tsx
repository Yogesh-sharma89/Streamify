import {  Route, Routes } from "react-router"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import HomePage from "./pages/home"
import OnboardingPage from "./pages/Onboarding"
import NotificationsPage from "./pages/Notifications"
import ChatPage from "./pages/chat"
import CallPage from "./pages/call"
import  { Toaster } from "react-hot-toast"
import OtpPage from "./pages/OtpPage"
import ProtectRoutes from "./components/protectRoutes"
import PublicRoute from "./components/PublicRoute"
import SignupOtpGuard from "./components/SignupOtpGuard"
import Layout from "./components/Layout"
import FriendsPage from "./pages/Friends"
import { useThemeStore } from "./store/useThemeStore"



const App = () => {
  const  theme  =  useThemeStore((state)=>state.theme);
  return (
    <div className="w-full h-screen" data-theme={theme}>
      <Routes>
        <Route path="/login" element={
           <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        }/>
        <Route path="/signup" element={
          <PublicRoute>
            <SignupPage/>
          </PublicRoute>
        }/>
        <Route path="/" element={
          <ProtectRoutes>
            <Layout showSidebar>
              <HomePage/>
            </Layout>
          </ProtectRoutes>
        }/>
        <Route path="/onboarding" element={
          <ProtectRoutes>
            <OnboardingPage/>
          </ProtectRoutes>
        }/>
        <Route path="/notifications" element={
            <ProtectRoutes>
              <Layout showSidebar>
               <NotificationsPage/>
              </Layout>
            </ProtectRoutes>
         }/>
         <Route path="/friends" element={
          <ProtectRoutes>
            <Layout showSidebar>
             <FriendsPage/>
            </Layout>
          </ProtectRoutes>
        }/>
        <Route path="/call/:id" element={
          <ProtectRoutes>
            <CallPage/>
          </ProtectRoutes>
        }/>
        <Route path="/chat/:id" element={
          <ProtectRoutes>
            <Layout showSidebar={false}>
              <ChatPage/>
            </Layout>
            
          </ProtectRoutes>
        }/>
        <Route path="/verify-otp" element={
          <SignupOtpGuard>
            <OtpPage/>
          </SignupOtpGuard>
        }/>
      </Routes>

      <Toaster
       toastOptions={{
        success:{
          style:{
            backgroundColor:"black",
            color:'white'
          }
        },
        error:{
          style:{
            backgroundColor:'black',
            color:'white'
          }
        }
       }}
      />
    </div>
  )
}

export default App
