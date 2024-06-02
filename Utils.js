function MyRandomNumber(myMin, myMax) {
    return Math.random() * (myMax - myMin) + myMin;
}

function MyFormatMinutesSeconds(milliseconds) {
    // Use floor to ensure all calculations are based on integer values
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const remainingMilliseconds = Math.floor(milliseconds % 1000 / 10); // Ensure it's an integer

    // Pad with zero if number is less than 10
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');
    const paddedMilliseconds = remainingMilliseconds.toString().padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}:${paddedMilliseconds}`;
}

function MyCalculateDistance(aPosX, aPosY, bPosX, bPosY) {
   const distance = Math.sqrt((aPosX - bPosX) * (aPosX - bPosX) + (aPosY - bPosY) * (aPosY - bPosY));
   return distance;
}