const jwtDecode = require('jwt-decode');

function getData() {
    console.log("Log: getInfo from library");
    return "Data from library";
}

function getDataUser(req) {

    const user = {
        id: 0,
        name: 'Vicente',
    }

    console.log("Log: getDataUser from library");
    return "Data from library Post request";
}

function getJWT(req) {

    let mi_autho = "";
    if (req == null) {
        mi_autho = req.headers.authorization;
    } else {
        mi_autho = "req authorization:Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vdHJpYWwtdmNyLTcydzZuZG14LmF1dGhlbnRpY2F0aW9uLnVzMTAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS0xMjE2NDI3OTk3IiwidHlwIjoiSldUIiwiamlkIjogIjZxcTIrbWVEaEdud0k5YUVYZFFxVDVXTlgxZCtTYStIaTNJb2k1VGg4NmM9In0.eyJqdGkiOiJiNjU5M2EyMWU3MjI0ZjA1YmM0ZWNkM2NhM2ZmY2Q4MCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiJiN2E0OWVhNi04OWJlLTRlMWItOTgyMi1kMWU4MDE5ZmVjYjEiLCJ6ZG4iOiJ0cmlhbC12Y3ItNzJ3Nm5kbXgifSwieHMudXNlci5hdHRyaWJ1dGVzIjp7fSwieHMuc3lzdGVtLmF0dHJpYnV0ZXMiOnsieHMucm9sZWNvbGxlY3Rpb25zIjpbIkF1dGhHcm91cC5BUEkuQWRtaW4iLCJBUElQb3J0YWwuQWRtaW5pc3RyYXRvciIsIkF1dGhHcm91cC5TaXRlLkFkbWluIiwiQVBJTWFuYWdlbWVudC5TZWxmU2VydmljZS5BZG1pbmlzdHJhdG9yIiwiQXV0aEdyb3VwLlNlbGZTZXJ2aWNlLkFkbWluIiwiQXV0aEdyb3VwLkNvbnRlbnRBdXRob3IiLCJBdXRoR3JvdXAuQ29udGVudC5BZG1pbiIsImFwaV9tYW5fdmNyIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIiwiSW50ZWdyYXRpb25fUHJvdmlzaW9uZXIiXX0sImdpdmVuX25hbWUiOiJWaWNlbnRlIiwiZmFtaWx5X25hbWUiOiJDbGVtZW50ZSBSb2Ryw61ndWV6Iiwic3ViIjoiM2E0NzFlMDctZTNlZi00MmYxLWFhYmEtN2VjNjE3OTE5NzRmIiwic2NvcGUiOlsib3BlbmlkIl0sImNsaWVudF9pZCI6InNiLWNhcF9ub3J0aHdpbmQtZGVlOWIxNWF0cmlhbF90cmlhbC12Y3ItNzJ3Nm5kbXgtU1BBQ0VfVkNSIXQxODMzNTAiLCJjaWQiOiJzYi1jYXBfbm9ydGh3aW5kLWRlZTliMTVhdHJpYWxfdHJpYWwtdmNyLTcydzZuZG14LVNQQUNFX1ZDUiF0MTgzMzUwIiwiYXpwIjoic2ItY2FwX25vcnRod2luZC1kZWU5YjE1YXRyaWFsX3RyaWFsLXZjci03Mnc2bmRteC1TUEFDRV9WQ1IhdDE4MzM1MCIsInJldm9jYWJsZSI6dHJ1ZSwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9pZCI6IjNhNDcxZTA3LWUzZWYtNDJmMS1hYWJhLTdlYzYxNzkxOTc0ZiIsIm9yaWdpbiI6InNhcC5kZWZhdWx0IiwidXNlcl9uYW1lIjoidmljZW50ZS5jbGVtZW50ZXJvZHJpZ3VlekB0ZWxlZm9uaWNhLmNvbSIsImVtYWlsIjoidmljZW50ZS5jbGVtZW50ZXJvZHJpZ3VlekB0ZWxlZm9uaWNhLmNvbSIsImF1dGhfdGltZSI6MTY5MDg0ODM2NSwicmV2X3NpZyI6ImMwNzg0YTAwIiwiaWF0IjoxNjkxMDU2MzAzLCJleHAiOjE2OTEwOTk1MDMsImlzcyI6Imh0dHBzOi8vdHJpYWwtdmNyLTcydzZuZG14LmF1dGhlbnRpY2F0aW9uLnVzMTAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiJiN2E0OWVhNi04OWJlLTRlMWItOTgyMi1kMWU4MDE5ZmVjYjEiLCJhdWQiOlsic2ItY2FwX25vcnRod2luZC1kZWU5YjE1YXRyaWFsX3RyaWFsLXZjci03Mnc2bmRteC1TUEFDRV9WQ1IhdDE4MzM1MCIsIm9wZW5pZCJdfQ.TPOwyIhSSYLa8DohKSq84I2CaXGOGEmKqfk-d-06J5wzT1dnfAlwrl-MvAxy2BQih_pylLn2etuRzQtHc63xprWXjpEv72OvWJEHaAdlafQWkv2zDhSWyw_V-jzNUOYUGrZKITaqcIY_ndZXBXMVMBdx7CqvoxN_hOWTHghJJambNfuZUspGdZfbVaC2qiXvGFOlCElMNVS-VMtO6j7CU9B-0JvEK7KhjqzA7Lc1TBQruUbRkl96PrFrwxe-o0qhnOkJ6i7nUsE8T__ROBux95GBA6hO3yl0zVJrbyWy1H5pDVsQpisajme-rutGoRepAju5EXZ3PSPQLhwg9KZI6w";
    }
    if (mi_autho.includes("Bearer")) {
        let jwt = jwtDecode(mi_autho);
        console.log("USERINFO jwt.email" + jwt.email);
        return "JWT Token: " + mi_autho + "/n" +"JWT Token-email: " + jwt.email;
    } 
    else {
        if (mi_autho.includes("Basic")) {
            console.log("Authoriztion BASIC:" + mi_autho);
        } else {
            console.log("JWT No Authoriztion");
        }
        return "JWT Token:" + mi_autho;
    }   
}

function getDatafromUser(req) {
   // console.log("Log: getDatafromUse from library:" + req.data.variable);
    return "getDatafromUse from library";// + req.data.variable;
}

module.exports = {
    getData,
    getDataUser,
    getJWT
}

