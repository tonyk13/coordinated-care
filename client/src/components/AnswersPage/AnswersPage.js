import { React, useState, useEffect } from "react";
import axios from "axios";
import AnswerQuestionButton from "../Buttons/AnswerQuestionButton";
import UpvoteButton from "../VotingButtons/UpvoteButton";
import DownvoteButton from "../VotingButtons/DownvoteButton";
import "./AnswersPage.css";
import Cookie from "js-cookie";

/* 
Structure:

    AnswersPage
        AnswersContainer
            AnswersPageHeader
            QuestionWrapper

            QuestionCommentsWrapper,
            AnswerCommentsWrapper,
            
            Comment

            AnswersWrapper
            Answer
*/

function AnswersPage({ selectedQuestion, setCurrentPage, setDataBaseUpdateTrigger, tags, isGuest }) {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [questionVotes, setQuestionVotes] = useState(selectedQuestion.votes);
    const [registeredUser, setRegisteredUser] = useState(false);

    const tidToTagName = (tid) => {
        const tag = tags.find((tag) => tag._id === tid);
        return tag ? tag.name : "";
    };

    // Get a question's number of votes
    useEffect(() => {
        if (selectedQuestion) {
            axios
                .get(`http://localhost:8000/api/questions/${selectedQuestion._id}/votes`)
                .then((response) => {
                    setQuestionVotes(response.data.votes);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });

    // Check if a registered user is logged in (not a guest)
    useEffect(() => {
        const user = Cookie.get("auth");
        if (user) {
            if (user !== "GUEST") {
                setRegisteredUser(true);
            } else {
                setRegisteredUser(false);
            }
        }
    });

    // Get a question's answers
    useEffect(() => {
        if (selectedQuestion) {
            axios
                .get(`http://localhost:8000/api/questions/${selectedQuestion._id}/answers`)
                .then((response) => {
                    setAnswers(Object.values(response.data));
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [selectedQuestion, setDataBaseUpdateTrigger]);

    if (selectedQuestion === null || loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="answersPage">
            <AnswersContainer
                selectedQuestion={selectedQuestion}
                answers={answers}
                setCurrentPage={setCurrentPage}
                questionVotes={questionVotes}
                setQuestionVotes={setQuestionVotes}
                registeredUser={registeredUser}
                tidToTagName={tidToTagName}
                isGuest={isGuest}
            />
        </div>
    );
}

function AnswersContainer({
    selectedQuestion,
    answers,
    setCurrentPage,
    questionVotes,
    setQuestionVotes,
    registeredUser,
    tidToTagName,
    isGuest,
}) {
    return (
        <div className="answersContainer">
            <AnswersPageHeader
                selectedQuestion={selectedQuestion}
                setCurrentPage={setCurrentPage}
                numAnswers={answers.length}
                isGuest={isGuest}
            />
            <QuestionWrapper
                selectedQuestion={selectedQuestion}
                questionVotes={questionVotes}
                setQuestionVotes={setQuestionVotes}
                registeredUser={registeredUser}
                tidToTagName={tidToTagName}
                isGuest={isGuest}
            />
            <AnswersWrapper
                selectedQuestion={selectedQuestion}
                answers={answers}
                registeredUser={registeredUser}
                isGuest={isGuest}
            />
            {registeredUser && (
                <AnswerQuestionButton selectedQuestion={selectedQuestion} setCurrentPage={setCurrentPage} />
            )}
        </div>
    );
}

function AnswersPageHeader({ selectedQuestion, setCurrentPage, numAnswers, isGuest }) {
    const loadAskQuestionPage = () => {
        setCurrentPage("askQuestionPage");
    };

    return (
        <div className="answersPageHeader">
            <div className="headerContent">
                <div id="numAnswersAndViewsBox">
                    <div id="numberOfAnswers">{numAnswers} answers</div>
                    <div className="questionNumViews">{selectedQuestion.views} views</div>
                </div>
                <div id="questionTitle">{selectedQuestion.title}</div>
                {!isGuest && (
                    <button type="button" className="askQuestionButton" onClick={loadAskQuestionPage}>
                        Ask Question
                    </button>
                )}
            </div>
        </div>
    );
}

function formatDate(dateString) {
    const time = new Date(dateString);

    let monthString = "";
    switch (time.getMonth() + 1) {
        case 1:
            monthString = "Jan";
            break;
        case 2:
            monthString = "Feb";
            break;
        case 3:
            monthString = "Mar";
            break;
        case 4:
            monthString = "Apr";
            break;
        case 5:
            monthString = "May";
            break;
        case 6:
            monthString = "Jun";
            break;
        case 7:
            monthString = "Jul";
            break;
        case 8:
            monthString = "Aug";
            break;
        case 9:
            monthString = "Sep";
            break;
        case 10:
            monthString = "Oct";
            break;
        case 11:
            monthString = "Nov";
            break;
        case 12:
            monthString = "Dec";
            break;
        default:
            monthString = "";
            break;
    }

    const currentYear = new Date().getFullYear();
    let minuteString = time.getMinutes();
    let secondsString = time.getSeconds();
    let hourString = time.getHours();

    if (time.getMinutes() < 10) {
        minuteString = `0${time.getMinutes()}`;
    }
    if (time.getSeconds() < 10) {
        secondsString = `0${time.getSeconds()}`;
    }
    if (time.getHours() < 10) {
        hourString = `0${time.getHours()}`;
    }

    const currentTime = new Date();
    const timeDifferenceInSeconds = Math.floor((currentTime - time) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds} seconds ago`;
    } else if (time.getFullYear() < currentYear) {
        return `${monthString} ${time.getDate()}, ${time.getFullYear()} at ${hourString}:${minuteString}`;
    } else if (time.getDate() > currentTime.getDate() && time.getMonth() !== currentTime.getMonth()) {
        return `${monthString} ${time.getDate()}, at ${hourString}:${minuteString}`;
    } else if (currentTime.getHours() - time.getHours() !== 0) {
        return `${Math.abs(currentTime.getHours() - time.getHours())} hours ago`;
    } else if (currentTime.getMinutes() - time.getMinutes() !== 0) {
        return `${currentTime.getMinutes() - time.getMinutes()} minutes ago`;
    } else {
        return `${secondsString} seconds ago`;
    }
}

function QuestionWrapper({ selectedQuestion, questionVotes, setQuestionVotes, registeredUser, tidToTagName, isGuest }) {
    function renderQuestionTextWithLinks(text) {
        const hyperlinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;

        const textWithLinks = text.replace(hyperlinkRegex, (match, linkText, linkTarget) => {
            return `<a href="${linkTarget}" target="_blank">${linkText}</a>`;
        });

        return { __html: textWithLinks };
    }

    const userId = Cookie.get("userid");

    function handleQuestionUpvote() {
        axios
            .put(`http://localhost:8000/api/questions/${selectedQuestion._id}/users/${userId}/upvote`)
            .then((response) => {
                if (response.data.success) {
                    setQuestionVotes(questionVotes + 1);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleQuestionDownvote() {
        axios
            .put(`http://localhost:8000/api/questions/${selectedQuestion._id}/users/${userId}/downvote`)
            .then((response) => {
                if (response.data.success) {
                    setQuestionVotes(questionVotes - 1);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const [newComment, setNewComment] = useState("");
    const [newCommentCounter, setNewCommentCounter] = useState(0);

    const questionAddComment = (e) => {
        if (e.key === "Enter") {
            const userId = Cookie.get("userid");

            axios
                .post(`http://localhost:8000/api/questions/${selectedQuestion._id}/users/${userId}/comments`, {
                    text: newComment,
                    author: Cookie.get("auth"),
                })
                .then((response) => {
                    if (response.data.success == false) {
                        alert(response.data.message);
                    } else {
                        console.log(response.data);
                        setNewCommentCounter(newCommentCounter + 1);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            setNewComment("");
        }
    };

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/questions/${selectedQuestion._id}`);
            } catch (error) {
                console.error(error);
            }
        };
        getQuestion();
    }, []);

    return (
        <div id="questionWrapper">
            <div className="questionBox">
                <div className="questionBoxLine1">
                    <div className="votesBox">
                        {registeredUser && <UpvoteButton handleUpvote={handleQuestionUpvote}></UpvoteButton>}
                        <div className="questionVotes">{questionVotes} votes</div>
                        {registeredUser && <DownvoteButton handleDownvote={handleQuestionDownvote}></DownvoteButton>}
                    </div>
                    <div
                        className="questionText"
                        dangerouslySetInnerHTML={renderQuestionTextWithLinks(selectedQuestion.text)}
                    />
                    <div className="askedByName">{selectedQuestion.asked_by}</div>
                    <div className="askedByTime">asked {formatDate(selectedQuestion.ask_date_time)}</div>
                </div>

                <div className="questionBoxLine2">
                    <div class="answersPageQuestionTags">
                        {selectedQuestion.tags.map((tid) => (
                            <p class="answersPageqTag">{tidToTagName(tid)}</p>
                        ))}
                    </div>
                </div>

                <div className="questionBoxLine3">
                    {selectedQuestion.comments && (
                        <QuestionCommentsWrapper
                            selectedQuestion={selectedQuestion}
                            newCommentCounter={newCommentCounter}
                            setNewCommentCounter={setNewCommentCounter}
                            registeredUser={registeredUser}
                        />
                    )}
                    {!isGuest && (
                        <input
                            id="addNewQuestionComment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => questionAddComment(e)}
                        ></input>
                    )}
                </div>
            </div>
        </div>
    );
}

function QuestionCommentsWrapper({ selectedQuestion, newCommentCounter, registeredUser }) {
    const [comments, setComments] = useState([]);

    const [displayedComments, setDisplayedComments] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    // Get a question's comments
    useEffect(() => {
        try {
            axios
                .get(`http://localhost:8000/api/questions/${selectedQuestion._id}/comments`)
                .then((response) => {
                    setComments(Object.values(response.data).sort((a, b) => new Date(b.time) - new Date(a.time)));
                    console.log("re-rendering question's comments...");
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }, [newCommentCounter]);

    useEffect(() => {
        const endIndex = startIndex + 3;
        const slicedComments = comments.slice(startIndex, endIndex);
        setDisplayedComments(slicedComments);
    }, [startIndex, comments]);

    const handleNext = () => {
        if (startIndex + 3 >= comments.length) {
            setStartIndex(0);
        } else {
            setStartIndex(startIndex + 3);
        }
    };

    const handlePrev = () => {
        if (startIndex - 3 >= 0) {
            setStartIndex(startIndex - 3);
        }
    };

    useEffect(() => {
        const endIndex = startIndex + 3;
        const slicedComments = comments.slice(startIndex, endIndex);
        setDisplayedComments(slicedComments);
    }, [comments, startIndex]);

    return (
        <div class="commentsWrapper">
            {comments.length > 0 && (
                <div>
                    <button onClick={handlePrev} disabled={startIndex === 0}>
                        Prev
                    </button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            <div>
                {displayedComments.map((comment) => (
                    <Comment
                        key={comment._id}
                        commentId={comment._id}
                        commentText={comment.text}
                        commentAuthor={comment.author}
                        commentVotes={comment.votes}
                        registeredUser={registeredUser}
                    />
                ))}
            </div>
        </div>
    );
}

function AnswerCommentsWrapper({ selectedQuestion, answer, newCommentCounter, registeredUser }) {
    const [comments, setComments] = useState([]);

    const [displayedComments, setDisplayedComments] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    // Get an answer's comments
    useEffect(() => {
        try {
            axios
                .get(`http://localhost:8000/api/questions/${selectedQuestion._id}/answers/${answer._id}/comments`)
                .then((response) => {
                    setComments(Object.values(response.data).sort((a, b) => new Date(b.time) - new Date(a.time)));
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }, [newCommentCounter]);

    useEffect(() => {
        const endIndex = startIndex + 3;
        const slicedComments = comments.slice(startIndex, endIndex);
        setDisplayedComments(slicedComments);
    }, [startIndex, comments]);

    const handleNext = () => {
        if (startIndex + 3 >= comments.length) {
            setStartIndex(0);
        } else {
            setStartIndex(startIndex + 3);
        }
    };

    const handlePrev = () => {
        if (startIndex - 3 >= 0) {
            setStartIndex(startIndex - 3);
        }
    };

    return (
        <div id="commentsWrapper">
            {comments.length > 0 && (
                <div>
                    <button onClick={handlePrev} disabled={startIndex === 0}>
                        Prev
                    </button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {displayedComments.map((comment) => (
                <Comment
                    key={comment._id}
                    commentType={"answer"}
                    answer={answer}
                    selectedQuestion={selectedQuestion}
                    commentId={comment._id}
                    commentText={comment.text}
                    commentAuthor={comment.author}
                    commentVotes={comment.votes}
                    registeredUser={registeredUser}
                />
            ))}
        </div>
    );
}

function Comment({ commentId, commentText, commentAuthor, commentVotes, registeredUser }) {
    const [votes, setVotes] = useState(commentVotes);

    const userId = Cookie.get("userid");

    useEffect(() => {
        setVotes(commentVotes);
    }, [commentVotes]);

    function handleCommentUpvote() {
        axios
            .put(`http://localhost:8000/api/comments/${commentId}/users/${userId}/upvote`)
            .then((response) => {
                if (response.data.success) {
                    setVotes(votes + 1);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
            <div>
                <div className="votesBox">
                    {registeredUser && (
                        <UpvoteButton
                            handleUpvote={() => {
                                handleCommentUpvote(commentId);
                            }}
                        ></UpvoteButton>
                    )}
                    <div className="questionVotes">{votes} votes</div>
                </div>
            </div>
            <div className="commentBox">
                <div className="commentText">{commentText}</div>
                <div className="commentAuthor">{commentAuthor}</div>
            </div>
        </div>
    );
}

const AnswersWrapper = ({
    selectedQuestion,
    answers,
    registeredUser,
    handleAnswerUpvote,
    handleAnswerDownvote,
    isGuest,
}) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;

    const handlePrev = () => {
        const newIndex = Math.max(0, startIndex - itemsPerPage);
        setStartIndex(newIndex);
    };

    const handleNext = () => {
        let newIndex = startIndex + itemsPerPage;
        if (newIndex >= answers.length) {
            newIndex = 0;
        }
        setStartIndex(newIndex);
    };

    answers.sort((a, b) => new Date(b.ans_date_time) - new Date(a.ans_date_time));

    const visibleElements = answers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div style={{ width: "fitContent" }}>
            {answers.length > 0 && (
                <div>
                    <button onClick={handlePrev} disabled={startIndex === 0}>
                        Prev
                    </button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            <div
                style={{
                    flex: "row",
                    width: "fitContent",
                    maxHeight: "280px",
                    overflowY: "scroll",
                    border: "1px solid #ccc",
                }}
            >
                {visibleElements.map((answer) => (
                    <Answer
                        selectedQuestion={selectedQuestion}
                        answerKey={answer._id}
                        answerText={answer.text}
                        answeredByName={answer.ans_by}
                        answeredByTime={answer.ans_date_time}
                        answerVotes={answer.votes}
                        registeredUser={registeredUser}
                        handleAnswerUpvote={handleAnswerUpvote}
                        handleAnswerDownvote={handleAnswerDownvote}
                        isGuest={isGuest}
                    />
                ))}
            </div>
        </div>
    );
};

function Answer({
    selectedQuestion,
    answerKey,
    answerText,
    answeredByName,
    answeredByTime,
    answerVotes,
    registeredUser,
    handleAnswerUpvote,
    handleAnswerDownvote,
    isGuest,
}) {
    function renderAnswerWithLinks(text) {
        const hyperlinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;

        const textWithLinks = text.replace(hyperlinkRegex, (match, linkText, linkTarget) => {
            return `<a href="${linkTarget}" target="_blank">${linkText}</a>`;
        });

        return { __html: textWithLinks };
    }

    const [newComment, setNewComment] = useState("");
    const [answer, setAnswer] = useState([]);
    const [newCommentCounter, setNewCommentCounter] = useState(0);

    const [votes, setVotes] = useState(answerVotes);

    useEffect(() => {
        setVotes(answerVotes);
    }, [answerVotes]);

    const answerAddComment = (e) => {
        if (e.key === "Enter") {
            const userId = Cookie.get("userid");

            axios
                .post(
                    `http://localhost:8000/api/questions/${selectedQuestion._id}/answers/${answerKey}/users/${userId}/comments`,
                    {
                        text: newComment,
                        author: Cookie.get("auth"),
                    }
                )
                .then((response) => {
                    if (response.data.success == false) {
                        alert(response.data.message);
                    } else {
                        setNewCommentCounter(newCommentCounter + 1);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            setNewComment("");
        }
    };

    const userId = Cookie.get("userid");

    function handleAnswerUpvote() {
        axios
            .put(
                `http://localhost:8000/api/questions/${selectedQuestion._id}/answers/${answerKey}/users/${userId}/upvote`
            )
            .then((response) => {
                if (response.data.success) {
                    setVotes(votes + 1);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleAnswerDownvote() {
        axios
            .put(
                `http://localhost:8000/api/questions/${selectedQuestion._id}/answers/${answerKey}/users/${userId}/downvote`
            )
            .then((response) => {
                if (response.data.success) {
                    setVotes(votes - 1);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Get the answer
    useEffect(() => {
        const getAnswer = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/questions/${selectedQuestion._id}/answers/${answerKey}`
                );
                setAnswer(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getAnswer();
    }, [setNewComment]);

    return (
        <div className="answerBox">
            <div className="answerBoxLine1">
                <div className="votesBox">
                    {registeredUser && <UpvoteButton handleUpvote={() => handleAnswerUpvote()}></UpvoteButton>}
                    <div className="questionVotes">{votes} votes</div>
                    {registeredUser && <DownvoteButton handleDownvote={() => handleAnswerDownvote()}></DownvoteButton>}
                </div>
                <div className="answerText" dangerouslySetInnerHTML={renderAnswerWithLinks(answerText)} />
                <div className="answeredByName">{answeredByName}</div>
                <div className="answeredByTime">{`answered ${formatDate(answeredByTime)}`}</div>
            </div>
            <div className="answerBoxLine2">
                {answer.comments && (
                    <AnswerCommentsWrapper
                        selectedQuestion={selectedQuestion}
                        answer={answer}
                        newCommentCounter={newCommentCounter}
                        registeredUser={registeredUser}
                    />
                )}
            </div>
            {!isGuest && (
                <div className="answerBoxLine3">
                    <input
                        id="addNewAnswerComment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => answerAddComment(e)}
                    ></input>
                </div>
            )}
        </div>
    );
}

export {
    AnswersPage,
    AnswersContainer,
    AnswersPageHeader,
    QuestionWrapper,
    QuestionCommentsWrapper,
    AnswerCommentsWrapper,
    Comment,
    AnswersWrapper,
    Answer,
};
