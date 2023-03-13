import React from "react";
import '../cases/NewCase.css';
import './NewCase.css'
import service from "../../services/api";
import {useHistory} from "react-router";



export default function  NewCase(props){
    const history = useHistory();
    const [state,setState] = React.useState({
        case_number: '0',
        creation_date: '',
        last_discussion: '',
        prosecutor: '',
        defendant: '',
        defense: '',
        case_description: '',
        tags: ''
    })

    function handleInputChange(event)
    {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    }


    function handleSubmit(event) {
        event.preventDefault();
        console.log(state);
        service.CaseService.addCase(state).then(res => {
            if(res === 'case added successfully'){
                alert("Case added successfully");
            }
        });
    }

        return (
            <div className='Case_page'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <div> מספר תיק:</div>
                            <input type="number" name="case_number" onChange={handleInputChange}/></div>
                        <div>
                            <div>פתיחת תיק:</div>
                            <input type="date" name="creation_date" onChange={handleInputChange}/></div>
                        <div>
                            <div>דיון אחרון:</div>
                            <input type="date" name="last_discussion" onChange={handleInputChange}/></div>
                        <div>
                            <div> תובע:</div>
                            <input type="text" name="prosecutor" onChange={handleInputChange}/></div>
                        <div>
                            <div> נתבע:</div>
                            <input type="text" name="defendant" onChange={handleInputChange}/></div>
                        <div>
                            <div> סנגוריה:</div>
                            <input type="text" name="defense" onChange={handleInputChange}/></div>
                    </div>

                    <div className='description'>
                        <div>
                            <div>תיאור התיק:</div>
                            <textarea name="case_description" onChange={handleInputChange} defaultValue="הוסף את פרטי התיק"/></div>
                    </div>

                    <div className='tags'>
                        <div>
                            <div>תגיות:</div>
                            <textarea name="tags" onChange={handleInputChange} defaultValue="הוסף תגיות"/></div>
                    </div>


                    <div className='Bottom_page'>
                        <button className="button1" onClick={() => history.push(`/TimeLine/`)}>ביטול</button>
                        <button className="button1" type="submit" value="Submit">שמור תיק</button>
                    </div>
                </form>
            </div>

        )
}



