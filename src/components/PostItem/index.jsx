import './postitem.css'
import {useState, useContext} from 'react'
import ReactContext from '../../context/ReactContext'

const PostItem = (props) => {
    const {details} = props 
    const {title, id, content} = details
    const {onDeleteFunc} = useContext(ReactContext)
    const [titleValue, setTitleValue] = useState(title)
    const [contentValue, setContentValue] = useState(content)
    const [isEdit, setEdit] = useState(false)

    const onDeleteBtn= () => {
        onDeleteFunc(id)
    }

    const onTittleChange =(event) => setTitleValue(event.target.value)
    const onContentChange = (event) => setContentValue(event.target.value)
    const onSubmitBtn =(event) => {
        event.preventDefault()
        setEdit(!isEdit) 
    }
    const onChangeBtn = () => setEdit(!isEdit) 

    return(
        <li data-testid='post-item' className='list-item'>
            <div className='profile-container'>
                <img src='https://res.cloudinary.com/dtc3rf1du/image/upload/v1720272379/IMG20230625162900_2_nknhvx.jpg'
                alt='User Profile'
                className='user-img' />
                <p className='user-name'>Eshwar Basha Bathini</p>
            </div>
            {isEdit&& (
                <form onSubmit={onSubmitBtn} className='form-btn'>
                    <input type='text' className='input' value={titleValue} onChange={onTittleChange} />
                    <textarea value={contentValue} className='input' onChange={onContentChange}>

                    </textarea>
                    <button type='submit' className='update-btn'>Update</button>

                </form>
            )}
            {!isEdit && (<>
            <h2 className='item-title'>{titleValue}</h2>
            <p className='item-content'>{contentValue}</p>
            <div className='btn-container'>
            <button type='button' onClick={onChangeBtn} className='edit-btn'>Edit</button>
            <button type='button' onClick={onDeleteBtn} className='delete-btn'>Delete</button>
            </div>
            </>
            )}
        </li>
    )

}

export default PostItem