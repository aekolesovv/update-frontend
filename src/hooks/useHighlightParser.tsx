import parse, { domToReact, Element, DOMNode } from 'html-react-parser';

export function useHighlightParser(text: string, color: string) {
    return parse(text, {
        replace: node => {
            if (node instanceof Element && node.name === 'h') {
                const children = node.children as unknown as DOMNode[];

                return (
                    <span style={{ color: `${color}`, fontWeight: 700 }}>
                        {domToReact(children)}
                    </span>
                );
            }
        },
    });
}
