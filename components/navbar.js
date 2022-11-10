
import { useRouter } from "next/router";

export default function Navbar({ children }) {
    const router = useRouter();

    return (
        <div className="hero-head">
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item" onClick={() => router.push("/")}>People Battle</a>

                        <span className="navbar-burger" data-target="navbarMenuHeroA">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div id="navbarMenuHeroA" className="navbar-menu">
                        <div className="navbar-end">
                            <a
                                className={`${router.pathname == "/leaderboard" ? "is-active" : ""
                                    } navbar-item`}
                                onClick={() => router.push("/leaderboard")}
                            >
                                Leaderboard
                            </a>

                            <a
                                className={`${router.pathname == "/add-person" ? "is-active" : ""
                                    } navbar-item`}
                                onClick={() => router.push("/add-person")}
                            >
                                Add Person
                            </a>

                            <a
                                className={`${router.pathname == "/" ? "is-active" : ""
                                    } navbar-item`}
                                onClick={() => router.push("/")}
                            >
                                Battle{" "}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}