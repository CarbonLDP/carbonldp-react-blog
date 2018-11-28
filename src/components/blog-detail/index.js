import React, {Component} from 'react';

import {CarbonLDP} from "carbonldp/CarbonLDP";

let carbonldp = new CarbonLDP("http://localhost:8083");

class BlogDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {
                $id: '',
                title: '',
                slug: '',
                excerpt: '',
                body: ''
            }
        };
    }

    componentDidMount() {
        const {slug} = this.props.match.params;
        carbonldp.documents.$get("posts/" + slug + "/")
            .then((persistedPost) => {
                this.setState({post: persistedPost});
            })
            .catch(error => console.error(error));
    }

    render() {
        let post = this.state.post;
        return (
            <div className="Home">
                <h1>Blog Detail</h1>
                <h2>{post.title}</h2>
                <p>ID: {post.$id}</p>
                <p>Slug: {post.slug}</p>
                <p>Excerpt: {post.excerpt}</p>
                <hr/>
                {post.body}
            </div>
        );
    }
}

export default BlogDetail;
