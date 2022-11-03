import {useContext, useEffect, useState} from "react"

import { UserContext } from '../../App'
import { updateBio, deleteBio } from "../../api/bios"

const Bio = ({bio}) => {
    const {user} = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)

    const [fname, setfname] = useState(bio.name)
    const [femail, setfemail] = useState(bio.email)
    const [ftitle, setftitle] = useState(bio.title)
    const [ftext, setftext] = useState(bio.text)
    const [isValid, setValid] = useState(false)

    useEffect(() => {
        setisAdmin(user.role === 'admin')
    }, [])

    const validate = () => {
        return fname.length && femail.length && 
               ftitle.length && ftext.length && 
               (fname !== bio.name || femail !== bio.email ||
                ftitle !== bio.title || ftext !== bio.text)
    }

    useEffect(() => {
        const isValid = validate();
        setValid(isValid);
    }, [fname, femail, ftitle, ftext]);

    const handleSubmit = (e)=>{        
        let newBio = {
            name: e.target[0].value,
            title: e.target[1].value,
            text: e.target[2].value,
            email: e.target[3].value,
            _id: bio._id
        }

        updateBio(newBio)
            .catch(err => console.log(err))
    }    

    const handleDelete = (e) => {
        deleteBio(bio)
            .catch(err => console.log(err))
        window.location.reload();
    }

    const handleEditAttempt = () => {
        if (isAdmin) {
            setIsEditing(true)
        }
    }

    return(
        <div className = 'tasks-container'>
            {isEditing ? 
                <form onSubmit={handleSubmit}>
                <input type='text' defaultValue={bio.name} placeholder='Name' onChange={e => setfname(e.target.value)}/>
                <input type='text' defaultValue={bio.title} placeholder='Exec Title' onChange={e => setftitle(e.target.value)}/>
                <input type='text' defaultValue={bio.text} placeholder='Bio' onChange={e => setftext(e.target.value)}/>
                <input type = 'text' defaultValue = {bio.email} placeholder='Email' onChange={e => setfemail(e.target.value)}/>
                <input type = 'file' accept=".png, .jpg, .jpeg"  onChange={e => console.log(e)}/>
                <button type="submit" disabled={!isValid}>Update Bio</button> 
                <button type="button" onClick={handleDelete}>Delete Bio</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel Edit</button>
                </form>
                : 
                <div onDoubleClick ={handleEditAttempt}>
                    <h1>{bio.name}</h1>
                    <h2>{bio.title}</h2>
                    <p>{bio.text}</p>
                    <h5>{bio.email}</h5>
                </div>
            }
        </div>
    )


}

export default Bio