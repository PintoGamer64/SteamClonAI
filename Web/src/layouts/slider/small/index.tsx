import { ReactNode, useEffect, useRef, useState } from "react"

// Styles
import './index.css'
import { LeftArrow, RightArrow } from "../assets"
import { splitArrayComponentsToSubarrays } from "@utils";

type SliderProps = { children: ReactNode[] }
export default function SliderSmall({ children }: SliderProps) {

    const ArrayComponents = splitArrayComponentsToSubarrays(children, 3)

    const Wrapper = useRef<HTMLDivElement>(null!)

    const [ElementSelected, setElementSelected] = useState(1)

    enum States {
        Select = "Select",
        NonSelect = "NonSelect"
    }

    enum SlideEventVariables {
        MoveSmooth = "smooth",
        MovePoints = 1281
    }

    function SlideEvent(goTo: "back" | "next") {

        const childrenCount = ArrayComponents.length;
        const SlideFunction = (value: number) => Wrapper.current.scrollTo({
            behavior: SlideEventVariables.MoveSmooth,
            left: value
        })

        if (goTo === "back") {
            if (ElementSelected - 1 < 1) {
                SlideFunction(SlideEventVariables.MovePoints * childrenCount); return
            }
            SlideFunction(parseInt(`${Wrapper.current.scrollLeft}`) - SlideEventVariables.MovePoints)
            setElementSelected(ElementSelected - 1)
            return
        }
        if (ElementSelected + 1 > childrenCount) {
            SlideFunction(0); return
        }
        SlideFunction(parseInt(`${Wrapper.current.scrollLeft}`) + SlideEventVariables.MovePoints)
        setElementSelected(ElementSelected + 1)
        return
    }

    useEffect(() => {
        const ScrollElement = Wrapper.current
        const EventScroll = () => {
            const ValueResolve = parseInt(`${ScrollElement.scrollLeft}`) / SlideEventVariables.MovePoints
            setElementSelected(parseInt(`${ValueResolve + 1}`))
        }

        ScrollElement.addEventListener("scroll", EventScroll)

        return () => {
            ScrollElement.removeEventListener("scroll", EventScroll)
        }
    }, [SlideEventVariables.MovePoints])

    return (
        <div className="SteamSliderSmall">
            <div className="SteamSliderSmall-Content">
                <button className="SteamSliderSmall-ContentControls" onClick={() => SlideEvent("back")}>
                    <div className="SteamSliderSmall-ContentControls-Icon Left" >
                        <LeftArrow />
                    </div>
                </button>
                <div className="SteamSliderSmall-ContentElement" ref={Wrapper}>
                    {ArrayComponents.map((ReactElement, _index) =>
                        <SliderContainer key={_index}>
                            {ReactElement.map((element, _index) =>
                                <div key={_index}>{element}</div>
                            )}
                        </SliderContainer>
                    )}
                </div>
                <button className="SteamSliderSmall-ContentControls" onClick={() => SlideEvent("next")}>
                    <div className="SteamSliderSmall-ContentControls-Icon Right">
                        <RightArrow />
                    </div>
                </button>
            </div>
            <div className="SteamSliderSmall-ElementsCounter">
                {ArrayComponents.map((_value, _index) => <div key={_index + 1} className={`SteamSliderSmall-ElementsCounter-Element ${ElementSelected === (_index + 1) ? States.Select : States.NonSelect}`} />)}
            </div>
        </div>
    )
}

type SliderContainerProps = { children: ReactNode[] | ReactNode }
function SliderContainer({ children }: SliderContainerProps) {
    return (
        <div className="SteamSliderSmall-Container">
            {children}
        </div>
    )
}