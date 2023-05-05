# 📗 Alsong Dalsong : 일기를 쓰면, 노래를 추천해드려요
### 빅데이터 추천 프로젝트
<div align="center">
  <br />
  <img src="./assets/image/Scroll-Page-Top.png" alt="AlsongDalsong" width = "75%"/>
  <br />
</div>

## :pushpin: 목차

- [프로젝트 소개](#프로젝트-소개)
- [프로젝트 상세](#프로젝트-상세)
- [프로젝트 설계](#프로젝트-설계)
- [기술스택](#기술-스택)
- [개발 기간](#개발-기간)
- [팀원 소개](#팀원-소개)

</br>

# 프로젝트 소개

## 소개

> 사람들은 하루의 마무리를 하면서 일기를 쓰게 됩니다. 어떤 날은 날아갈 것처럼 기분 좋은 날, 또 다른 날은 발걸음도 무거운 우울한 날일 수 있습니다. 기존의 서비스들은 일기만을 기록하지만, 저희는 여기에 그날의 기분에 맞는 음악을 들려주고자 합니다. 그렇게 해서 하루에 대한 기억이 더 다채로워지게 만들고자 이 서비스를 기획했습니다.

# 프로젝트 상세

1. 일기 작성
- 사용자는 직접 감정을 선택하거나 분석받기를 선택할 수 있습니다. 
<img src="./assets/image/작성.PNG" alt="AlsongDalsong" width = "80%"/>

</br>

<img src="./assets/image/일기상세.PNG" alt="AlsongDalsong" width = "80%"/>

</br>

2. 스티커
- 스티커 상점에서 구매한 스티커 목록을 확인할 수 있습니다.
- 취향대로 자유롭게 일기장을 꾸며볼 수 있습니다. 
<img src="./assets/image/스티커.PNG" alt="AlsongDalsong" width = "80%"/>

</br>

3. 음악 추천
- 일기를 작성하지 않아도, 감정에 따른 음악을 추천받아 봅니다.
<img src="./assets/image/음추목록.PNG" alt="AlsongDalsong" width = "80%"/>

</br>

- 감정별로 마음에 들었던 노래를 한 곳에서 모아 볼 수 있습니다.
<img src="./assets/image/마플목록.PNG" alt="AlsongDalsong" width = "80%"/>

</br>

<img src="./assets/image/마플.PNG" alt="AlsongDalsong" width = "80%"/>

</br>

## 데이터 다루기 

### 🔑 암호화 
> * 일기는 사생활의 영역이며, 개인정보로 취급 -> 일기 제목, 내용, 감정 세 가지를 암호화
> * AES 암호화 방식을 사용 / 256비트 암호화 키를 사용해 보안성을 높임

### 💬 말뭉치 데이터 분석 
> * 54개의 감정으로 라벨링된 약 4만 6천개의 대화 말뭉치 데이터셋을 6개의 감정으로 재분류
> * 한국어 자연어 처리모델 KoBERT를 이용해 학습 
> * 사용자가 일기를 학습모델에 입력하여 6가지 감정 중 하나로 분류시킴 </br>
> 👉 약 75% ~ 93%의 정확도 

> * 파이토치를 활용해 파일로 저장 후, 서버에 적용시켜서 실시간 분석 </br>
> 👉 메모리 용량자원과 서버자원의 절약, 실시간 분석 시간 단축

### 🎶 음악 분석
> * Spotify API를 활용해 약8만건의 데이터 수집 
> * 각각의 음악마다 energy, tempo, danceability 등 11개의 수치화된 특성이 나타난 데이터 수집
> * 데이터 전처리 작업 : 결측치, 중복데이터 삭제 

> * **약 800개** 음악을 4가지 감정(행복, 우울, 슬픔, 흥분)으로 분류
> * 각 수치형 데이터들을 정규화
> * RandomForest, LightGBM, XGBoost모델로 학습


</br>

# 프로젝트 설계

## ERD

<img src="./assets/image/erd.png" alt="AlsongDalsong" width = "80%"/>

## 시스템 아키텍처

<img src="./assets/image/시스템_아키텍처.png" alt="AlsongDalsong" width = "80%"/>

</br>

# 기술 스택

### FE

<img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> 
<img src="https://img.shields.io/badge/konva-0D83CD?style=flat-square&logo=konva&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/> <img src="https://img.shields.io/badge/-React%20Bootstrap-61DAFB?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/-Moment.js-green?style=flat-square&logoColor=white"/>

### BE

<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/django-092E20?style=flat-square&logo=django&logoColor=white"/> <img src="https://img.shields.io/badge/swagger-85EA2D?style=flat-square&logo=swagger&logoColor=white"/> <img src="https://img.shields.io/badge/-DRF-gray?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/-Oauth2-black?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/-AWS%20S3-red?style=flat-square&logoColor=white"/>


### DATA

<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/django-092E20?style=flat-square&logo=django&logoColor=white"/> <img src="https://img.shields.io/badge/jupyter-F37626?style=flat-square&logo=jupyter&logoColor=white"/>

### CI/CD

<img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=nginx&logoColor=white"/> <img src="https://img.shields.io/badge/-AWS%20EC2-orange?style=flat-square&logo=AWS%20EC2&logoColor=white"/>

<details><summary> <b> 상세 기술스택 및 버전</b> </summary>

| 구분     | 기술스택         | 상세내용                      | 버전     |
| -------- | ---------------- | :---------------------------- | -------- |
| 공통     | 형상관리         | Gitlab                        | \-       |
|          | 이슈관리         | Jira                          | \-       |
|          | 커뮤니케이션     | Mattermost, Notion            | \-       |
| Data     | Jupyter notebook |                               |          |
|          | Python           |                               | 3.7      |
|          | Django           |                               | 3.2.12   |
| BackEnd  | Python           |                               | 3.7      |
|          | Django           |                               | 3.2.12   |
|          |                  | Djangorestframework           |          |
|          |                  | Djangorestframework-simplejwt |          |
|          | Oauth2           |                               |          |
|          | Amazon S3        |                               |          |
| FrontEnd | HTML5            |                               | \-       |
|          | CSS3             |                               | \-       |
|          | JavaScript(ES6)  |                               | \-       |
|          | konva            |                               | 8.3.12   |
|          | moment.js        |                               | 2.29.4   |
|          | React            | React                         | 18.2.0   |
|          | React            | Redux                         | 8.0.4    |
|          | React            | Redux-Toolkit                 | 1.8.5    |
|          | React            | styled-components             | 5.3.5    |
|          | React            | Redux                         | 8.0.4    |
|          |                  | react-bootstrap               | 2.5.0    |
|          |                  | react-dom                     | 18.2.0   |
|          |                  | react-router-dom              | 6.4.0    |
|          | IDE              | Visual Studio Code            | 1.63.2   |
| Server   | 서버             | AWS EC2                       | \-       |
|          | 서버             | Nginx                         |          |
|          | 배포             | Docker                        | 20.10.16 |
|          | 배포             | Jenkins                       |          |

</details>



</br>

# 개발 기간
### 22.08.29 ~ 22.10.07
- 기획설계 및 데이터 수집 : 22.08.29 ~ 09.11 
- 프로젝트 개발 : 22.09.12 ~ 10.02
- 버그 수정 및 산출물 정리 : 22.10.03 ~ 10.07 

</br>

# 팀원 소개

<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/pjuju">
            <img src="https://avatars.githubusercontent.com/u/97617731?v=4" width="140px" /> <br><br> 박주현 <br>(Data / Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/KHyoseon">
            <img src="https://avatars.githubusercontent.com/u/58212404?v=4" width="140px" /> <br><br> 김효선 <br>(Back-End) </a> <br></td> 
        <td height="140px" align="center"> <a href="https://github.com/sskong777">
            <img src="https://avatars.githubusercontent.com/u/97655673?v=4" width="140px" /> <br><br> 홍석현 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/MilanoBeer">
            <img src="https://avatars.githubusercontent.com/u/86315623?v=4" width="140px" /> <br><br> 신혜연 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/jotreee">
            <img src="https://avatars.githubusercontent.com/u/97591033?v=4" width="140px" /> <br><br> 조경수 <br>(Data / Front-End) </a> <br></td> 
        <td height="140px" align="center"> <a href="https://github.com/sojung13">
            <img src="https://avatars.githubusercontent.com/u/97655624?v=4" width="140px" /> <br><br> 박소정 <br>(Front-End) </a> <br></td>
    </tr>
    <tr>
        <td align="center"> 👑팀장 <br> 음악Data 전처리 및 학습 <br> Youtube 크롤링 <br> CI/CD 
        <td align="center"> 일기 API <br> 스티커API <br> AWS S3 
        <td align="center"> 유저 관련 API <br> 음악 API
        <td align="center"> FE리드 <br> RTK 상태관리 <br> 스티커 기능 <br> 사용자관련 API연결
        <td align="center"> <br> 말뭉치Data 전처리 및 학습<br> 음악 보관 API연결
        <td align="center"> 일기 API연결 <br> 음악 추천 API연결 <br> UI/UX 디자인
    </tr>
</table>



