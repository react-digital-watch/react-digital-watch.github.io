// First, import the react-crud-form component, called CRUDForm.

import { CRUDForm } from 'react-crud-form';

import React from 'react';

import ReactDOM from 'react-dom';
import MyCrudApp from './MyCrudApp';


// Next, define the schemata of the data the form is supposed to display and

// collect.

// Each schema will define:

// * the names of the models

// * how the models are related to each other

// * various properties of each model with their datatype

//

// The example schemata describe a basic food and beverage menu.

// * a `menu` has many `categories` and `modifier_classes`

// * a `category` has many `items`

// * a `modifier_class` has many `modifiers`

// * an `item` and a `modifier_class` can be linked via a `item_modifier_class`

// * and `items`, `modifiers`, and `modifier_classes` can have many `prices`

//   via a polymorphic relationship.

const schemata = [

    {

        // `title` is a human-readable name of your model and will be displayed

        // as a header

        title: 'Menus',

        // `name` is a unique string that identifies your model.

        name: 'menu',

        // Exactly one model needs to be labeled as the root model.

        root: true,

        // `properties` lists each attribute of your model with its datatype.

        // `id` need not be specified.

        properties: {

            friendlyId: {

                type: 'string',

            },

        },

        // `associations` describes how this model relates with other models.

        associations: [

            {

                // `associationType` can be either 'hasMany' or 'belongsTo'.

                associationType: 'hasMany',

                // `otherModel` is the `name` of the other model participating in

                // the association.

                otherModel: 'category',

                // For a 'hasMany' relationship, `foreignKey` is the attribute on the

                // other model. When this model (menu) is expanded in the form, each

                // instance of the other model (category) where the `foreignKey` equals

                // the `id` of this model (menu) will be displayed.

                // 'belongsTo' relationship is documented further below.

                foreignKey: 'menuId',

            },

            {

                associationType: 'hasMany',

                otherModel: 'modifierClass',

                foreignKey: 'menuId',

            },

        ],

    },

    {

        title: 'Categories',

        name: 'category',

        properties: {

            name: {

                type: 'string',

            },

            menuId: {

                type: 'integer',

            },

        },

        associations: [

            {

                associationType: 'hasMany',

                otherModel: 'item',

                foreignKey: 'categoryId',

            },

        ],

    },

    {

        title: 'Items',

        name: 'item',

        properties: {

            name: {

                type: 'string',

            },

            inStock: {

                type: 'boolean',

            },

            categoryId: {

                type: 'integer',

            },

        },

        associations: [

            {

                associationType: 'hasMany',

                otherModel: 'price',

                foreignKey: 'priceableId',

                // `polymorphic` describes a polymorphic relationship.

                // It consists of a tuple of strings: the first is the attribute

                // on the other model (price) that specifies the 'parent' model, and the

                // second string specifies which value of this column corresponds to

                // this (item) model.

                // In this case, `polymorphic` specifies each `price` with

                // `priceableType == 'item'`.

                polymorphic: ['priceableType', 'item'],

            },

            {

                associationType: 'hasMany',

                otherModel: 'itemModifierClass',

                foreignKey: 'itemId',

            },

        ],

    },

    {

        title: 'Modifier Classes',

        name: 'itemModifierClass',

        properties: {

            itemId: {

                type: 'integer',

            },

            modifierClassId: {

                type: 'integer',

            },

        },

        // Use `primaryKey` to change the primary key from the default "id".

        // This can be a single string or an array of strings for compound

        // keys.

        primaryKey: ['itemId', 'modifierClassId'],

        associations: [

            {

                // 'belongsTo' is similar to 'hasMany' except the `foreignKey` is an

                // attribute on this (itemModifierClass) model. The form honors this

                // relationship by allowing the user to select the 'parent' model using

                // a dropdown. Compare to a 'hasMany' relationship where the form

                // recursively displays all the child objects.

                // You generally do not want to establish both sides of a relationship;

                // that is, if A 'hasMany' B, do not specify that B 'belongsTo' A.

                associationType: 'belongsTo',

                otherModel: 'modifierClass',

                foreignKey: 'modifierClassId',

                // `displayAttr` is an attribute on the other (modifierClass) class.

                // The form uses this column to label the choices in the dropdown.

                // The default is `id`, which is probably not what you want.

                displayAttr: 'name',

            },

        ],

    },

    {

        title: 'Modifier Classes',

        name: 'modifierClass',

        properties: {

            name: {

                type: 'string',

            },

            menuId: {

                type: 'integer',

            },

        },

        associations: [

            {

                associationType: 'hasMany',

                otherModel: 'price',

                foreignKey: 'priceableId',

                polymorphic: ['priceableType', 'modifierClass'],

            },

            {

                associationType: 'hasMany',

                otherModel: 'modifier',

                foreignKey: 'modifierClassId',

            },

        ],

    },

    {

        title: 'Modifiers',

        name: 'modifier',

        properties: {

            name: {

                type: 'string',

            },

            modifierClassId: {

                type: 'integer',

            },

        },

        associations: [

            {

                associationType: 'hasMany',

                otherModel: 'price',

                foreignKey: 'priceableId',

                polymorphic: ['priceableType', 'modifier'],

            },

        ],

    },

    {

        title: 'Prices',

        name: 'price',

        properties: {

            variant: {

                type: 'string',

            },

            amount: {

                type: 'integer',

            },

            priceableType: {

                type: 'string',

                enum: [

                    'menu',

                    'item',

                    'modifierClass',

                    'modifier',

                ],

            },

            priceableId: {

                type: 'integer',

            },

        },

    },

];


