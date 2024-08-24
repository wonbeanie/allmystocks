import React from 'react'
import { css } from '@emotion/react'

export default function Test() {
    const style = css`
        color: hotpink;
    `

    const SomeComponent = ({ children } : {children : any}) => (
        <div css={style}>
            Some hotpink text.
            {children}
        </div>
    )

    const anotherStyle = css({
        textDecoration: 'underline'
    })

    const AnotherComponent = () => (
        <div css={anotherStyle}>Some text with an underline.</div>
    )

    return (
        <SomeComponent>
            <AnotherComponent />
        </SomeComponent>
    )
}