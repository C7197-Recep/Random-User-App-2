import React, {useState, useEffect, useMemo, useCallback} from 'react';
import man from "../assets/man.svg";
import mail from "../assets/mail.svg";
import age from "../assets/growing-up-man.svg";
import location from "../assets/map.svg";
import phone from "../assets/phone.svg";
import password from "../assets/padlock.svg";

function Card({userInfo}){

    /*APP JS DEN GELEN userInfo BILGISINDEN HANGISININ GOSTERILECEGINI BELIRLEYEN STATE*/
    const [show, setShow]=useState();

    /*USESTATE YERINE ALGORITMAYLA YAPMAK ISTERSEK*/
    // const showInfo = (item, subitem) => { 
    //     let str="";   
    //     let title="";   
    //     let x;   
    //     subitem ? title=subitem : title=item;
    //     for (x in userInfo[item]) {
    //         subitem ?
    //         str = userInfo[item][subitem]
    //         :
    //         str += " " + userInfo[item][x] ;
    //     }
    //     str="My " + title + " is " + str;
    //     setShow(str);
    // }

    /*userInfo ARRAYI ICINDEKI HANGI ITEMIN GOSTERILECEGINI STATE AKTARIYOR
      img LER ICINDEKI onClick DE CAGIRILIYOR
    */
    const showInfo = (item) => {
        setShow({
            "first": item,
            "second" : userInfo[item]
        });
    }

    /*COMPONENT ILK CAGIRILDIGINDA userInfo ICINDEN name BILGISINI GOSTERSIN
      userInfo HER DEGISTIGINDE BU ISLEMI OTOMATIK OLARAK TEKRAR YAPMASI ICIN
      userInfo DEGISKENINI (YA DA SABITI NEYSE) REFERANS VERDIM    
    */
    useEffect(() => {
        userInfo ? showInfo("name") : userInfo="";
      }
    ,[userInfo])

    return(
        <div className="card"> 
            <div className="picture">
                <img src={userInfo?.img} alt=""/>
            </div>
            <div className="info">
                <p>My {show?.first} is</p>
                <h2>{show?.second}</h2>
            </div>
            <div className="buttons">
                <img src={man} alt="" onClick={()=>showInfo("name")}/>
                <img src={mail} alt="" onClick={()=>showInfo("email")}/>
                <img src={age} alt="" onClick={()=>showInfo("age")}/>
                <img src={location} alt="" onClick={()=>showInfo("location")}/>
                <img src={phone} alt="" onClick={()=>showInfo("phone")}/>
                <img src={password} alt="" onClick={()=>showInfo("password")}/>
            </div>
        </div>
    );
}

export default Card;