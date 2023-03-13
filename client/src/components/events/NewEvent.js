import React, {useCallback, useEffect, useState} from "react";
import './NewEvent.css'
import {useHistory, useParams} from "react-router-dom";
import service from "../../services/api";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Moment from "moment";
import {DropzoneArea} from "material-ui-dropzone";
import {createStyles, ListItem} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';


const NewEvent = () =>
{
    const {id} = useParams();
    const [currentEvent, setEvent] = React.useState({
        id: 0,
        case_number: '111',
        title: '',
        date: '',
        hour: '',
        category: '',
        case_description: '',
        tags: '',
        icon: '',
        full_name: '',
        phone: '',
        mail: '',
        document: '',
        new_category: '',
        files: '',
    });

    const [docs, setDocs] = React.useState([]);


    useEffect(() => {
        if(id !== "0"){
            service.EventService.getEvent(id).then(res => JSON.parse(res))
                .then(event => {
                    setEvent(event[0].fields);
                    console.log(currentEvent);
                });
            service.DocsService.getDocs(id).then(res => JSON.parse(res))
                .then(docs => {
                    setDocs(docs);
                    console.log(docs);
                })
        }
    }, []);

    const history = useHistory();


    const categories = [
        {
            value: 'ראיה',
            label: 'ראיה',
        },
        {
            value: 'עדות',
            label: 'עדות',
        },
    ];

    function handleInputChange(event)
    {
        const value = event.target.value;
        setEvent({
            ...currentEvent,
            [event.target.name]: value
        });
    }


    function submit(event) {
        let msg = '';
        event.preventDefault();
        currentEvent.id = id;
        console.log(currentEvent);
        if(id !== "0"){
            msg = `האם לעדכן את פרטי האירוע ${currentEvent.title}?`;
        }
        else{
            msg = `האם להוסיף את האירוע ${currentEvent.title}?`;
        }
        if(window.confirm(msg)){
            if(currentEvent.files !== undefined){
                let t = {
                    file : currentEvent.files[0],
                    id: currentEvent.id
                }
                service.DocsService.addDoc(t).then(res => {
                    if (res === 'Success'){

                    }
                });
            }
            currentEvent.date = new Date(currentEvent.date);
            service.EventService.addEvent(currentEvent).then(res => {
                if(res === 'event added successfully'){
                    if(window.confirm("אירוע נוסף בהצלחה!")){
                        history.push(`/TimeLine/`);
                    }
                }
                else{
                    alert("תקלה! לא ניתן להוסיף אירוע");
                }
            });
        }
    }


    return (
        <div className='Event_page'>
            <form onSubmit={submit}>
                    <div className='details'>
                        <TextField label="כותרת" name="title" onChange={handleInputChange} value={currentEvent.title} />
                        <TextField
                            id="date"
                            name="date"
                            label="תאריך"
                            type="date"
                            onChange={handleInputChange}
                            value= {currentEvent.date === '' ? '' : Moment(currentEvent.date).format('YYYY-MM-DD')}
                            InputLabelProps={{
                                shrink: true,

                            }}
                        />
                        <TextField
                            id="time"
                            label="שעה"
                            type="time"
                            defaultValue="07:30"
                            name="hour"
                            value={currentEvent.hour}
                            // className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            onChange={handleInputChange}
                        />
                        <TextField
                            // id="standard-select-currency"
                            select
                            label="קטגוריה"
                            name="category"
                            // defaultValue='ראיה'
                            value={currentEvent.category === undefined ? '' : currentEvent.category}
                            onChange={handleInputChange}
                            helperText="בחר קטגוריה"
                            className="select"
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div className='icon'>
                            <TextField
                                // id="standard-select-currency"
                                select
                                label="אייקון"
                                name="icon"
                                // defaultValue='תגיות'
                                value={currentEvent.icon === undefined ? '' : currentEvent.icon}
                                onChange={handleInputChange}
                                helperText="בחר קטגוריה"
                                className="select"
                            >
                                <MenuItem key='תגיות' value='תגיות'>תגיות</MenuItem>
                            </TextField>
                        </div>
                    </div>
                <div className='description'>
                        <TextField
                            // id="outlined-multiline-static"
                            name="case_description"
                            label="פרטי האירוע"
                            multiline
                            rows={4}
                            defaultValue="הוסף את פרטי האירוע"
                            variant="outlined"
                            value={currentEvent.case_description}
                            onChange={handleInputChange}
                        />
                            <TextField
                                // id="outlined-multiline-static"
                                name="tags"
                                label="תגיות"
                                multiline
                                rows={4}
                                defaultValue="הוסף תגיות"
                                variant="outlined"
                                value={currentEvent.tags}
                                onChange={handleInputChange}
                            />

                </div>
                <div className={"documents"}>
                    <DropzoneArea
                        useChipsForPreview
                        onChange={(files) => {
                            console.log('Files:', files);
                            currentEvent.files = files;
                        }}
                    />

                    <List>
                        {
                            docs.map((doc) => {
                                return <ListItem
                                    button
                                    onClick={(d) => service.DocsService.openDoc(doc).then(res => console.log(res))}>
                                    <ListItemText
                                        primary={doc.fields.name}
                                        secondary={doc.fields.upload_date}/>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end"
                                                    aria-label="delete"
                                                    onClick={(d) => {
                                                        if(window.confirm(`האם למחוק את המסמך ${doc.fields.name}?`)) {
                                                            service.DocsService.removeDoc(doc)
                                                                .then(res => {
                                                                    console.log(res);
                                                                    if (res.status === 200) {
                                                                        alert("מסמך נמחק בהצלחה!");
                                                                        window.location.reload();
                                                                    }
                                                                })
                                                        }
                                                    }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            })
                        }
                    </List>
                </div>
                <div className="personalDetails">
                    <TextField label="שם מלא" name="full_name" onChange={handleInputChange} value={currentEvent.full_name}/>
                    <TextField label="טלפון" name="phone" onChange={handleInputChange} value={currentEvent.phone}/>
                    <TextField label="דואל" name="mail" onChange={handleInputChange} value={currentEvent.mail} alidators={['required', 'isEmail']}
                               errorMessages={['this field is required', 'email is not valid']}/>
                </div>
                <div className='Bottom_page'>
                    <button className="button1" onClick={() => history.push(`/TimeLine/`)}>ביטול</button>
                    <button className="button1" onClick={submit} type="submit" value="Submit">שמור אירוע</button>
                </div>
            </form>

        </div>
    )
}

export default NewEvent;

