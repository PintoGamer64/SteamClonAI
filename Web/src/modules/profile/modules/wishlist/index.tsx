import { PageTransitionContext, ProfileContext } from "context"
import { useContext, useEffect } from "react"

// Styles
import './index.css'
import { Link } from "react-router-dom";
import { CompleteTransition } from "hooks";

export default function ProfileWishlist() {

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const { Profile } = useContext(ProfileContext);
    const { ProfileName, Wishlist } = Profile

    useEffect(() => {
        document.title = `Deseados por ${ProfileName} - Steam AI`
    }, [ProfileName])

    useEffect(() => CompleteTransition(ModifyPageTransition), [])

    return (
        <div id="SteamProfileContent-GamesPage">
            <div id="SteamProfileContent-GamesPageTitle">
                <h2>Deseados por {ProfileName}</h2>
            </div>
            {
                Wishlist
                    ?
                    Wishlist.map(({ images, name, releaseDate, idGame, icon }, _index) => {
                        const ImagesFilter = images.filter(({ type }) => type === "image")
                        return (
                            <div key={_index} className="SteamProfileContent-GamesPageElements">
                                <img className="SteamProfileContent-GamesPageElements-Image" src={ImagesFilter[0].url} alt={name} width={216} height={101} />
                                <div className="SteamProfile-GamesPageElements-Container">
                                    <div className="SteamProfileContent-GamesPageElements-Data">
                                        <span className="SteamProfileContent-GamesPageElements-DataTitle">{name}</span>
                                        <span className="SteamProfileContent-GamesPageElements-ReleaseDate">{releaseDate.replace(/-/g, " ")}</span>
                                    </div>
                                    <Link className="SteamProfileContent-GamesPageElements-Store" to={`/game/${idGame}`}>
                                        <img className="SteamProfileContent-GamesPageElements-DataImage" src={icon} alt={name} width={30} height={30} />
                                        Ver en la tienda
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="SteamProfileContent-GamesPageElements">
                        <span id="SteamProfileContent-GamesPageElements-Null">{"Lo siento, no deseo juegos por el momento >.<"}</span>
                    </div>
            }
        </div>
    )
}