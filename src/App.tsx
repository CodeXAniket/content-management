// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import BlogViewer from "./pages/Index"; // Assuming Index.tsx is the BlogViewer page
import AdminDashboard from "./pages/admin";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BlogViewer />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/preview/:id" element={<Preview />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;