import React from "react";
import style from "./Pagination.module.css";

function Pagination({ offset }) {


    return (
        <div className={style.navigationContainer}>
            {offset > 0 &&
                <button onClick={() => { }}>&lt;- less 10 </button>
            }
            &nbsp;{offset}&nbsp;
            <button type="button">more 10 -&gt;</button>
        </div>
    )
}

export default Pagination;