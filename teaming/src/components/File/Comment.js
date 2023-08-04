import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getComments } from "../../api";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddComment = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const MyImg = styled.img`
  width: 40px;
  height: 40px;
  background-color: #d9d9d9;
  border-radius: 20px;
`;

const Input = styled.input`
  width: 276px;
  height: 43px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 12px;
  font-family: "GmarketSans";
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

const CancleBtn = styled.button`
  color: #527ff5;
  width: 48px;
  height: 28px;
  border: solid 1px #527ff5;
  margin: 0;
  padding: 0;
  background-color: white;
  border-radius: 30px;
  font-family: "GmarketSans";
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const AddBtn = styled.button`
  color: white;
  width: 48px;
  height: 28px;
  border: solid 1px #527ff5;
  margin: 0;
  padding: 0;
  background-color: #527ff5;
  border-radius: 30px;
  font-family: "GmarketSans";
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const Border = styled.hr`
  width: 317px;
  border: solid 1.5px black;
  margin: 26px 0;
`;

const Comments = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 316px;
  height: 91px;
  margin-bottom: 7px;
  position: relative;
`;

const Profil = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 7px;
  margin-left: 13px;
  p {
    font-size: 10px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const UserImg = styled.img`
  width: 23px;
  height: 23px;
  background-color: #d9d9d9;
  border-radius: 12px;
  margin-right: 7px;
`;

const Content = styled.div`
  margin-left: 13px;
  font-size: 12px;
  width: 230px;
  height: 37px;
`;

const Date = styled.span`
  padding-left: 195px;
  padding-bottom: 3px;
  font-size: 8px;
  color: rgba(0, 0, 0, 0.5);
`;

const Delete = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
  cursor: pointer;
`;

const Comment = () => {
  const [value, setValue] = useState("");
  const { data: comments } = useQuery(["comments"], getComments);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const clickedCancle = () => {
    setValue("");
  };
  const onSubmit = (e) => {
    e.preventDefault();

    /* axios
      .post(`/files/${fileId}/${memberId}/comments`, {
        content: value,
      })
      .then((res) => console.log(res)); */

    setValue("");
  };

  const formatTime = (dateString) => {
    const date = new window.Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    let amPm = "오전";
    if (hours >= 12) {
      amPm = "오후";
      hours %= 12;
    }
    if (hours === 0) hours = 12;

    return `${year}. ${month}. ${day} ${amPm} ${hours} : ${minutes}`;
  };
  const DeleteComment = () => {
    if (
      !window.confirm(
        "삭제한 파일은 되돌릴 수 없습니다. 그래도 삭제하시겠습니까? "
      )
    )
      return false;
  };

  return (
    <Wrapper>
      <AddComment>
        <MyImg />
        <Input value={value} onChange={onChange} placeholder="댓글 추가..." />
      </AddComment>
      <Buttons>
        <CancleBtn onClick={clickedCancle}>취소</CancleBtn>
        <AddBtn onClick={onSubmit}>댓글</AddBtn>
      </Buttons>
      <Border />
      <Comments>
        {comments?.map((comment) => (
          <CommentContainer>
            <Delete onClick={DeleteComment}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="rgba(0, 0, 0, 0.3)"
                width="15px"
                height="15px"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Delete>
            <Profil>
              <UserImg src={comment.profile_image} />
              <p>{comment.writer}</p>
            </Profil>
            <Content>{comment.content}</Content>
            <Date>{formatTime(comment.create_at)}</Date>
          </CommentContainer>
        ))}
      </Comments>
    </Wrapper>
  );
};
export default Comment;
