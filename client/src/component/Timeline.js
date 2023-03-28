import { Link } from "react-router-dom";

export default function Timeline({articles, articleCount}) {
    
    const articleList = articles.map(article => (
        <li key={article.id}>
            <Link to={`/p/${article.id}`} className="block h-40 relative">
                {/* 썸네일 */}
                <img
                    src={`${process.env.REACT_APP_SERVER}/files/articles/${article.images[0]}`}
                    className="w-full h-full object-cover"
                />

                {/* hover했을 때 댓글/좋아요 갯수 보여주는 레이어 */}
                <div className="absolute inset-0 bg-black/[0.2] opacity-0 hover:opacity-100">
                    <div className="flex flex-col justify-center h-full">
                        <div className="flex justify-center">
                            <svg 
                                className="w-5 fill-white"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512"
                            >
                                <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"/>
                            </svg>
                            <span className="ml-2 text-white">{article.favoriteCount}</span>
                        </div>

                        {/* 댓글 갯수 */}
                        <div className="flex justify-center">
                            <svg 
                                className="w-5 fill-white"
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512 512"
                            >
                                <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z"/>
                            </svg>
                            <span className="ml-2 text-white">{article.commentCount}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    ))

    if(articleCount < 1) {
        return <p className="text-center">This user has no articles</p>
    }

    return (
        <ul className="grid grid-cols-3 gap-2 mb-2">
            {articleList}
        </ul>
    )
}