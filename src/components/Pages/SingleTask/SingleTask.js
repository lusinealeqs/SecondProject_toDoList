import React, { PureComponent } from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faEdit,
    faCheck,
    faUndo,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./singleTask.module.css";
import EditTaskModal from "../../EditTaskModal";
import { getTask, removeTask, changeTaskStatus } from "../../../store/actions";
import { connect } from "react-redux";
import { formatDate } from "../../../helpers/helpfulFunctions";

class SingleTask extends PureComponent {
    state = {
        isEdit: false,
    };

    componentDidMount() {
        const taskId = this.props.match.params.id;
        this.props.getTask(taskId);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
            this.props.history.push("/");
        }

        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.toggleEditModal();
        }
    }

    handleRemove = () => {
        const taskId = this.props.task._id;
        this.props.removeTask(taskId, "single");
    };

    toggleEditModal = () => {
        this.setState({
            isEdit: !this.state.isEdit,
        });
    };

    render() {
        const { isEdit } = this.state;
        const { task, changeTaskStatus } = this.props;

        return (
            <>
                {task ? (
                    <div className={styles.singlePage}>
                        <div className={styles.singlePageInnerDiv}>
                            <p>
                                <b className={styles.options}>Title:</b>{" "}
                                {task.title}
                            </p>
                            <p>
                                <b className={styles.options}>Description:</b>{" "}
                                {task.description}
                            </p>
                            <p>
                                <b className={styles.options}>Deadline:</b>{" "}
                                {formatDate(task.date)}
                            </p>
                            <p>
                                <b className={styles.options}>Created:</b>{" "}
                                {formatDate(task.created_at)}
                            </p>
                            <p>
                                <b className={styles.options}>Status:</b>{" "}
                                {task.status}
                            </p>
                            <div className={styles.buttons}>
                                {task.status === "active" ? (
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                <strong>Mark task done</strong>
                                            </Tooltip>
                                        }
                                    >
                                        <Button
                                            title="Mark task done"
                                            className="m-1"
                                            variant="success"
                                            onClick={() =>
                                                changeTaskStatus(
                                                    task._id,
                                                    { status: "done" },
                                                    "single"
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </Button>
                                    </OverlayTrigger>
                                ) : (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip>
                                                <strong>
                                                    Mark task active
                                                </strong>
                                            </Tooltip>
                                        }
                                    >
                                        <Button
                                            title="Mark as active"
                                            className="m-1"
                                            variant="warning"
                                            onClick={() =>
                                                changeTaskStatus(
                                                    task._id,
                                                    { status: "active" },
                                                    "single"
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon icon={faUndo} />
                                        </Button>
                                    </OverlayTrigger>
                                )}
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            <strong>Edit</strong>
                                        </Tooltip>
                                    }
                                >
                                    <Button
                                        title="Edit"
                                        className="m-1"
                                        variant="outline-info"
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
                                        title="Remove"
                                        className="m-1"
                                        variant="outline-danger"
                                        onClick={this.handleRemove}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </OverlayTrigger>
                            </div>
                            {isEdit && (
                                <EditTaskModal
                                    data={task}
                                    onCancel={this.toggleEditModal}
                                    from="single"
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div>Oops! There is no task.</div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.taskReducer.task,
        removeTaskSuccess: state.taskReducer.removeTaskSuccess,
        editTaskSuccess: state.taskReducer.editTaskSuccess,
    };
};

const mapDispatchToProps = {
    getTask,
    removeTask,
    changeTaskStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
