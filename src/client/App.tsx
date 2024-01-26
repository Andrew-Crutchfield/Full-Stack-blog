import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import PostList from './components/PostList';
import PostDetailPage from './components/PostDetailPage';
import ComposePage from './components/ComposePage';
import AdminPanel from './components/AdminPanel';
import NotFoundPage from './components/404Page';
import AuthorPage from './components/AuthorPage';
import Email from './components/Email'; 
const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/posts/:id" element={<PostDetailPage />} />
                    <Route path="/compose" element={<ComposePage />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/authors/:authorId" element={<AuthorPage />} />
                    <Route path="/contact-us" element={<Email />} /> 
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;