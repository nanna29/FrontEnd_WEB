import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import FileInfo from "../../components/File/FileInfo";
import FileViewer from "../../components/File/FileViewer";
import Comment from "../../components/File/Comment";
import { getProject } from "../../api";
import { useQuery } from "react-query";

const Wrapper = styled.div`
  font-family: "GmarketSans";
  background: linear-gradient(rgba(3, 63, 255, 0.5) 0%, white 30%);
`;

const Main = styled.div`
  padding-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoCotainer = styled.div`
  margin-bottom: 53px;
`;

const Path = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 12px;
  margin-bottom: 10px;
  svg {
    margin-right: 3px;
  }
`;

const Col = styled.div`
  display: flex;
  justify-content: center;
  gap: 27px;
`;

const Details = () => {
  const { data: project } = useQuery(["project"], getProject);

  return (
    <Wrapper>
      <Main>
        <InfoCotainer>
          <Path>
            <Link to="/">
              <svg
                width="12px"
                height="12px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
            &gt;<Link to="/ongoingProject">진행중인 프로젝트</Link>&gt;
            {project?.name}
          </Path>
          <FileInfo />
        </InfoCotainer>
      </Main>
      <Col>
        <FileViewer />
        <Comment />
      </Col>
    </Wrapper>
  );
};
export default Details;
