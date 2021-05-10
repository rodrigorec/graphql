export const getErrorMessage = (error: { graphQLErrors: any }) => {
    let errorMessage: string | undefined;

    if (error) {
        for (const gqlError of error.graphQLErrors) {
            errorMessage = gqlError.message;
        }
    }

    if (!errorMessage) {
        errorMessage = 'An error occurred.';
    }

    return errorMessage;
};
