import { FC, ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
