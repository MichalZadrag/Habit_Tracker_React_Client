
export default function validateTask(task) {
    let errors ={}

    if (!task.taskText) {
        errors.taskText = "Zadanie jest wymagany";
    }
    return errors;
}