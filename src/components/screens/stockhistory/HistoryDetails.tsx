import styled from '@emotion/styled'
import React from 'react'
import HistoryData from './HistoryData';

export default function HistoryDetails() {
    return (
        <Container>
            <table css={{
                flex : 1,
            }}>
                <thead>
                    <th css={{
                        padding : "10px 0"
                    }}>
                        체결 날짜
                    </th>
                    <th>
                        체결 금액
                    </th>
                    <th>
                        단가
                    </th>
                    <th>
                        손익
                    </th>
                    <th>
                        유형
                    </th>
                </thead>
                <tbody>
                    <HistoryData />
                    <tr>
                        <td>
                            2023.06.25
                        </td>
                        <td>
                            700,336
                        </td>
                        <td>
                            85,512
                        </td>
                        <td css={{
                            color : "#ff0000"
                        }}>
                            215,213
                        </td>
                        <td>
                            외화증권매도
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2023.04.25
                        </td>
                        <td>
                            513,485
                        </td>
                        <td>
                            54,512
                        </td>
                        <td css={{
                            color : "#0000ff"
                        }}>
                            - 215,213
                        </td>
                        <td>
                            외화증권매도
                        </td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
}

const Container = styled.div`
    display : flex;
    margin-bottom : 30px;

    & table {
        width : 100%;
        border : 1px solid #dddddd;
        border-collapse: collapse;
        table-layout : fixed;
    }

    & th, & td {
        border: 1px solid #444444;
        text-align : center;
        padding : 10px 0;
    }
`;