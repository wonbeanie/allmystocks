import styled from '@emotion/styled';
import { fileListType } from './modalTypes';

export default function DataFileList({fileList, removeFile} : datafileListProps) {

    //제거 버튼 클릭시
    const onDelete = () => {
        removeFile();
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
                            <DeleteBtn onClick={onDelete}>
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
    removeFile : ()=>void
}