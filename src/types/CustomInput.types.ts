export enum CustomInputTypes {
    name = 'name',
    surname = 'surname',
    phone = 'phone',
    email = 'email',
    address = 'address',
    city = 'city',
    password = 'password',
    oldPassword = 'oldPassword',
    newPassword = 'newPassword',
    repeatPassword = 'repeatPassword',
    enteredEmail = 'enteredEmail',
    text = 'text',
    subject = 'subject',
    textarea = 'textarea',
    date = 'date',
    title = 'title',
    inn = 'inn',
    fio = 'fio',
    promo = 'promo',
    building_length = 'building_length',
    building_width = 'building_width',
    ceiling_height = 'ceiling_height',
    door_area = 'door_area',
    window_area = 'window_area',
    wall_panel_thickness = 'wall_panel_thickness',
    roof_panel_thickness = 'roof_panel_thickness',
    insulation_type = 'insulation_type',
    wall_panel_width = 'wall_panel_width',
    metal_thickness = 'metal_thickness',
    insulation_density = 'insulation_density',
    color = 'color',
    region = 'region',
    user_type = 'user_type',
    organization_name = 'organization_name',
    object_type = 'object_type',
    panel_purpose = 'panel_purpose',
    area = 'area',
    preferred_contact = 'preferred_contact',
}

export enum CustomInputColors {
    black = 'black',
    white = 'white',
    grey = 'grey',
}

export interface ICustomInput {
    inputType: CustomInputTypes;
    readOnly?: boolean;
    value?: string;
    labelText?: string;
    showPasswordButton?: boolean;
    color?: CustomInputColors;
    validation?: any;
    rules?: any;
    error?: string;
    onChange?: any;
    max?: string;
    placeholder?: string;
    defaultValue?: string;
}
