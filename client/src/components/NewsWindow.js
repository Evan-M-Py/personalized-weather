import React, { useState } from 'react';
import ArticleComponent from './ArticleComponent';
import axios from 'axios';

function NewsWindow(props) {

    const [ articles, setArticles ] = useState([])

    async function NewsCall() {

        let key = 'c5f38532d06645c19286837dfccf44e1'

        let URL = `https://newsapi.org/v2/everything?q=detroit&apiKey=${key}`

        let newsCall = await axios({

            method: 'get',
            url: URL

        }).then((res) => {
            
            console.log(res)

            let articleArray = res.data.articles;

            setArticles(articleArray);

            console.log(articles)
                
        })
    };

    return (
        <div className='NewsWindow'>
            
            {articles.map(article => {
            return(
            <ArticleComponent
            title={article.title}
            author={article.author}
            source={article.source.name}
            image={article.urlToImage}
            />
            )
            })}
            
            <button onClick={(e) => NewsCall()}>click me</button>
        </div>
    )
}

export default NewsWindow;