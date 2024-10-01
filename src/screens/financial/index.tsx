import React from 'react'
import container from '../../css/screens/financial'
import FinancialInfo from '../../components/screens/financial/FinancialInfo'
import FinancialDetails from '../../components/screens/financial/FinancialDetails'

export default function Financial() {
    return (
        <div css={container}>
            <div css={{
                borderBottom : "1px solid #dddddd",
            }}>
                <FinancialInfo />
                <FinancialDetails />
            </div>
            <div css={{
                marginTop : 30,
                borderBottom : "1px solid #dddddd",
            }}>
                <FinancialInfo />
                {/* <FinancialDetails /> */}
            </div>
            <div css={{
                marginTop : 30,
            }}>
                <FinancialInfo />
                {/* <FinancialDetails /> */}
            </div>
        </div>
    )
}