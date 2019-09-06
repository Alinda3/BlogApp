import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateBlog extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      categoryname: '',
      title: '',
      description: '',
      date: new Date(),
      category: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/category')
      .then(response => {
        if (response.data.length > 0) {
            console.log(response.data);
          this.setState({
            categories: response.data.map(category => category.categoryname),
            categoryname: response.data[0].name

          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      console.log(this.state.name);

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeCategoryName(e) {
    this.setState({
      categoryname: e.target.value
    })
  }



  onSubmit(e) {
    e.preventDefault();

    const blog = {
        categoryname: this.state.categoryname,
      title: this.state.title,
      description: this.state.description,
         date: this.state.date
    }

    console.log(blog);

    axios.post('http://localhost:5000/blogItems/add', blog)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={this.onSubmit}>

      <div className="form-group">
          <label>Category: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.categoryname}
              onChange={this.onChangeCategoryname}>
              {
                this.state.categories.map(function(category) {
                  return <option 
                    key={category}
                    value={category}>{category}
                    </option>;
                })
              }
          </select>
          
         
        </div>
        <div className="form-group">
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}

            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create a new Blog" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}