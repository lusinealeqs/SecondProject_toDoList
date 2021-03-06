import React, { PureComponent } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getTasks, removeTasks } from "../../store/actions";
import NewTask from "../NewTask/NewTask";
import Task from "../Task/Task";
import Confirm from "../Confirm";
import EditTaskModal from "../EditTaskModal";
import Search from "../Search/Search";

class ToDo extends PureComponent {
    state = {
        checkedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false,
    };

    componentDidMount() {
        this.props.getTasks();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false,
            });
        }
        if (!prevProps.removeTasksSuccess && this.props.removeTasksSuccess) {
            this.setState({
                showConfirm: false,
                checkedTasks: new Set(),
            });
        }
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({ editTask: null });
        }
    }

    handleEdit = (task) => () => {
        this.setState({ editTask: task });
    };

    handleCheck = (taskId) => () => {
        const checkedTasks = new Set(this.state.checkedTasks);
        if (checkedTasks.has(taskId)) {
            checkedTasks.delete(taskId);
        } else {
            checkedTasks.add(taskId);
        }
        this.setState({ checkedTasks });
    };

    onRemoveSelected = () => {
        const checkedTasks = [...this.state.checkedTasks];
        this.props.removeTasks({
            tasks: checkedTasks,
        });
    };

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm,
        });
    };

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal,
        });
    };

    render() {
        const { checkedTasks, showConfirm, editTask } = this.state;
        const { tasks } = this.props;

        const tasksComponents = tasks.map((task) => (
            <Col key={task._id} xl={3} lg={4} md={6}>
                <Task
                    data={task}
                    onCheck={this.handleCheck(task._id)}
                    onEdit={this.handleEdit(task)}
                    disabled={!!checkedTasks.size}
                />
            </Col>
        ));

        return (
            <Container fluid={true} className="homepageBody">
                <Row className="justify-content-center">
                    <Button
                        variant="outline-primary"
                        className="m-3"
                        disabled={checkedTasks.size}
                        onClick={this.toggleNewTaskModal}
                    >
                        Add New Task
                    </Button>
                    <Button
                        className="m-3"
                        variant="outline-danger"
                        disabled={!checkedTasks.size}
                        onClick={this.toggleConfirm}
                    >
                        Remove Selected Tasks
                    </Button>
                    <Search />
                </Row>
                <Row>{tasksComponents}</Row>

                {showConfirm && (
                    <Confirm
                        count={checkedTasks.size}
                        onSubmit={this.onRemoveSelected}
                        onCancel={this.toggleConfirm}
                    />
                )}
                {!!editTask && (
                    <EditTaskModal
                        data={editTask}
                        onSave={this.handleSave}
                        onCancel={this.handleEdit(null)}
                    />
                )}
                {this.state.openNewTaskModal && (
                    <NewTask
                        onAdd={this.addTask}
                        onCancel={this.toggleNewTaskModal}
                    />
                )}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.taskReducer.tasks,
        addTaskSuccess: state.taskReducer.addTaskSuccess,
        removeTasksSuccess: state.taskReducer.removeTasksSuccess,
        editTaskSuccess: state.taskReducer.editTaskSuccess,
    };
};

const mapDispatchToProps = {
    getTasks,
    removeTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
