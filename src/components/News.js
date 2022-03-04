import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        country: "in",
        pagesize: 12,
        category: "general",
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0
        }
        document.title = `News Daily - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`
    }

    async updatenews() {
        this.props.setprogress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5f481ed0fa74f2bbd127e7e16bec45b&page=${this.state.page}&pageSize=${this.props.pagesize}`
        let data = await fetch(url);
        this.props.setprogress(30);
        let Parseddata = await data.json();
        this.props.setprogress(60);
        this.setState({
            articles: Parseddata.articles,
            totalResults: Parseddata.totalResults,
            // loading: false
        })
        this.props.setprogress(100);

    }

    async componentDidMount() {
        this.updatenews()
    }

    // nextfun = async () => {
    //     this.setState({
    //         page: this.state.page + 1,
    //     });
    //     this.updatenews()
    // }

    // previousfun = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     });
    //     this.updatenews()
    // }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f5f481ed0fa74f2bbd127e7e16bec45b&page=${this.state.page}&pageSize=${this.props.pagesize}`
        let data = await fetch(url);
        let Parseddata = await data.json();
        this.setState({
            articles: this.state.articles.concat(Parseddata.articles),
            totalResults: Parseddata.totalResults
        })
    }
    render() {
        return (
            <>
                <h1 className='text-center'>Top Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                //   loader={<Loading/>}
                />
                <div className='container my-3'>
                    <div className='row'>
                        {this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItems title={element.title ? element.title.slice(0, 45) :""} description={element.description ? element.description.slice(0, 90) : ""} imageurl={element.urlToImage?element.urlToImage:"https://depositphotos.com/247872612/stock-illustration-no-image-available-icon-vector.html"} newsread={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </>
        )
    }
}

