import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {CarbonLDP} from "carbonldp/CarbonLDP";

let carbonldp = new CarbonLDP("http://localhost:8083");

const Post = (props) => 
    <div><h4><Link to={`${props.post.slug}/`}>{props.post.title}</Link></h4><p>{props.post.excerpt}</p></div>;

class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {items: []}
  }

  componentWillMount() {
      carbonldp.documents.$getMembers( "posts/", _ => _
          .properties( {
              "title": {
                  "@type": "string"
              },
              "slug": {
                  "@type": "string"
              },
              "excerpt": {
                  "@type": "string"
              }
          } )
      ).then(  (items) => {
              this.setState({items});
          }
      );
  }

  render() {
    let items = this.state.items;
    return (
      <div className="Blog">
        <h1>Blog</h1>
          {items.map(item => <Post key={item.$id} post={item}/> )}
      </div>
    );
  }
}

export default Blog;
