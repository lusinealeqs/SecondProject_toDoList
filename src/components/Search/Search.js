import React, { useState } from 'react';
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTasks } from '../../store/actions';
import { shortStr } from '../../helpers/helpfulFunctions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './search.module.css';


const statusOptions = [
    {
        label: 'Unset',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    },
];

const sortOptions = [
    {
        label: 'Unset',
        value: ''
    },
    {
        label: 'A-Z',
        value: 'a-z'
    },
    {
        label: 'Z-A',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion date oldest',
        value: 'completion_date_oldest'
    },
    {
        label: 'Completion date newest',
        value: 'completion_date_newest'
    }
];

const dateOptions = [
    {
        label: 'Creation before "DATE"',
        value: 'create_lte'
    },
    {
        label: 'Creation after "DATE"',
        value: 'create_gte'
    },
    {
        label: 'Completion before "DATE" ',
        value: 'complete_lte'
    },
    {
        label: 'Completion after "DATE"',
        value: 'complete_gte'
    }

];

function Search(props) {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState({
        label: '',
        value: ''
    });

    const [sort, setSort] = useState({
        label: '',
        value: ''
    });

    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });


    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = () => {
        const searchData = {
            search,
            status: status.value,
            sort: sort.value
        };

        for (let key in dates) {
            let val = dates[key];
            if (val) {
                searchData[key] = val.toLocaleDateString();
            }
        }

        props.getTasks(searchData);
    };

    return (
        <div className={styles.searchMainDiv}>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search for a task..."
                    aria-describedby="basic-addon2"
                    onChange={handleInputChange}
                    value={search}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={handleSubmit}
                    >
                        Search
          </Button>
                </InputGroup.Append>
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-dark"
                    title={status.value ? status.label : "Status"}
                >
                    {
                        statusOptions.map((option, index) =>
                            <Dropdown.Item
                                key={index}
                                active={status.value === option.value}
                                onClick={() => setStatus(option)}
                            >
                                {option.label}
                            </Dropdown.Item>
                        )
                    }

                </DropdownButton>

                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-dark"
                    title={sort.value ? shortStr(sort.label, 5) : "Sort"}
                >
                    {
                        sortOptions.map((option, index) =>
                            <Dropdown.Item
                                key={index}
                                active={sort.value === option.value}
                                onClick={() => setSort({ ...option })}
                            >
                                {option.label}
                            </Dropdown.Item>
                        )
                    }
                </DropdownButton>
                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-dark"
                    title={sort.value ? shortStr(sort.label, 5) : "Filter by Date"}
                >
                    <div className={styles.dateOptions}>
                        {
                            dateOptions.map(option =>
                                <div
                                    key={option.value}
                                >
                                    <DatePicker
                                        className={styles.optionLabels}
                                        placeholderText={option.label}
                                        selected={dates[option.value]}
                                        onChange={(value) => setDates({
                                            ...dates,
                                            [option.value]: value
                                        })}
                                    />
                                </div>
                            )
                        }
                    </div>
                </DropdownButton>
            </InputGroup>

            {/* // <div className={styles.dateOptions}>
            //     { */}
            {/* //         dateOptions.map(option =>
            //             <div
            //                 key={option.value}
            //             >
            //                 <DatePicker
            //                     placeholderText={option.label}
            //                     selected={dates[option.value]}
            //                     onChange={(value) => setDates({
            //                         ...dates,
            //                         [option.value]: value
            //                     })}
            //                 />
            //             </div>
            //         )
            //     }
            // </div> */}
        </div>
    )
}

const mapDispatchToProps = {
    getTasks
};

export default connect(null, mapDispatchToProps)(Search);