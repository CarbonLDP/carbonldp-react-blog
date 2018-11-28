import React, { Component } from 'react';

class BlogDetail extends Component {

    componentDidMount() {
        const { slug } = this.props.match.params;
        console.log('Slug: %o',slug)
    }
    render() {

        return (
            <div className="Home">
                <h1>Blog Detail</h1>
            </div>
        );
    }
}

export default BlogDetail;
