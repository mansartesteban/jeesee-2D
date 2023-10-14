interface IVNode {
    render(parent: VNode);
}

type TProps = {
    [name: string]: any?;
};

type TElementProps = {
    id?: string,
    classes?: string[],
    attributes?: TElementAttribute[],
};

type TElementAttribute = {
    name: string,
    value?: string;
};

type TRenderableElement = string | Element | VNode;