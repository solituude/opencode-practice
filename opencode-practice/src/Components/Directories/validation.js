export const isCodeEq4Valid = (code, type) => {
    switch (type){
        case 'participantType':
            return code.length <= 2;
        case 'availableServices':
        case 'exchangeParticipant':
            return code.length === 1;
        default:
            return code.length === 4;
    }
}

export const isDataSet = (data) => {
    return data.length !== 0;
}

export const isDateValid = (date1, date2) => {
    const dateStart = new Date(date1);
    const dateEnd = new Date(date2);

    return dateEnd.getTime() - dateStart.getTime() >= 0;
}