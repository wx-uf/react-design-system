import { ApiTable } from "../storybook-common/api-table";
import { ApiTableSectionProps } from "../storybook-common/api-table/types";

const DATA: ApiTableSectionProps[] = [
    {
        attributes: [
            {
                name: "",
                description: (
                    <>
                        This component also inherits props from&nbsp;
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement"
                            rel="noreferrer"
                            target="_blank"
                        >
                            HTMLButtonElement
                        </a>
                    </>
                ),
            },
            {
                name: "icon",
                description: "specifies the icon to be in the button ",
                propTypes: ["JSX.Element"],
            },
            {
                name: "iconPosition",
                description:
                    "specifies whether the icon is displayed on the left or right of the label ",
                propTypes: [`"left"`, `"right"`],
                defaultValue: `"left"`,
            },
            {
                name: "styleType",
                mandatory: true,
                description: (
                    <>
                        The style of the <code>Button</code>
                    </>
                ),
                propTypes: [`"default"`, `"secondary"`, `"light"`, `"link"`],
                defaultValue: `"default"`,
            },
            {
                name: "danger",
                description:
                    "If specified, the component will have a red color scheme being applied",
                propTypes: ["boolean"],
                defaultValue: "false",
            },
        ],
    },
];

export const PropsTable = () => <ApiTable sections={DATA} />;
