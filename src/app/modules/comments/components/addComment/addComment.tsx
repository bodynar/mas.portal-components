import React from 'react';

import './addComment.scss';

import generateUid from '../../../../common/uid';

import Button from '../../../../shared/components/button/button';
import { isNullOrEmpty, isNullOrUndefined } from '../../../../common/utils';

export type AddCommentProps = {
    isOpen: boolean;
    autofocus: boolean;
    isResponse?: boolean;
    onAddCommentClick: (comment: string, scrollToCommentAfter: boolean) => void;
    className?: string;
    onCancelClick?: () => void;
};

type AddCommentState = {
    isOpen: boolean;
    isFocusSetAlready: boolean;
    uid: string;
    hideMask: boolean;
    comment: string;
    ref: React.MutableRefObject<HTMLDivElement | null>;
};

export default function AddComment(props: AddCommentProps): JSX.Element {
    const [addCommentState, setState] = React.useState<AddCommentState>({
        uid: generateUid(),
        isOpen: props.isOpen,
        isFocusSetAlready: false,
        hideMask: false,
        comment: '',
        ref: React.useRef(null)
    });

    const onAddCommentClick = React.useCallback((needScrollTo: boolean): void => {
        props.onAddCommentClick(addCommentState.comment, needScrollTo);

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
            const comment: string = event.currentTarget.innerText.trim();

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
                    .trim();

            event.preventDefault();

            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, clipboardText);
            }
        }, []);

    const setIsFocusedAlready = React.useCallback(() => setState({ ...addCommentState, isFocusSetAlready: true }), [addCommentState]);

    const btnAddTitle: string =
        props.isResponse === true ? 'Response' : 'Add';

    const className: string =
        "add-comment" + (
            isNullOrEmpty(props.className)
                ? ""
                : ` ${props.className}`
        );

    return (
        <section
            id={addCommentState.uid}
            className={className}
        >
            {addCommentState.isOpen
                ? <AddCommentPseudoInput
                    autofocus={props.autofocus}
                    isFocusSetAlready={addCommentState.isFocusSetAlready}
                    hideMask={addCommentState.hideMask}
                    comment={addCommentState.comment}
                    btnAddTitle={btnAddTitle}
                    pseudoInputRef={addCommentState.ref}
                    onFocus={setIsFocusedAlready}
                    onAddCommentClick={onAddCommentClick}
                    onInput={onInputHandler}
                    onPaste={onPasteHandler}
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
    autofocus: boolean;
    isFocusSetAlready: boolean;
    hideMask: boolean;
    comment: string;
    btnAddTitle: string;
    pseudoInputRef: React.MutableRefObject<HTMLDivElement | null>;
    onFocus: () => void;
    onAddCommentClick: (needScrollTo: boolean) => void;
    onInput: (event: React.FormEvent<HTMLDivElement>) => void;
    onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => void;
    onCancelClick?: () => void;
};

const AddCommentPseudoInput = (props: AddCommentPseudoInputProps): JSX.Element => {
    const [isFocused, setIsFocused] = React.useState(props.autofocus);

    const onActionsClick = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
            const target = event.target as HTMLElement;

            if (target.nodeName.toLocaleLowerCase() === "div"
                && !isNullOrUndefined(target.dataset['isActionHolder'])) {
                setIsFocused(true);

                if (!isNullOrUndefined(props.pseudoInputRef.current)) {
                    props.pseudoInputRef.current.focus();
                }
            }
        }, [props.pseudoInputRef]);

    const className: string =
        "add-comment__container"
        + (props.hideMask ? " add-comment__container--not-empty" : "")
        + (isFocused ? " add-comment__container--focused" : "");

    return (
        <div
            className={className}
            data-is-action-holder={true}
            onClick={onActionsClick}
        >
            <div className="add-comment__pseudo-input-mask">
                <span>Add your comment..</span>
            </div>
            <div className="add-comment__pseudo-input-container">
                <div
                    className="add-comment__pseudo-input"
                    contentEditable={true}
                    onInput={props.onInput}
                    onPaste={props.onPaste}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    ref={element => {
                        if (props.autofocus && !props.isFocusSetAlready && !isNullOrUndefined(element)) {
                            element.focus();
                            props.onFocus();
                        }

                        props.pseudoInputRef.current = element;
                    }}
                >
                </div>
                <AddCommentActions
                    {...props}
                    onActionsClick={onActionsClick}
                />
            </div>
        </div>
    );
};

type AddCommentActionsPropsType = {
    comment: string;
    btnAddTitle: string;
    onAddCommentClick: (needScrollTo: boolean) => void;
    onActionsClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onCancelClick?: () => void;
};

const AddCommentActions = (props: AddCommentActionsPropsType): JSX.Element => {
    const [needScrollTo, setNeedScrollTo] = React.useState(false);

    const onCheckBoxChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setNeedScrollTo(event.target.checked)
        , []);

    return (
        <div
            className="add-comment__pseudo-input-actions"
            data-is-action-holder={true}
            onClick={props.onActionsClick}
        >
            <div
                className="add-comment__add-options"
            >
                <label
                    title="Page will be scrolled to your comment"
                >
                    Show comment after
                    <input
                        type="checkbox"
                        onChange={onCheckBoxChange}
                    />
                </label>
            </div>
            <div
                className="add-comment__main-actions"
            >
                {props.onCancelClick ?
                    <div className="add-comment__cancel-button" onClick={props.onCancelClick}>
                        <span>Cancel</span>
                    </div>
                    : null}
                <Button
                    enabled={props.comment.length > 0}
                    title={props.comment.length > 0 ? undefined : "Type something"}
                    className="add-comment__add-button"
                    buttonType={'Primary'}
                    caption={props.btnAddTitle}
                    onButtonClick={() => props.comment.length > 0 ? props.onAddCommentClick(needScrollTo) : null}
                />
            </div>
        </div>
    );
};