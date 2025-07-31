import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import { Outlet } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import DashbordPage from './pages/User/Dashbord';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/Payment';
import AddBookPage from './pages/User/AddBook';
import CheckPaymentPage from './pages/User/CheckPayment';
import SearchBookPage from './pages/User/SearchBook';
import RemovedBookPage from './pages/User/RemovedBook';
import CreateDocumentPage from './pages/User/CreateDocument';
import AllDocumentPage from './pages/User/AllDocument';
import SettingsPage from './pages/User/Settings';
import DocumentationPage from './pages/User/Documentation';
import SupportPage from './pages/User/Support';
import ProfilePage from './pages/User/Profile';
import DashbordAdminPage from './pages/Admin/DashboardAdmin';
import EditBookPage from './pages/User/EditBook';
import ProtectedRoute from './pages/User/ProtectedRoute';
import InWaitingPage from './pages/Admin/InWaitingPage';
import DocumentationAdminPage from './pages/Admin/DocumentationAdmin';
import ListUsersPage from './pages/Admin/ListUsersPage';
import BannedUsersPage from './pages/Admin/BannedUsersPage';
import ChatsPage from './pages/Admin/ChatsPage';
import SettingsAdminPage from './pages/Admin/SettingsPage';
import ProfileAdminPage from './pages/Admin/ProfilePage';
import OneChatWithUser from './pages/Admin/OneChatWithUser';
import GuestSupportPage from './pages/GuestSupport';
import AddArticlePage from './pages/Admin/AddArticlePage';
import EditArticlePage from './pages/Admin/EditArticlePage';
import AllArticlesPage from './pages/Admin/AllArticlesPage';
import BlogPage from './pages/BlogPage';
import PricingPage from './pages/PricingPage';
import HelpPage from './pages/HelpPage';
import ArticlePage from './pages/ArticlePage';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', darkMode);
  }, [darkMode]);

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const toggleNavbar = () => {
    setIsNavbarVisible(prevState => !prevState);
  };

  const [libraryStatus, setLibraryStatus] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/guest-support" element={<GuestSupportPage />} />

        <Route path="/blog" element={<BlogPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />

        <Route path="/dashboard" element={<DashbordPage darkMode={darkMode}
          setDarkMode={setDarkMode} isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />}>
          <Route path="check-payment" element={<CheckPaymentPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route element={<ProtectedRoute libraryStatus={libraryStatus}>
            <Outlet />
          </ProtectedRoute>
          }>
            <Route path="support" element={<SupportPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="profile" element={<ProfilePage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="add-book" element={<AddBookPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="search-book" element={<SearchBookPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="removed-book" element={<RemovedBookPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="create-document" element={<CreateDocumentPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="all-documents" element={<AllDocumentPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="settings" element={<SettingsPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="documentation" element={<DocumentationPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="edit-book/:inventoryNumber" element={<EditBookPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          </Route>
        </Route>
        <Route path="/dashboard-admin" element={<DashbordAdminPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} darkMode={darkMode}
          setDarkMode={setDarkMode} />}>
          <Route path="documentation" element={<DocumentationAdminPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path="in-waiting" element={<InWaitingPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path="list-users" element={<ListUsersPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path="banned-users" element={<BannedUsersPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path="chats" element={<ChatsPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path='chat/:id' element={<OneChatWithUser isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path="settings" element={<SettingsAdminPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path="profile" element={<ProfileAdminPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path="add-article" element={<AddArticlePage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path="edit-article/:id" element={<EditArticlePage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route path="all-articles" element={<AllArticlesPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
        </Route>
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
