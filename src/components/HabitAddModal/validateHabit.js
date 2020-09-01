import {HABIT_REGEXP} from "../../constants";

export default function validateHabit(habit) {
    let errors ={}

    if (!habit.habitText) {
        errors.habitText = "Nawyk jest wymagany";
    } else if (!HABIT_REGEXP.test(habit.habitText)) {
        errors.habitText = "Nawyk jest nieprawidłowy";
    }
    return errors;
}