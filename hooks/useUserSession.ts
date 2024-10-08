import { useState, useEffect } from 'react';
import logout from '@util/logout';
import { parseCookies, setCookie } from 'nookies';

const MINUTE_IN_MILIS = 60000;
const INACTIVITY_TIME_LIMIT = 15 * MINUTE_IN_MILIS;
const INTERVAL_CHECK_USER_ACTIVITY = MINUTE_IN_MILIS;
const INACTIVITY_TIME_SESSION_IS_CLOSE_TO_END = 5 * MINUTE_IN_MILIS;
const INTERVAL_REFRESH_COOKIE = 5 * MINUTE_IN_MILIS;

export default function useUserSession() {

    const [lastInteraction, setLastInteraction] = useState(Date.now());
    const [isSessionCloseToFinish, setIsSessionCloseToFinish] = useState(false);


    function validateUserActivity(): void {
        const timeSinceLastInteraction = Date.now() - lastInteraction;
        validateIfSessionIsCloseToFinish(timeSinceLastInteraction);

        if (timeSinceLastInteraction > INACTIVITY_TIME_LIMIT) {
            clearEventListeners();
            logout();
        }
    }

    function validateIfSessionIsCloseToFinish(timeSinceLastInteraction: number) {
        if (timeSinceLastInteraction >= INACTIVITY_TIME_SESSION_IS_CLOSE_TO_END) {
            if (!isSessionCloseToFinish) {
                setIsSessionCloseToFinish(true);
            }
        }
    }

    function handleUserActivity(): void {
        if (isSessionCloseToFinish) {
            setIsSessionCloseToFinish(false);
        }
        setLastInteraction(Date.now());
        clearEventListeners();
    }

    useEffect(function addEventListeners() {
        const intervalID = setInterval(() => {
            document.addEventListener('click', handleUserActivity);
            document.addEventListener('keypress', handleUserActivity);
        }, 1000)

        return () => {
            clearEventListeners();
            clearInterval(intervalID);
        };
    }, [isSessionCloseToFinish])

    function clearEventListeners() {
        document.removeEventListener('click', handleUserActivity);
        document.removeEventListener('keypress', handleUserActivity);
    }

    useEffect(() => {
        const intervalId = setInterval(validateUserActivity, INTERVAL_CHECK_USER_ACTIVITY);
        return () => clearInterval(intervalId);
    }, [lastInteraction]);

    useEffect(function updateUserLastInteractionAndAuthToken() {
        const updateTokenIntervalId = setInterval(updateUserSessionToken, INTERVAL_REFRESH_COOKIE);
        return () => {
            clearInterval(updateTokenIntervalId);
            clearEventListeners();
        }
    }, [])


    return {
        isSessionCloseToFinish
    }
}


async function updateUserSessionToken() {

    const token = parseCookies()['auth-token'];

    if (!token) {
        logout();
        return
    }
    const resp = await fetch(`/api/apontamento`, {
        method: 'PUT',
        headers: {
            'x-fetch-url': "refresh"
        }

    })
    let statusOk = resp.ok;
    let autkToken = await resp.text();
    if (statusOk) {
        setCookie(null, "auth-token", autkToken);
    } else {
        logout();
    }
}