import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {createArticle} from "../utils/requests";

export default function ArticleCreate({active, setActive}) {
    
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);

    console.log(files)

    // 폼 제출 처리
    async function handleSubmit(e) {
        try {
            e.preventDefault();

            const formData = new FormData();

            // formData에 사진 추가
            for(let file of files) {
                formData.append('images', file);
            }

            // formData에 사진설명 추가
            formData.append('description', description);

            await createArticle(formData);

            // feed로 이동
            navigate('/');

        } catch(error) {
            alert(error)
        }
    }
    
    // 모달 창 닫기
    function close(e) {
        if(e.target === e.currentTarget) {
            setActive(false);
        }
    }
    
    if(active) {
        return (
            <div className="fixed inset-0 bg-black/[0.2] z-10" onClick={close}>
                <button
                    type="button"
                    className="float-right text-2xl px-4 py-2 text-white"
                    onClick={() => setActive(false)}
                    >
                    &times;
                </button>

                <form
                    className="bg-white max-w-xs mt-20 mx-auto rounded-2xl"
                    onSubmit={handleSubmit}
                >
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold text-center">Create new post</h3>
                    </div>
                    <div className="p-4">
                        <label className="inline-block mb-2 font-semibold text-sm px-4 py-2 bg-gray-200 rounded-lg cursor-pointer">
                            <input
                                type="file"
                                className="hidden"
                                onChange={({target}) => setFiles(Array.from(target.files))} // Aray.from은 target.files의 특정한 타입을 Array로 바꾸어주는 메서드
                                multiple={true} // 파일을 여러개 업로드 할 수 있다.
                                accept="image/*"
                            />
                            Select Photos +
                        </label>

                        {/* 이미지 미리보기 */}
                        {files.length > 0 && (
                            <ul className="grid grid-cols-3 mb-2 gap-2">
                                {files.map(file => (
                                    <li key={file.name} className="pt-[100%] relative"> {/* pt-[100%]: 비율을 1:1로 만들고 싶을 때. padding-top이 width와 같아지게 된다. */}
                                        <img
                                            className="absolute inset-0 w-full h-full object-cover"
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* 사진 설명 */}
                        <div className="mb-2">
                            <label
                                htmlFor="description"
                                className="block font-semibold"
                            >
                                Description
                            </label>
                            <textarea
                                rows="2"
                                id="description"
                                className="block w-full px-2 py-1 rounded border"
                                onChange={({target}) => setDescription(target.value)}
                                value={description}
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-semibold bg-blue-500 rounded-lg text-white disabled:opacity-[0.2]"
                            disabled={files.length <1}
                        >

                            Post
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}