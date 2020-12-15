import React, { PureComponent } from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from '../Pages/Page Styles/pageStyles.module.css';
import EditTaskModal from '../EditTaskModal';
import { getTask, removeTask } from '../../store/actions';
import { connect } from 'react-redux';
import { formatDate } from '../../helpers/helpfulFunctions';

class SingleTask extends PureComponent {
    state = {
        isEdit: false
    };

    componentDidMount() {
        const taskId = this.props.match.params.id;
        this.props.getTask(taskId);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
            this.props.history.push('/');
        }

        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.toggleEditModal();
        }
    }

    handleRemove = () => {
        const taskId = this.props.task._id;
        this.props.removeTask(taskId, 'single');
    }

    toggleEditModal = () => {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    render() {
        const { isEdit } = this.state;
        const { task } = this.props;

        return (
            <>
                {
                    task ?
                        <div className={styles.singlePage}>
                            <div className={styles.singlePageInnerDiv}>
                                <p><b>Title:</b> {task.title}</p>
                                <p><b>Description:</b> {task.description}</p>
                                <p><b>Deadline:</b> {formatDate(task.date)}</p>
                                <p><b>Created:</b> {formatDate(task.created_at)}</p>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            <strong>Edit</strong>
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        title='Edit'
                                        className='m-1'
                                        variant="info"
                                        onClick={this.toggleEditModal}

                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            <strong>Remove</strong>
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        title='Remove'
                                        className='m-1'
                                        variant="danger"
                                        onClick={this.handleRemove}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </OverlayTrigger>

                                {isEdit &&
                                    <EditTaskModal
                                        data={task}
                                        onCancel={this.toggleEditModal}
                                        from='single'
                                    />
                                }
                            </div>
                        </div> : <div>Oops! There is no task.</div>}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        removeTaskSuccess: state.removeTaskSuccess,
        editTaskSuccess: state.editTaskSuccess
    };
}

const mapDispatchToProps = {
    getTask,
    removeTask
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleTask); 