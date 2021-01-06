import React from 'react';

import generateUid from '@app/utils/uid';
import { isNullOrUndefined } from '@app/utils/utils';

export default function HelloWorld(): JSX.Element {
    const loremIpsum: string = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam libero, egestas pharetra libero sit amet, pellentesque vulputate enim. Donec non convallis orci. Proin suscipit ornare velit, vitae rhoncus ligula efficitur quis. Mauris accumsan nisi eget neque molestie, at imperdiet sem lobortis. Mauris vestibulum massa sed metus condimentum, in efficitur purus laoreet. Sed dictum lorem et fermentum gravida. Aliquam laoreet eget neque et maximus. In diam purus, consequat vel vestibulum eu, eleifend ut felis. Nullam ac risus est. Suspendisse semper tempor velit, vitae congue enim aliquam sit amet. Nullam eleifend ornare libero nec rhoncus. Suspendisse eleifend arcu vitae ante elementum rhoncus. Nullam at tellus vel dolor varius interdum nec nec est.
        Duis bibendum velit in elit ullamcorper rhoncus. Cras cursus diam vitae lobortis blandit. Aenean vehicula tincidunt rhoncus. Nunc felis ante, fermentum sed tellus sit amet, euismod lacinia nisl. Suspendisse in nisl sodales neque interdum ultrices. Fusce laoreet, magna eget efficitur dictum, ex mauris mattis turpis, sit amet feugiat ante metus eget augue. Curabitur posuere scelerisque varius. Donec massa lectus, lacinia sed lacinia eu, dictum eget nunc. Vestibulum gravida, sem interdum dapibus venenatis, lacus ex rhoncus massa, in ultricies ante elit eget lacus. Sed aliquam felis ante.
        Integer eu cursus urna. Nulla fermentum suscipit consectetur. Praesent sodales sem condimentum condimentum auctor. Nulla ullamcorper elit nec mollis hendrerit. Duis feugiat diam quis arcu vulputate, non pretium elit aliquam. Mauris metus nibh, fringilla ac augue at, vestibulum bibendum ex. Fusce porttitor mi vel erat tincidunt rhoncus. Nunc venenatis magna a turpis consectetur, vel tristique sem hendrerit.
        Curabitur eget tempor ex. Nam non magna nec magna auctor dapibus. Etiam sed efficitur enim. Donec rutrum tortor quis vulputate sollicitudin. Mauris in mollis velit. Phasellus neque orci, finibus quis ipsum at, tincidunt euismod nulla. Suspendisse in justo ultricies augue posuere faucibus. Sed lacinia diam lacinia malesuada venenatis. Phasellus varius interdum ultrices. Proin ex diam, facilisis ac aliquam quis, mattis a mi. Donec at volutpat ante, non tempor quam. Pellentesque magna augue, accumsan a sem sit amet, condimentum tempus tellus.
        Nam fringilla lectus condimentum, dapibus velit sit amet, laoreet augue. Ut consectetur sit amet orci et dignissim. Etiam leo arcu, tempor vel accumsan vel, ultricies sit amet lectus. Cras at sem id sem bibendum iaculis quis a augue. Etiam nec suscipit nisl. Cras non sapien non magna porttitor consequat. Praesent in euismod tortor. Praesent tristique magna ante, nec fermentum risus tempus eu. Fusce ex elit, tristique nec scelerisque quis, tincidunt sit amet mauris. Donec pellentesque orci in elementum faucibus. Duis non commodo erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent accumsan aliquet mi, rhoncus iaculis ex tempor et.
    `;
    const iterrationCount: number = 10;

    const content: Array<{
        content: string,
        uid: string,
        prev?: string
    }> = [];

    for (let index = 0; index < iterrationCount; index++) {
        content.push({
            content: loremIpsum,
            uid: generateUid(),
            prev: content[index - 1]?.uid
        });
    }

    const [state] = React.useState<Array<{
        content: string,
        uid: string,
        prev?: string
    }>>(content);

    return (
        <>
            <h1>Hello, world!</h1>
            {state.map(item =>
                <div id={item.uid}>
                    <h3>{item.uid}</h3>
                    <p> {item.content} </p>
                    {
                        isNullOrUndefined(item.prev)
                            ? undefined
                            : <a href={`#${item.prev}`}> Previous item {item.prev}</a>
                    }
                    <hr />
                </div>
            )}
        </>
    );
};