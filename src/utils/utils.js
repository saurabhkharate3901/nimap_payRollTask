export const capitalizePath = (str) => {
    if (!str) return;

    // Split string by hyphens or camel case
    const words = str
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
        .split(/[\s-]/); // Split by spaces or hyphens

    return words.map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
};


export const getDateStringWithMonth = (inputDate) => {
    const date = new Date(inputDate);
    date.setDate(date.getDate() - 1);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}

export const dateObjToDateString = (dateObj) => {
    if(!dateObj) return
    let { $M, $D, $y } = dateObj;
    $M++;
    $M = $M < 10 ? `0${$M}` : $M;
    $D = $D < 10 ? `0${$D}` : $D;
    return `${$M}/${$D}/${$y}`
  }

export const getToken = () => {
    const token = localStorage.getItem("token")
    return token
}

export const getUserId = () => {
    const id = localStorage.getItem("userId")
    return id
}

export const getUserName = () => {
    const name = localStorage.getItem("userName")
    return name
}
  
  