import React, { useState } from 'react';
import './App.css';
import './css/all.css';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import Config from './config';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  side: {
      width:'100%',
  }
}));


function Manage() {
    const history = useHistory();
    if (!firebase.apps.length) {
        firebase.initializeApp(Config);
      } else {
        firebase.app();
      }

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var email = user.email;
            var uid = user.uid;
            console.log(email, uid);
        } else {
            history.push('/');
        }
        });
    // var user = firebase.auth().currentUser;
    
    // if(user) {
    // // 使用者已登入，可以取得資料
    //     var email = user.email;
    //     var uid = user.uid;
    //     console.log(email, uid);
    // } else {
    //     history.push('/')
    // }

    const classes = useStyles();
    return (
        <div className="manage">
            <div className="banner">
                <h1>後台管理</h1>
            </div>
            <div className={classes.root}>
                <div className="menu">
                    <List>
                        <ListItem button className="listitem" selected>
                            <ListItemIcon><ClassOutlinedIcon /></ListItemIcon>
                            <p>分類目錄</p>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><ListAltOutlinedIcon /></ListItemIcon>
                            <p>產品列表</p>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><CloudUploadOutlinedIcon /></ListItemIcon>
                            <p>產品上傳</p>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon><ExitToAppOutlinedIcon /></ListItemIcon>
                            <p>登出</p>
                        </ListItem>
                    </List>
                </div>
                <main className={classes.content}>

                    <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                    </Typography>
                </main>
            </div>
            <div className="footer">
                <p>Copyright © 2021 Eviane Inc.</p>
            </div>
        </div>
    )
}

export default Manage;