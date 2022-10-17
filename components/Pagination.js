import React from "react";
import style from "./Pagination.module.css";

function Pagination({ pagination, offset, paginationSearch, paginar }) {

    if (pagination) {
        return (
            <div className={style.navigationContainer}>
                {offset > 0 &&
                    <button className={style.btn} onClick={() => {
                        paginationSearch(offset - 10);
                    }}>&lt;- less 10 </button>
                }
                Page: {(offset / 10) + 1}
                {paginar &&
                    <button className={style.btn} onClick={() => {
                        paginationSearch(offset + 10);
                    }} type="button">more 10 -&gt;</button>
                }
            </div>
        )
    }
}

export default Pagination;