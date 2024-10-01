import React, { ReactElement, ReactNode, useContext, useState } from 'react'
import {container} from '../../css/screens/layout'
import TarBar from '../../components/screens/layout/topbar'
import styled from '@emotion/styled'
import Modal from '../../components/Modal'
import ChangePriceModal from '../../components/screens/layout/ChangePriceModal'
import { LayoutContext } from '../../components/screens/layout/LayoutContext'

export default function Layout({children} : LayoutType) {
    const [{visible, context}, setModalConfig] = useState({
        visible : false,
        context : <ChangePriceModal />
    });

    const modalOpen = (visible : boolean, context : ReactElement = <></>) => {
        setModalConfig({
            visible,
            context
        });
    }

    return (
        <div css={container}>
            <LayoutContext.Provider value={{
                modalOpen
            }}>
                <Modal visible={visible}>
                    {
                        context
                    }
                </Modal>
                <TarBar />
                <Context>
                    {children}
                </Context>
            </LayoutContext.Provider>
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