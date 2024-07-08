import "./postdisplay.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ReactContext from "../../context/ReactContext";
import PostItem from "../PostItem";
import Category from "../Category";

const PostDisplay = () => {
  const { postList } = useContext(ReactContext);
  const [categoryId, setCategoyId] = useState("");

  const getCategoryId = (id) => setCategoyId(id);

  const filterData = postList.filter((item) =>
    item.category.includes(categoryId)
  );


  return (
    <div className="bg-container">
      <Category getCategoryId={getCategoryId} categoryId={categoryId} />
      <ul className="post-ul">
        {filterData.map((item) => (
          <PostItem key={item.id} details={item} />
        ))}
      </ul>

      <Link to="/createpost" className="links">
      <button type="button" className="create-btn">
        
          Create Post
        
      </button>
      </Link>
    </div>
  );
};

export default PostDisplay;
