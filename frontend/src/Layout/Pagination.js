import React, {useState, useRef} from "react";
import {BsChevronRight, BsChevronLeft} from 'react-icons/bs'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const unOrder = useRef()

  const scrollLeft = ()=>{
    unOrder.current.scrollLeft = unOrder.current.scrollLeft - 100
  }

  const scrollRight = ()=>{
    unOrder.current.scrollLeft = unOrder.current.scrollLeft + 100
  }

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pre-page">
      <ul className="pagination" ref={unOrder}>
        <div className="left-dir" onClick={scrollLeft}><BsChevronLeft /></div>
        <div className="right-dir" onClick={scrollRight}><BsChevronRight /></div>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
