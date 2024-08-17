function Card(props){
    //console.log(props); image src, image name, and function declaration to add/remove css class to flip the element, moves (2 initially)
    return(
        <>
        <div id={props.index} className={`card ${props.imgName}`} onClick={props.onClick}>
            <div className='card-face front'>?</div>
            <div className='card-face back'>
                <img src={props.imgSrc} width="100%" height="100%"></img>
            </div>
        </div>
        </>
    )
}
export default Card