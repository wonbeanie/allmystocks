import React from 'react'
import ConfirmBtn from './modal/ConfirmBtn'
import DataPrice from './modal/DataPrice'

export default function ChangePriceModal() {
    return (
        <div>
            <DataPrice />
            <ConfirmBtn />
        </div>
    )
}
