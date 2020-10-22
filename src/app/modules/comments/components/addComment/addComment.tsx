import React, { useState } from 'react';

import './addComment.scss';

import generateUid from '../../../../common/uid';

import Button from '../../../../shared/components/button/button';
import { isNullOrUndefined } from '../../../../common/utils';

export type AddCommentProps = {
    isOpen: boolean;
    isResponse?: boolean;
    onAddCommentClick: (comment: string) => void;
    onCancelClick?: () => void;
};

type AddCommentState = {
    uid: string;
    isOpen: boolean;
    hideMask: boolean;
    comment: string;
    ref: React.MutableRefObject<HTMLDivElement | null>;
};

// TODO:
// 1. ref - is it ok to set manually?

export default function AddComment(props: AddCommentProps): JSX.Element {
    const [addCommentState, setState] = useState<AddCommentState>({
        uid: generateUid(),
        isOpen: props.isOpen,
        hideMask: false,
        comment: '',
        ref: React.useRef(null)
    });

    const onAddCommentClick: () => void = (): void => {
        props.onAddCommentClick(addCommentState.comment);

        if (!isNullOrUndefined(addCommentState.ref.current)) {
            addCommentState.ref.current.innerHTML = "";
        }

        setState({
            ...addCommentState,
            comment: '',
            hideMask: false,
        });
    };

    const onNotExpandedInputClick: () => void = (): void => {
        if (!addCommentState.isOpen) {
            setState({ ...addCommentState, isOpen: true });
        }
    };

    const onInputHandler: (event: React.FormEvent<HTMLDivElement>) => void =
        (event: React.FormEvent<HTMLDivElement>): void => {
            const comment: string = event.currentTarget.innerText.trimEnd();

            setState({
                ...addCommentState,
                comment: comment,
                hideMask: comment.length !== 0
            });
        };

    const onPasteHandler: (event: React.ClipboardEvent<HTMLDivElement>) => void =
        (event: React.ClipboardEvent<HTMLDivElement>): void => {
            const clipboardText: string =
                event.clipboardData.getData("text/plain")
                    .trimEnd();

            event.preventDefault();

            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, clipboardText);
            }
        };

    const btnAddTitle: string =
        props.isResponse === true ? 'Response' : 'Add';

    let componentContent: JSX.Element;

    if (addCommentState.isOpen) {
        componentContent = (
            <div className={`add-comment__container${addCommentState.hideMask ? ' add-comment__container--not-empty' : ''}`}>
                <div className="add-comment__pseudo-input-mask">
                    <span>Add your comment..</span>
                </div>
                <div className="add-comment__pseudo-input-container">
                    <div
                        className="add-comment__pseudo-input"
                        contentEditable="true"
                        onInput={onInputHandler}
                        onPaste={onPasteHandler}
                        ref={element => {
                            element && element.focus();

                            addCommentState.ref.current = element;
                        }}
                    >
                    </div>
                    <div className="add-comment__pseudo-input-actions">
                        {props.onCancelClick ?
                            <div className="add-comment__cancel-button" onClick={props.onCancelClick}>
                                <span>Cancel</span>
                            </div>
                            : null}
                        <Button
                            className="add-comment__add-button"
                            buttonType={'Primary'}
                            caption={btnAddTitle}
                            onButtonClick={() => addCommentState.comment.length > 0 ? onAddCommentClick() : null}
                        />
                    </div>
                </div>
            </div>
        );
    }
    else {
        componentContent = (
            <div className="add-comment__container add-comment__container--is-mask" onClick={onNotExpandedInputClick}>
                <div className="add-comment__pseudo-input-mask">
                    <span>Add your comment..</span>
                </div>
            </div>
        );
    }

    return (
        <section
            id={addCommentState.uid}
            className="add-comment"
        >
            {componentContent}
        </section>
    );
};