import { useNavigate } from 'react-router-dom';
import '../../css/intropages/MainScroll.css';
import IntroClosedBook from '../scrollpages/IntroClosedBook.js';

import styled, { css } from "styled-components";

import Lottie from 'lottie-react';
import MusicPlaying from '../../store/lottie/music-playing.json';

import EmotionIcon from '../../components/intropages/EmotionIcon';

const MainScroll = () => {
  const navigate = useNavigate();

  function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      } else {
        reveals[i].classList.remove('active');
      }
    }
  }

  window.addEventListener('scroll', reveal);

  return (
    <div className="main-scroll">
      <section className="first">
        <ul className="snip1241" >
          <li>
            <a href="/login">로그인</a>
          </li>
          <li>
            <a href="/signup/info">회원가입</a>
          </li>
        </ul>

        <Alsong> Alsong </Alsong>
        <Dalsong>DALSONG</Dalsong>
        
        <h5 style={{ color: 'black', marginLeft: '-20vw' }}>아래의 책을 클릭해보세요</h5>
        <IntroClosedBook />
      </section>

      <section className="second">
        <div class="container reveal">
          <div class="text-container" style={{ marginLeft: '8vw' }}>
            <div class="text-box">
              <div>
                <EmotionIcon emotion="angry" />
                <EmotionIcon emotion="happy" />
                <EmotionIcon emotion="anxious" />
              </div>
              <div>
                <EmotionIcon emotion="sad" />
                <EmotionIcon emotion="normal" />
                <EmotionIcon emotion="depressed" />
              </div>
              <h2>
                오늘 당신의 감정을 <br></br>추천해드립니다
              </h2>
              <h5>
                6가지 귀여운 이모티콘과 함께 다양한 감정으로 나의 일기를 표현해보세요
                <br></br>
                하루의 감정을 직접 선택하거나 <br></br>
                일기 내용을 기반으로 알쏭달쏭이 감정을 추천해줄 수도 있습니다.
              </h5>
            </div>

            <div
              className="text-box"
              style={{ backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '10px 10px #dcdca2' }}
            >
              <h3>나만의 감정 캘린더</h3>
              <h5>이달의 감정들을 한 눈에 확인해보세요.</h5>
              <img alt="calendar_img" src="/assets/img/calender.png" style={{ width: '30vw' }}></img>
            </div>
          </div>
        </div>
      </section>

      <section className="third">
        <div class="container reveal">
          <Lottie animationData={MusicPlaying} className="lottie-music-playing" />
          
          <h1 style={{ marginLeft: '5vw' }}>
            오늘의 기분에 따른 음악도 <br></br>추천해드립니다
          </h1>
          <div class="text-container">
            <div class="text-box">
              <div style={{ width: '25vw' }}>
                <img
                  alt="playlist_img"
                  src="/assets/img/playlist.jpg"
                  style={{
                    width: '25vw',
                    backgroundColor: '#ffffff',
                    borderRadius: '15px',
                    boxShadow: '10px 10px #dcdca2',
                  }}
                ></img>
                <h5 style={{ marginTop: '3vh' }}>
                  감정에 따라 다른 플레이리스트가 준비되어 있습니다 <br></br>
                  순간순간마다 다른 음악을 즐겨보세요
                </h5>
              </div>
            </div>
            <div class="text-box" style={{ width: '25vw' }}>
              <h5 style={{ marginTop: '11vh' }}>
                매일 같은 노래만 듣는게 <br></br>어느 순간 지겨워진 당신
                <br></br>
                그런 당신을 위해 준비했습니다
              </h5>
            </div>
            <div class="text-box" style={{ width: '25vw' }}>
              <img
                alt="pli_img"
                src="/assets/img/pli.png"
                style={{
                  width: '25vw',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '10px 10px #dcdca2',
                }}
              ></img>
              <h5 style={{ marginTop: '3vh' }}>
                최신 음악부터 올드팝까지, <br></br>
                좋아하는 음악만 선택하여 들어보세요
              </h5>
            </div>
          </div>
        </div>
      </section>

      <section className="fourth">
        <div class="container reveal">
          <h2>스티커로 당신의 일기를 더욱 다채롭게</h2>
          <div class="text-container" style={{ marginLeft: '7vw' }}>
            <div class="text-box">
              <img
                alt="detail_img"
                src="/assets/img/detail.png"
                style={{
                  width: '30vw',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '10px 10px #dcdca2',
                }}
              ></img>
              <h5 style={{ marginTop: '3vh' }}>다양한 스티커로 일기를 취향대로 꾸며보세요</h5>
            </div>

            <div class="text-box">
              <img
                alt="store_img"
                src="/assets/img/store.png"
                style={{
                  width: '30vw',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '10px 10px #dcdca2',
                }}
              ></img>
              <h5 style={{ marginTop: '3vh' }}>스티커 상점에서 마음에 드는 스티커를 구입할 수도 있습니다</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Alsong = styled.div`
font-size: 9rem; 
margin-top: -50vh;
margin-left: 10vw; 
color: black; 
`;

const Dalsong = styled.div`
font-size: 9rem; 
margin-top: -27vh; 
color: black; 
margin-left: -15vw; 
`; 

export default MainScroll;
