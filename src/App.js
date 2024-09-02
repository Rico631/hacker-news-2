import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewsList } from "./pages/NewsListPage/NewsListPage";
import { Comments } from "./pages/CommentsPage/CommentsPage";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="comments/:id" element={<Comments />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
