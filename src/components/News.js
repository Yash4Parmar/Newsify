import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

    constructor() {
        super();
        this.state = {
            article: [],
            page: 1,
            loading: false
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5a116cd59c7545d4b9ecfbe4871ea76b&page=1&pageSize=6"

        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            pageSize: parsedData.pageSize
        })
        console.log(this.state.article.length);
    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) {

        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5a116cd59c7545d4b9ecfbe4871ea76b&page=${this.state.page + 1}&pageSize=6`
            const data = await fetch(url)
            const parsedData = await data.json();
            this.setState({
                article: parsedData.articles,
                page: this.state.page + 1
            })
        }
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5a116cd59c7545d4b9ecfbe4871ea76b&page=${this.state.page - 1}&pageSize=6`
        const data = await fetch(url)
        const parsedData = await data.json();
        this.setState({
            article: parsedData.articles,
            page: this.state.page - 1
        })
    }


    render() {
        return (
            <div className='container my-3'>
                <h1>Today's Headlines:</h1>
                <div className="row my-3">
                    {this.state.article.map((ele) => {
                        return <div className="col-md-4" key={ele.url}>
                            <NewsItem title={ele.title} description={ele.description} urlOfImg={ele.urlToImage} newsUrl={ele.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-primary">Previous</button>
                    <button type="button" onClick={this.handleNextClick} className="btn btn-primary">Next</button>
                </div>
            </div>
        )
    }
}
