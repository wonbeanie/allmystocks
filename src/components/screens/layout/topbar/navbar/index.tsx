import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react';

export default function NavBar() {
	return (
		<div>
			<Box>
				<NavBtn css={NavBarOn}>
					주식상태
				</NavBtn>
				<NavBtn css={CenterBtn}>
					금융상품
				</NavBtn>
				<NavBtn>
					과거내역
				</NavBtn>
			</Box>
		</div>
	)
}

const Box = styled.div`
	display : flex;
	border: 1px solid #000000;
`;

const NavBtn = styled.div`
	flex: 1;
	padding: 15px;
	text-align : center;
`;

const NavBarOn = css`
	background-color : #dddddd;
`;

const CenterBtn = css`
	border-left: 1px solid #000000;
	border-right: 1px solid #000000;
`;