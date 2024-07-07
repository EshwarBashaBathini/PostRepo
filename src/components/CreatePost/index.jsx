import './createpost.css'
import {Link} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState, useContext } from 'react';
import ReactContext from '../../context/ReactContext';

const CreatePost = () => {
    const {AddPostList} = useContext(ReactContext)
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const ontitleChange = (event) => {
        setTitle(event.target.value)
        setErrMsg('')
        setSuccessMsg('')
    
    }
    const onContentChange = (event) =>{
         setContent(event.target.value)
         setErrMsg('')
        setSuccessMsg('')
    }

    const onCreatePost = (event) => {
        event.preventDefault()
        setErrMsg('')
        setSuccessMsg('')
        if ((title !== '' )&& (content !== '')){
            setSuccessMsg('New Post is Created in the PostDisplay and Click here to Navigate')
            const postDetails={
                id: uuidv4(),
                title,
                content,
                category: "Latest",
            }
            AddPostList(postDetails)
            setTitle('')
            setContent('')
        }else{
            if (title==='' && content === ''){
                setErrMsg('Please Enter the Title and Content')
            }else if (title !== '' &&  content ===''){
                setErrMsg('Please Enter the Content')
            }else if (title === '' &&  content !==''){
                setErrMsg('Please Enter the Title')
            }
        }
        
    }

    return(
        <div className='bg-container-1'>
            
            <button type='button' className='back-btn'>
            <Link to='/'className='back-btn' >
                <IoIosArrowRoundBack color='black' size={25}/>
                </Link>
                </button>
               
            <div className='container'>
                <form className='form' onSubmit={onCreatePost}>

                    <label htmlFor='title' className='label'>Title</label>
                    <input type='text' id='title' value={title} onChange={ontitleChange} placeholder='Titile..' className='input-title' />
                    <label htmlFor='content' className='label'>Content</label>
                    <textarea id='content' value={content} onChange={onContentChange} placeholder='Write the Content here..' className='textarea-content'>

                    </textarea>
                    <button type='submit' className='submit-btn' >Submit</button>
                    {errMsg !== '' && (<p className='err-msg'>{errMsg}</p>) }
                    {successMsg !== '' && (<p className='succ-msg'><Link to='/' className='succ-msg'>{successMsg}</Link></p>) }

                    

                </form>
            </div>
            
        </div>
    )

}

export default CreatePost