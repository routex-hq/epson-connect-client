export class EpsonError extends Error {
    constructor(
        pathname: string,
        status: number,
        statusText: string,
        message?: string,
    ) {
        super(
            `${pathname}\n${status} ${statusText}\n${message}`,
        );
    }
}
