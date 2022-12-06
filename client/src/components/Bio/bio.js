import React, {useContext, useEffect, useState} from "react"

import { UserContext } from '../../App'
import { updateBio, deleteBio } from "../../api/bios"
import { BACKEND_URL, IMAGE_UPLOAD_PRESET } from "../../constants"
import '../Bio/bio.css';
import axios from 'axios';

import CameraAlt from '@material-ui/icons/CameraAlt';
import Create from '@material-ui/icons/Create';



const Bio = ({bio}) => {
    const {user} = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [isValid, setValid] = useState(false)
    const [imageURL, setimageURL] = useState(bio.picture)
    
    const [newBio, setnewBio] = useState(
        {
            name: bio.name,
            title: bio.title,
            email: bio.email,
            text: bio.text,
            photo: bio.picture,
            _id: bio._id
        }
    );

    const email = "mailto:" + bio.email;

    useEffect(() => {
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
        
        let retImageUrl = "";
        if (newBio.photo) {
            let image = newBio.photo
            // formData.append('photo', photo);
            const cloudinaryForm = new FormData();
            cloudinaryForm.append("file", image);
            cloudinaryForm.append("upload_preset", IMAGE_UPLOAD_PRESET);
            const dataRes = await axios.post(
                `https://api.cloudinary.com/v1_1/dalnl907c/upload`,
                cloudinaryForm
            );
            retImageUrl = dataRes.data.url;
        }
        
        if (retImageUrl) {
            newBio.picture = retImageUrl
        }

        await updateBio(newBio, bio._id)
            .then(res => {
                bio = res.data
                setnewBio(bio)
                setIsEditing(false)
                setimageURL(bio.picture)
            })
            .catch(err => console.log(err))
    }    

    const handleDelete = async (e) => {
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
                <div className="edit-buttons">
                    <button type="submit" disabled={!isValid}>Update Bio</button> 
                    <button type="button" onClick={handleDelete}>Delete Bio</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel Edit</button>
                </div>
                
                    <input type='text' name='name' defaultValue={bio.name} placeholder='Name' onChange={handleChange}/>
                    <input type='text' name='title' defaultValue={bio.title} placeholder='Exec Title' onChange={handleChange}/>
                    <input type = 'text' name='email' defaultValue = {bio.email} placeholder='Email' onChange={handleChange}/>
                    <input type='text' name='text' defaultValue={bio.text} placeholder='Bio' onChange={handleChange}/>
                
                <div className = "photo-file">
                    <h1>Upload a photo for your bio <CameraAlt /></h1>
                    <input type = 'file' name='photo' accept=".png, .jpg, .jpeg" onChange={handlePhoto}/>  
                </div>
                </form>
                : 
                <div className = 'bioView'>
                    <img className = 'image' src={imageURL}></img>
                    <table>
                    <tbody>
                    <tr>
                        <td className= 'bioInfo'>
                            <h1>{bio.name}</h1>
                            <div className="exec-title">
                                <h1>{bio.title}</h1>
                            </div>
                            <div className = 'email'>
                                <p>`email: ${bio.email}`</p>
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