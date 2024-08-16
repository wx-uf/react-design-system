import React from "react";
import { ApiTable, code } from "../../storybook-common/api-table";
import { ApiTableSectionProps } from "../../storybook-common/api-table/types";
import { SHARED_FORM_PROPS_DATA } from "../shared-props-data";

const DATA: ApiTableSectionProps[] = [
    {
        name: "SelectHistogram specific props",
        attributes: [
            {
                name: "className",
                description: "The class selector of the component",
                propTypes: ["string"],
            },
            {
                name: "id",
                description: "The unique identifier of the component",
                propTypes: ["string"],
            },
            {
                name: "data-testid",
                description: "The test identifier of the component",
                propTypes: ["string"],
            },
            {
                name: "disabled",
                description:
                    "Indicates if the component is disabled and selection is not allowed",
                propTypes: ["boolean"],
            },
            {
                name: "readOnly",
                description:
                    "Indicates if the component is in the readonly state",
                propTypes: ["boolean"],
            },
            {
                name: "value",
                description: (
                    <>
                        The selected range, in the format {code("[start, end]")}
                    </>
                ),
                propTypes: ["[number, number]"],
            },
            {
                name: "rangeLabelPrefix",
                description:
                    "Text to be prepended to the selection range labels",
                propTypes: ["string"],
            },
            {
                name: "rangeLabelSuffix",
                description:
                    "Text to be appended to the selection range labels",
                propTypes: ["string"],
            },
            {
                name: "renderRangeLabel",
                description: "Function to render custom selection range labels",
                propTypes: ["(value: number) => React.ReactNode"],
            },
            {
                name: "onChange",
                description: (
                    <>
                        Called on every selection change. Returns value in the
                        format {code("[start, end]")}
                    </>
                ),
                propTypes: ["(value: [number, number]) => void"],
            },
            {
                name: "onChangeEnd",
                description: (
                    <>
                        Called when a thumb is released after selection is
                        complete. Returns value in the format{" "}
                        {code("[start, end]")}
                    </>
                ),
                propTypes: ["(value: [number, number]) => void"],
            },
            {
                name: "placeholder",
                description: "The placeholder text of the selector",
                propTypes: ["string"],
                defaultValue: "Select",
            },
            {
                name: "error",
                description: (
                    <>
                        Indicates if an error display is to be set&nbsp; (Not
                        needed if you indicated <code>errorMessage</code>)
                    </>
                ),
                propTypes: ["boolean"],
            },
            {
                name: "alignment",
                description:
                    "Specifies if the dropdown is aligned to the left or right of the main field",
                propTypes: [`"left"`, `"right"`],
                defaultValue: `"left"`,
            },
            {
                name: "dropdownZIndex",
                description:
                    "The custom z-index of the dropdown. Try specifying this if you encounter z-index conflicts.",
                propTypes: ["number"],
                defaultValue: "50",
            },
            {
                name: "histogramSlider",
                description: "The histogram slider configuration",
                mandatory: true,
                propTypes: ["SelectHistogramSliderProps"],
            },
        ],
    },
    {
        name: "SelectHistogramSliderProps",
        attributes: [
            {
                name: "bins",
                mandatory: true,
                description:
                    "A list of histogram bins grouped by their lower limit",
                propTypes: (
                    <a href="https://designsystem.life.gov.sg/react/index.html?path=/docs/form-histogramslider--docs#component-api">
                        HistogramBinProps
                    </a>
                ),
            },
            {
                name: "interval",
                mandatory: true,
                description: "Dictates the upper limit of each bin",
                propTypes: ["number"],
            },
            {
                name: "renderEmptyView",
                description:
                    "A custom display if there are no results across any of the bins",
                propTypes: ["() => React.ReactNode"],
            },
        ],
    },
    ...SHARED_FORM_PROPS_DATA,
];

export const PropsTable = () => <ApiTable sections={DATA} />;
