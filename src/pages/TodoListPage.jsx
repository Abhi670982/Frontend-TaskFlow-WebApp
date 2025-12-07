import React from 'react';
import TodoListCard from '../TodoListCard';
import Header from '../Header';
import Footer from '../Footer';
import './TodoListPage.css';

const TodoListPage = () => {
  return (
    <div className="todo-list-page-container">
      <Header />
      <main className="todo-list-page-main">
        <TodoListCard />
      </main>
      <Footer />
    </div>
  );
};

export default TodoListPage;
