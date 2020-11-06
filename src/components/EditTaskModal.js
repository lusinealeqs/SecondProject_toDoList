import React, { PureComponent } from 'react';
import { Modal, Button, FormControl, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styles from '../components/NewTask/newTask.module.css';

class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...props.data,
      date: new Date(props.data.date),
      valid: true,
      validationType: null
    };
  }



  validationErrors = {
    requiredError: 'The field is required!',
    lengthError: 'The Title length shoud be less than 50 characters'
  };

  handleChange = (type, value) => {
    if (type === 'title' && !this.state.valid) {
      this.setState({
        [type]: value,
        valid: true
      });
      return;
    }

    this.setState({
      [type]: value
    });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSave();
    }
  };

  handleSave = () => {

    let { title, description, date, _id } = this.state;
    title = title.trim();

    if (!title) {
      this.setState({
        valid: false,
        validationType: 'requiredError'
      });
      return;
    };

    if (title.length > 50) {
      this.setState({
        valid: false,
        validationType: 'lengthError'
      });
      return;
    }

    const data = {
      title,
      description,
      date: date.toISOString().slice(0, 10)
    };

    this.props.onSave(_id, data);

  }

  render() {
    const { valid, validationType } = this.state;

    let errorMessage = '';
    if (!valid) {
      errorMessage = this.validationErrors[validationType];
    }

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={this.props.onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit task
                 </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className={"text-danger"}>{errorMessage}</Form.Label>
            <FormControl
              className={!valid ? styles.invalid : null}
              value={this.state.title}
              onChange={(event) => this.handleChange('title', event.target.value)}
              onKeyDown={this.handleKeyDown}
              placeholder="Title"
              aria-label="Title"
              aria-describedby="basic-addon2"
            />
          </Form.Group>

          <Form.Control
            as="textarea"
            value={this.state.description}
            rows={3}
            placeholder="Description"
            className="my-3"
            onChange={(event) => this.handleChange('description', event.target.value)}
          />
          <div
            className={styles.datePicker}
          >
            <DatePicker
              selected={this.state.date}
              minDate={new Date()}
              onChange={(value) => this.handleChange('date', value)}
            />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSave} variant='success'>Save</Button>
          <Button onClick={this.props.onCancel} variant='secondary'>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }


}


EditTaskModal.propTypes = {
  data: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};




// class EditTaskModal extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: props.value.text
//     };
//   }

//   handleChange = (event) => {
//     this.setState({
//       inputValue: event.target.value
//     });
//   };

//   handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       this.handleSave();
//     }
//   };

//   handleSave = () => {
//     const { inputValue } = this.state;
//     if (inputValue) {
//       const taskId = this.props.value.id;
//       this.props.onSave(taskId, inputValue);
//     }
//   }

//   render() {
//     const { onCancel } = this.props;
//     return (
//       <Modal
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         show={true}
//         onHide={onCancel}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">Edit Your Task</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <FormControl
//             value={this.state.title}
//             onChange={this.handleChange}
//             onKeyDown={this.handleKeyDown}
//             placeholder="Title"
//             aria-label="Title"
//             aria-describedby="basic-addon2"
//           />
//           <FormControl
//             value={this.state.description}
//             as="textarea"
//             rows={3}
//             placeholder="Description"
//             className="my-3"
//             onChange={(event) => this.handleChange('description', event.target.value)}
//           />
//           <div
//             className={styles.datePicker}
//           >
//             <DatePicker
//               value={this.state.date}
//               selected={this.state.date}
//               minDate={new Date()}
//               onChange={(value) => this.handleChange('date', value)}
//             />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={this.handleSave} variant='success'>Save</Button>
//           <Button onClick={onCancel} variant='secondary'>Cancel</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }
// }

// EditTaskModal.propTypes = {
//   value: PropTypes.object.isRequired,
//   onSave: PropTypes.func.isRequired,
//   onCancel: PropTypes.func.isRequired,
// };

export default EditTaskModal;