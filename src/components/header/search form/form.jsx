import React from "react";
import style from './form.module.css'

function FormSearch() {
    return(
        <form action="post">
            <input type="text" name="form-search" id="search" placeholder="Search" />
        </form>
    )
}

export default FormSearch;