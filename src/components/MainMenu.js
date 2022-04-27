import React, {useState, useEffect} from 'react'
import { scaleRotate as Menu } from 'react-burger-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTable, faChartLine, faArrowAltCircleRight } from '@fortawesome/fontawesome-free-solid'
import '../css/MainMenu.css'
import {Link} from "react-router-dom";

export default function MainMenu() {

    const [isOpen,setOpen] = useState(false);

    const [isDisable, setIsDisable] = useState()

    useEffect(() => {
      const interval = setInterval(() => {
        setIsDisable(sessionStorage.isLogin)
      }, 1000);
      return () => clearInterval(interval);
    }, [])

  return (
    <Menu isOpen={isOpen} onOpen={()=>setOpen(true)} onClose={_=>setOpen(false)} >
      <Link id="home" className="bm-item" to="/home">
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          <span>Home</span>
      </Link>
      {isDisable && <div style={{display: 'flex', flexDirection: 'column'}}>
      {/* <Link id="excels" className="bm-item" to="/excels">
          <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>
          <span>Daily Excels</span>
      </Link> */}
      <Link id="graphs" className="bm-item" to="/graphs">
          <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>
          <span>Graphs</span>
      </Link>
      {/* <Link id="logout" className="bm-item" to="/logout">
          <FontAwesomeIcon icon={faArrowAltCircleRight}></FontAwesomeIcon>
          <span>Logout</span>
      </Link> */}
      </div>}
    </Menu>
  )
}