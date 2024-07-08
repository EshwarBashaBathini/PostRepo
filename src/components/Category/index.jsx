import './category.css'
import ReactContext from '../../context/ReactContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Category = (props) => {
    const navigate = useNavigate()
    const { postList } = useContext(ReactContext)
    const { getCategoryId, categoryId } = props
    const allCat = categoryId === '' ? 'underline-btn' : ''
    const uniqueData = postList.reduce((acc, current) => {
        const x = acc.find(item => item.category === current.category);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    const onLogoutBtn = () => {
        Cookies.remove('jwt_token')
        navigate('/login')
    }

    return (
        <div className='ul-container'>
            <ul className='cat-ul'>
                <li className='cat-li' key='all'>
                    <button type='button' onClick={() => getCategoryId('')} className={`cat-btn ${allCat}`}>
                        All
                    </button>
                </li>

                {uniqueData.map(item => {
                    const catItem = categoryId === item.category ? 'underline-btn' : ''
                    return (
                        <li className='cat-li' key={item.id}>
                            <button type='button' className={`cat-btn ${catItem}`} onClick={() => getCategoryId(item.category)} >
                                {item.category}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <button className='logout-btn' type='button' onClick={onLogoutBtn}>Logout</button>
        </div>

    )

}

export default Category