import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditBlogItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategoryname = this.onChangeCategoryname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      categoryname: '',
      title: '',
      description: '',
      date: new Date(),
      categories: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/blogItems/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          categoryname: response.data.categoryname,
          title: response.data.title,
          description: response.data.description,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/category/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            categories: response.data.map(category => category.categoryname),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  onChangeCategoryname(e) {
    this.setState({
      categoryname: e.target.value
    })
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

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const blogItem = {
      title: this.state.title,
      description: this.state.description,
      categoryname: this.state.categoryname,
      date: this.state.date
    }

    console.log(blogItem);

    axios.post('http://localhost:5000/blogItems/update/' + this.props.match.params.id, blogItem)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Blogs</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Category: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.categoryname}
              onChange={this.onChangeCategory}>
              {
                this.state.categories.map(function(name) {
                  return <option 
                    key={name}
                    value={name}>{name}
                    </option>;
                })
              }
          </select>
        </div>
       
        <div className="form-group">
          <label>Title: </label>
          <input 
              type="text" 
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
          <input type="submit" value="Edit Blog" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}