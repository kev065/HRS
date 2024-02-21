import React, { useState, useEffect } from 'react';

const Session = () => {
   
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make a POST request to your backend with the form data
            const response = await fetch('http://127.0.0.1:5555/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  name, startDate, endDate  }),
            });

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        // Fetch data or perform any other actions when the component mounts
        // ...
    }, []);

  return (
    <div>
            <div className="col-md-6">
                {/* Date Picker Card */}
                <div className="card card-primary">
                    <div className="card-header">
                    <h3 className="card-title">Date picker</h3>
                    </div>
                    <div className="card-body">
                    {/* Date */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                        </div>
                        <div className="form-group">
                        <label>Start Date:</label>
                        <div className="input-group date" id="reservationdate" data-target-input="nearest">
                            <input
                            type="text"
                            className="form-control datetimepicker-input"
                            data-target="#reservationdate"
                            value={startDate}
                            onChange={handleStartDateChange}
                            />
                            <div className="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                            <div className="input-group-text">
                                <i className="fa fa-calendar"></i>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="form-group">
                        <label>End Date:</label>
                        <div className="input-group date" id="reservationdate" data-target-input="nearest">
                            <input
                            type="text"
                            className="form-control datetimepicker-input"
                            data-target="#reservationdate"
                            value={endDate}
                            onChange={handleEndDateChange}
                            />
                            <div className="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                            <div className="input-group-text">
                                <i className="fa fa-calendar"></i>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                    </form>
                    </div>
                    <div className="card-footer">
                    Visit <a href="https://getdatepicker.com/5-4/">tempusdominus </a> for more examples and information about the plugin.
                    </div>
                </div>
                {/* End Date Picker Card */}
            </div>

        </div>
  )
}

export default Session