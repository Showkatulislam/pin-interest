import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes,Route } from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
import Homepage from './routes/homepage/Homepage.jsx'
import MainLayout from './routes/layouts/MainLayout.jsx'
import CreatePage from './routes/createpage/CreatePage.jsx'
import PostPage from './routes/postPage/PostPage.jsx'
import ProfilePage from './routes/Profilepage/ProfilePage.jsx'
import SearchPage from './routes/searchPage/SearchPage.jsx'
import Authpage from './routes/authpage/Authpage.jsx'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<MainLayout/>}>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/create' element={<CreatePage/>} />
            <Route path='/pin/:id' element={<PostPage/>} />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} /> 
        </Route>
        <Route path='/auth' element={<Authpage/>} />
      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
