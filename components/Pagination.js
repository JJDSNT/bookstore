import React from "react";
import style from "./Pagination.module.css";

function Pagination({ pagination, offset, paginationSearch }) {

    if (pagination) {
        return (
            <div className={style.navigationContainer}>
                {offset > 0 &&
                    <button onClick={() => {
                        paginationSearch(offset - 10);
                    }}>&lt;- less 10 </button>
                }
                Page: {(offset / 10) + 1}
                <button onClick={() => {
                    paginationSearch(offset + 10);
                }} type="button">more 10 -&gt;</button>
            </div>
        )
    }
}

export default Pagination;