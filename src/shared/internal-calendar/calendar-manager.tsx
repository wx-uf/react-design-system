import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { CalendarHelper } from "../../util";
import { InternalCalendarMonth } from "./internal-calendar-month";
import { InternalCalendarYear } from "./internal-calendar-year";
import {
    ArrowLeft,
    ArrowRight,
    Container,
    DropdownButton,
    DropdownText,
    Header,
    HeaderArrowButton,
    HeaderArrows,
    HeaderInputDropdown,
    IconChevronDown,
    ToggleZone,
} from "./internal-calendar.style";
import { CalendarAction, View } from "./types";

interface YearMonthDisplay {
    year: number;
    month: number;
}

interface DefaultViewProps {
    calendarDate: Dayjs;
}

interface CalendarManagerProps {
    children: React.ReactNode | ((props: DefaultViewProps) => React.ReactNode);
    initialCalendarDate?: string | undefined;
    minDate?: string | undefined;
    maxDate?: string | undefined;
    onYearMonthDisplayChange?: ((value: YearMonthDisplay) => void) | undefined;
    currentFocus?: "start" | "end" | "none" | undefined;
    getLeftArrowDate?: ((current: Dayjs) => Dayjs) | undefined;
    getRightArrowDate?: ((current: Dayjs) => Dayjs) | undefined;
    isLeftArrowDisabled?: ((calendarDate: Dayjs) => boolean) | undefined;
    isRightArrowDisabled?: ((calendarDate: Dayjs) => boolean) | undefined; // TODO: can support custom header
    selectedStartDate?: string | undefined;
    selectedEndDate?: string | undefined;
    selectWithinRange?: boolean | undefined;
    withButton?: boolean | undefined;
    doneButtonDisabled?: boolean | undefined;
    type?: "standalone" | "input"; // TODO: use styling instead
    onDismiss?: ((action: CalendarAction) => void) | undefined;
    onCalendarDate?: ((calendarDate: Dayjs) => void) | undefined;
    onCalendarView?: ((view: View) => void) | undefined;
    showNavigationHeader?: boolean | undefined;
}

