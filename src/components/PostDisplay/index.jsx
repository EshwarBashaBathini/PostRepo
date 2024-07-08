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
  console.log(filterData);

  return (
    <div className="bg-container">
      <Category getCategoryId={getCategoryId} categoryId={categoryId} />
      <ul className="post-ul">
        {filterData.map((item) => (
          <PostItem key={item.id} details={item} />
        ))}
      </ul>

      <button type="button" className="create-btn">
        <Link to="/createpost" className="links">
          Create Post
        </Link>
      </button>
    </div>
  );
};

export default PostDisplay;
