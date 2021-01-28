import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {SortOption, TableProps, TableOptions, Column} from './Table';

const StyledTable = styled.table`
    width: 100%;
`

const HeaderRow = styled.tr`
    border-bottom: 2px solid #C4C4C4;
`

const HeaderCell = styled.th`
    padding: 10px 30px 10px 10px;
    vertical-align: middle;
`

const TableCell = styled.td`
    padding: 10px;
    font-size: 13px;
    vertical-align: middle;
`

const BodyRow = styled.tr`
    border-bottom: 1px solid #C4C4C4;
`

const TableContainer = styled.div`
    background-color: white;
    border-radius: 20px;
    width: 100%;
    padding: 0px 40px 20px;
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


const ResultsTable: React.FC<TableProps> = ({ title, data, columns, options }: TableProps) => {
    // set default sort to marked default, or null if no sorts provided
    const defaultSort = (options.sortOptions) && options.sortOptions.length >= 1 ? options.sortOptions.filter((option: SortOption) => {
        return option.default;
    })[0] : null;

    const [currentSort, setCurrentSort] = useState<SortOption | null>(defaultSort);
    const [sortedData, setSortedData] = useState<any[]>([...data]);

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

export default ResultsTable;