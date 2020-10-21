import React, { useState } from 'react';

import './addComment.scss';

import generateUid from '../../../../common/uid';

export type AddCommentProps = {
    isOpen: boolean;
    isResponse?: boolean;
    onAddCommentClick: (comment: string) => void;
    onCancelClick?: () => void;
};

type AddCommentState = {
    isOpen: boolean;
    hideMask: boolean;
    comment: string;
};

// TODO:
// 1. Move uid to parent (check is uid changing)
// 2. Resolve old TODOs
// 3. Rename css classes
// 4. Create button component

export default function AddComment(props: AddCommentProps): JSX.Element {
    const uid: string = generateUid();

    const [addCommentState, setState] = useState<AddCommentState>({ isOpen: props.isOpen, hideMask: false, comment: '' });
    const onInputClick: () => void = () => setState({ ...addCommentState, isOpen: !addCommentState.isOpen });

    const onAddCommentClick: () => void = (): void => {
        props.onAddCommentClick(addCommentState.comment);

        document.querySelector(`#${uid} div.pseudo-input`)!.innerHTML = '';

        // (old) TODO: Handle add => clear input
        setState({
            ...addCommentState,
            comment: '',
            hideMask: false,
        });
    };

    // (old) TODO: Fix deleting multi-line comment
    const onInputHandler = (event: React.FormEvent<HTMLDivElement>): void => {
        setState({
            ...addCommentState,
            comment: event.currentTarget.innerText,
            hideMask: addCommentState.hideMask || event.currentTarget.innerText.length !== 0
        });
    }

    const btnAddTitle: string =
        props.isResponse === true ? 'Response' : 'Add';

    let componentContent: JSX.Element;

    if (addCommentState.isOpen) {
        componentContent = (
            <div className={`add-comment-container ${addCommentState.hideMask ? 'not-empty' : ''}`}>
                <div className="pseudo-input-mask">
                    <span>Add your comment..</span>
                </div>
                <div className="pseudo-input-container">
                    <div className="pseudo-input" contentEditable="true" onInput={onInputHandler} ref={input => input && input.focus()}>
                    </div>
                    <div className="pseudo-input-actions">
                        {props.onCancelClick ?
                            <div className="cancel" onClick={props.onCancelClick}>
                                <span>Cancel</span>
                            </div>
                            : null}
                        <Button
                            buttonType={ButtonType.Default}
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
            <div className="add-comment-container mask" onClick={onInputClick}>
                <div className="pseudo-input-mask">
                    <span>Add your comment..</span>
                </div>
            </div>
        );
    }

    return (
        <section
            id={uid}
            className="add-comment"
        >
            {componentContent}
        </section>
    );
};