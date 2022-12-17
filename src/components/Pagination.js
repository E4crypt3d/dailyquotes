import React, { useState, useEffect } from 'react'
import DotButton from './buttons/DotButton';
import PageNumber from './buttons/PageNumber';

const Pagination = (props) => {
    const [pageNo, setPageNo] = useState(1);
    const [paginationAlgo, setPaginationAlgorithm] = useState([]);

    useEffect(() => {
        setPaginationAlgorithm(getPagination(pageNo, props.pagination.pages))
    }, [props.pagination.pages, pageNo])

    const get_next = async () => {
        let nextLink = props.pagination.next.split('/').slice(-1);
        let response = await fetch(`/api/${nextLink}`)
        let data = await response.json()
        props.setQuotes(data.results)
        props.setPagination({ 'next': data.next, 'previous': data.previous, 'pages': Math.ceil(data.count / 12) })
        document.getElementById(pageNo).classList.remove("active-page-btn");
        document.getElementById(pageNo + 1).classList.add("active-page-btn");
        let paginate = getPagination(pageNo + 1, props.pagination.pages);
        setPaginationAlgorithm(paginate);
    }
    const handlePrevious = () => {
        get_previous()
        setPageNo(pageNo - 1);
    }


    const handleNext = () => {
        get_next();
        setPageNo(pageNo + 1);
    }



    const changePage = async (e) => {
        let currentPageNo = parseInt(e.target.value);
        document.getElementById(pageNo).classList.remove("active-page-btn");
        setPageNo(currentPageNo)
        document.getElementById(currentPageNo).classList.add("active-page-btn");
        let response = await fetch(`/api/quotes?page=${currentPageNo}`);
        let data = await response.json()
        props.setQuotes(data.results)
        props.setPagination({ 'next': data.next, 'previous': data.previous, 'pages': Math.ceil(data.count / 12) })
        let paginate = getPagination(currentPageNo, props.pagination.pages);
        setPaginationAlgorithm(paginate)
    }


    const get_previous = async () => {
        let previousLink = props.pagination.previous.split('/').slice(-1);
        let response = await fetch(`/api/${previousLink}`)
        let data = await response.json()
        props.setQuotes(data.results)
        props.setPagination({ 'next': data.next, 'previous': data.previous, 'pages': Math.ceil(data.count / 12) })
        document.getElementById(pageNo).classList.remove("active-page-btn");
        document.getElementById(pageNo - 1).classList.add("active-page-btn");
        let paginate = getPagination(pageNo - 1, props.pagination.pages);
        setPaginationAlgorithm(paginate);
    }




    function getPagination(currentPage, lastPage) {
        var current = parseInt(currentPage),
            last = parseInt(lastPage),
            gap = 2,
            left = current - gap,
            right = current + gap + 1,
            pageRange = [],
            paginatedPages = [],
            l;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || i >= left & i < right) {
                pageRange.push(i);
            }
        }

        for (let i of pageRange) {
            if (l) {
                if (i - l === 2) {
                    paginatedPages.push(l + 1);
                } else if (i - l !== 1) {
                    paginatedPages.push('...');
                }
            }
            paginatedPages.push(i);
            l = i;
        }
        return paginatedPages;
    }

    return (
        <div className='pagination'>
            {props.pagination.previous !== null && (
                <input type='submit' value={'Previous'} className='pagination-btn pagination-btn-left' onClick={handlePrevious}></input>
            )}
            {paginationAlgo.map((value, index) => (
                <React.Fragment key={index}>

                    {value !== '...' && (

                        <PageNumber page={value} pageNo={pageNo} changePage={changePage} />
                    )}

                    {value === '...' && (
                        <DotButton value={value} />
                    )}
                </React.Fragment>
            ))}
            {props.pagination.next !== null && (
                <input type='submit' value={'Next'} className='pagination-btn pagination-btn-right' onClick={handleNext}></input>
            )}
        </div>
    )
}

export default Pagination
