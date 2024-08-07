import { useContext, useEffect } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom'

// Components
import GameCover from './components/cover';
import GameDetails from './components/details';
import GameMain from './components/main';

// Hooks
import { CompleteTransition } from 'hooks';

// Context
import { PageTransitionContext } from 'context';

// Styles
import './index.css'

export default function GamePage() {

    const { pathname } = useLocation()

    const { ModifyPageTransition } = useContext(PageTransitionContext)

    const { images, name, about, categories, features, idGame, ...rest } = useLoaderData() as RequestAPI.GameAllData;

    useEffect(() => {
        document.title = `${name} - Steam AI`
    }, [name])

    useEffect(() => CompleteTransition(ModifyPageTransition), [pathname])

    return (
        <div id="GamePage" style={{ backgroundImage: `url(${images[1].url})` }}>
            <div id="GamePageContent">
                <GameCover InLibrary={rest.InLibrary} Title={name} GameId={idGame} />
                <GameDetails categories={categories} images={images} name={name} {...rest} />
                <GameMain idGame={idGame} InLibrary={rest.InLibrary} categories={categories} features={features} products={rest.products} name={name} platforms={rest.platforms} about={about}/>
            </div>
        </div>
    )
}
