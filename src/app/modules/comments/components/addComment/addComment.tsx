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

export default function AddComment(props: AddCommentProps): JSX.Element {
    const [addCommentState, setState] = useState<AddCommentState>({
        uid: generateUid(),
        isOpen: props.isOpen,
        hideMask: false,
        comment: '',
        ref: React.useRef(null)
    });

    const onAddCommentClick = React.useCallback((): void => {
        props.onAddCommentClick(addCommentState.comment);

        if (!isNullOrUndefined(addCommentState.ref.current)) {
            addCommentState.ref.current.innerHTML = "";
        }

        setState({
            ...addCommentState,
            comment: '',
            hideMask: false,
        });
    }, [addCommentState, props]);

    const onNotExpandedInputClick = React.useCallback((): void => {
        if (!addCommentState.isOpen) {
            setState({ ...addCommentState, isOpen: true });
        }
    }, [addCommentState]);

    const onInputHandler = React.useCallback(
        (event: React.FormEvent<HTMLDivElement>): void => {
            const comment: string = event.currentTarget.innerText.trimEnd();

            setState({
                ...addCommentState,
                comment: comment,
                hideMask: comment.length !== 0
            });
        }, [addCommentState]);

    const onPasteHandler = React.useCallback(
        (event: React.ClipboardEvent<HTMLDivElement>): void => {
            const clipboardText: string =
                event.clipboardData.getData("text/plain")
                    .trimEnd();

            event.preventDefault();

            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, clipboardText);
            }
        }, []);

    const btnAddTitle: string =
        props.isResponse === true ? 'Response' : 'Add';

    return (
        <section
            id={addCommentState.uid}
            className="add-comment"
        >
            {addCommentState.isOpen
                ? <AddCommentPseudoInput
                    hideMask={addCommentState.hideMask}
                    comment={addCommentState.comment}
                    btnAddTitle={btnAddTitle}
                    onAddCommentClick={onAddCommentClick}
                    onInput={onInputHandler}
                    onPaste={onPasteHandler}
                    pseudoInputRef={addCommentState.ref}
                    onCancelClick={props.onCancelClick}
                />
                : <AddCommentMask onClick={onNotExpandedInputClick} />}
        </section>
    );
};

const AddCommentMask = (props: { onClick: () => void }): JSX.Element => {
    return (
        <div className="add-comment__container add-comment__container--is-mask" onClick={props.onClick}>
            <div className="add-comment__pseudo-input-mask">
                <span>Add your comment..</span>
            </div>
        </div>
    );
};

type AddCommentPseudoInputProps = {
    hideMask: boolean,
    comment: string
    btnAddTitle: string,
    onAddCommentClick: () => void,
    onInput: (event: React.FormEvent<HTMLDivElement>) => void,
    onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => void,
    pseudoInputRef: React.MutableRefObject<HTMLDivElement | null>,
    onCancelClick?: () => void,
};

const AddCommentPseudoInput = (props: AddCommentPseudoInputProps): JSX.Element => {
    return (
        <div className={`add-comment__container${props.hideMask ? ' add-comment__container--not-empty' : ''}`}>
            <div className="add-comment__pseudo-input-mask">
                <span>Add your comment..</span>
            </div>
            <div className="add-comment__pseudo-input-container">
                <div
                    className="add-comment__pseudo-input"
                    contentEditable="true"
                    onInput={props.onInput}
                    onPaste={props.onPaste}
                    ref={element => {
                        element && element.focus();

                        props.pseudoInputRef.current = element;
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
                        caption={props.btnAddTitle}
                        onButtonClick={() => props.comment.length > 0 ? props.onAddCommentClick() : null}
                    />
                </div>
            </div>
        </div>
    );
};