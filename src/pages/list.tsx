import React, {useState} from 'react'
import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/ui/breadcrumb.tsx";
import {Input} from "@/components/ui/input.tsx";

const SubjectList = () => {
   const [searchQuery, setSearchQuery] = useState("");
    return (

        <ListView>
            <Breadcrumb/>
                <h1 className="Page-title"> Subjects</h1>
            <div className="intro-row">
                <p> Quick access to essential metric and management tools.</p>
                <div className="actions-row">
                    <div className="search-field">
                        <search className="search-icon"/>
                        <Input
                        type="Text"
                        placeholder = "Search"
                        className = "pl-10 w-full"
                        value={searchQuery}
                        ></Input>

                    </div>
                </div>
            </div>
        </ListView>
    )
}
export default SubjectList
