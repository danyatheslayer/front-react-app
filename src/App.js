import { React, useEffect, useState } from 'react';
import PostList from './components/PostList';
import './styles/App.css'
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePost } from './hooks/usePost';
import PostService from './API/PostService';
import MyLoader from './components/UI/loader/MyLoader';
import { useFetching } from './hooks/useFetching';
import { getPagesCount } from './utils/pages'
import MyPagination from './components/UI/pagination/MyPagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line
  const [limit, _setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [fetchPosts, isLoading, postError] = useFetching(async (limit, page) => {
    const responce = await PostService.getAll(limit, page)
    setPosts(responce.data)
    const totalCount = (responce.headers['x-total-count'])
    setTotalPages(getPagesCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit]);

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  return (
    <div className='App'>
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '5px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка: ${postError}</h1>}
      {isLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><MyLoader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов' />}
      <MyPagination
        totalPages={totalPages}
        page={page}
        changePage={changePage} />
    </div>
  );
}

export default App;
