import "./createpost.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
  const [errMsg, setErrMsg] = useState("");
  const [count, setCount] = useState(3)
  let interval;
  useEffect(() => {
    return () => {
      if (count === 1) {
        clearInterval(interval);
      }
    }
  }, []);

  const ontitleChange = (event) => {
    setTitle(event.target.value);
    setErrMsg("");
    setSuccessMsg(false);
  };
  const onContentChange = (event) => {
    setContent(event.target.value);
    setErrMsg("");
    setSuccessMsg(false);
  };

  const onCreatePost = (event) => {
    event.preventDefault();
    setErrMsg("");
    setSuccessMsg(false);





    if (title !== "" && content !== "") {
      setSuccessMsg(true);
      console.log(count)
      const postDetails = {
        id: uuidv4(),
        title,
        content,
        category: "Latest",
      };
      setCount(3)
      if (count === 2) {
        clearInterval(interval)
      }

      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 2) {
            clearInterval(interval);
            navigate('/')
            return 1
          }
          return prevCount - 1;
        });
      }, 1000);
      AddPostList(postDetails);
      setTitle("");
      setContent("");
    } else {
      if (title === "" && content === "") {
        setErrMsg("Please Enter the Title and Content");
      } else if (title !== "" && content === "") {
        setErrMsg("Please Enter the Content");
      } else if (title === "" && content !== "") {
        setErrMsg("Please Enter the Title");
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
            placeholder="Titile.."
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
          {errMsg !== "" && <p className="err-msg">{errMsg}</p>}
          {successMsg  && (
            <p className="succ-msg">
              {`Your Post is created and Navigated to PostDisplay in ${count} seconds`}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
