function getData(){
    console.log("Log: getInfo from library");
    return "Data from library";
}

function getDataUser(req){

    const user = {
        id: 0,
        name: 'Vicente',
      }

    console.log("Log: getDataUser from library");
    return "Data from library Post request";
}

module.exports = {
    getData,
    getDataUser
}

