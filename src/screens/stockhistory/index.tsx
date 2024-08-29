import React from 'react'
import container from '../../css/screens/stockhistory'
import HistoryInfo from '../../components/screens/stockhistory/HistoryInfo'
import HistoryDetails from '../../components/screens/stockhistory/HistoryDetails'

export default function StockHistory() {
    return (
        <div css={container}>
            <div css={{
                borderBottom : "1px solid #dddddd",
            }}>
                <HistoryInfo />
                <HistoryDetails />
            </div>
            <div css={{
                marginTop : 30,
                borderBottom : "1px solid #dddddd",
            }}>
                <HistoryInfo />
                {/* <HistoryDetails /> */}
            </div>
            <div css={{
                marginTop : 30,
            }}>
                <HistoryInfo />
                {/* <HistoryDetails /> */}
            </div>
        </div>
    )
}