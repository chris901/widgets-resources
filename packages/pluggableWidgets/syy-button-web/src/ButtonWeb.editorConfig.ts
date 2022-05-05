import { ButtonWebPreviewProps } from "../typings/ButtonWebProps";

import {
    // changePropertyIn,
    // ContainerProps,
    // DropZoneProps,
    // hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    // Problem,
    Properties,
    // RowLayoutProps,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";

export function getProperties(
    values: ButtonWebPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    // 如果按钮类型不是link 则隐藏 href属性
    if (values.type !== "link") {
        hidePropertyIn(defaultProperties, values, "href");
    }
    // 如果不开启操作确认弹窗
    if (!values.openconfirm) {
        hidePropertiesIn(defaultProperties, values, [
            "confirmType",
            "confirmtitle",
            "confirmokText",
            "confirmcancelText",
            "confirmokType",
            "onConfirm",
            "onCancel"
        ]);
    }
    if (!values.advanced) {
        hidePropertiesIn(defaultProperties, values, [
            "confirmokText",
            "confirmcancelText",
            "confirmokType",
            "authPath",
            "block",
            "danger",
            "ghost",
            "shape"
        ]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(values: ButtonWebPreviewProps): StructurePreviewProps {
    return {
        type: "RowLayout",
        columnSize: "fixed",
        children: [
            {
                type: "Container",
                children: [
                    {
                        type: "Container",
                        children: [
                            {
                                type: "Text",
                                content: "Button-" + values.text + "+" + values.type,
                                fontColor: "#000",
                                bold: true,
                                fontSize: 10
                            }
                        ]
                    }
                ],
                padding: 2,
                borders: true
            }
        ]
    };
}
