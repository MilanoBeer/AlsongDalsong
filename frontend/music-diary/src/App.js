import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useReducer, useRef } from 'react';


import Router from './routes/Router';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
      break;
    }

    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const sticker = [
    {
      id: 1,
      img: '/assets/img/sticker-pack-2.png',
      title: '이쁜 스티커',
    },
    {
      id: 2,
      img: '/assets/img/sticker-pack-2.png',
      title: '이쁜 스티커',
    },
    {
      id: 3,
      img: '/assets/img/sticker-pack-2.png',
      title: '이쁜 스티커',
    },
    {
      id: 4,
      img: '/assets/img/sticker-pack-2.png',
      title: '이쁜 스티커',
    },
    {
      id: 5,
      img: '/assets/img/sticker-pack-2.png',
      title: '이쁜 스티커',
    },
    {
      id: 6,
      img: '/assets/img/sticker-pack-2.png',
      title: '이쁜 스티커',
    },
  ];

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, title, content, emotion, image, bookmark) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        title,
        content,
        emotion,
        image,
        bookmark,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  // EDIT
  const onEdit = (targetId, date, title, content, emotion, image, bookmark) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        title,
        content,
        emotion,
        image,
        bookmark,
      },
    });
  };

  return (
    <div className="App">
      <DiaryStateContext.Provider value={sticker}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onEdit,
            onRemove,
          }}
        >
        <Router />

        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
