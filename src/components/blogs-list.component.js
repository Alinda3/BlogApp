import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogItem = props => (
  <tr>
    <td>{props.blogItem.title}</td>
    <td>{props.blogItem.description}</td>
    <td>{props.blogItem.duration}</td>
    <td>{props.blogItem.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.blogItem._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBlogItem(props.blogItem._id) }}>delete</a>
    </td>
  </tr>
)

export default class BlogItemsList extends Component {
  constructor(props) {
    super(props);

    this.deleteBlogItem = this.deleteBlogItem.bind(this)

    this.state = {blogItems: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/blogItems/')
      .then(response => {
        this.setState({ blogItems: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteBlogItem(id) {
    axios.delete('http://localhost:5000/blogItems/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      blogItems: this.state.blogItems.filter(el => el._id !== id)
    })
  }

  blogItemList() {
    return this.state.blogItems.map(currentblogItem => {
      return <BlogItem blogItem={currentblogItem} deleteBlogItem={this.deleteBlogItem} key={currentblogItem._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Blog Items</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.blogItemList() }
          </tbody>
        </table>
      </div>
    )
  }
}