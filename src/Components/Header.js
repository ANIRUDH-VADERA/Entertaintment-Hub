const Header = () => {
    
    const handleClick = ()=>{
        console.log("Hi");
        window.scroll(0,0);
    }
    
    return ( 
        <span onClick={handleClick} className="header">🎶Entertaintment Hub🎶</span>
     );
}
 
export default Header;