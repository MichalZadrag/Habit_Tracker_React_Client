

export default function validateEvent(event) {
    let errors ={}

    if (!event.eventText) {
        errors.eventText = "Wydarzenie jest wymagane";
    } else if (!event.location) {
        errors.location = "Lokalizacja jest wymagana";
    }


    return errors;
}