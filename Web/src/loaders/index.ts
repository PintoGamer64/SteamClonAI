import { Params } from "react-router-dom";

type LoaderType = { request: Request, params: Params }
export function GameLoader({ params }: LoaderType) {
    return fetch(`http://localhost:1234/api/v1/game?idGame=${params.IdGame}`)
}

export function StoreLoader() {
    return fetch(`http://localhost:1234/api/v1/store`)
}