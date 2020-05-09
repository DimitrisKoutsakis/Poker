const Action = type => {
    const ActionCreator = payload => ({
            type,
            payload
        })

    ActionCreator.type = type;

    return ActionCreator;
};

export default Action;