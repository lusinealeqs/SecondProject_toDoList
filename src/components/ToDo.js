import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NewTask from './NewTask';
import Task from './Task/Task';
import Confirm from './Confirm';
import Modal from './Modal'


class ToDo extends Component {
    state = {
        tasks: [],
        checkedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false
    };

    componentDidMount() {
        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json())
            .then((tasks) => {
                if (tasks.error) {
                    throw tasks.error;
                }

                this.setState({
                    tasks
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }


    addTask = (inputValue) => {
        const data = {
            title: inputValue
        };

        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json())
            .then((task) => {
                if (task.error) {
                    throw task.error;
                }

                this.setState({
                    tasks: [task, ...this.state.tasks],
                    openNewTaskModal: false
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

    handleEdit = (task) => () => {
        this.setState({ editTask: task });
    };

    removeTask = (taskId) => () => {
        const newTasks = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: newTasks
        });
    };

    handleCheck = (taskId) => () => {
        const checkedTasks = new Set(this.state.checkedTasks);
        if (checkedTasks.has(taskId)) {
            checkedTasks.delete(taskId);
        }
        else {
            checkedTasks.add(taskId);
        }
        this.setState({ checkedTasks });
    };

    onRemoveSelected = () => {
        const checkedTasks = new Set(this.state.checkedTasks);
        let tasks = [...this.state.tasks];

        checkedTasks.forEach(taskId => {
            tasks = tasks.filter(task => task._id !== taskId);
        });

        checkedTasks.clear();

        this.setState({
            tasks,
            checkedTasks,
            showConfirm: false
        });
    };

    handleSave = (taskId, value) => {
        const tasks = [...this.state.tasks];

        const taskIndex = tasks.findIndex(task => task._id === taskId);

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            text: value
        };

        this.setState({
            tasks: tasks,
            editTask: null
        });
    };

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    };

    render() {
        const { checkedTasks, tasks, showConfirm, editTask } = this.state;
        const tasksComponents = tasks.map((task) =>
            <Col key={task._id}>
                <Task data={task}
                    onRemove={this.removeTask}
                    onCheck={this.handleCheck(task._id)}
                    onEdit={this.handleEdit(task)}
                    disabled={!!checkedTasks.size} />
            </Col>
        );

        return (
            <Container fluid={true}>
                <Row className='justify-content-center'>
                    <Button
                        variant="outline-primary"
                        className='m-3'
                        disabled={checkedTasks.size}
                        onClick={this.toggleNewTaskModal}
                    >
                        Add My New Task!
                    </Button>
                </Row>
                <Row>{tasksComponents}</Row>
                <Row className='justify-content-center'>
                    <Button
                        className='m-3'
                        variant="outline-danger"
                        disabled={!checkedTasks.size}
                        onClick={this.toggleConfirm}
                    >
                        Remove selected
                    </Button>
                </Row>
                { showConfirm &&
                    <Confirm
                        count={checkedTasks.size}
                        onSubmit={this.onRemoveSelected}
                        onCancel={this.toggleConfirm}
                    />
                }
                {!!editTask &&
                    <Modal
                        value={editTask}
                        onSave={this.handleSave}
                        onCancel={this.handleEdit(null)}
                    />
                }
                { this.state.openNewTaskModal &&
                    <NewTask
                        onAdd={this.addTask}
                        onCancel={this.toggleNewTaskModal}
                    />
                }
            </Container>
        );
    }
}

export default ToDo;