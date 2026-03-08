export type Show = {
    id: string;
    name: string;
    slug: string;
    imageurl: string;
    venue: string;
    pricerange: string;
    shortdescription: string;
    category: string;
    customData?: Record<string, any>;
};
