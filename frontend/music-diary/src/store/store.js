import { configureStore, createSlice } from '@reduxjs/toolkit'


let user = createSlice({
    name: 'user',
    // 평소에 : 1 / 슬플 때 :2  / 화날 때 : 3 / 우울할 때 : 4
    initialState: { email:'email', password:'password', password2:'password2', username : 'null', normalChoice: -1, sadChoice: -1, angryChoice: -1, depressedChoice: -1},

    reducers : {
        // 1. sad 감정 정보 숫자로 받아서 설정하는 부분
        setNormalChoiceValue(state, action){
            state.normalChoice = action.payload
        },
        setSadChoiceValue(state, action){
            state.sadChoice = action.payload
        },
        setAngryChoiceValue(state, action){
            state.angryChoice = action.payload
        },
        setDepressedChoiceValue(state, action){
            state.depressedChoice = action.payload
        },
        // 2. userInfo
        setUserEmail(state, action){
            state.email = action.payload
        },
        setUserPassword(state, action){
            state.password = action.payload
        },
        setUserPassword2(state, action){
            state.password2 = action.payload
        },
        setUserName(state, action){
            state.username = action.payload
        }
    }
})

let test  = createSlice({
    name: 'test',
    initialState: 'test_initial_state'
})

let diarySlice = createSlice({
    name: 'diarySlice',
    initialState: {diaryBookmark: 'false'},

    reducers : {
        setDiaryBookmarkValue(state, action){
            console.log("in bookmark reducers : ", action.payload)
            state.diaryBookmark = action.payload
        }
    }
})

export default configureStore ({
    reducer :{
        user: user.reducer,
        test : test.reducer,
        diarySlice : diarySlice.reducer,
    }
})

// 선언한 state 변경함수 export
export let { setNormalChoiceValue, setSadChoiceValue, setAngryChoiceValue, setDepressedChoiceValue, setUserEmail, 
                setUserPassword, setUserPassword2, setUserName}  = user.actions


export let { setDiaryBookmarkValue } = diarySlice.actions