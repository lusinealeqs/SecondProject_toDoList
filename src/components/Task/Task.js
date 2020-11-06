import React, { PureComponent } from 'react';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';

class Task extends PureComponent {
    state = {
        checked: false,
    };

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        });
        this.props.onCheck();
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render() {
        const { data, onRemove, onEdit, disabled } = this.props;
        const { checked } = this.state;

        const cardClasses = ['card', styles.task];
        if (checked) {
            cardClasses.push(styles.checked);
        }

        return (
            <Card className={cardClasses.join(' ')}>
                <input
                    type='checkbox'
                    className={styles.checkbox}
                    onClick={this.toggleCheckbox}
                />
                <Card.Body>
                    <Card.Title><i>{data.title}</i></Card.Title>
                    <Card.Text><b>Description:</b> {data.description}</Card.Text>
                    <Card.Text><b>Date:</b> {data.date ? data.date.slice(0, 10) : 'NONE'}</Card.Text>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip>
                                <strong>Edit Your Task!</strong>
                            </Tooltip>
                        }>
                        <Button
                            className='m-1'
                            variant="outline-dark"
                            onClick={onEdit}
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip>
                                <strong>Remove Your Task!</strong>
                            </Tooltip>
                        }>
                        <Button
                            className='m-1'
                            variant="outline-dark"
                            onClick={onRemove(data._id)}
                            disabled={disabled}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </OverlayTrigger>
                </Card.Body>
            </Card>
        );
    }
}

export default Task;