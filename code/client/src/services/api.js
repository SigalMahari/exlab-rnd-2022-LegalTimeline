import Axios from 'axios'

const $axios = Axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

const $fileAxios = Axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

$axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("got error")
        console.error(error)

        throw error;
    });


class CaseService {
    static addCase(newCase) {
        return $axios
            .post('cases/add', newCase)
            .then(response => response.data)
    }
    static GetAllCases(){
        return $axios
            .get('cases/get', )
            .then(response => response.data)
    }


    static getCase(caseid){
        return $axios
            .get(`cases/get/${caseid}`)
            .then(response => response.data)

    }

}

class EventService {
    static addEvent(newEvent) {
        return $axios
            .post('events/add', newEvent)
            .then(response => response.data)
    }

    static GetAllEvents(){
        return $axios
            .get('events/get', )
            .then(response => response.data)
    }

    static GetEventsForCase(caseId){
        return $axios
            .get(`events/getEvents/${caseId}`, )
            .then(response => response.data)
    }


    static getEvent(eventid){
        return $axios
            .get(`events/get/${eventid}`)
            .then(response => response.data)

    }
}

class DocsService{
    static getDocs(eventId){
        return $axios
            .get(`docs/get/${eventId}`)
            .then(response => response.data)

    }

    static addDoc(t){
        const formData = new FormData();
        formData.append('files', t.file)
        formData.append('id', t.id)
        return $fileAxios.post(`docs/add`, formData).then(res => res.data)
    }

    static openDoc(d){
        console.log(d);
        return $axios.post(`docs/open`, d).then(res => res.data)
    }

    static removeDoc(doc){
        console.log(doc);
        return $axios.post('docs/remove', doc).then(res => res)
    }
}

const service = {
    CaseService,
    EventService,
    DocsService
}

export default service
