import { BrowserRouter, Routes, Route} from 'react-router-dom'
import KakaoAuth from '../components/loginpages/KakaoAuth';
import GoogleAuth from '../components/loginpages/GoogleAuth';
import {
    OpenIntroPage,
    OpenIntroPageTwo,
    OpenIntroPageThree,
    OpenIntroPageFour,
    PaginationTest,
    Bookmarks,
    MainCalender,
    MainMonth,
    SignupInfo, 
    SignupQuestionOne,
    SignupQuestionTwo,
    SignupQuestionThree,
    SignupQuestionFour,
    MainLogin,
    FeelingAnalysis,
    Opening,
    NewDiary,
    DetailDiary,
    EditDiary,
    MySticker,
    StickerStore,
    StickerDetail,
    ChargePoint,
    IntroScrollPage,
    AngryPlaylist,
    CalmPlaylist,
    DepressPlaylist,
    HappyPlaylist,
    NervousPlaylist,
    SadPlaylist,
    MyPlaylist,
    MusicRecommendation,
    Payment,
    PayResult,
    EditMyInfo,
    AngryRecommendation,
    HappyRecommendation,
    DepressedRecommendation,
    AnxiousRecommendation,
    NormalRecommendation,
    SadRecommendation,
    MainScroll
  } from '../pages/index'

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/test" element={<IntroScrollPage />} />
          <Route path="/calender" element={<MainCalender />} />
          <Route path="/diarylist" element={<MainMonth />} />
          <Route path="/intro/open/one" element={<OpenIntroPage />} />
          <Route path="/intro/open/two" element={<OpenIntroPageTwo />} />
          <Route path="/intro/open/three" element={<OpenIntroPageThree />} />
          <Route path="/intro/open/four" element={<OpenIntroPageFour />} />
          <Route path="/bookmarks" element={<Bookmarks />} /> 
          <Route path="/signup/info" element={<SignupInfo />} />
          <Route path="/signup/question/one" element={<SignupQuestionOne />} />
          <Route path="/signup/question/two" element={<SignupQuestionTwo />} />
          <Route path="/signup/question/three" element={<SignupQuestionThree />} />
          <Route path="/signup/question/four" element={<SignupQuestionFour />} />
          <Route path="/login" element={<MainLogin /> } />
          <Route path="/analysis" element={<FeelingAnalysis />} />
          <Route path="/opening" element={<Opening/>} />
          <Route path="/newdiary" element={<NewDiary/>} />
          <Route path="/diary/:id" element={<DetailDiary/>} />
          <Route path="/edit/:id" element={<EditDiary/>} />
          <Route path="/mypage/mysticker" element={<MySticker />} />
          <Route path="/sticker/store" element={<StickerStore />} />
          <Route path="/sticker/detail/:id" element={<StickerDetail />} />
          <Route path="/sticker/charge" element={<ChargePoint /> } /> 
          <Route path="/kakao/login/callback" element={<KakaoAuth />} /> 
          <Route path="/google/login/callback" element={<GoogleAuth />} /> 
          <Route path='/angryplaylist' element={<AngryPlaylist />} />
          <Route path='/calmplaylist' element={<CalmPlaylist />} />
          <Route path='/depressplaylist' element={<DepressPlaylist />} />
          <Route path='/happyplaylist' element={<HappyPlaylist />} />
          <Route path='/nervousplaylist' element={<NervousPlaylist />} />
          <Route path='/sadplaylist' element={<SadPlaylist />} />
          <Route path='/myplaylist' element={<MyPlaylist />} />
          <Route path='musicrecommendation' element={<MusicRecommendation />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/payresult' element={<PayResult />} />
          <Route path='/mypage/edit' element={<EditMyInfo /> } />

          <Route path="/recommendation/angry" element={<AngryRecommendation />} />
          <Route path="/recommendation/happy" element={<HappyRecommendation />} />
          <Route path="/recommendation/depressed" element={<DepressedRecommendation />} />
          <Route path="/recommendation/anxious" element={<AnxiousRecommendation />} />
          <Route path="/recommendation/normal" element={<NormalRecommendation />} />
          <Route path="/recommendation/sad" element={<SadRecommendation />} />

          <Route path='/' element={<MainScroll />} />
        </Routes>
      </BrowserRouter>
    )
}; 

export default Router; 