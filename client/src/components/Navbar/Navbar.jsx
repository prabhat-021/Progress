import { React, useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import collegeIcon from '../../assets/logo.png';
import { FcMenu } from "react-icons/fc";

export default function Navbar() {
    const [Open, setOpen] = useState(false);
  const [Visible, setVisible] = useState(false);

  const upMenu = () => {
    setOpen(!Open);
  };

  useEffect(() => {
    if (window.innerWidth <= 700) {
      setVisible(true);
    } else {
      setVisible(false);
      setOpen(false);
    }
    const handleResize = () => {
      setVisible(window.innerWidth <= 700);
      setOpen(false);
    };
    console.log(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // Screen increase --> menu Remove
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const [navcss,setnavcss] = useState({});

  return (
    <div className={styles.nav_container}>
      <img src={collegeIcon} className={styles.club_icon_img} alt="logoicon"></img>

      <div className={`${!Visible ? styles.link_container : styles.close_menu} ${Open ? styles.mobile_view : ""}`}>
        <Link to="/" className={`${Open ? styles.nav_mobile_view : ""} ${styles.nav_link}`}>Home</Link>
        <Link to="/team" className={`${Open ? styles.nav_mobile_view : ""} ${styles.nav_link}`}>Team</Link>
        <Link to="/resource" className={`${Open ? styles.nav_mobile_view : ""} ${styles.nav_link}`}>Resources</Link>

        <Link to="/resource" className={`${Open ? styles.nav_mobile_view : ""} ${styles.nav_link}`}>Contact</Link>

        {/* styles.nav_link */}
        
        {Open ?
          <a href="https://discord.gg/aDEMAmEP"> <button className={`${Open ? styles.join_mobile : styles.close_menu}`}>Join Us</button></a>
          : ""}
      </div>

      <a href="https://discord.gg/aDEMAmEP"> <button className={styles.joinbtn}>Join Us</button></a>

      <div className={`${styles.ham_menu} ${Visible ? "" : styles.close_menu}`} onClick={upMenu}>
        <FcMenu size={30} />
      </div>
    </div>
  );
};
