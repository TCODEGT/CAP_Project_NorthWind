using {NorthWind as external} from './external/NorthWind.csn';
using {SSFFDEV2User as externalssffuser} from './external/SSFFDEV2User.csn';
using {SSFFDEV2CustSkills as externalSSFFDEV2CustSkills} from './external/SSFFDEV2CustSkills.csn';

service CatalogService {

    @readonly
    entity Products     as projection on external.Products {
        key ID,
            Name,
            Description,
            ReleaseDate,
            DiscontinuedDate,
            Rating,
            Price
    };

    @readonly
    entity My_Suppliers as projection on external.Suppliers {
        key ID,
            Name
    };

    @readonly
    entity User as projection on externalssffuser.User {
        key userId,
            email,
            assignmentUUID,
            gender,
            isPrimaryAssignment,
            status
    };

        @readonly
    entity cust_suggested_skills as projection on externalSSFFDEV2CustSkills.cust_suggested_skills;


}
