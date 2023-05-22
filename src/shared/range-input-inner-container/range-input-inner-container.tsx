import {
    ArrowRight,
    ElementContainer,
    Indicator,
    Wrapper,
} from "./range-input-inner-container.styles";
import { RangeInputInnerContainerProps } from "./types";

/**
 * This component allows for input fields to be added within the containers
 * and renders the slider based on the focused element.
 */
export const RangeInputInnerContainer = ({
    children,
    currentActive,
    error,
    className,
    minWidthBeforeWrap,
}: RangeInputInnerContainerProps) => {
    // =========================================================================
    // CONST, STATE
    // =========================================================================
    const [elem1, elem2] = children;

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    return (
        <Wrapper className={className} $minWidthBeforeWrap={minWidthBeforeWrap}>
            <ElementContainer data-id="range-container-elem1-container">
                {elem1}
            </ElementContainer>
            <ArrowRight />
            <ElementContainer data-id="range-container-elem2-container">
                {elem2}
            </ElementContainer>
            <Indicator
                data-id="range-container-indicator"
                $position={currentActive}
                $error={error}
                $minWidthBeforeWrap={minWidthBeforeWrap}
            />
        </Wrapper>
    );
};
