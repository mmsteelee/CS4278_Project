import React, {useContext, useEffect, useState} from "react"

import { UserContext } from '../../App'
import { updateBio, deleteBio } from "../../api/bios"
import { BACKEND_URL } from "../../constants"
import '../Bio/bio.css';

const Bio = ({bio}) => {
    const {user} = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [isValid, setValid] = useState(false)
    const [imageURL, setimageURL] = useState(`${BACKEND_URL}/image/${bio.picture}`)
    
    const [newBio, setnewBio] = useState(
        {
            name: bio.name,
            title: bio.title,
            email: bio.email,
            text: bio.text,
            photo: '',
            _id: bio._id
        }
    );

    const email = "mailto:" + bio.email;

    useEffect(() => {
        bio.name = 'Matt'
        setisAdmin(user.role === 'admin')
    }, [])

    const validate = () => {
        return newBio.name && newBio.title && 
               newBio.email && newBio.text
    }

    useEffect(() => {
        const isValid = validate();
        setValid(isValid);
    }, [newBio]);

    const handleSubmit = async (e)=>{
        e.preventDefault()    
        const formData = new FormData()
        
        formData.append('name', newBio.name);
        formData.append('title', newBio.title);
        formData.append('email', newBio.email);
        formData.append('text', newBio.text);
        if (newBio.photo) {
            let photo = newBio.photo
            formData.append('photo', photo);
        }

        await updateBio(formData, bio._id)
            .then(res => {
                bio = res.data
                setimageURL(`${BACKEND_URL}/image/${bio.picture}`)
                setnewBio(bio)
                setIsEditing(false)
            })
            .catch(err => console.log(err))
    }    

    const handleDelete = (e) => {
        deleteBio(bio)
            .catch(err => console.log(err))
        window.location.reload();
    }

    const handleChange = (e) => {
        setnewBio({...newBio, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setnewBio({...newBio, photo: e.target.files[0]});
    }


    const handleEditAttempt = () => {
        if (isAdmin) {
            setIsEditing(true)
        }
    }

    
    return(
        <div className = 'tasks-container'>
            {isEditing ? 
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <input type='text' name='name' defaultValue={bio.name} placeholder='Name' onChange={handleChange}/>
                <input type='text' name='title' defaultValue={bio.title} placeholder='Exec Title' onChange={handleChange}/>
                <input type='text' name='text' defaultValue={bio.text} placeholder='Bio' onChange={handleChange}/>
                <input type = 'text' name='email' defaultValue = {bio.email} placeholder='Email' onChange={handleChange}/>
                <input type = 'file' name='photo' accept=".png, .jpg, .jpeg"  onChange={handlePhoto}/>
                <button type="submit" disabled={!isValid}>Update Bio</button> 
                <button type="button" onClick={handleDelete}>Delete Bio</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel Edit</button>
                </form>
                : 
                <div className = 'bioView' onDoubleClick ={handleEditAttempt}>
                    <img src={imageURL}></img>
                    <table>
                    <tbody>
                    <tr>
                        <td className= 'bioInfo'>
                            <h1>{bio.name}</h1>
                            <div className="exec-title">
                                <h1>{bio.title}</h1>
                            </div>
                            <div className = 'email'>
                                <a href= {bio.email}> email: {bio.name} </a> 
                                {/* <a href="mailto:drechsler.lina@gmail.com"> email lina </a>  */}
                            </div>
                            <p>{bio.text}</p>
                        </td>
                        {/* <td classname = 'bioText'>
                            <p>{bio.text}</p>
                        </td> */}
                    </tr>
                    </tbody>
                    </table>
                    
                </div>
            }           
        </div>
    )


}

export default Bio