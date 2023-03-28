// 서버에 요청하는 함수 라이브러리
const server = process.env.REACT_APP_SERVER;

/* USER */
// 회원가입
export async function createUser(email, fullName, username, password) {
    const res = await fetch(`${server}/users`, {    // fetch(url, 옵션), 결과를 promise로 리턴
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({  // stringify: 자바스크립트 객체를 json형식으로 바꾸어주는 메서드
            email,
            fullName,
            username,
            password
        })
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }
    return await res.json();
}

// 로그인
export async function signIn(email, password) {
	const res = await fetch(`${server}/user/login`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({email, password})
	})

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}

	return await res.json();
}

// 정보수정
export async function updateProfile(formData) {
	const res = await fetch(`${server}/user`, {
		method: "PUT",
		headers: {"Authorization": 'Bearer ' + JSON.parse(localStorage.getItem("user")).token},
		body: formData
	})

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}

	return await res.json();
}

// 유저 검색
export async function searchUsers(username) {
    const res = await fetch(`${server}/users/?username=${username}`, {  // method 생략하면 디폴트는 GET
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token},
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 이메일로 유저검색
export async function doesEmailExists(email) {
    const res = await fetch(`${server}/users/?email=${email}`);

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    const {userCount} = await res.json();

    return userCount > 0;
}

/* ARTICLES */
// 피드
export async function getFeed() {
    const res = await fetch(`${server}/feed`, {
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 게시물 하나 가져오기
export async function getArticle(id) {
    const res = await fetch(`${server}/articles/${id}`, {
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });
    
    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 게시물 생성
export async function createArticle(formData) {
    const res = await fetch(`${server}/articles`, {
        method: 'POST',
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token},
        body: formData
    })

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 게시물 삭제
export async function deleteArticle(id) {
    const res = await fetch(`${server}/articles/${id}`, {
        method: 'DELETE',
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 좋아요
export async function favorite(id) {
    const res = await fetch(`${server}/articles/${id}/favorite`, {
        method: 'POST',
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 좋아요 취소
export async function unfavorite(id) {
    const res = await fetch(`${server}/articles/${id}/favorite`, {
        method: 'DELETE',
        header: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

/* COMMENTS */
// 댓글 가져오기
export async function getComments(id) {
    const res = await fetch(`${server}/articles/${id}/comments`, {
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 댓글 생성
export async function createComments(id, content) {
    const res = await fetch(`${server}/articles/${id}/comments`, {
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token,
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({content})
    });

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 댓글 삭제
export async function deleteComment(id) {
    const res = await fetch(`${server}/comments/${id}`, {
        method: 'DELETE',
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

/* PROFILES */
// 프로필 가져오기
export async function getProfile(username) {
    const res = await fetch(`${server}/profiles/${username}`, {
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 타임라인 가져오기
export async function getTimeline(username) {
    const res = await fetch(`${server}/articles/?username=${username}`, {
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    return await res.json();
}

// 팔로워 목록 가져오기
export async function getFollowers(username) {
    const res = await fetch(`${server}/users/?followers=${username}`, {
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 팔로잉 목록 가져오기
export async function getFollowing (username) {
    const res = await fetch(`${server}/users/?following=${username}`, {
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    })

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 팔로우
export async function follow(username) {
    const res = await fetch(`${server}/profiles/${username}/follow`, {
        method: 'POST',
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}

// 언팔로우
export async function unfollow(username) {
    const res = await fetch(`${server}/profiles/${username}/follow`, {
        method: 'DELETE',
        headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem("user")).token}
    });

    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json();
}