import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import axios from "axios";
import {img_500,unavailable,unavailableLandscape} from "./Config.js"
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from "./Carousel.js";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height : "80%",
  borderRadius: 10,
  bgcolor: '#39445a',
  color : "white",
  border: '1px solid #282c34',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({children,id,media_type}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [TrendingData, setData] = useState([]);
  const [isPending, setPending] = useState(true);
  const [isError, setError] = useState(false);
  const [api_key,setAPI] = useState(process.env.REACT_APP_API_KEY);
  const [video,setVideo] = useState();


  useEffect(() => {
    const fetchData = async () => {
    setError(false);
    try {
        const results = await axios("https://api.themoviedb.org/3/"+media_type+"/"+id+"?language=en-US", {
            params: {
                api_key: api_key,
            }
        });
    console.log(results.data);
    setData(results.data);
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

  useEffect(() => {
    const fetchData = async () => {
    setError(false);
    try {
        const results = await axios("https://api.themoviedb.org/3/"+media_type+"/"+id+"/videos?language=en-US", {
            params: {
                api_key: api_key,
            }
        });
    console.log(results.data.results[0]?.key);
    setVideo(results.data.results[0]?.key);
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
  
  return (
    <div>
      <div className = "media" style={{cursor : "pointer"}} onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>

              {TrendingData && <div className='ContentModal'>
                <img className = "ContentModal__portrait" src = {TrendingData.poster_path?img_500+"/"+TrendingData.poster_path: unavailable} alt={TrendingData.name || TrendingData.title} />
                <img className = "ContentModal__landscape" src = {TrendingData.backdrop_path?img_500+"/"+TrendingData.backdrop_path: unavailableLandscape} alt={TrendingData.name || TrendingData.title} />
                <div className='ContentModal__about'>
                  <span className='ContentModal__title'>
                    {TrendingData.name || TrendingData.title}(
                      {(
                        TrendingData.first_air_date ||
                        TrendingData.release_date ||
                        "______").substring(0,4)
                      }
                    )
                  </span>
                  {TrendingData.tagline && (<i className='tagline'>{TrendingData.tagline}</i>)}
                  <span className='ContentModal__description'>
                    {TrendingData.overview}
                  </span>
                  <div>
                      <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button 
                  variant = "contained"
                  startIcon = {<YouTubeIcon />}
                  color = "secondary"
                  target = "__blank"
                  href = {"https://www.youtube.com/watch?v="+video}
                  >
                      Watch the Trailer
                  </Button>
                </div>
              </div>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}