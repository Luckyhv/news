import React, { Component } from 'react'

export default class NewsItems extends Component {

    render() {
        let {title,description,imageurl,newsread,author,date,source} = this.props;
        return (
            <div className='my-3'>
               <span className="badge rounded-pill bg-danger" >{source}</span>
                <div className="card">
                    <img src={imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}....</h5>
                            <p className="card-text">{description}....</p>
                            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsread} target="_blank" without rel="noreferrer"  className="btn btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}
