import React from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './tags.scss';

import { isNullOrEmpty, isNullOrUndefined } from '../../../../common/utils';

import { TagItem } from './types';
import { getFontColor, normalizeColor } from '../../../../common/color';

type TagsProps = {
    tags: Array<TagItem>;
    disabled?: boolean;
    onDelete?: (tag: TagItem) => void;
    onClick?: (tag: TagItem) => void;
};

export default function Tags(props: TagsProps): JSX.Element {
    const onTagClick = React.useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
            if (!isNullOrUndefined(event.target)
                && event.target instanceof HTMLElement
            ) {
                const eventTarget: HTMLElement =
                    event.target as HTMLElement;

                if (!isNullOrUndefined(eventTarget.dataset['tagId'])) {
                    const itemId: string | undefined =
                        eventTarget.dataset['tagId'];

                    if (!isNullOrEmpty(itemId)) {
                        const item: TagItem =
                            props.tags.find(x => x.id === itemId)!;

                        if (eventTarget.tagName.toLowerCase() === 'span'
                            && !isNullOrUndefined(props.onClick)
                        ) {
                            props.onClick(item);
                        } else if (eventTarget.tagName.toLowerCase() === 'i'
                            && !isNullOrUndefined(props.onDelete)
                        ) {
                            props.onDelete(item);
                        }
                    }
                }
            }
        }, [props]);

    const canDelete: boolean =
        !isNullOrUndefined(props.onDelete);

    return (
        <section
            className="tags"
            onClick={onTagClick}
        >
            <TransitionGroup>
                {props.tags.map(tag =>
                    <CSSTransition
                        key={tag.id}
                        timeout={500}
                        classNames="tags__tag"
                    >
                        <Tag
                            key={tag.id}
                            disabled={props.disabled || false}
                            canDelete={canDelete}
                            tag={tag}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </section>
    );
}

const Tag = (props: {
    disabled: boolean;
    canDelete: boolean;
    tag: TagItem;
}): JSX.Element => {
    const className: string =
        (props.disabled ? ' tags__tag--disabled' : '')
        + (isNullOrUndefined(props.tag.color) ? ' tags__tag--default' : '');

    const style: React.CSSProperties =
        isNullOrUndefined(props.tag.color)
            ? {}
            : { background: `${normalizeColor(props.tag.color)}`, color: getFontColor(props.tag.color) };

    return (
        <span
            key={props.tag.id}
            data-tag-id={props.tag.id}
            className={`tags__tag${className}`}
            style={style}
        >
            {props.tag.name}
            {props.canDelete && !props.disabled &&
                <i
                    className="tags__delete fa fa-times"
                    data-tag-id={props.tag.id}
                />
            }
        </span>
    );
};