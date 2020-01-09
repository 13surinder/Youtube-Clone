import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: 'reactjs',
      comment: '',
      listComments: [],
      likeStatus: 'Like',
      videosList: [],
      loading: null ,
      currentUrl: '',
      LoadingError: false
    };
  }

searchVideo = async () => {
    this.setState({
    loading: "LOADING",
    LoadingError: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.search}&type=video&videoDefinition=high&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    LoadingError: true
  })
}
this.setState({
  videosList: myJson.items
})
console.log(this.state.videosList)
  this.setState({
    loading: "LOADED"
  })
}

showMostPopularVideos = async () => {
  this.setState({
    loading: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  videosList: myJson.items,
  loading: "LOADED"
})
console.log(this.state.videosList)
this.setState({
  currentUrl: this.state.videosList[0].id.videoId
})
console.log("currentVideoUrl" , this.state.currentUrl)
}

setSearchValue = (event) => {

this.setState({
  search: event.target.value
})
console.log(this.state.search)
}

componentDidMount() {
  this.showMostPopularVideos()
  console.log("listOfVideos" , this.state.videosList)
}

setComment = (event) => {
  this.setState({
    comment: event.target.value
  })
}

setCurrentUrl = (id) => {

  this.setState({
    currentUrl: id
  })
}

likeButton = () => {
  if(this.state.likeStatus == "Like"){
  this.setState({
    likeStatus: 'Liked'
  })
  } else {
      this.setState({
    likeStatus: 'Like'
  })
  }

}

addComment = () => {
  this.setState({
    listComments: [...this.state.listComments, this.state.comment],
    comment: ''
  })
}

  render() {
    let videos = this.state.videosList.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '300px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"450px",width:"430px"}} placeholder="Search here..." onChange={this.setSearchValue} />
        <button  onClick={this.searchVideo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.LoadingError ? (<h1>No search found</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.currentUrl}`} style={{height: '350px', width: '850px', float : 'left'}}/>
)}


      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '300px', float : 'right'}}>
        {this.state.loading == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button  style={ {
  marginLeft: "790px" ,backgroundColor:" red",padding:'12px'}}onClick={this.likeButton}>{this.state.likeStatus}</button>
{this.state.listComments.map(eachComment => (
  <li>{eachComment}</li>
))}
         <h3> comments</h3>
    <input style ={{outline: 0 ,border: '0',
    borderBottom: '2px solid #484a56',width:'300px'}} onChange={this.setComment} placeholder= "Upgrad" value={this.state.comment}/>

    <input  style ={{outline: 0,
    border: '0',
    borderBottom: '2px solid #484a56',
    marginLeft:"45px", width:'300px'}}onChange={this.setComment} placeholder="Your Comment" value={this.state.comment}/> 
    <br/><br/>
    <button  style={{marginLeft:'580px', width:'120px'}}onClick={this.addComment}> Comment</button>
    <button onClick={this.addComment} style={{marginLeft:"20px" ,width:'120px'}}> cancel</button>
    
    


      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));