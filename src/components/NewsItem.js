import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        const { title, description, urlOfImg, newsUrl } = this.props;
        return (
            <div>
                <div className="card">
                    <img src={urlOfImg ? urlOfImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6FHyL14r8qwbb9VwDr7fUiXkdicySujolA&usqp=CAU"} className="card-img-top" alt="Image" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
