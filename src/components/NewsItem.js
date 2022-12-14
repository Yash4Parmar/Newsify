import React from 'react'

const NewsItem = (props) => {

    const { title, description, urlOfImg, newsUrl, date, mainSiteName } = props;
    return (
        <div>
            <div className="card text-bg-light mb-3" >

                <img src={urlOfImg ? urlOfImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6FHyL14r8qwbb9VwDr7fUiXkdicySujolA&usqp=CAU"} className="card-img-top" alt="perticuler news pic" />
                <div className="card-body">
                    <span className="badge rounded-pill text-bg-danger">{mainSiteName}</span>
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text"><small className="text-muted">{Date(date).toString()}</small></p>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} rel="noreferrer" target={"_blank"} className="btn btn-dark">Read More</a>
                </div>
            </div>
        </div >
    )

}
export default NewsItem