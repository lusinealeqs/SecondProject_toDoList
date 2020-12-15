import React, { PureComponent } from 'react';
import { Card, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeTask } from '../../store/actions';
import { formatDate, shortStr } from '../../helpers/helpfulFunctions'
import PropTypes from 'prop-types';


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
        const { data, removeTask, onEdit, disabled } = this.props;
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
                    <OverlayTrigger
                        placement="left"
                        overlay={
                            <Tooltip>
                                <strong>Go to Your Task page to see more!</strong>
                            </Tooltip>
                        }>
                        <Link
                            to={`/task/${data._id}`}
                            className={styles.taskLinks}
                        >
                            <Card.Title>{data.title}</Card.Title>
                        </Link>
                    </OverlayTrigger>
                    <Card.Text><b>Description:</b> {shortStr(data.description, 40)}</Card.Text>
                    <Card.Text><b>Deadline:</b> {formatDate(data.date)}</Card.Text>
                    <Card.Text><b>Created:</b> {formatDate(data.created_at)}</Card.Text>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip>
                                <strong>Edit</strong>
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
                                <strong>Remove</strong>
                            </Tooltip>
                        }>
                        <Button
                            className='m-1'
                            variant="outline-dark"
                            onClick={() => removeTask(data._id)}
                            disabled={disabled}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </OverlayTrigger>
                </Card.Body>
            </Card>
        );
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

const mapDispatchToProps = {
    removeTask
};

export default connect(null, mapDispatchToProps)(Task);