import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//imoporting pages
import Home from "./pages/client/home/homeScreen";
import browseBookScreen from "./pages/client/browseBook/browseBookScreen";
import reviewsScreen from "./pages/client/reviewsPage/reviewsScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* User routes */}
          <Route path="/" exact Component={Home} />
          <Route path="/browse-book" exact Component={browseBookScreen} />
          <Route path="/book-reviews" exact Component={reviewsScreen} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
