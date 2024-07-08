import "./createpost.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState, useContext, useEffect } from "react";
import ReactContext from "../../context/ReactContext";

const CreatePost = () => {
  const navigate = useNavigate()
  const { AddPostList } = useContext(ReactContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [count, setCount] = useState(4)
  let interval;
  let timeId ;
  useEffect(() => {
    return () => {
      if (count === 0) {
        clearInterval(interval);
        clearTimeout(timeId)
      }
    }
  }, [count] )

  const ontitleChange = (event) => {
    setTitle(event.target.value)
    setSuccessMsg(false)
  };

  const onContentChange = (event) => {
    setContent(event.target.value)
    setSuccessMsg(false)
  };

  const onCreatePost = (event) => {
    event.preventDefault()
    setSuccessMsg(false)

    if ((title !== "") && (content !== "")) {
      setSuccessMsg(true)
      setCount(4)
      toast.success('Your Post is created Successfully')
      const postDetails = {
        id: uuidv4(),
        title,
        content,
        category: "Latest",
      }

      timeId = setTimeout(() => {
        navigate('/')
      }, 4000);



      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 2) {
            clearInterval(interval);
            
            return 1
          }
          return prevCount - 1;
        });
      }, 1000)

      AddPostList(postDetails);
      setTitle("");
      setContent("");
    } else {
      if (title === "" && content === "") {
        toast.error('Please Enter the Title and Content')
      } else if (title !== "" && content === "") {
        toast.error('Please Enter the Content')
      } else if (title === "" && content !== "") {
        toast.error('Please Enter the Title')
      }
    }
  };



  return (
    <div className="bg-container-create">
      <button type="button" className="back-btn">
        <Link to="/" className="back-btn">
          <IoIosArrowRoundBack color="black" size={25} />
        </Link>
      </button>

      <div className="container">
        <form className="form" onSubmit={onCreatePost}>
          <h3>Create a new Post</h3>

          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={ontitleChange}
            placeholder ="Title.."
            className="input-title"
          />
          <label htmlFor="content" className="label">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={onContentChange}
            placeholder="Write the Content here.."
            className="textarea-content"
          ></textarea>
          <button type="submit" className="submit-btn">
            Create Post
          </button>

          {successMsg  && (
            <p className="succ-msg">
              {`Redirecting to all posts in ${count} seconds`}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
