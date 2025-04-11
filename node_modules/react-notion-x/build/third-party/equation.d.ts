import * as react_jsx_runtime from 'react/jsx-runtime';
import { EquationBlock } from 'notion-types';

declare function Equation({ block, math, inline, className, ...rest }: {
    block: EquationBlock;
    math?: string;
    inline?: boolean;
    className?: string;
}): react_jsx_runtime.JSX.Element | null;

export { Equation };
