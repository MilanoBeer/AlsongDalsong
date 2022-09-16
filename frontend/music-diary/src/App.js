import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {
  ClosedIntroPage,
  OpenIntroPage,
  OpenIntroPageTwo,
  OpenIntroPageThree,
  OpenIntroPageFour,
  PaginationTest
} from './pages/index'
import MainCalender from './pages/mainpages/MainCalender';
import MainMonth from './pages/mainpages/MainMonth';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClosedIntroPage />} />
          <Route path="/calender" element={<MainCalender />} />
          <Route path="/diarylist" element={<MainMonth />} />
          <Route path="/intro/open/one" element={<OpenIntroPage />} />
          <Route path="/intro/open/two" element={<OpenIntroPageTwo />} />
          <Route path="/intro/open/three" element={<OpenIntroPageThree />} />
          <Route path="/intro/open/four" element={<OpenIntroPageFour />} />
          <Route path="/intro/pagination" element={<PaginationTest />} />           
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;