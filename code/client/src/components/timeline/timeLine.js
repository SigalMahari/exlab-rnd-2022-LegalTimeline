import React, {useState} from 'react';
import './timeLine.css';
import service from "../../services/api";
import {Timeline, TimelineItem} from 'vertical-timeline-component-for-react';
import Moment from 'moment';
import {Edit} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import {generatePath, useHistory} from "react-router";
import {Link} from "react-router-dom";



const TimeLine = ({navigation}) => {
    const history = useHistory();
    let [items, setItems] = useState([]);
    let [id, setId] = useState(0);
    if (items.length === 0) {
        service.EventService.GetEventsForCase(111).then(events => JSON.parse(events))
            .then(events => {
                setItems(events)
                console.log(items);
            })
    }

    function editEvent(eventId) {
        console.log(eventId);
        history.push("/events/" + eventId);
    }

    const handleProceed = (e) => {
        id = e;
        id && history.push(generatePath("/event/:id", { id }));
    };

    return (
            <div className='timeLine' style={{width: "100%", height: "950px"}}>
                <Timeline lineColor={'#dcdcdc'} animate={true}>
                    {
                        items.map(event => {
                            return <TimelineItem Key={event.pk}
                                                 dateText={Moment(event.fields.date).format('DD-MM-YYYY')}
                                                 dateInnerStyle={{background: '#555555', color: '#ffffff'}}
                                                 style={{color: '#000000'}}
                                                 bodyContainerStyle={{
                                                     background: '#dcdcdc',
                                                     padding: '20px',
                                                     borderRadius: '8px',
                                                     boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
                                                 }}>
                                <div className={'eventHeader'}>
                                    <div className={'eventTitle'}>{event.fields.title}</div>
                                    <div>
                                        <button className={'editButton'} onClick={() => handleProceed(event.pk)}>
                                            <Tooltip title="ערוך אירוע">
                                                <Edit/>
                                            </Tooltip>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    {event.fields.case_description}
                                </div>
                            </TimelineItem>
                        })
                    }
                </Timeline>
            </div>
    )
}

export default TimeLine;




