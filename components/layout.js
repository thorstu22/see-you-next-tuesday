import "bulma/css/bulma.min.css";

import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
    return (
        <section className="hero is-primary is-medium is-fullheight">
            <Navbar />
            <div className="hero-body">
                <div className='container is-widescreen'>{children}</div>
            </div>
            <Footer />
        </section>
    )
}