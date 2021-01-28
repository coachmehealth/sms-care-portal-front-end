import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export interface SortOption {
    // the field in data to use
    field: string,

    // what to show to user as sorting option
    name: string

    // sort order
    increasing: boolean

    // whether it should be default sort
    default: boolean
}


export interface TableProps {
    title: string

    // the data to be displayed
    data: any[],

    // which columns to use
    columns: Column[],

    options: TableOptions

    // the search query for the table (optional)
    query?: string
}

export interface TableOptions {
    // default items per page
    // default is 15
    defaultPerPage?: number
    
    // sort options (see SortOption type) 
    // default is no sorting
    sortOptions?: SortOption[]
    
    // whether user can select a sort
    // default is true
    sortsChoiceEnabled?: boolean
}

export interface Column {
    // display name of the col for header
    name: string,

    // either the JSON key for the data, or a function that takes the row info
    data: ((row: any) => JSX.Element) | string

    // should be unique, used for React internal stuff
    key: string
}

const StyledTable = styled.table`
`

const HeaderRow = styled.tr`
    border-bottom: 2px solid #C4C4C4;
`

const HeaderCell = styled.th`
    padding: 10px 30px 10px 20px;
    vertical-align: middle;
`

const TableCell = styled.td`
    padding: 20px;
    font-size: 13px;
    vertical-align: middle;
`

const BodyRow = styled.tr`
    border-bottom: 1px solid #C4C4C4;
`

const TableContainer = styled.div`
    background-color: white;
    border-radius: 20px;
    width: fit-content;
    padding: 30px 50px;
    box-shadow: 5px 5px 10px rgba(221, 225, 231, 0.5);
    position: relative;
    overflow: auto;
    margin: auto
`

const StyledTitle = styled.h1`
    font-weight: 800;
    font-size: 1.5em;
    padding: 8px;
`

const StyledSelect = styled.select`
    position: absolute;
    top: 50px; 
    right: 50px;
    border: none;
    border-bottom: 1px solid #c4c4c4;
    background-color: white;

    &:focus {
        outline: none;
        box-shadow: 0 7px 5px -5px rgba(221,225,231,1) !important;
    }
`

const PageNavButton = styled.a`
    color: #F29DA4;
    font-weight: 800;
    padding: 10px 10px 0 10px;
    margin: 10px 10px 0 10px;
    display: block;
    &:hover {
        color: #F29DA4;
    }
`

const PageNavIcon = styled.i`
    margin: 0px 10px -2px 10px;
    font-size: 20px;
    
    &:hover {
        color: #F29DA4;
    }
`

const PageIndicator = styled.p`
    text-align: center;
    padding: 10px 0 0 0;
    font-size: 13px;
`


const Table: React.FC<TableProps> = ({ title, data, columns, options, query }: TableProps) => {
    // set default sort to marked default, or null if no sorts provided
    const defaultSort = (options.sortOptions) && options.sortOptions.length >= 1 ? options.sortOptions.filter((option: SortOption) => {
        return option.default;
    })[0] : null;

    const [currentSort, setCurrentSort] = useState<SortOption | null>(defaultSort);
    const [sortedData, setSortedData] = useState<any[]>([...data])

    /* Subin's comment: I think you need another state called filtered data. Imagine a use case where we search for the data, get it filtered, but now we
       need to sort on that newly filtered data rather than the old version of the data. This is the same thing with the number of pages. Right now, I 
       have the data filteration process within the useEffect and use sorted data to do it (that's why the search only really works if you change the sort)
       but with a new state hopefully these issues will be resolved. */ 
    const [page, setPage] = useState<number>(0);    
    const [perPage, setPerPage] = useState<number>(options.defaultPerPage ? options.defaultPerPage : 15);

    const numPages = Math.ceil(data.length / perPage);

    useEffect(() => {
        if (currentSort != null) {
            const newData = sortedData.sort((row1: any, row2: any) => {
                let cmp = 0; 

                let val1 = row1[currentSort.field];
                let val2 = row2[currentSort.field];
                if (val1 > val2) {
                    cmp = -1;
                } else if (val2 > val1) {
                    cmp = 1
                }

                if (currentSort.increasing) cmp *= -1;
                return cmp;
            })
            setSortedData([...newData]);
        }
        
    }, [currentSort])

    useEffect(() => {
        if ((query != undefined) && (query != "")) {
            setSortedData(data.filter(patient => 
                (patient.firstName + " " + patient.lastName).toLowerCase().includes(query.toLowerCase())))
        }
    }, [query])

    const handleSortChange = (i: any) => {
        if(options.sortOptions){
            setCurrentSort(options.sortOptions[parseInt(i.target.value)]);
        }
    }

    return (
        <TableContainer>
            <StyledTitle>{title}</StyledTitle>
            { options.sortsChoiceEnabled && options.sortOptions && options.sortOptions.length > 1 && 
                <div>
                    <StyledSelect onChange={handleSortChange}>
                        {options.sortOptions.map((options: SortOption, ind: number) => (
                            <option key={options.name} value={ind}>{options.name}</option>
                        ))}
                    </StyledSelect>
                </div>
            }

            <StyledTable>
                <thead>
                    <HeaderRow>
                        {columns.map((col) => <HeaderCell key={col.key}> {col.name} </HeaderCell>)}
                    </HeaderRow>
                </thead>
                <tbody>
                    {sortedData.slice(page * perPage, (page + 1) * perPage).map((row: any, ind) => (
                        <BodyRow key={`${ind}`}>
                            { columns.map((col) => (
                                <TableCell key={`${col.key}-${ind}`}>
                                    {typeof col.data == "string" ? row[col.data] : col.data(row)}
                                </TableCell>)
                            )}
                        </BodyRow>
                    ))}
                </tbody>
            </StyledTable>
            
            <PageIndicator>Page {page+1} of {numPages}</PageIndicator>
            
            { page != 0 &&
                <PageNavButton onClick = {() => setPage(page-1)} href = "#" style = {{float: "left"}}>
                    <PageNavIcon className="fas fa-caret-left"></PageNavIcon>
                    Previous Page
                </PageNavButton>
            }
            { page != numPages - 1 && 
                <PageNavButton onClick = {() => setPage(page+1)} href = "#" style = {{float: "right"}}>
                    Next Page
                    <PageNavIcon className="fas fa-caret-right"></PageNavIcon>
                </PageNavButton>
            }


        </TableContainer>
    )
};

export default Table;