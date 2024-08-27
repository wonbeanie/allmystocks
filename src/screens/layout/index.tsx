import React from 'react'
import container from '../../css/screens/layout'

export default function Layout({children} : LayoutType) {
    return (
        <div css={container}>
            <div>
                <div css={{
                    display : "flex",
                    padding : 15
                }}>
                    <div css={{
                        display: "flex",
                        flexDirection : "column",
                        flex: 1
                    }}>
                        <div css={{
                            marginBottom : 10
                        }}>
                            예금 금리 : 3.8%
                        </div>
                        <div css={{
                            marginBottom : 10
                        }}>
                            적금 금리 : 4.2%
                        </div>
                        <div>
                            <div css={{
                                position : 'absolute',
                                padding : "5px 10px 5px 10px",
                                border : "1px solid #000000"
                            }}>
                                데이터 설정
                            </div>
                        </div>
                    </div>
                    <div css={{
                        flex: 1,
                        textAlign : "right"
                    }}>
                        <div css={{
                            marginBottom : 10
                        }}>
                            총 투입 금액 : 32,153,142
                        </div>
                        <div css={{
                            marginBottom : 10
                        }}>
                            현 투입 금액 : 15,243,151
                        </div>
                        <div css={{
                            marginBottom : 10
                        }}>
                            총 수익률 : 2.5%
                        </div>
                        <div>
                            현 수익률 : 13.5%
                        </div>
                    </div>
                </div>
                <div>
                    <div css={{
                        display : "flex",
                        border: "1px solid #000000"
                    }}>
                        <div css={{
                            flex: 1,
                            padding: 20,
                            textAlign : "center",
                            backgroundColor : "#dddddd"
                        }}>
                            주식상태
                        </div>
                        <div css={{
                            flex: 1,
                            padding: 20,
                            textAlign : "center",
                            borderLeft: "1px solid #000000",
                            borderRight: "1px solid #000000"
                        }}>
                            금융상품
                        </div>
                        <div css={{
                            flex: 1,
                            padding: 20,
                            textAlign : "center"
                        }}>
                            과거내역
                        </div>
                    </div>
                </div>
            </div>
            <div css={{
                padding: 30,
                paddingTop: 20,
                paddingBottom: 20,
                display: "flex",
                flexDirection: "column"
            }}>
                {children}
            </div>
        </div>
    )
}


interface LayoutType {
    children : React.ReactNode
}