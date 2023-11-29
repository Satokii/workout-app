import { useEffect, useState } from 'react'
import '../../../styles/workouts/new-workout.css'
import CurrentWorkout from './CurrentWorkout'

function NewWorkout({ newWorkout, setNewWorkout, currentWorkout, setCurrentWorkout, showWorkout, setShowWorkout }) {

    // DISPLAYING WORKOUT AND FORM
    const [showForm, setShowForm] = useState(false)
    const [showAddBtn, setShowAddBtn] = useState(true)
    const [showWorkoutHint, setShowWorkoutHint] = useState(true)

    function handleAddExercise() {
        setShowForm(!showForm)
    }

    function toggleAddCancel() {
        if (showForm) {
            return 'Cancel'
            
        }
        else {
            return 'Add Exercise'
        }
    }

    function handleShow() {
        setShowAddBtn(false)
    }

    function handleCancel() {
        setShowAddBtn(true)
        setShowForm(false)
    }

    function handleShowHint() {
        if (newWorkout.length === 0) {
            setShowWorkoutHint(true)
        }
    }

    useEffect(() => {
        if (newWorkout.length > 0) {
            setShowWorkout(true)
            setShowWorkoutHint(false)
           }
        if (newWorkout.length === 0) {
            setShowWorkout(false)
            setShowWorkoutHint(true)
        }
    }, [newWorkout, setShowWorkout])

    // HANDLING FORM INPUT AND SUBMISSION
    const INITIAL_FORM_STATE = {
        id: '',
        name: '',
        sets: '',
        reps: '',
        group: ''
    }

    const [form, setForm] = useState(INITIAL_FORM_STATE)

    function handleChange(e) {
        const { name, value } = e.target
        setForm({...form, [name]: value})
    }

    function handleSubmitForm(e) {
        e.preventDefault()
        const updatedExercise = {...form, id: `${form.name.split(" ").join("-")}-${Math.random()}`}
        setNewWorkout([...newWorkout, updatedExercise])
        setForm(INITIAL_FORM_STATE)
        setShowAddBtn(true)
        setShowForm(false)
    }

    function RemoveExercise(exercise) {
        const updatedWorkout = newWorkout.filter((exerciseToRemove) => exerciseToRemove !== exercise)
        setNewWorkout([...updatedWorkout])
    }

    // ALERT MESSAGE
    function showAlert() {
            if (confirm('Warning \n\nSaving this workout will overwrite your current workout. \nWould you like to continue?')) {
                console.log('hey')
                setCurrentWorkout([...newWorkout])
                setNewWorkout([])
            }
        }

    // HANDLE CONFIRM WORKOUT BUTTON
    function handleSubmitWorkout() {
        if (currentWorkout.length > 0) {
            showAlert()
        }
        else {
            setCurrentWorkout([...newWorkout])
            setNewWorkout([])
        }    
    }

    return (
        <section className="create-new-workout grid">
            <h3>New Workout</h3>
            {showWorkoutHint ? <p className='add-exercise-hint'>Add an exercise to begin</p> : null }
            <div className='add-exercise-btn-container '>
                {showAddBtn ? <button className='add-exercise-btn grid' onClick={() => {
                    handleAddExercise()
                    handleShow()
                    handleShowHint()
                }}>{toggleAddCancel()}</button> : null}
            </div>
            {showWorkout ?
            <div className='grid'>
                <table className='workout-table'>
                    <thead>
                        <tr>
                            <th>Exercise Name</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Muscle Group</th>
                            <th>Remove Exercise</th>
                        </tr>
                    </thead>
                    <tbody>
                    {newWorkout.map((exercise, index) =>
                        <tr key={`${exercise.name}-${index}`}>
                            <td>{exercise.name}</td>
                            <td>{exercise.sets}</td>
                            <td>{exercise.reps}</td>
                            <td>{exercise.group}</td>
                            <td className='remove-exercise-btn' onClick={() => RemoveExercise(exercise)}>❌</td>
                        </tr>   
                     )}
                    </tbody>
                </table>
                <button className='confirm-workout-btn grid' onClick={() => handleSubmitWorkout()}>Confirm workout (save to current workout)</button>
            </div>  
            : null}
            {showForm && 
            <div className='add-exercise-form-container grid'>
                <h3>Exercise Details</h3>
                <form className='new-workout-form grid' onSubmit={(e) => handleSubmitForm(e)}>
                    <div className='add-exercise-input-container'>
                        <label htmlFor="exercise-name">Exercise Name:</label>
                        <input 
                            type="text"
                            id='name'
                            name='name'
                            placeholder='e.g. Bench Press'
                            onChange={e => handleChange(e)}
                            value={form.exercise}
                            required
                        />
                    </div>
                    <div className='add-exercise-input-container'>
                        <label htmlFor="sets">Number of Sets:</label>
                        <input 
                            type="number"
                            id='sets'
                            name='sets'
                            placeholder='e.g. 3'
                            onChange={e => handleChange(e)}
                            value={form.sets}
                            required
                        />   
                    </div>
                    <div className='add-exercise-input-container'>
                        <label htmlFor="reps">Number of Reps:</label>
                        <input 
                            type="number"
                            id='reps'
                            name='reps'
                            placeholder='e.g. 12'
                            onChange={e => handleChange(e)}
                            value={form.reps}
                            required
                        />
                    </div>
                    <div className='add-exercise-input-container'>
                        <label htmlFor="muscle-group">Muscle Group (optional):</label>
                        <input 
                            type="text"
                            id='group'
                            name='group'
                            placeholder='e.g. Chest'
                            onChange={e => handleChange(e)}
                            value={form.group}
                        />
                    </div>
                    <button className='add-exercise-submit-btn' type='submit'>ADD TO WORKOUT</button>
                </form>
                <button className='cancel-add-exercise-btn' onClick={() => handleCancel()}>CANCEL</button>
            </div>}
        </section>
    )
}

export default NewWorkout