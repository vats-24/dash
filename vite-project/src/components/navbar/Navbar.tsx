import './navbar.scss'

function Navbar() {
  return (
    <div className="navbar">
        <div className="logo">
            <span>Dashboard</span>
        </div>
        <div className="icons">
            {/* <img src="" alt="" className="icon" />  svgsssssssssss */}
            <img src="" alt="" className="icon" />
            <img src="" alt="" className="icon" />
            <div className="notification"></div>
            <div className="user">
                {/* <img src='' alt=''></img> */}
                <span>{localStorage.getItem("Username")}</span>
            </div>
            <img src="" alt="" className="icon" />
        </div>
    </div>
  )
}

export default Navbar