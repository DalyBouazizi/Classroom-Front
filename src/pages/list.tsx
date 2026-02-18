import React, {useMemo, useState} from 'react'
import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/ui/breadcrumb.tsx";
import {Input} from "@/components/ui/input.tsx";
import {DEPARTEMENTS_OPTIONS}  from "@/constants";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";
import {useTable} from "@refinedev/react-table";
import {Subject} from "@/Types";
import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";

const SubjectList = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedDepartment, setSelectedDepartment] = useState("all");
   const departementFilters = selectedDepartment === "all" ? [] : [{
       field : 'department',operator : 'eq' as const , value : selectedDepartment
   }];
   const SubjectTable = useTable<Subject>({

        columns: useMemo<ColumnDef<Subject>[]>(
            () => [
                {
                    id: "code",
                    accessorKey: "code",
                    size: 100,
                    header: () => <p className="column-title ml-2">Code</p>,
                    cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
                },
                {
                    id: "name",
                    accessorKey: "name",
                    size: 200,
                    header: () => <p className="column-title">Name</p>,
                    cell: ({getValue}) => (
                        <span className="text-foreground">{getValue<string>()}</span>
                    ),
                    FilterFn:'includesString'
                },
                {
                    id: "departement",
                    accessorKey: "departement",
                    size: 150,
                    header: () => <p className="column-title">departement</p>,
                    cell: ({getValue}) => (
                        <Badge variant='secondary'>{getValue<string>()}</Badge>
                    ),
                    FilterFn:'includesString'
                },
                {
                    id: "description",
                    accessorKey: "description",
                    size: 300,
                    header: () => <p className="column-title">description</p>,
                    cell: ({getValue}) => (
                        <span className="truncate line-clamp-2">{getValue<string>()}</span>
                    ),
                    FilterFn:'includesString'
                }

                ],[]),
        refineCoreProps: {
            resource: "subjects",
            pagination: {
                pageSize: 10,
                mode: "server",
            },
            filters: {
                permanent : []
            },
            sorters: {

            },
        },
    });

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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        ></Input>

                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select
                            value={selectedDepartment}
                            onValueChange={setSelectedDepartment}
                        >
                            <SelectTrigger >
                                <SelectValue placeholder="Filter by department" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                {DEPARTEMENTS_OPTIONS.map((department) => (
                                    <SelectItem key={department.value} value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <CreateButton/>
                </div>
            </div>
            </div>
            
            <DataTable table={SubjectTable}/>
        </ListView>
    )
}
export default SubjectList
