import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDisplay from "./components/PostDisplay";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ReactContext from "./context/ReactContext";

const App = () => {
  const data = [
    {
      id: 1,
      title: "My Awesome Post",
      content:
        "This is some great content! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat.",
      category: "Tech",
    },
    {
      id: 2,
      title: "Another Interesting Article",
      content:
        "Here's some more information. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Science",
    },
    {
      id: 3,
      title: "Exciting News in Tech",
      content:
        "Tech is evolving rapidly. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      category: "Tech",
    },
    {
      id: 4,
      title: "Scientific Discoveries",
      content:
        "New discoveries are being made every day. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      category: "Science",
    },
    {
      id: 5,
      title: "Programming Tips",
      content:
        "Improve your coding skills with these tips. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
      category: "Tech",
    },
    {
      id: 6,
      title: "Space Exploration",
      content:
        "Discover the wonders of the universe. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
      category: "Science",
    },
    {
      id: 7,
      title: "Latest Tech Gadgets",
      content:
        "Explore the coolest gadgets on the market. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
      category: "Tech",
    },
    {
      id: 8,
      title: "Health and Medicine Breakthroughs",
      content:
        "New advances in healthcare. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      category: "Science",
    },
    {
      id: 9,
      title: "Web Development Trends",
      content:
        "Stay updated with the latest trends in web development. Neque porro quisquam est, qui dolorem ipsum quia dolor.",
      category: "Tech",
    },
    {
      id: 10,
      title: "Environmental Science Insights",
      content:
        "Learn about environmental issues and solutions. Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
      category: "Science",
    },
    {
      id: 11,
      title: "AI and Machine Learning News",
      content:
        "The future of AI is here. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
      category: "Tech",
    },
    {
      id: 12,
      title: "Biological Discoveries",
      content:
        "New insights into biology. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta.",
      category: "Science",
    },
    {
      id: 13,
      title: "Cybersecurity Tips",
      content:
        "Protect yourself online. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
      category: "Tech",
    },
    {
      id: 14,
      title: "Chemistry Breakthroughs",
      content:
        "Advances in chemistry research. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus.",
      category: "Science",
    },
    {
      id: 15,
      title: "Data Science Techniques",
      content:
        "Master data science skills. On the other hand, we denounce with righteous indignation and dislike men.",
      category: "Tech",
    },
    {
      id: 16,
      title: "Physics Explorations",
      content:
        "Delve into the principles of physics. These cases are perfectly simple and easy to distinguish. In a free hour.",
      category: "Science",
    },
    {
      id: 17,
      title: "Mobile App Development Insights",
      content:
        "Tips for building successful mobile apps. But in certain circumstances and owing to the claims of duty or the obligations.",
      category: "Tech",
    },
    {
      id: 18,
      title: "Oceanography Studies",
      content:
        "Explore the mysteries of the ocean. He rejects pleasures to secure other greater pleasures, or else he endures.",
      category: "Science",
    },
    {
      id: 19,
      title: "Cloud Computing Innovations",
      content:
        "The future of cloud technology. Something we all need to understand. Great innovations are coming our way.",
      category: "Tech",
    },
    {
      id: 20,
      title: "Genetics Research Updates",
      content:
        "Advancements in genetic research. Many more updates are being researched every day. Stay tuned for more.",
      category: "Science",
    },
    {
      id: 21,
      title: "Cricket News",
      content:
        "Latest updates from the world of cricket. Follow the matches, players, and tournaments closely. Stay informed.",
      category: "Cricket",
    },
    {
      id: 22,
      title: "Fun and Entertainment",
      content:
        "Enjoy some fun and entertainment. Various activities to indulge in and make your free time enjoyable and fun.",
      category: "Fun",
    },
    {
      id: 23,
      title: "IT Industry Trends",
      content:
        "What's new in the IT industry. Explore the latest trends, technologies, and updates from the world of IT.",
      category: "IT",
    },
    {
      id: 24,
      title: "Top Companies to Watch",
      content:
        "Profiles of innovative companies. Learn about the companies that are making waves in the industry with their innovations.",
      category: "Companies",
    },
  ];

  const [postList, setPostList] = useState(data);

  const onDeleteFunc = (id) => {
    setPostList(postList.filter((item) => item.id !== id));
  };
  const AddPostList = (postDetails) => {
    setPostList((postList) => [postDetails, ...postList]);
  };

  return (
    <ReactContext.Provider value={{ postList, onDeleteFunc, AddPostList }}>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <PostDisplay />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/createpost"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ReactContext.Provider>
  );
};

export default App;
