import styled from '@emotion/styled';
import { fileListType } from './modalTypes';

export default function DataFileList({fileList, removeFile} : datafileListProps) {

    //제거 버튼 클릭시
    const onDelete = (num : number) => {
        return ()=>{
            //부모 컴포넌트의 제거 기능 호출
            removeFile(num)
        };
    }

    return (
        <Conatiner>
            {
                Object.keys(fileList).map((key, num)=>{
                    let marginBottom = num === fileList.length - 1 ? 0 : 10;
                    return (
                        <Box css={{
                            marginBottom
                        }}>
                            <DeleteBtn onClick={onDelete(num)}>
                                X
                            </DeleteBtn>
                            {key}
                        </Box>
                    )
                })
            }
        </Conatiner>
    )
}

const Conatiner = styled.div`
    display: flex;
    flex-direction : column;
`;

const Box = styled.div`
    flex: 1;
    text-align: center;
    padding : 5px 0;
    border : 1px solid #000000;
`;

const DeleteBtn = styled.button`
    position : absolute;
    right : 30px;
    font-weight : bold;
    background: unset;
    border : 1px solid #000000;
`;

interface datafileListProps {
    fileList : fileListType;
    removeFile : (num : number)=>void
}