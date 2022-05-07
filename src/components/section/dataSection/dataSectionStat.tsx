import React, { useEffect, useRef, useState } from 'react';
import { useOnScreen } from '../../core/onScreen';

interface IProps {
    style: string;
    iconClass: string;
    value: number;
    displayValue?: string;
    displayValueFunc?: (val: number) => string;
    description: string;
    animate?: boolean;
}

export const DataSectionStat: React.FC<IProps> = (props: IProps) => {
    const ref: any = useRef();
    const isVisible = useOnScreen(ref);
    const [value, setValue] = useState<number>(props.animate === false ? props.value : 0);

    useEffect(() => {
        let intervalId = 0;
        if (isVisible == false) return;
        if (props.animate === false) return;

        intervalId = setInterval(() => {
            setValue(oldValue => {
                const leftOver = props.value - oldValue;
                if (leftOver < 1) {
                    clearInterval(intervalId);
                    return props.value;
                }
                else {
                    if (oldValue > props.value) {
                        clearInterval(intervalId);
                        return props.value;
                    }
                    return oldValue + Math.floor(leftOver * 0.05)
                }
            });
        }, 10);
        return () => clearInterval(intervalId);
    }, [isVisible]);

    let valueToDisplay = props.displayValue ?? value;
    if (props.displayValueFunc != null) {
        valueToDisplay = props.displayValueFunc(value);
    }
    return (
        <li ref={ref} className={props.style + ' section-stat'} data-value={props.value}>
            <span className={props.iconClass}></span>
            <strong>{valueToDisplay}</strong>{props.description}
        </li>
    );
}
