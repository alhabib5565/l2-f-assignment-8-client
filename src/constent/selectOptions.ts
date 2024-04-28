import { TSelectOptions } from "@/type";


export const weightUnitOptions: TSelectOptions[] = [
    { value: "g", label: "Grams (g)" },
    { value: "kg", label: "Kilograms (kg)" },
    { value: "oz", label: "Ounces (oz)" },
    { value: "lb", label: "Pounds (lb)" },
    { value: "mg", label: "Milligrams (mg)" },
];

export const productTypeOptions: TSelectOptions[] = [
    { value: "liquid", label: "Liquid Cleaners" },
    { value: "powder", label: "Powder Cleaners" },
    { value: "spray", label: "Spray Cleaners" },
    { value: "gel", label: "Gel Cleaners" },
    { value: "foam", label: "Foam Cleaners" },
    { value: "wipe", label: "Wipe Cleaners" },
    { value: "granular", label: "Granular Cleaners" },
    { value: "paste", label: "Paste Cleaners" },
];

export const categoryOptions: TSelectOptions[] = [
    { value: "surface", label: "Surface Cleaners" },
    { value: "floor", label: "Floor Care" },
    { value: "laundry", label: "Laundry Care" },
    { value: "dishwashing", label: "Dishwashing" },
    { value: "tools", label: "Tools & Equipment" },
    { value: "air_fresheners", label: "Air Fresheners & Deodorizers" },
    { value: "trash_recycling", label: "Trash & Recycling" },
    { value: "specialty", label: "Specialty Cleaners" },
    { value: "pet_cleaning", label: "Pet Cleaning" },
    { value: "green_eco", label: "Green & Eco-Friendly" },
    { value: "commercial_industrial", label: "Commercial & Industrial" },
    { value: "health_safety", label: "Health & Safety" },
    { value: "seasonal", label: "Seasonal Cleaning" },
];
