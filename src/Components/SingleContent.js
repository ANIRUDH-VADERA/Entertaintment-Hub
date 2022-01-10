import {img_300, unavailable} from "./Config.js"
import Badge from '@mui/material/Badge';
import ContentModal from "./ContentModal.js";

const SingleContent = (props) => {
    return ( 
        <ContentModal media_type = {props.media_type === "tv" ? "tv" : "movie"} id={props.id}>
                <Badge badgeContent = {props.vote_average} color={props.vote_average>7?"primary":"secondary"}></Badge>
                <img className = "poster" src={ props.poster ? (img_300 + "/" + props.poster) : unavailable} alt={props.title}></img>
                <b className="title">{props.title}</b>
                <span className="subTitle">{props.media_type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{props.date}</span>
                </span>
        </ContentModal>
     );
}
 
export default SingleContent;