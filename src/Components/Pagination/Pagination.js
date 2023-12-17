import React from 'react';
import './Pagination.css';

const Pagination = ({ onClick, page }) => {
    const newArr = new Array(10).fill(0);

    return (
        <div className="pagination">
            <button className="page-button" onClick={() => onClick(page - 1)}>Prev</button>
            {newArr.map((item, index) => (
                <button
                    className="page-button"
                    onClick={() => onClick(index + 1)}
                    key={index}
                >
                    {index + 1}
                </button>
            ))}
            <button className="page-button" onClick={() => onClick(page + 1)}>Next</button>
        </div>
    );
};

export default Pagination;