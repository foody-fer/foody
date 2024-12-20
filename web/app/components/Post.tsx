import { useState } from "react";

export default function Post(){
    const [likes, setLikes] = useState(false);
    const [comm, setComm] = useState(true);
    const [saves, setSaves] = useState(false);
    const [likeNum, setLikeNum] = useState(121);
    const [commNum, setCommNum] = useState(58);

    
    const handleClick1 = () => {
        if(likes){
            let tmp = likeNum - 1;
            setLikeNum(tmp);
        } else {
            let tmp = likeNum + 1;
            setLikeNum(tmp);
        }
        setLikes(!likes)   
    }

    const handleClick2 = () => {
        setComm(!comm)        
    }

    const handleClick3 = () => {
        setSaves(!saves)   
    }
    
    let picture = '';
    let css = " h-4 w-6 pl-2 mr-1"
    if(!likes){
        picture = './images/nolike.png'
        css = "w-7 h-4 pl-1"
    } else
        picture = './images/like.png'

    return (
        <div className="h-auto bg-gray-100 flex flex-col gap-4 mb-4 p-2 rounded-lg">
            {/* USER */}
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                    <img src="./images/user_icon.jpg" alt="user pic" height={40} width={40} className="rounded-full"/>
                    <span className="text-textColor mt-2">Pero Peric</span>
                </div>
                <img src="./images/more.svg" alt="" height={16} width={16}/>
            </div>
            {/* CONTENT */}
            <div className="flex flex-col gap-2">
                <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800" alt="food" className="w-full rounded-md"/>
                <span className="text-textColor"> Ovdje ide tekst post-a sdass sd as da s ss ssssadfas  fasasfasfa  asf asf sf as fasfsafs</span>
            </div>
            {/* INTERACTION */}
            <div className="flex flex-row justify-between text-xs">
                <div className="flex flex-row gap-2">
                    <div className="text-textColor flex flex-row  bg-white rounded-full p-1">
                        <img src={picture} alt="like" onClick={handleClick1} className={`transition duration-500 cursor-pointer mt-[0.1rem] ${css}`}/>
                        <span className="mr-1 cursor-pointer mt-[0.1rem]" onClick={handleClick1}>Like |</span>
                        <span className="pr-2 mt-[0.1rem]">{likeNum}</span>
                    </div>
                    <div className="text-textColor flex flex-row  bg-white rounded-full p-1">
                        <img src="./images/comment.png" alt="like" onClick={handleClick2} className="cursor-pointer h-5 w-5 mr-1 mt-[0rem] pl-1"/>
                        <span className="mr-1 cursor-pointer" onClick={handleClick2}>Comment |</span>
                        <span className="pr-2">{commNum}</span>
                    </div>
                </div>
                <div className={"text-textColor flex flex-row rounded-full p-1 transition duration-300"+(saves ? ' bg-green-400 text-white' : ' bg-white')}>
                    <img src={"./images/"+(saves ? 'saveW.png' : 'save.png')} alt="like" onClick={handleClick3} className="cursor-pointer h-3 w-4 mr-1 mt-[0.2rem] pl-1"/>
                    <span className="pr-2 pl-1 cursor-pointer" onClick={handleClick3}>Save</span>
                </div>
            </div>
        </div>
    );
}