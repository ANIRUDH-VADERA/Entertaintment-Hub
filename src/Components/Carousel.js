import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useEffect, useState } from "react";
import axios from "axios";
import {img_300,noPicture} from "./Config.js"

const handleDragStart = (e) => e.preventDefault();


const Carousel = ({media_type,id}) => {
    const [TrendingData, setData] = useState([]);
    const [isPending, setPending] = useState(true);
    const [isError, setError] = useState(false);
    const [api_key,setAPI] = useState(process.env.REACT_APP_API_KEY);
    const items = TrendingData?.map((item)=>(
        <div className='carouselItem'>
            <img 
                src = {item.profile_path ? img_300+"/"+item.profile_path : noPicture}
                alt = {item?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
            />
            <b className="carouselItem__txt">{item?.name}</b>
        </div>
    ));
      
    useEffect(() => {
        const fetchData = async () => {
        setError(false);
        try {
            const results = await axios("https://api.themoviedb.org/3/"+media_type+"/"+id+"/credits?language=en-US", {
                params: {
                    api_key: api_key,
                }
            });
        setData(results.data.cast);
        setPending(false);
        }
        catch (err) {
        setPending(false);
        setError(true);
        console.log(err);
        }
      }
        fetchData();
      }, [api_key,media_type,id])
  
    
    const responsive =  {
        0: {
            items: 3,
        },
        512 : {
            item : 5,
        },
        1024: {
            items: 7,
        }
      }
    
    return (
    <AliceCarousel 
        autoPlay 
        responsive={responsive} 
        infinite
        disableDotsControls
        disableButtonsControls
        mouseTracking items={items} />
  );
}

export default Carousel;