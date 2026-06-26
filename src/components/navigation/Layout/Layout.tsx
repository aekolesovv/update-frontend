import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const { pathname } = useRouter();
    // The redesigned landing and the level-test page bring their own nav +
    // footer, so the legacy Header/Footer are hidden on those routes.
    const ownChrome = pathname === '/' || pathname === '/test' || pathname === '/404';

    return (
        <div>
            {!ownChrome && <Header />}
            <div>{children}</div>
            {!ownChrome && <Footer />}
        </div>
    );
};

export default Layout;
