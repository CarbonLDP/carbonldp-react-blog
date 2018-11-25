import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Button, TextField} from '@material-ui/core'

import {CarbonLDP} from "carbonldp/CarbonLDP";

let carbonldp = new CarbonLDP("http://localhost:8083");

const styles = theme => ({
    FormControl: {
        width: 500
    },
    xsFormControl: {
        width: 100
    }
});

class Editor extends Component {

    state = {
        post: {
            $id: '',
            title: '',
            slug: '',
            excerpt: '',
            body: ''
        }
    };

    handleChange = name => ({target: {value}}) => {
        this.setState({
            post: {
                ...this.state.post,
                [name]: value
            }
        })
        if (name === 'title') {
            let friendlySlug = this.makeFriendlySlug(value)
            this.setState(() => ({
                post: {
                    title: value,
                    slug: friendlySlug
                }
            }))
        }
    }

    /**
     * Takes a given string and makes it URL friendly. It ignores nonalphanumeric characters,
     * replaces spaces with hyphens, and makes everything lower case.
     * @param {*} str
     */
    makeFriendlySlug(str) {
        // \W represents any nonalphanumeric character so that, for example, 'A&P Grocery' becomes 'a-p-grocery'
        let friendlySlug = str.replace(/\W+/g, '-').toLowerCase();
        // If the last char was nonalphanumeric, we could end with a hyphen, so trim that off, if so...
        if (friendlySlug.substring(friendlySlug.length - 1) === "-") {
            friendlySlug = friendlySlug.substring(0, friendlySlug.length - 1);
        }
        return friendlySlug;
    }

    handleSubmit = () => {
        // TO DO: validate form

        let blogPost = {...this.state.post};

        carbonldp.documents.$create("posts/", blogPost, blogPost.slug).then(
            (blogPost) => {
                // JavaScript object is now saved in Carbon; log the document's minted URI...
                console.log(blogPost.$id);
                let post = {...this.state.post, $id: blogPost.$id};
                this.setState({post});
            }
        ).catch(error => console.error(error));

    }

    render() {

        const {post: {$id, title, slug, excerpt, body}} = this.state,
            {classes} = this.props

        return (
            <div className="Editor">
                <h1>New Post</h1>
                <p>URL: {$id}</p>
                <form>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={this.handleChange('title')}
                        margin="normal"
                        className={classes.FormControl}
                    />
                    <br/>
                    <TextField
                        label="Slug"
                        value={slug}
                        onChange={this.handleChange('slug')}
                        margin="normal"
                        className={classes.FormControl}
                    />
                    <br/>
                    <TextField
                        label="Excerpt"
                        multiline
                        rowsMax="5"
                        value={excerpt}
                        onChange={this.handleChange('excerpt')}
                        margin="normal"
                        className={classes.FormControl}
                    />
                    <br/>
                    <TextField
                        label="Body"
                        multiline
                        rowsMax="10"
                        value={body}
                        onChange={this.handleChange('body')}
                        margin="normal"
                        className={classes.FormControl}
                    />
                    <br/>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmit}>Submit</Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Editor);
