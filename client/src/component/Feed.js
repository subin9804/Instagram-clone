import { useState, useEffect, useContext } from "react";
import ArticleTemplate from "./ArticleTemplate";
import { deleteArticle, getFeed, favorite, unfavorite } from "../utils/requests";
import Spinner from "./Spinner";

const limit = 5;

export default function Feed() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [articles, setArticles] = useState([]);
    const [skip, setSkip] = useState(0);
    const [articleCount, setArticleCount] = useState(0);

    useEffect(() => {
        setError(null);
        setIsLoaded(false);

        getFeed(skip)
            .then(data => {
                setArticleCount(data.articleCount);

                const updateArticles = [...articles, ...data.articles];
                setArticles(updateArticles);
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => setIsLoaded(true));
    }, [skip])

    async function handleFavorite(id) {
        try {
            await favorite(id);

            const updatedArticles = articles.map(article => {
                if(article.id === id) {
                    return {
                        ...article,
                        isFavorite: true,
                        favoriteCount: article.favoriteCount + 1
                    }
                }
                return article;
            })
            setArticles(updatedArticles);
        }catch(error) {
            alert(error)
        }
    }

    async function handleUnfavorite(id) {
        try {
            await unfavorite(id);

            const updatedArticles = articles.map(article => {
                if(article.id === id) {
                    return {
                        ...article,
                        isFavorite: false,
                        favoriteCount: article.favoriteCount - 1
                    }
                }
                return article;
            })

            setArticles(updatedArticles);

        } catch(error) {
            alert(error)
        }
    }

    async function handleDelete(id) {
        try {
            await deleteArticle(id);

            const remainingArticles = articles.filter(article => id !== article.id);

            setArticles(remainingArticles);

        } catch(error) {
            alert(error);
        }
    }

    const articleList = articles.map(article => (
        <li key={article.id} className="border-b pb-4">
            <ArticleTemplate
                article = {article}
                handleFavorite = {handleFavorite}
                handleUnfavorite={handleUnfavorite}
                handleDelete={handleDelete}
            />
        </li>
    ))

    // 더보기 버튼
    const moreButton = (articleCount > limit && articleCount > articles.length) && (
        <div className="flex justify-center my-2">
            <button
                className="p-1 text-blue-500"
                onClick={() => setSkip(skip + limit)}
            >
                More
            </button>
        </div>
    )
    console.log(skip)
    return (
        <>
            <ul className="">
                {articleList}
            </ul>

            {isLoaded ? moreButton : <Spinner />}
            {error && <p className="text-red-500">{error.message}</p>}
        </>
    );
}