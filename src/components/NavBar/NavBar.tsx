// import "./NavBar.css"
function NavBar(props: { text: string, reactLogo: string }) {
    return (
        <nav className="text-center p-2">
            <div className="inline-block align-middle">
                <p className="inline-block m-0 p-0">{props.text}</p>
            </div>
            <img className="inline-block h-[1em] w-[1em] p-0" src={props.reactLogo} alt=""/>
        </nav>
    )
} 

export default NavBar 
