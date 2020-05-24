export const SIGN_UP_URL = `http://localhost:8080/api/auth/signup`;

export const ADD_HABIT_URL = `http://localhost:8080/api/habit/add`;

export const GET_ALL_HABITS_URL = `http://localhost:8080/api/habit/all`;

export const NAME_REGEXP = /^[a-zA-Z0-9]{3,}$/;

export const USERNAME_REGEXP = /^[a-zA-Z0-9]{4,}$/;

export const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$/.!%*?&])[A-Za-z\d@$!/.%*?&]{8,}$/;

export const HABIT_REGEXP = /^[a-zA-Z]{3,}$/;



