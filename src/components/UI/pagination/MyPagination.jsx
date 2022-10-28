import React from "react";
import MyButton from "../button/MyButton";
import { getPagesArray } from "../../../utils/pages"
import cl from "./MyPagination.module.css"

const MyPagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages)
    return (
        <div className={cl.pagination}>
            {pagesArray.map(p =>
                <MyButton
                    key={p}
                    onClick={() => changePage(p)}
                    current={page === p ? true : false}>{p}
                </MyButton>
            )}
        </div>
    )
}

export default MyPagination;
