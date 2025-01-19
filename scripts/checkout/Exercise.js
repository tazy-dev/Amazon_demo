const today = dayjs()

export function excercises() {
    console.log(today.format('dddd, MMMM D')); 
    // a
    console.log(today.add(5,'days').format('MMMM D'));
    // b
    console.log(today.add(1,'month').format('MMMM D')); 
    // e
    console.log(today.subtract(1,'month').format('MMMM D')); 
    // e
    console.log(today.format('dddd')); 

    //f 
    isWeekend(today);
    function isWeekend(day) {
        return day.day() === 0 || day.day() === 6;
    }

}