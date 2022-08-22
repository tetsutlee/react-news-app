import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
//import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button'
import Axios from 'axios';
import Typography from "@material-ui/core/Typography";
import styled from "styled-components"

const NewsBody = () => {

    const [articles, setArticles] = useState([null]);
  
    const [isLoading, setIsLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("アニメ");

    const [postSearch, setPostSearch] = useState("");
  
    //const apiKey = process.env.REACT_APP_NEWS_API_KEY;  
  
    useEffect(() => {
      async function fetchData() {
        Axios.get("http://newsapi.org/v2/everything?q=" + searchQuery + "&apiKey=" + process.env.REACT_APP_NEWS_API_KEY)
        .then(response => {setArticles(response.data.articles); setIsLoading(false);})
        .catch(error => console.log(error))
      } 
      fetchData();
    }, [searchQuery]);

    const handleChange = (e) => {
      console.log(e.target.value)
      setPostSearch(e.target.value)
    }

    const handleClick = () => {
      console.log(postSearch)
      setSearchQuery(postSearch)
    }
    
    var cardStyle = {
      display: 'block',
      width: '92.6vw',
      backgroundColor: 'white'
    }

    var mobileCardStyle = {
        display: 'block',
        width: '81.6vw',
        backgroundColor: 'white'
    }
  
    return (
        <ul>
        <div className="smartphone__area">
        <div>
          <input type="text" size="35" placeholder="検索したいニュースを入力してください" value={postSearch} onChange={handleChange} />
          <input type="button" value="検索" onClick={() => handleClick(searchQuery)}/>
        </div>
          {!isLoading ? (
            articles.map( item => (
                <li>
                <Card style={mobileCardStyle}>
                    <Grid container direction = "column">
                        <Grid item xs={12}>
                            {/* ニュースのサムネイル */}
                            <CardActionArea>
                              <Button href={item.url} target={"_blank"} rel="noopener noreferrer">
                                <CardMedia
                                    component="img"
                                    alt="ニュース画像"
                                    height="200"
                                    image={item.urlToImage}
                                    title="ニュース画像"
                                />
                                </Button>
                            </CardActionArea>
                        </Grid>
                        <Grid item xs={12}>
                            <CardContent>
                                {/* ニュースタイトル */}
                                <Typography gutterBottom variant="inherit">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                </Typography>
                                {/* ニュースディスクリプション */}
                                <Typography
                                    fontSize="12px"
                                    color="textSecondary"
                                    component="p"
                                    variant="caption"
                                >
                                    {item.description}
                                </Typography>
                                {/* <CardActions>
                                    <Button
                                        size="small"
                                        color="primary"
                                        href={item.url}
                                        target="_blank"
                                    >
                                        詳細を確認する
                                    </Button>
                                </CardActions> */}
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
                </li>
              )
            )
          ) : (<div style={{"fontFamily": 'Times New Roman'}}><h3 style={{color:"white"}}><p style={{textAlign: "center"}}>Loading......</p></h3></div>)
          }
        </div>

        <div className="pc__area">
        <div>
          <input type="text" size="33" placeholder="検索したいニュースを入力してください" value={postSearch} onChange={handleChange}/>
          <input type="button" value="検索" onClick={() => handleClick(searchQuery)}/>
        </div>
          {!isLoading ? (
            articles.map( item => (
                <li>
                <Card style={cardStyle}>
                    <Grid container>
                        <Grid item xs={3}>
                            {/* ニュースのサムネイル */}
                            <CardActionArea>
                              <Button href={item.url} target={"_blank"} rel="noopener noreferrer">
                                <CardMedia
                                    component="img"
                                    alt="ニュース画像"
                                    height="255"
                                    image={item.urlToImage}
                                    title="ニュース画像"
                                />
                                </Button>
                            </CardActionArea>
                        </Grid>
                        <Grid item xs={8}>
                            <CardContent>
                                {/* ニュースタイトル */}
                                <Typography gutterBottom variant="h5">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                </Typography>
                                {/* ニュースディスクリプション */}
                                <Typography
                                    
                                    color="textSecondary"
                                    component="p"
                                >
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
                </li>
              )
            )
          ) : (<Wrapper>Loading...</Wrapper>)
          }
        </div>
        </ul>
    );
  }

  const Wrapper = styled.div`
    margin: 0 auto;
    display: block;
    max-width: fit-content;
    color: white;
    width: 100%;
    font-size: 42px;
    font-family: "Times New Roman";
  `;
  export default NewsBody;