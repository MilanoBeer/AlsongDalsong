import DiaryItem from "../diary/DiaryItem";
import MainNote from "./MainNote";
import React, { useEffect, useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { getMonthDiary,getDiaryListApi } from "../../api/diaryApi";
import Button from "../../components/Common/Button";
import './MainMonth.css'
// import './Dropdown.scss'
import Lottie from 'lottie-react';
import PencilWriting from '../../store/lottie/pencil-writing.json'

// 날짜순, 이모티콘 순으로 정렬하기 로직
  const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
  ];
  
  const filterOptionList = [
    { value: "all", name: "전부 보기" },
    { value: "기쁨", name: "행복했던 날" },
    { value: "우울", name: "우울했던 날" },
    { value: "슬픔", name: "슬펐던 날" },
    { value: "평온", name: "평온했던 날" },
    { value: "분노", name: "화났던 날" },
    { value: "불안", name: "놀랐던 날" }
  ];

const MainMonth =() => {

  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const ControlDateMenu = React.memo(({ value, onChange, optionList }) => {
    return (
        // <div>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="dropbar-left"
          >
            {optionList.map((it, idx) => (
              <option key={idx} value={it.value} style={{color:'black'}} 
              onClick={({e})=>{{getProcessedDiaryList(e)}}}
              className="dropmenu">
                {it.name}
              </option>
            ))}
          </select>
        // </div>
    );
  });


  const ControlEmotionMenu = React.memo(({ value, onChange, optionList }) => {
    return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="dropbar-right"
          >
            {optionList.map((it, idx) => (
              <option key={idx} value={it.value} style={{color:'black'}} onClick={({e})=>{{getProcessedDiaryList(e)}}}
              className="dropmenu"
              >
                {it.name}
              </option>
            ))}
          </select>
    );
  });

  // 감정별, 날짜별로 분류하는 로직
  
  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "기쁨") {
        const happyDiary = item.emotion == '기쁨'
        return happyDiary
      } 
      if (filter === "슬픔") {
        return item.emotion === '슬픔'
      }
      if (filter === "평온") {
        return item.emotion === '평온'
      }
      if (filter === "우울") {
        return item.emotion === '우울'
      }
      if (filter === "분노") {
        return item.emotion === '분노'
      }
      if (filter === "불안") {
        return item.emotion === '불안'
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return b.created_date.split("-").join("") - a.created_date.split("-").join("");
      } else {
        return a.created_date.split("-").join("") - b.created_date.split("-").join("");
      }
    };

    // const copyList = JSON.parse(JSON.stringify(data));
    // all이면 전부를, all이 아닌 감정 개별적인 거는 filterCallback에 넘겨주기
    const filteredList =
      filter === "all" ? data : data.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
    
    // 이달의 일기 모아보는 로직
  const [noticeData, setNoticeData] = useState([])
  useEffect(()=> {
    getMonthDiary(curDate.getMonth() + 1, curDate.getFullYear())
    .then((res)=> {
      setNoticeData(res.data)
      console.log(res.data)
    })
    .catch((e)=> {
      console.log('err',e)
    });
  },[curDate.getMonth(), noticeData.length])
  console.log('지금 이달 일기 개수는',noticeData.length)

  useEffect(()=> {
    console.log(noticeData.length)
  })
  
    useEffect(() => {
      if (noticeData.length >= 1) {
        setData(
          noticeData.filter((it) => 
          curDate.getMonth()+1 === new Date(it.created_date).getMonth()+1)
          );
      } else {
        setData([]);
      }
    }, [noticeData]);

    const increaseMonth = () => {
      setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
    };
  
    const decreaseMonth = () => {
      setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
    };


    return (
    <div className="main-month">
        <div className="fix-top">

        <h2 className="diary-list-page-title">
          <div onClick={decreaseMonth} className="time-change-button">&#10092;</div>
          {headText}
          <div onClick={increaseMonth} className="time-change-button">&#10093;</div>
        </h2>
      {/* 감정별, 날짜별 분류 로직 */} 
          <ControlDateMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList} 
            
          />
          <ControlEmotionMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />  

        <Button 
                className=" y"
                name="일기 작성"
                style={{ width: "110px", fontSize: "15px", marginLeft: "51vw",color:'black',marginTop:'0.2vh'}}
                color="#CAD8B5"
                hcolor="#8FB46E"
                size="sm"
                onClick={()=>{navigate('/newdiary')}}
              />
          <ul onClick={()=>{navigate('/calender')}} className="snip1241">
            <li style={{marginLeft:'-44vw',fontSize:'1.4vw',marginTop:'0.5vh'}}><a href="#">달력보기</a></li>
          </ul>  
        </div>
      <div className="diary-list">
      {/* {
        getProcessedDiaryList.length < 1 
        ? (
          <>
          <div className="diary-items-none">작성된 일기가 없습니다.</div>
          <div className="diary-items-none-subtitle">새로운 일기를 작성해주세요!</div>
          <Lottie animationData={PencilWriting} className="lottie-pencil-writing" />
          </>
        )
        : (
          <>
          <div className="diary-items">
          {getProcessedDiaryList().map((it) => (
            <DiaryItem key={it.id} {...it} className="diary-items" />
          ))}
        </div>
          </>
        )
      } */}
   
            {/* <div className="diary-items-none">작성된 일기가 없습니다.</div>
            <div className="diary-items-none-subtitle">새로운 일기를 작성해주세요!</div>
            <Lottie animationData={PencilWriting} className="lottie-pencil-writing" /> */}
        <div className="diary-items">
          {getProcessedDiaryList().map((it) => (
            <DiaryItem key={it.id} {...it} className="diary-items" />
          ))}
        </div>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>)
}
MainMonth.defaultProps = {
  diaryList: [],
};
export default MainMonth;