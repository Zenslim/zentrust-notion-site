import * as react_jsx_runtime from 'react/jsx-runtime';
import { CodeBlock } from 'notion-types';

declare function Code({ block, defaultLanguage, className }: {
    block: CodeBlock;
    defaultLanguage?: string;
    className?: string;
}): react_jsx_runtime.JSX.Element;

export { Code };
