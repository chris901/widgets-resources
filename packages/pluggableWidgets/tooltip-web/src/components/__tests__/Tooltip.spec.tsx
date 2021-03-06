import { createElement } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Tooltip, TooltipProps } from "../Tooltip";

describe("Tooltip", () => {
    let defaultTooltipProps: TooltipProps;

    beforeEach(() => {
        defaultTooltipProps = {
            htmlMessage: undefined,
            textMessage: "Tooltip text",
            position: "right",
            openOn: "click",
            trigger: "Trigger element",
            renderMethod: "text",
            name: "tooltip"
        };
    });

    it("render DOM structure", () => {
        const { asFragment } = render(<Tooltip {...defaultTooltipProps} />);
        const triggerElement = screen.getByText(defaultTooltipProps.trigger as string);
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(asFragment()).toMatchSnapshot();
    });
    it("opens tooltip onMouseEnter and close onMouseLeave", () => {
        render(<Tooltip {...defaultTooltipProps} openOn="hover" />);
        const triggerElement = screen.getByText(defaultTooltipProps.trigger as string);
        act(() => {
            fireEvent.mouseEnter(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.mouseLeave(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();

        act(() => {
            fireEvent.focus(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("open tooltip onClick", () => {
        render(<Tooltip {...defaultTooltipProps} openOn="click" />);
        const triggerElement = screen.getByText(defaultTooltipProps.trigger as string);
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("open tooltip onFocus and close onBlur", () => {
        render(<Tooltip {...defaultTooltipProps} openOn="hoverFocus" />);
        const triggerElement = screen.getByText(defaultTooltipProps.trigger as string);
        act(() => {
            fireEvent.focus(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.blur(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();

        act(() => {
            fireEvent.mouseEnter(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.mouseLeave(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("render text content if the tooltipString is passed", () => {
        render(<Tooltip {...defaultTooltipProps} renderMethod="text" />);
        const triggerElement = screen.getByText(defaultTooltipProps.trigger as string);
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toHaveTextContent(defaultTooltipProps.textMessage as string);
    });

    it("render HTML if the content is passed", () => {
        act(() => {
            render(
                <Tooltip
                    {...defaultTooltipProps}
                    renderMethod="custom"
                    htmlMessage={<div>Simple Tooltip</div>}
                    textMessage={undefined}
                />
            );
        });
        const triggerElement = screen.getByText(defaultTooltipProps.trigger as string);
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByText("Simple Tooltip")).toBeInTheDocument();
    });

    it("close onOutsideClick if tooltip is visible", () => {
        render(<Tooltip {...defaultTooltipProps} openOn="click" />);
        const triggerElement = screen.getByText(defaultTooltipProps.trigger as string);
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.mouseDown(document);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
    });
});
