import { Bookmark, History } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import 'react-quill/dist/quill.snow.css'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom'
import "./index.css"
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import ReactHtmlParser from "react-html-parser";


function MainQuestion() {
    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState("")
    const user = useSelector(selectUser)
    const[comment, setComment] = useState("")

    const [questionData, setQuestionData] = useState()


    let search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get('q');

    const handleQuill = (value) => {
        setAnswer(value);
    }

    useEffect(() => {
        async function getQuestionDetails() {
            await axios.get(`/api/question/${id}`).then((res) => {
                console.log(res.data[0])
                setQuestionData(res.data[0])
            }).catch((err) => {
                console.log(err)
            })
        }
        getQuestionDetails()
    }, [id]);

    async function getUpdatedAnswer() {
        await axios.get(`/api/question/${id}`).then((res) => {
            console.log(res.data[0])
            setQuestionData(res.data[0])
        }).catch((err) => {
            console.log(err)
        })
    } 

    const handleSubmit = async() => {
        if(answer !== ""){
            const body = {
            question_id: id,
            answer: answer,
            user: user,
        }
        const config = {
            headers: {
                "Contemt-Type": "application/json"
            }
        }
        await axios.post(`/api/answer`, body, config).then((res) => {
            console.log(res.data)
            alert('Answer added successfully')
            setAnswer("")
            getUpdatedAnswer();

        }).catch((err) => console.log(err))
        }
    }

    const handleComment = async() => {
        if(comment !== ""){
            const body = {
                question_id: id,
                comment: comment,
                user: user,
            };
            await axios.post(`/api/comment/${id}`, body).then((res) => {
                setComment("");
                setShow(false);
                getUpdatedAnswer();
                console.log(res.data);
              });        }
    }


  return (
    <div className="main">
        <div className="main-container">
            <div className="main-top">
                <h2 className="main-question">{questionData?.title}</h2>
                <Link to ="/add-question">
                    <button>Ask question</button>
                </Link>    
            </div>
            <div className="main-desc">
                <div className="info">
                    <p>{new Date(questionData?.created_at).toLocaleString()}</p>
                    <p>Active <span>today</span></p>
                    <p>Viewed <span>43 times</span></p>
                </div>
            </div>
            <div className="all-questtions">
                <div className="all-questions-container">
                    <div className="all-questions-left">
                        <div className="all-options">
                            <p className="arrow">▲</p>
                            <p className="arrow">0</p>
                            <p className="arrow">▼</p>          
                            <Bookmark />
                            <History />
                        </div>
                    </div>
                    <div className="question-answer">
                        <p>{ReactHtmlParser(questionData?.body)}</p>
                        <div className="author">
                            <small>asked {new Date(questionData?.created_at).toLocaleString()} </small>
                            <div className="auth-details">
                                <Avatar src = {questionData?.user?.photo} />
                                <p>{questionData?.user?.displayName ? questionData?.user?.displayName : String(questionData?.user?.email).split('@')[0]}</p>
                            </div>
                        </div>
                        <div className="comments">
                          
                            <div className="comment">
                            {
                                questionData?.comments && questionData?.comments?.map((_qd) =>( 
                              <p> {_qd?.comment} - 
                                  <span> 
                                   {_qd?.user?.displayName ? _qd?.user?.displayName : String(_qd?.user?.email).split('@')[0]}
                                  </span> 
                                  <small>
                                    {new Date(_qd?.created_at).toLocaleString()}
                                  </small> 
                              </p>
                            ))}  
                            </div>
                            <p onClick={() => setShow(!show)}>Add a Comment </p>
                             { show && (
                                <div className="title">
                                <textarea 
                                value = {comment}
                                onChange = {(e) => setComment(e.target.value)}
                                type="text" 
                                placeholder="add your comment"
                                rows={5}
                                style={{
                                    margin: '5px 0px',
                                    padding: '10px',
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    borderRadius: '3px',
                                    outline: 'none',
                                }}>
                                </textarea>
                                <button 
                                onClick = {handleComment}
                                style={{
                                    maxWidth: 'fit-content'
                                }}>Add comment</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
                <div style={{
                    flexDirection: 'column',
                }} className="all-questions">
                    <p style={{
                        marginBottom:'20px',
                        fontSize: '1.3rem',
                        fontWeight:'300',
                    }}>{questionData?.answerDetails?.length} Answer(s)</p>
                    { 
                        questionData?.answerDetails?.map((_q) => ( <div key = {_q?._id} className="all-questions-container">
                        <div className="all-questions-left">
                            <div className="all-options">
                                <p className="arrow">▲</p>
                                <p className="arrow">0</p>
                                <p className="arrow">▼</p>          
                                <Bookmark />
                                <History />
                            </div>
                        </div>
                        <div className="question-answer">
                        <p>{ReactHtmlParser(_q?.answer)}</p>
                        <div className="author">
                            <small>asked {new Date(_q?.created_at).toLocaleString()} </small>
                            <div className="auth-details">
                                <Avatar src = {_q?.user?.photo}/>
                                <p>{_q?.user?.displayName ? _q?.user?.displayName : String(_q?.user?.email).split('@')[0]}</p>
                            </div>
                        </div>                       
                    </div>
                </div>))
                    }
                   
            </div>                    
        </div>
        <div className="main-answer">
            <h3 style={{
                fontSize:'22px',
                margin: '10px 0',
                fontWeight: '400',
            }}>Your answer</h3>
            <ReactQuill 
                value = {answer}
                onChange={handleQuill}
                className="react-quill" theme="snow" 
                style={{
                height: '200px'
            }} />
        </div>
        <button 
            type="submit"
            onClick={handleSubmit}
            style={{
            maxWidth: 'fit-content',
            marginTop: "100px",
        }}>Post your Answer</button>
    </div>  
  );
}

export default MainQuestion;