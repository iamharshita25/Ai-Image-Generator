import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assests/cyberpunk-beautiful-girl-sitting-inside-bar_586390-306.avif';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }

        try {
            const response = await fetch(
                "https://api.deepai.org/api/text2img",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer 15af7cc0-3910-49a4-bac6-88917a32caad",
                        "User-Agent": "Chrome",
                    },
                    body: JSON.stringify({
                        prompt: `${inputRef.current.value}`,
                        n: 1,
                        size: "512x512",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let data = await response.json();
            let data_array = data.output; // Ensure you're accessing the correct key from the API response

            if (data_array && data_array.length > 0) {
                setImage_url(data_array[0].url);
            } else {
                console.error("No data found");
                setImage_url("/");
            }
        } catch (error) {
            console.error("Error fetching the image:", error);
            setImage_url("/");
        }
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">
                Ai Image <span>Generator</span>
            </div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url === "/" ? default_image : image_url} alt='' />
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Enter the Prompt..to Generate the image' />
                <div className="generate-btn" onClick={imageGenerator}>Generate</div>
            </div>
        </div>
    )
}

export default ImageGenerator;
