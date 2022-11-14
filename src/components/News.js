import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';
export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    }

    constructor() {
        super();
        this.state = {
            article: [],
            page: 1,
            loading: false
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        this.props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a116cd59c7545d4b9ecfbe4871ea76b&page=1&pageSize=${this.props.pageSize}`

        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            pageSize: parsedData.pageSize,
            loading: false
        })
        this.props.setProgress(100)

    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize))) {
            this.setState({ loading: true })
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a116cd59c7545d4b9ecfbe4871ea76b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            const data = await fetch(url)
            const parsedData = await data.json();
            this.setState({
                article: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            })
            this.props.setProgress(100)
        }
    }

    handlePrevClick = async () => {
        this.props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a116cd59c7545d4b9ecfbe4871ea76b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        const data = await fetch(url)
        const parsedData = await data.json();
        this.setState({
            article: parsedData.articles,
            page: this.state.page - 1
        })
        this.props.setProgress(100)
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{ margin: "25px 0px" }}>Today's {this.props.category} headlines</h1>
                {this.state.loading && <Loading />}
                <div className="row my-3">
                    {!this.state.loading && this.state.article.map((ele) => {
                        return <div className="col-md-4" key={ele.url}>
                            <NewsItem title={ele.title} description={ele.description} urlOfImg={ele.urlToImage} newsUrl={ele.url} mainSiteName={ele.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-primary">Previous</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize))} type="button" onClick={this.handleNextClick} className="btn btn-primary">Next</button>
                </div>
            </div>
        )
    }
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}