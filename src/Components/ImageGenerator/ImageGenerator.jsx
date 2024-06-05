import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assests/cyberpunk-beautiful-girl-sitting-inside-bar_586390-306.avif'

const ImageGenerator = () => {

    const[ image_url,setImage_url]=useState("/");
    let inputRef=useRef(null);
    const imageGenerator=async()=>{
        if(inputRef.current.value===""){
            return 0;
        }
        const response=await fetch(
            "https://api.openai.com/v1/images/generations ",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent":"Chrome",

                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",

                }),

            }
        );
        let data=await response.json();
        
        let data_array=data.data;
        setImage_url(data_array[0].url);
    }



  return (
    <div className='ai-image-generator'>
      <div className="header">
        Ai Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
            <img src={image_url==="/"?default_image:image_url}alt=''></img>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Enter the Propmt..to Generate the image'/>
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator
