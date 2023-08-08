using {NorthWind as external} from './external/NorthWind.csn';
using {SSFFDEV2User as externalssffuser} from './external/SSFFDEV2User.csn';
using {SSFFDEV2CustSkills as externalSSFFDEV2CustSkills} from './external/SSFFDEV2CustSkills.csn';

//@(requires: 'authenticated-user')


service CatalogService {


    /**
     * ***
     *
     * ```
     * ***GET FROM NORTHWIND ********
     * *****************************
     * ```
     */

    /**
     * Description Entidad Product , VCR Documentation
     */
    @readonly
    entity Products              as projection on external.Products {
        key ID,
            /**
             * Description Field Name , VCR Documentation
             */
            Name,
            Description,
            ReleaseDate,
            DiscontinuedDate,
            Rating,
            Price
    };

    @readonly
    entity My_Suppliers          as projection on external.Suppliers {
        key ID,
            Name,
            Location
    };

    /**
     * ***
     *
     * ```
     * ***GET FROM SSFF ********
     * ************************
     * ```
     */

    @readonly
    entity User                  as projection on externalssffuser.User {
        key userId,
            email,
            assignmentUUID,
            gender,
            isPrimaryAssignment,
            status
    };

    //@readonly
    entity cust_suggested_skills as projection on externalSSFFDEV2CustSkills.cust_suggested_skills;


    /**
     * ***
     *
     * ```
     * *******FUNCTION AND ACTIONS**********
     * ***********************************
     * ```
     */

    /**
     * Description function getInfo() , VCR Documentation
     */
    function getInfo()                                       returns String;
    function getInfo_from_library()                          returns String;
    action   getInfoUser_from_library()                      returns String;
    function getVariableEntorno()                            returns String;
    function getLabelFromi18n()                              returns String;
    function getJWT()                                        returns String;
    action   getDatafromUser(req : mytype)                   returns String;
    function createDataPickListFunctions()                   returns String;
    action   createDataPickListActions(req : mytypePicklist) returns String;
    function getDataPickListFunctions()                      returns String;
    action   layoutValidation(batch : batchHeader)           returns String;

    type batchHeader {
        hdId     :      String;
        scpapp   :      String;
        scpuser  :      String;
        company  :      String;
        division :      String;
        plant    :      String;
        items    : many batchItem;
    }

    type batchItem {
        plant    : String;
        whouse   : String;
        idvehi   : String;
        equnr    : String;
        material : String;
    }


    type mytypePicklist {
        cust_description : String;
        cust_user        : String;
        externalName     : String;
        cust_area        : String
    }

    /**
     * Description Type mytype , VCR Documentation
     */
    type mytype {
        id   : String;
        name : String
    }


}
