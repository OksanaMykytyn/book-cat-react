import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import { Outlet } from 'react-router-dom';
import axios from 'axios';


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

import { LOCAL_STORAGE_KEY, REMOVED_BOOKS_KEY } from './constants';

const defaultBooks = [];

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', darkMode);
  }, [darkMode]);

  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedBooks ? JSON.parse(savedBooks) : defaultBooks;
  });

  const [removedBooks, setRemovedBooks] = useState(() => {
    const savedRemovedBooks = localStorage.getItem(REMOVED_BOOKS_KEY);
    return savedRemovedBooks ? JSON.parse(savedRemovedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
    localStorage.setItem(REMOVED_BOOKS_KEY, JSON.stringify(removedBooks));
  }, [books, removedBooks]);


  const removeBook = (inventoryNumber) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter(book => book.inventoryNumber !== inventoryNumber);
      return updatedBooks;
    });

    setRemovedBooks((prevRemovedBooks) => [...prevRemovedBooks, books.find(book => book.inventoryNumber === inventoryNumber)]);
  };

  const restoreBook = (inventoryNumber) => {
    setRemovedBooks((prevRemovedBooks) => {
      const bookToRestore = prevRemovedBooks.find(book => book.inventoryNumber === inventoryNumber);
      if (bookToRestore) {
        const updatedRemovedBooks = prevRemovedBooks.filter(book => book.inventoryNumber !== inventoryNumber);
        return updatedRemovedBooks;
      }

      return prevRemovedBooks;
    });

    setBooks((prevBooks) => {
      const bookToRestore = removedBooks.find(book => book.inventoryNumber === inventoryNumber);
      if (bookToRestore) {
        return [...prevBooks, bookToRestore];
      }
      return prevBooks;
    });
  };

  const addBook = (newBook) => {
    setBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, newBook];
      return updatedBooks;
    });
  };

  const deleteBook = (inventoryNumber) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter(book => book.inventoryNumber !== inventoryNumber);
      return updatedBooks;
    });
  };

  const deleteRemovedBook = (inventoryNumber) => {
    setRemovedBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter(book => book.inventoryNumber !== inventoryNumber);
      return updatedBooks;
    });
  };

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const toggleNavbar = () => {
    console.log("Toggle Navbar called");
    setIsNavbarVisible(prevState => !prevState);
  };

  const onUpdateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.inventoryNumber === updatedBook.inventoryNumber ? updatedBook : book
      )
    );

    setRemovedBooks((prevRemovedBooks) =>
      prevRemovedBooks.map((book) =>
        book.inventoryNumber === updatedBook.inventoryNumber ? updatedBook : book
      )
    );
  };

  const [libraryStatus, setLibraryStatus] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashbordPage darkMode={darkMode}
          setDarkMode={setDarkMode} isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />}>
          <Route path="check-payment" element={<CheckPaymentPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          <Route
            element={
              <ProtectedRoute libraryStatus={libraryStatus}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="support" element={<SupportPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="profile" element={<ProfilePage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="add-book" element={<AddBookPage onAddBook={addBook} isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="search-book" element={<SearchBookPage books={books} onRemoveBook={removeBook} onDeleteBook={deleteBook} isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="removed-book" element={<RemovedBookPage books={removedBooks} onRemoveBook={restoreBook} onDeleteBook={deleteRemovedBook} isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="create-document" element={<CreateDocumentPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="all-documents" element={<AllDocumentPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="settings" element={<SettingsPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="documentation" element={<DocumentationPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
            <Route path="edit-book/:inventoryNumber" element={<EditBookPage books={books} removedBooks={removedBooks} onUpdateBook={onUpdateBook} isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
          </Route>
        </Route>
        <Route path="/dashboard-admin" element={<DashbordAdminPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />}>
          <Route path="documentation" element={<DocumentationPage isNavbarVisible={isNavbarVisible} toggleNavbar={toggleNavbar} />} />
        </Route>
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