// Next let's build a component for our app:




const allData = {

    'menu': [

        {

            id: 1,

            friendlyId: 'some-restaurant',

        },

    ],


    'category': [

        {

            id: 1,

            menuId: 1,

            name: 'salads',

        },

        {

            id: 2,

            menuId: 1,

            name: 'sandwiches',

        },

    ],


    'item': [

        {

            id: 1,

            categoryId: 1,

            name: 'caesar salad',

        },

        {

            id: 2,

            categoryId: 1,

            name: 'house salad',

        },

        {

            id: 3,

            categoryId: 2,

            name: 'gyro',

        },

    ],


    'modifierClass': [

        {

            id: 1,

            menuId: 1,

            name: 'salad dressings',

        },

        {

            id: 2,

            menuId: 1,

            name: 'sandwich meats',

        },

        {

            id: 3,

            menuId: 2,

            name: 'dipping sauce',

        },

    ],


    'modifier': [

        {

            id: 1,

            modifierClassId: 1,

            name: 'ranch',

        },

        {

            id: 2,

            modifierClassId: 1,

            name: 'blue cheese',

        },

        {

            id: 3,

            modifierClassId: 2,

            name: 'lamb',

        },

        {

            id: 4,

            modifierClassId: 2,

            name: 'chicken',

        },

    ],


    'price': [

        {

            id: 1,

            priceableId: 1,

            priceableType: 'modifierClass',

            variant: null,

            amount: 100,

        },

        {

            id: 2,

            priceableId: 2,

            priceableType: 'modifierClass',

            variant: null,

            amount: 200,

        },

        {

            id: 3,

            priceableId: 1,

            priceableType: 'item',

            variant: null,

            amount: 500,

        },

        {

            id: 4,

            priceableId: 2,

            priceableType: 'item',

            variant: null,

            amount: 500,

        },

        {

            id: 5,

            priceableId: 3,

            priceableType: 'item',

            variant: 'half',

            amount: 400,

        },

        {

            id: 6,

            priceableId: 3,

            priceableType: 'item',

            variant: 'whole',

            amount: 700,

        },

    ],


    'itemModifierClass': [

        {

            itemId: 1,

            modifierClassId: 1,

        },

        {

            itemId: 2,

            modifierClassId: 1,

        },

        {

            itemId: 3,

            modifierClassId: 2,

        },

    ],

};


// Finally, render our top-level component.

ReactDOM.render(<div>

    <MyCrudApp
        data={allData}
        schemata={schemata}
    />

</div>, document.getElementById('root'));