const localStorageMiddleware = store => next => action => {
    // Вызываем следующий middleware или reducer для обновления состояния
    const result = next(action);

    // Сохраняем обновленное состояние в localStorage
    localStorage.setItem('reduxState', JSON.stringify(store.getState().projects));

    return result;
};

export default localStorageMiddleware;