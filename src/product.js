import './App.css';
import firebase from 'firebase';
import Config from './config';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function App() {
  const [ imgState, setimgState ] = useState(true);
    const [ imgfile, setimgfile ] = useState('');
    const [ imgname, setimgname ] = useState('');
    const [ imgData, setimgData ] = useState('');
    const [ imgURL, setimgURL ] = useState('');
    const [Name , setName] = useState('');
    const [info,setinfo] = useState('');
    const [type,settype] = useState('');

    const types = [
      { value: "桌子"},
      { value: "椅子"},
      { value: "沙發"},
      { value: "床"},
      { value: "櫥櫃"},
      { value: "廚房家具"},
    ]
    
    const _upImg = () => {
        let upimgs = document.getElementById("upimg")
        upimgs.click();
    }

    const upChange = (event) => {
        let imgfile = event.currentTarget.files[0];
        console.log('pic',imgfile.name)
        if (imgfile.size > 1024000) {
            let upimgs = document.getElementById("upimg")
            upimgs.value=''
        }else {
            let reader = new FileReader();
            reader.readAsDataURL(imgfile);
            reader.onload = function (event) {
                let imgs = this.result
                setimgState(false)
                setimgData(imgs)
                setimgfile(imgfile);
                setimgname(imgfile.name)
            };
        }
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(Config);
    } else {
      firebase.app();
    }
    var storage = firebase.storage();
    const db = firebase.firestore();

    async function Upload(){
      const path = imgname;
      const storageReference = firebase.storage().ref(path)
      const task = storageReference.put(imgfile);
      task.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
      }, function() {
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          setimgURL(downloadURL)
        });
      });

    } 
    
    async function newinfo(){
      const time = new Date();
      const YY = time.getFullYear()
      const MM = time.getMonth()+1
      const DD = time.getDate()
      const HH = time.getHours()
      const M = time.getMinutes()
      const SS = time.getSeconds()
      const Time = YY+"/"+MM+"/"+DD+" "+HH+":"+M+":"+SS
      db.collection("product").add({
        name: Name,
        type: type,
        info: info,
        img: imgURL,
        time:Time,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }

  return (
    <div className="App">
      <form noValidate autoComplete="off">
      <h3 style={{marginBottom:"-3px"}}>產品資訊</h3>
                <div><TextField required label="產品名稱" value ={Name}  onChange={e=>setName(e.target.value)}/></div>
                <div><TextField required label="產品種類" value ={type}  select onChange={e=>settype(e.target.value)}  style={{width:"170px"}}>
                    {types.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                      {option.value}
                      </MenuItem>
                      ))}
                  </TextField>
                </div>
                <div style={{marginBottom:"10px"}}><TextField label="產品詳細資訊" value ={info}  onChange={e=>setinfo(e.target.value)}/></div>
                <div style={{marginTop:"10px",textAlign:"center"}}>
                    <Button
                  >
                    上一步
                  </Button>
                  <Button  variant="contained" color="primary" onClick={newinfo}>送出</Button></div>
      </form>
      <div style={{margin:"10px"}}>
              <img style={{height:"250px"}} src={imgData} alt="請選擇圖片"/>
              </div>
              <input id='upimg' type='file' style={{ display: 'none' }} accept='image/*' onChange={upChange} />
              <button onClick={_upImg} variant="outlined" style={{marginTop:"10px"}}>
                  { imgState?'選擇圖片':'重新選擇' }
              </button>
              { imgState? "":<button variant="contained" color="primary" onClick={Upload}>確定上傳</button>}
              <img style={{height:"250px"}} src={imgURL} alt="圖片"/>
    </div>
  );
}

export default App;
