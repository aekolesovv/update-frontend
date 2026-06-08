import { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const { pathname } = useRouter();
    // The redesigned landing brings its own nav + footer, so the legacy
    // Header/Footer are hidden on the home route only.
    const isLanding = pathname === '/';

    return (
        <div>
            {!isLanding && <Header />}
            <div>{children}</div>
            {!isLanding && <Footer />}
        </div>
    );
};

export default Layout;
