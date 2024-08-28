import styled from '@emotion/styled'
import { InputContainer, NameBox } from '../../../../css/screens/layout/modal';
import DataFileInput from './DataFileInput';

export default function DataSet() {
    return (
        <Container>
            <InputContainer>
                <NameBox>
                    appkey
                </NameBox>
                <InputBox>
                    <TextInput placeholder='ex) hkeGH37HGDKQgvghwj5dBmFKGNvvSGR…'/>
                </InputBox>
            </InputContainer>
            <InputContainer>
                <NameBox>
                    appsecret
                </NameBox>
                <InputBox>
                    <TextInput placeholder='ex) HGKEfgkgjhg7sGwhjeGfkfjfjGjW5EDhDgb…' />
                </InputBox>
            </InputContainer>
            <DataFileInput />
        </Container>
    )
}

const Container = styled.div`
    margin-bottom : 20px;
`;

const InputBox = styled.div`
    flex: 1;
    border : 1px solid #000000;
    padding : 5px 0;
`;

const TextInput = styled.input`
    width: 100%;
    border : unset;
    margin : unset;
    padding : unset;
    text-align: center;
`;