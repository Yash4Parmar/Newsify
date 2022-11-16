import React, { useState, useEffect } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';
const News = (props) => {

    const [article, setArticle] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalReaults] = useState(0);
    const [pageSize, setPageSize] = useState(0);


    const initialFunction = async () => {
        setLoading(true)
        props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a116cd59c7545d4b9ecfbe4871ea76b&page=1&pageSize=${props.pageSize}`

        let data = await fetch(url)
        let parsedData = await data.json();


        setArticle(parsedData.articles)
        setTotalReaults(parsedData.totalResults)
        setPageSize(parsedData.pageSize)
        setLoading(false)
        props.setProgress(100)

    }
    useEffect(() => {
        initialFunction()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNextClick = async () => {
        if (!(page + 1 > Math.ceil(totalResults / pageSize))) {
            setLoading(true)
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a116cd59c7545d4b9ecfbe4871ea76b&page=${page + 1}&pageSize=${props.pageSize}`
            let data = await fetch(url)
            let parsedData = await data.json();
            setArticle(parsedData.articles)
            setPage(page + 1)
            setLoading(false)

            props.setProgress(100)
        }
    }

    const handlePrevClick = async () => {
        props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a116cd59c7545d4b9ecfbe4871ea76b&page=${page - 1}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json();

        setArticle(parsedData.articles)
        setPage(page - 1)
        props.setProgress(100)
    }


    return (

        <div className='container my-3'>
            <h1 className='text-center' style={{ marginTop: "80px" }}>Today's {props.category} headlines</h1>
            {loading && <Loading />}
            <hr />
            <div className="row ">
                {!loading && article.map((ele) => {
                    return <div className="col-md-4" key={ele.url}>
                        <NewsItem title={ele.title} description={ele.description} urlOfImg={ele.urlToImage} newsUrl={ele.url} mainSiteName={ele.source.name} />
                    </div>
                })}
            </div>
            <div className="container d-flex justify-content-between ">
                <button disabled={page <= 1} onClick={handlePrevClick} type="button" className="btn btn-primary">Previous</button>
                <button disabled={(page + 1 > Math.ceil(totalResults / pageSize))} type="button" onClick={handleNextClick} className="btn btn-primary">Next</button>
            </div>
        </div>
    )
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
}

export default News