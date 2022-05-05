import { Component, ReactNode, createElement } from "react";
import { Button, Popconfirm, Modal } from "antd";
import { Icon } from "./components/Icon";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ButtonWebContainerProps } from "../typings/ButtonWebProps";
import { checkPathPermission, executeAction } from "@mendix/piw-utils-internal";
import "./ui/ButtonWeb.css";

const { confirm } = Modal;
export default class ButtonWeb extends Component<ButtonWebContainerProps> {
    render(): ReactNode {
        const { props } = this;
        if (!checkPathPermission(props.authPath)) {
            return null;
        }
        const {
            block,
            href,
            ghost,
            loading,
            danger,
            disabled,
            size,
            icon,
            shape,
            type,
            text,
            openconfirm, // 开启确认弹窗的操作
            confirmType,
            confirmtitle,
            confirmokText,
            confirmcancelText,
            confirmokType
        } = props;
        const shapeData = shape === "circle" ? "circle" : shape === "round" ? "round" : undefined;
        const textData = text.trim() === "" ? undefined : text;
        const ButtonConpemnet = (): ReactNode => {
            return (
                <Button
                    disabled={!!(disabled && disabled.value)}
                    danger={danger && danger.value}
                    loading={loading && loading.value}
                    ghost={ghost}
                    block={block}
                    href={href ? href : undefined}
                    size={size}
                    shape={shapeData}
                    type={type}
                    onClick={this.onClick}
                >
                    {icon && icon.value ? <Icon value={icon.value} empty /> : ""}
                    {textData}
                </Button>
            );
        };
        const ButtonPopConpemnet = (): ReactNode => {
            return (
                <Popconfirm
                    style={{ padding: 0, backgroundColor: "red" }}
                    title={confirmtitle?.value}
                    okText={confirmokText}
                    okType={confirmokType}
                    cancelText={confirmcancelText}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                >
                    {ButtonConpemnet()}
                </Popconfirm>
            );
        };
        return (
            <div className={props.class} style={props.style} tabIndex={props.tabIndex}>
                {openconfirm && confirmType === "pop" ? ButtonPopConpemnet() : ButtonConpemnet()}
            </div>
        );
    }
    private onClick = (): void => {
        const {
            openconfirm,
            confirmType,
            confirmtitle,
            confirmokText,
            confirmcancelText,
            onClickAction,
            onConfirm,
            confirmokType
        } = this.props;

        if (openconfirm && confirmType === "modal") {
            confirm({
                title: confirmtitle?.value,
                icon: <ExclamationCircleOutlined />,
                okText: confirmokText,
                okType: confirmokType,
                cancelText: confirmcancelText,
                onOk() {
                    executeAction(onConfirm);
                },
                onCancel() {
                    // console.log("Cancel");
                }
            });
        } else {
            executeAction(onClickAction);
        }
    };
    private onConfirm = (): void => {
        executeAction(this.props.onConfirm);
    };
    private onCancel = (): void => {
        executeAction(this.props.onCancel);
    };
}
