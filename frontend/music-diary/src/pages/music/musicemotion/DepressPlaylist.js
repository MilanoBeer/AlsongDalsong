import MainPlaylist from "../../mainpages/MainPlaylist"
import './DepressPlaylist.css'
import { emotionMusic, makeLike } from "../../../api/musicApi";
import { useState, useEffect } from "react";
import { FcMusic } from 'react-icons/fc';

const DepressPlaylist = () => {
    const [musicBtn, setMusicBtn] = useState(false);
    const [musics, setMusics] = useState([]);
    const [youtube, setYoutube] = useState("");

    useEffect(() => {
    emotionMusic(5)
    .then((res) => {
        var list = [];
        let video = "";
        for (let i in [...Array(res.data.length).keys()]) {
          let test = {
            id: res.data[i].id,
            like: res.data[i].like,
            name: res.data[i].track_name,
            artist: res.data[i].artist_name,
          }
          video += (res.data[i].videoid + ",");
          list.push(test)
        }
        setYoutube("https://www.youtube.com/embed?playlist="+video.slice(0,-1));
        setMusics(list);
        setMusicBtn(true)
        window.onload = function() {
          if(!window.location.hash) {
              window.location = window.location + '#loaded';
              window.location.reload();
          }
        }
      })
      .catch((e) => {
        console.log("err", e);
      });
    }, [])
    
      const likeMusic = (music_id, i) => {
        const txt = document.getElementById("heart"+i);
        if(txt.innerText === "♥"){
          txt.innerText = "♡";
        }else{
          txt.innerText = "♥";
        }
        makeLike(music_id)
        .then((res) => {
          console.log("성공?");
        })
        .catch((e) => {
          console.log("err", e);
        });
    }
    return(<div className="depress-playlist">
    <div className="work-area">
    <div className="ment">
        <h2 style={{marginTop:"10vh"}}>당신이 우울했을 때 좋아한 노래</h2>
        <h5 style={{fontSize:"15pt"}}>우울해지면 언제든지 들으러 오세요</h5>
        </div>
        {youtube==="https://www.youtube.com/embed?playlist="?
        (<>
          <div className="no-video">
            <h3>재생할 동영상이 없어요!</h3>
            <p style={{fontSize:"10pt"}}>우울했던 날의 추천 음악에 하트를 눌러 플레이리스트에 추가해보세요.</p>
          </div>
          <div className="no-music">
            <h4>재생할 음악이 없어요!</h4>
          </div>
        </>):
        (<iframe
          className="playlist-iframe"
          src={youtube}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>)}
        <div className="detail-diary-playlist">
      { musicBtn
      ? (
        <>
          {musics.map((ele, i) => {
            var idName = "heart" + i;
            return (
              <>
                  <div className="heart-wrapper" >
                    <>
                      <div  
                        id={idName}
                        style={{
                          cursor: "pointer", color:"red"
                        }}
                        onClick={(e) => likeMusic(ele.id, i)}
                      >
                        ♥
                      </div>
                    </>
                    <div className="music-name-wrapper">
                     {ele.name} 
                    </div>
                  </div>
                  <div className="artist-wrapper">
                    <div>{ele.artist}</div>
                  </div>
              </>
            );
          })}
        </>
      ) : (
        <>
          <div>아직 음악없음</div>
        </>
      )}
    </div>
    </div>
    <MainPlaylist className="main-playlist"></MainPlaylist>
</div>)
}

export default DepressPlaylist