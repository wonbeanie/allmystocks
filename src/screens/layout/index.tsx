import React from 'react'
import {container} from '../../css/screens/layout'
import TarBar from '../../components/screens/layout/topbar'
import styled from '@emotion/styled'

export default function Layout({children} : LayoutType) {
    return (
        <div css={container}>
            <TarBar />
            <Context>
                {children}
            </Context>
        </div>
    )
}


interface LayoutType {
    children : React.ReactNode
}

const Context = styled.div`
    padding: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
`;