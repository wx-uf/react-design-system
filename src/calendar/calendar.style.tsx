import { Color } from "../color";
import { ChevronLeftIcon } from "@lifesg/react-icons/chevron-left";
import styled, { css } from "styled-components";
import { TextStyleHelper } from "../text/helper";
import { View } from "./calendar";

interface HeaderDropdownProps {
    $view: View;
}

interface CalendarViewProps {
    children: JSX.Element[];
    $view: View;
}

// =============================================================================
// STYLING
// =============================================================================
export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 41rem;
    background-color: ${Color.Neutral[8]};
    border: 1px solid ${Color.Neutral[5]};
    height: 25.125rem;
    border-radius: 0.75rem;
    padding: 2rem 0;
`;

export const HeaderDropdown = styled.div<HeaderDropdownProps>`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    svg {
        margin-left: 0.625rem;
        color: ${Color.Neutral[3]};
        transition: transform 250ms ease-in-out;
    }

    ${(props) => {
        switch (props.$view) {
            case "month":
            case "year":
                return css`
                    & > :first-child {
                        display: none;
                    }
                    & > :last-child svg {
                        transform: rotate(180deg);
                    }
                `;
        }
    }}
`;

const DropdownMonthYearBase = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    p {
        ${TextStyleHelper.getTextStyle("H4", "regular")}
    }
`;

export const DropdownMonth = styled(DropdownMonthYearBase)`
    margin-right: 1rem;
`;
export const DropdownYear = styled(DropdownMonthYearBase)``;

export const Views = styled.div<CalendarViewProps>`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;

    ${(props) => {
        const _VIEWS = ["day", "month", "year"] as View[];
        let styles = "";
        for (let i = 0; i < props.children.length; i++) {
            styles += `
                    > div:nth-child(${i + 1}) {
                        display: ${
                            props.$view === _VIEWS[i] ? "flex" : "none"
                        } ;
                    }
                `;
        }
        return css`
            ${styles}
        `;
    }}
`;

const ViewSectionBase = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 34rem;
`;

export const DayView = styled(ViewSectionBase)``;
export const MonthView = styled(ViewSectionBase)``;
export const YearView = styled(ViewSectionBase)``;

const ArrowLeftRightBase = styled(ChevronLeftIcon)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: ${Color.Neutral[3]};
    cursor: pointer;
`;

export const ArrowLeft = styled(ArrowLeftRightBase)`
    left: 1.25rem;
`;
export const ArrowRight = styled(ArrowLeftRightBase)`
    right: 1.25rem;
    transform: rotate(180deg) translateY(50%);
`;
