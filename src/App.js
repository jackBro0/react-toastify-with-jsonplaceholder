import React, { Component } from "react";
import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import config from "./config.json";
import http from './sevices/httpService';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";


class App extends Component {
  state = {
    posts: []
  };

 async componentDidMount() {
  //   Pending > resolved (success) OR rejected (failure)
  //  const promise = axios.get('https://jsonplaceholder.typicode.com/posts')
  //  console.log(promise); 
  //  const response = await promise;
  // console.log(response);
    const {data: posts} = await http.get(config.apiEndPoint);
    this.setState({posts});
  }

  handleAdd = async () => {
    const obj ={ title: 'a', body: 'b' }
    const {data: post} = await http.post(config.apiEndPoint, obj);
    console.log("Add");
    console.log(post);

    const posts = [post, ...this.state.posts]
    this.setState({posts});
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    await http.put(config.apiEndPoint + '/' + post.id, post);
    
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({posts})

    console.log("Update", post);
    // console.log(data);
  };

  handleDelete = async post => { 
    const originalPosts = this.state.posts;

    const posts =this.state.posts.filter(p => p.id !==post.id);
    this.setState({posts})
    
    try {
      await http.delete("apiEndPoint" + config.apiEndPoint +post.id);
      // throw new Error("");
    } catch (ex) {

      if (ex.response && ex.response.status === 404)
        alert('This post has been already deleted.');
      

      // alert('Something failed while deleting a post!');
      this.setState({posts: originalPosts});
    }
    
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
