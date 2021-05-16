import React, {useState, useEffect, useMemo, useCallback} from 'react';
import './App.css';
import Card from './components/Card';
import Table from './components/Table';
import cw from './assets/cw.svg';
import design from './assets/design.svg';
import loader from './assets/loader.gif';
/*
FETCH YERINE AXIOS DA KULLANILABILIR. 
BUNU KULLANMAK ISTERSEK yarn add axios YAPMAYI UNUTMAMALI
*/
import axios from 'axios';

/*UYGULAMADA KULLANDIGIM YAPI BASITCE SU SEKILDE:
* APP.JS BILGILERI CEKIYOR VE CARD VE TABLE COMPONENTLERINE DAGITIYOR
* newUser FONKSIYONU/BUTONU ILE APIDEN CEKILEN RANDOM KULLANICI BILGISI userInfo ICINE ALINIYOR
* addUser FONKSIYONU/BUTONU ILE CEKILMIS OLAN userInfo BILGISI userList ICINE DAHIL EDILIYOR
* userInfo CARD.JS E, userList ise TABLE.JS E GONDERILIYOR
* BU KOMPENENTLER DE BILGIYI KENDI ICINDE ISLEYEREK SERGILIYOR
*/

function App() {

  /*CARD A AKTARILAN BILGILER*/
  const [userInfo, setUserInfo] = useState();
  /*TABLE A AKTARILAN BILGILER*/
  const [userList, setUserList] = useState([]);
  /*ADDUSER BUTONUNA BASINCA DISABLE OLMASI ICIN*/
  const [buttonState, setButtonState] = useState(false);
  /*LOADER ICONU ICIN*/
  const [loaderState, setLoaderState] = useState('none');

  /*X DEGISKENI TERNARY ICINDE DUMMY OLARAK KULLANILIYOR*/
  let x=":)";

  /* useEffecti TEMEL KULLANMA MAKSADIM SAYFA ILK ACILDIGINDA ILK VERIYI CEKMESI ICIN.

  useEffectte REFERANS ARRAYINI BOS VERIYORUM. 
  CUNKU newUser FONKSIYONU BIR DEGISKEN DEGISTIGINDE DEGIL, BUTONA BASINCA CAGIRILACAK.
  FAKAT SAYFA ILK ACILDIGINDA DA useEffect SAYESINDE CAGIRILSIN ISTIYORUM.
  EGER BURADA userList DEGISKENINI REFERE EDERSEM UYGULAMA SONSUZ DONGUYE GIRER.
  CUNKU newUser ILE BU DEGISKEN DEGISTIRILIYOR, 
  SONRA DEGISTIGI ICIN useEffect CALISIP YENIDEN newUser I CALISTIRIYOR*/
  useEffect(() => {
    newUser();
  },[])

  /*RANDOM USER BILGISINI CEK*/
  const newUser = () => {
    /*FETCH BASLAYINCA LOADERIMIZI GOSTERELIM*/
    setLoaderState("block");
    fetch('https://randomuser.me/api/')
    .then((res) => res.json())
    .then((res) => { 
      /*APIDEN GELEN BILGILERDEN HANGILERINI KULLANACAGIMIZ BELLI OLDUGU ICIN
      BASTAN SABIT ISIMLERE TAHSIS ETMEK MANTIKLI VE KOLAY UYGULANABILIR GORUNUYOR*/
      setUserInfo(
        {
          img: res.results[0].picture.large,
          name: res.results[0].name.first + ' ' + res.results[0].name.last,
          age: res.results[0].dob.age,
          email: res.results[0].email,
          location: res.results[0].location.city,
          phone: res.results[0].cell,
          password: res.results[0].login.password,
        }
      );
      console.log(res);
      /*FETCH BITINCE LOADER YOK OLSUN*/
      setLoaderState("none");
    });
    /*addUser BUTONU YENIDEN KULLANILABILIR OLSUN*/
    setButtonState(false);
  }

  /*GORUNTULENEN userInfo BILGISINI userList E EKLEYEN FONKSIYON*/
  const addUser = (e) => {
    /*EGER userList ICINDE BU KULLANICI BILGISI MEVCUTSA YENIDEN EKLEME
      x DEGISKENI DUMMY :)
    */
    !userList.includes(userInfo) ? setUserList([...userList, userInfo]) : x=0;
    /*YORUMDAKI FONKSIYONLAR VIRTUAL DOM MANIPULASYONU ICIN GEREKTIGINDE BU SEKILDE KULLANILABILIR*/
    // const id = e.target.name;
    //e.target.disabled=true;
    /*AYNI KULLANICI BILGISINI TEKRAR EKLEYEMEYECEGINI KULLANICININ ANLAMASI ICIN BUTONU DISABLE ET*/
    setButtonState(true);
  }

  return (
    <div className="App">
      <img className="header-img" src={cw} alt=""></img>
      <div className="frame">
        <Card userInfo={userInfo} ></Card>
        <div className="fetchers">
          <button onClick={newUser} name="newButton">New User</button>
          <button onClick={addUser} name="addButton" disabled={buttonState}>Add User</button>
        </div>
        <Table userList={userList}></Table>
      </div>
      <div className="footer">
        <span className="contributer">{'<Ray/>'}</span>
        <img src={design} alt="" /> 
        <span className="design">design</span> 
      </div>  
      <div className="loader" style={{display: loaderState}}>
        <img width="120px" src={loader}/>
      </div>
    </div>
  );
}

export default App;
