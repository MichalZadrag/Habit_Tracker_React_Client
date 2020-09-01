

export default function validateEvent(event) {
    let errors ={}

    if (!event.eventText) {
        errors.eventText = "Wydarzenie jest wymagane";
    }
    return errors;
}