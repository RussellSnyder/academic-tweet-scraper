const getCurrentDateString = () => {
    let date_ob = new Date();
  
    let day = ("0" + date_ob.getDate()).slice(-2);
  
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
    let year = date_ob.getFullYear();
  
    let hour = date_ob.getHours();
  
    let minute = date_ob.getMinutes();
  
    let second = date_ob.getSeconds();
  
    return `${year}${month}${day}-${hour}${minute}${second}`
  }

  const getDateFromDateTime = (dateTime) => {
    const date = new Date(dateTime)

    return date.toLocaleDateString()
  }

  const getTimeFromDateTime = (dateTime) => {
    const date = new Date(dateTime)

    return date.toLocaleTimeString()
  }

  module.exports = {
    getCurrentDateString,
    getDateFromDateTime,
    getTimeFromDateTime
  }