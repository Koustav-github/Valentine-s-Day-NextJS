"use client"
import "@/app/globals.css";
import { useRef, useState } from "react";

export default function Home() {

  const [mainImageSrc, setMainImageSrc]=useState("image/val1.gif");
  const [innerText, setInnerText]=useState("WILL YOU BE MY VALENTINE ??")
  const [count, setCount]=useState(1);
  const [flag, setFlag]=useState(false);
  const audioRef=useRef<HTMLAudioElement>(null)
  const audioRef2=useRef<HTMLAudioElement>(null)

  const handleNoChange = (event: React.MouseEvent<HTMLButtonElement>) => {
  if(count>3&&flag===false){
  const button = event.currentTarget;
  button.style.position = "absolute";
  button.style.left = `${Math.random() * 85}vw`;
  button.style.top = `${Math.random() * 90}vh`;
  if (audioRef.current) {
  audioRef.current.play();
}}};
  
  const handleNoClick=(event: React.MouseEvent<HTMLButtonElement>)=>{
    if(count<3&&flag===false){
    setCount(count+1);
    setMainImageSrc(`image/val${count+1}.gif`);
    if (audioRef.current) {
    audioRef.current.play();
      }
    if(count===1){
      setInnerText("MANA MAT KARO YAAR -_-_-_-_-")
    }
    if(count===2){
      setInnerText("PLEASE PLEASE PLEASE :(.....")
    }
    }
    else if(count===3&&flag===false){
    setCount(count+1);
    const button = event.currentTarget;
    button.style.position = "absolute";
    button.style.left = `${Math.random() * 85}vw`;
    button.style.top = `${Math.random() * 90}vh`;
    if (audioRef.current) {
    audioRef.current.play();
    }
    setInnerText("LAST CHANCE HAIN CUTIE")
    }

    if(count>3&&flag===false){
    const button = event.currentTarget;
    button.style.position = "absolute";
    button.style.left = `${Math.random() * 85}vw`;
    button.style.top = `${Math.random() * 90}vh`;
    if (audioRef.current) {
    audioRef.current.play();
}}
  };

  const handleYesClick=()=>{
    setMainImageSrc("image/fimal.gif")
    if (audioRef2.current) {
      audioRef2.current.play();
    }
    setInnerText("I KNEW IT CUTIE I<3U <3 <3< 3");
    setFlag(true);
  }


  return (
    <div style={{height:"100vh", width:"100vw", alignItems:"center"}} className="Body, bg-amber-200 flex justify-center">
      <audio ref={audioRef} src="audios/meow2.mp3" ></audio>
      <audio ref={audioRef2} src="audios/done.mp3" loop></audio>
        <img src="image/12.jpg" className="h-[8rem] rounded-xl absolute translate-x-[30vw] translate-y-[28vh]" />
        <img src="image/23.jpg" className="h-[8rem] rounded-xl absolute translate-x-[25vw] translate-y-[3vh]" />
        <img src="image/34.jpg" className="h-[8rem] rounded-xl absolute -translate-x-[25vw] translate-y-[3vh]" />
        <img src="image/45.jpg" className="h-[8rem] rounded-xl absolute -translate-x-[30vw] translate-y-[25vh]" />
        <img src="image/56.jpg" className="h-[8rem] rounded-xl absolute -translate-x-[30vw] -translate-y-[16vh]" />
        <img src="image/67.jpg" className="h-[8rem] rounded-xl absolute -translate-x-[23vw] -translate-y-[35vh]" />
        <img src="image/78.jpg" className="h-[8rem] rounded-xl absolute translate-x-[27vw] -translate-y-[25vh]" />
        <div className="Body bg-pink-300 h-[35rem] w-[35rem] min-h-[15rem] min-w-[15rem] rounded-[20px] flex justify-center items-center">
            <div className="setMainImageSrc"><img src={mainImageSrc} alt="image" className="h-[25rem] w-[28rem] min-h-[5rem] min-w-[8rem] rounded-[20px]" />
                <h3 className=" text-3xl font-semibold text-cyan-800">{innerText}</h3>
                <div className=" flex justify-evenly items-center h-[2.8rem]">
                  <div className="rotating-gradient Body bg-gradient-to-r from-purple-500 via-sky-400 to-emerald-400 h-[48px] w-[208px] flex justify-center items-center rounded-[5px]  hover:cursor-pointer hover:duration-100 hover:scale-110 active:scale-200"><button className="Body bg-rose-500 rounded-[5px] h-[2.5rem] w-[12.5rem] text-3xl hover:cursor-pointer hover:duration-100 transition-all " onClick={handleYesClick}>YES</button></div>
                    
                    <button className="Body bg-rose-500 rounded-[5px] h-[2.5rem] w-[12.5rem] text-[10px] hover:cursor-pointer hover:scale-90 transition-all hover:duration-75 active:scale-75 z-2" onMouseEnter={handleNoChange} onClick={handleNoClick}>NO</button>
                </div>
            </div>
          </div>
    
    </div>
  );
}
