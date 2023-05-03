import MainPlaylist from "../../mainpages/MainPlaylist"
import { musicRecommend, makeLike } from '../../../api/musicApi'
import { getUserApi } from '../../../api/userApi'
import { useEffect, useState } from "react"
import './AnxiousRecommendation.css'
import { useNavigate } from "react-router-dom"
import { FcMusic } from 'react-icons/fc';

const AnxiousRecommendation =() => {
    const [anxiousMusic, setAnxiousMusic] = useState([])
    const [youtube, setYoutube] = useState("")
    const navigate = useNavigate()
    const [ user, setUser ] = useState("")

    getUserApi()
    .then((res) => {
        setUser(res.pk);
    })
    .catch((err)=> {
        console.log(err) 
    })
    
    const likeMusic = (music_id) => {
        const txt = document.getElementById("heart"+music_id);
        if (txt.innerText === "♥"){
          txt.innerText = "♡";
        }else{
          txt.innerText = "♥";
        }
        makeLike(music_id)
        
        .then((res) => {
        })
        .catch((e) => {
          console.log("err", e);
        });
      }

    const remakePlaylist = () => {
        musicRecommend(2)
        .then((res) => {
          window.location.reload();
        })
        .catch((e) => {
          console.log("err", e);
        });
      }

    useEffect(()=> {
        musicRecommend(2)
        .then((res)=> {
            setAnxiousMusic(res.data)
            let video = "";
            for (let i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
                video += (res.data[i].videoid + ",");
            }
            setYoutube("https://www.youtube.com/embed?playlist="+video.slice(0,-1));
            window.onload = function() {
              if(!window.location.hash) {
                  window.location = window.location + '#loaded';
                  window.location.reload();
              }
            }
          })
        .catch((err)=> {
            console.log(err) 
        })
    },[])

    return(<div className="anxious-recommendation">
        <div className="work-area">
            <div className="ment">
                <h2 style={{marginTop:"10vh"}}>당신에게 추천합니다</h2>
                <h5 style={{fontSize:"15pt"}}>불안한 순간, 평안하게 들어볼 플레이리스트</h5>
            </div>
            <iframe src={youtube} className="playlist-iframe" title="YouTube video player" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
                
                <div className="remake-btn" onClick = {()=>remakePlaylist()}>
                        <img style={{width:"1.2vw", marginTop:"0.5vh"}} alt="" src="/assets/icons/syncro.png" />
                    </div>
                <div className="detail-diary-playlist">
                    
                    {anxiousMusic.map((it)=>
                    <div>
                    <div className="heart-wrapper">
                        <div id={"heart"+it.id} style={{zIndex:"9999999999999999999999", cursor: "pointer", color:"red"}} onClick = {()=>likeMusic(it.id)}>♡</div>
                        <div className="music-name-wrapper" onClick={()=>{navigate({youtube})}}>{it.track_name}</div><br></br>
                    </div>
                    <div className="artist-wrapper">
                        <div>{it.artist_name}</div>
                      </div>
                    </div>
                    )}
            </div>
        </div>
        <MainPlaylist className="main-playlist"></MainPlaylist>
    </div>)
}

export default AnxiousRecommendation