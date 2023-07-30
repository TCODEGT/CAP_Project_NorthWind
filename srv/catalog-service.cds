using {NorthWind as external} from './external/NorthWind.csn';

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

}