export const CalendarManager = ({
    children,
    initialCalendarDate,
    minDate,
    maxDate,
    onYearMonthDisplayChange,
    currentFocus,
    getLeftArrowDate,
    getRightArrowDate,
    selectedStartDate,
    isLeftArrowDisabled,
    isRightArrowDisabled,
    selectedEndDate,
    selectWithinRange,
    type = "input",
    onCalendarDate,
    onCalendarView,
    showNavigationHeader,
}: CalendarManagerProps) => {
    const [calendarDate, setCalendarDate] = useState<Dayjs>(
        dayjs(initialCalendarDate)
    );
    const [viewCalendarDate, setViewCalendarDate] = useState<Dayjs>(
        dayjs(initialCalendarDate)
    );
    const [currentView, setCurrentView] = useState<View>("default");

    useEffect(() => {
        /**
         * Update calendar value in month/year
         * Once focus value is changed
         */
        const calendarValue =
            currentFocus === "end" ? selectedStartDate : selectedStartDate;

        // update selected in month/year view
        setViewCalendarDate(dayjs(calendarValue));

        if (calendarValue) setCalendarDate(dayjs(calendarValue));
    }, [currentFocus]);

    useEffect(() => {
        if (initialCalendarDate) {
            setCalendarDate(dayjs(initialCalendarDate));
            setViewCalendarDate(dayjs(initialCalendarDate));
        } else {
            setCalendarDate(dayjs());
            setViewCalendarDate(dayjs());
        }
    }, [initialCalendarDate]);

    useEffect(() => {
        if (selectedStartDate) {
            setCalendarDate(dayjs(selectedStartDate));
        }
    }, [selectedStartDate]);

    useEffect(() => {
        if (selectedEndDate) {
            setCalendarDate(dayjs(selectedEndDate));
        }
    }, [selectedEndDate]);

    const handleMonthDropdownClick = () => {
        if (currentView !== "month-options") {
            setCurrentView("month-options");
            performOnCalendarView("month-options");

            // Maintain focus when selecting month dropdown
            // containerRef.current.focus();
        } else {
            setCurrentView("default");
            setCalendarDate(viewCalendarDate);
            performOnCalendarView("default");
        }
    };

    const handleYearDropdownClick = () => {
        /**
         * If the view is in the month options view,
         * then clicking will send the view back to
         * default
         */
        if (currentView !== "default") {
            setCurrentView("default");
            setCalendarDate(viewCalendarDate);
            performOnCalendarView("default");
        } else {
            setCurrentView("year-options");
            performOnCalendarView("year-options");
        }
    };

    const handleLeftArrowClick = () => {
        const nextDate = getLeftArrowDate
            ? getLeftArrowDate(calendarDate)
            : calendarDate.subtract(1, "month");
        switch (currentView) {
            case "default":
                setViewCalendarDate(nextDate);
                setCalendarDate(nextDate);
                performOnCalendarDate(nextDate);
                break;
            case "month-options":
                setCalendarDate((date) => date.subtract(1, "year"));
                break;
            case "year-options":
                setCalendarDate((date) => date.subtract(10, "year"));
                break;
        }
    };

    const handleRightArrowClick = () => {
        const nextDate = getRightArrowDate
            ? getRightArrowDate(calendarDate)
            : calendarDate.add(1, "month");
        switch (currentView) {
            case "default":
                setViewCalendarDate(nextDate);
                setCalendarDate(nextDate);
                performOnCalendarDate(nextDate);
                break;
            case "month-options":
                setCalendarDate((date) => date.add(1, "year"));
                break;
            case "year-options":
                setCalendarDate((date) => date.add(10, "year"));
                break;
        }
    };

    const handleMonthYearSelect = (value: Dayjs) => {
        setCalendarDate(value);
        setViewCalendarDate(value);

        performOnCalendarDate(value);
    };

    const performOnCalendarDate = (date: Dayjs) => {
        if (onYearMonthDisplayChange) {
            const returnValue = {
                month: date.month() + 1,
                year: date.year(),
            };

            onYearMonthDisplayChange(returnValue);
        }
        onCalendarDate && onCalendarDate(date);
    };

    const performOnCalendarView = (view: View) => {
        if (onCalendarView) {
            onCalendarView(view);
        }
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const getYearHeaderText = (): string => {
        if (currentView === "year-options") {
            const { beginDecade, endDecade } =
                CalendarHelper.getStartEndDecade(calendarDate);

            return `${beginDecade} to ${endDecade}`;
        } else {
            return dayjs(calendarDate).endOf("week").format("YYYY");
        }
    };

    const renderDropdownButtons = () => {
        // TODO: Should update the view calendar date.
        return (
            <>
                <DropdownButton
                    type="button"
                    tabIndex={-1}
                    $expandedDisplay={currentView === "month-options"}
                    $visible={currentView === "default"}
                    id="month-dropdown"
                    onClick={handleMonthDropdownClick}
                    $type={type}
                >
                    <DropdownText $type={type}>
                        {dayjs(calendarDate).endOf("week").format("MMM")}
                    </DropdownText>
                    <IconChevronDown />
                </DropdownButton>
                <DropdownButton
                    type="button"
                    tabIndex={-1}
                    $expandedDisplay={currentView !== "default"}
                    id="year-dropdown"
                    onClick={handleYearDropdownClick}
                    $type={type}
                >
                    <DropdownText $type={type}>
                        {getYearHeaderText()}
                    </DropdownText>
                    <IconChevronDown />
                </DropdownButton>
            </>
        );
    };

    const renderOptionsOverlay = () => {
        switch (currentView) {
            case "month-options":
                return (
                    <InternalCalendarMonth
                        type={type}
                        calendarDate={calendarDate}
                        currentFocus={currentFocus}
                        minDate={minDate}
                        maxDate={maxDate}
                        selectedStartDate={selectedStartDate}
                        selectedEndDate={selectedEndDate}
                        viewCalendarDate={viewCalendarDate}
                        isNewSelection={selectWithinRange}
                        onMonthSelect={handleMonthYearSelect}
                    />
                );
            case "year-options":
                return (
                    <InternalCalendarYear
                        type={type}
                        calendarDate={calendarDate}
                        currentFocus={currentFocus}
                        minDate={minDate}
                        maxDate={maxDate}
                        selectedStartDate={selectedStartDate}
                        selectedEndDate={selectedEndDate}
                        viewCalendarDate={viewCalendarDate}
                        isNewSelection={selectWithinRange}
                        onYearSelect={handleMonthYearSelect}
                    />
                );
            default:
                return null;
        }
    };

    const renderHeader = () => {
        const disableLeftArrow = isLeftArrowDisabled
            ? isLeftArrowDisabled(calendarDate)
            : false;
        const disableRightArrow = isRightArrowDisabled
            ? isRightArrowDisabled(calendarDate)
            : false;
        return (
            <Header $type="input" data-id={"calendar-header"}>
                <HeaderInputDropdown>
                    {renderDropdownButtons()}
                </HeaderInputDropdown>
                <HeaderArrows>
                    <HeaderArrowButton
                        disabled={disableLeftArrow}
                        tabIndex={-1}
                        onClick={handleLeftArrowClick}
                        data-testid={"left-arrow-btn"}
                    >
                        <ArrowLeft />
                    </HeaderArrowButton>
                    <HeaderArrowButton
                        disabled={disableRightArrow}
                        tabIndex={-1}
                        onClick={handleRightArrowClick}
                        data-testid={"right-arrow-btn"}
                    >
                        <ArrowRight />
                    </HeaderArrowButton>
                </HeaderArrows>
            </Header>
        );
    };

    return (
        <Container
            // ref={resizeDetector.ref}
            tabIndex={-1}
            data-id="calendar-container"
            $type="input"
            // {...otherProps}
        >
            {showNavigationHeader && renderHeader()}
            <ToggleZone>
                {currentView === "default" &&
                    (typeof children === "function"
                        ? children({ calendarDate })
                        : children)}
                {renderOptionsOverlay()}
            </ToggleZone>
        </Container>
    );
};
