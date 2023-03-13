import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {IoHomeOutline} from "react-icons/io5";
import {IoPersonCircleSharp} from "react-icons/io5";
import {IoNotificationsOutline} from "react-icons/io5";
import './NavBar.css'
import {useHistory} from 'react-router-dom';

export default function NavBar() {
    const history = useHistory();

    const newCaseRedirect = () => history.push("/case");
    const newEventRedirect = () => history.push("/event/0");
    const timeLineRedirect = () => history.push("/TimeLine");

    return (
        <div className='root'>
            <AppBar >
                <Toolbar className='topTool'>
                    <IconButton className='menuButton'>
                        <IoHomeOutline color="white" onClick={timeLineRedirect}/>
                    </IconButton>
                    <IconButton className='menuButton'>
                        <IoPersonCircleSharp color="white"/>
                    </IconButton>
                    <IconButton className='menuButton'>
                        <IoNotificationsOutline color="white"/>
                    </IconButton>

                    <Button color="inherit" className='newCaseButton' onClick={newCaseRedirect}>הוספת תיק חדש</Button>
                </Toolbar>

                <Toolbar className='bottomTool'>
                    <Button className='leftButton'>תצוגה</Button>
                    <Button className='leftButton'>ייצוא</Button>
                    <Button className='leftButton'>שיתוף</Button>
                    <Button className='leftButton'>פרטי תיק</Button>
                    <div className='selectCase'>תיק:
                        <select name="casesNumber">
                            <option value="4000">4000</option>
                            <option value="5000">5000</option>
                        </select></div>
                    <Button className='rightButton'>תגיות</Button>
                    <Button className='rightButton'>סינון נתונים</Button>
                    <Button className='rightButton' onClick={newEventRedirect}>הוספת אירוע</Button>

                </Toolbar>
            </AppBar>
        </div>
    );
}