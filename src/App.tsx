import StockState from './screens/stockstate';
import Financial from './screens/financial';
import StockHistory from './screens/stockhistory';
import Layout from './screens/layout';
import Counter from './components/Counter';
import container from './css/app';
import Modal from './components/Modal';
import DataSetModal from './components/screens/layout/DataSetModal';

export default function App() {
    return (
        <div css={container}>
            <Layout>
                <StockState />
            </Layout>

            {/* <StockState /> */}
            {/* <Financial />
            <StockHistory /> */}
        </div>
    ) 
}