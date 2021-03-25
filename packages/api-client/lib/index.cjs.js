'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@vue-storefront/core');
var gql = _interopDefault(require('graphql-tag'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getProduct(context, params, customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var getProductByHandleQuery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!params.slug) return [3 /*break*/, 1];
                    getProductByHandleQuery = context.client.graphQLClient.query(function (root) {
                        root.add('productByHandle', { args: { handle: params.slug } }, function (productByHandle) {
                            // get product basic information
                            productByHandle.add('id');
                            productByHandle.add('title');
                            productByHandle.add('description');
                            productByHandle.add('descriptionHtml');
                            productByHandle.add('handle');
                            productByHandle.add('tags');
                            productByHandle.add('availableForSale');
                            productByHandle.add('totalInventory');
                            productByHandle.add('vendor');
                            productByHandle.add('options', {}, function (options) {
                                options.add('name');
                                options.add('values');
                            });
                            productByHandle.addConnection('images', { args: { first: 20 } }, function (image) {
                                image.add('id');
                                image.add('altText');
                                image.add('originalSrc');
                                image.add('transformedSrc');
                            });
                            productByHandle.addConnection('variants', { args: { first: 20 } }, function (variants) {
                                variants.add('title');
                                variants.add('price');
                                variants.add('weight');
                                variants.add('available');
                                variants.add('sku');
                                variants.add('compareAtPrice');
                                variants.addField('image', { args: {} }, function (image) {
                                    image.add('id');
                                    image.add('altText');
                                    image.add('originalSrc');
                                    image.add('transformedSrc');
                                });
                                variants.addField('selectedOptions', {}, function (selectedOptions) {
                                    selectedOptions.add('name');
                                    selectedOptions.add('value');
                                });
                                variants.addField('product', {}, function (product) {
                                    product.add('id');
                                    product.add('title');
                                    product.add('availableForSale');
                                    product.add('handle');
                                    product.add('description');
                                    product.add('descriptionHtml');
                                    product.addConnection('images', { args: { first: 20 } }, function (images) {
                                        images.add('id');
                                        images.add('altText');
                                        images.add('originalSrc');
                                        images.add('transformedSrc');
                                    });
                                    product.add('productType');
                                    product.addField('options', {}, function (options) {
                                        options.add('name');
                                        options.add('values');
                                    });
                                });
                            });
                        });
                    });
                    return [2 /*return*/, context.client.graphQLClient
                            .send(getProductByHandleQuery)
                            .then(function (_a) {
                            var model = _a.model, product = _a.product;
                            if (model) {
                                return model.productByHandle;
                            }
                        })];
                case 1:
                    if (!params.sort) return [3 /*break*/, 3];
                    return [4 /*yield*/, context.client.product
                            .fetchQuery({ first: 20, sortKey: 'TITLE', reverse: false })
                            .then(function (products) {
                            return products;
                        })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, context.client.product.fetchAll().then(function (products) {
                        return products;
                    })];
                case 4: 
                // Use the built-in function
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getCategory(context, params, customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Use the built-in function
            if (params.slug !== '') {
                return [2 /*return*/, context.client.collection.fetchByHandle(params.slug).then(function (collection) {
                        // Collection with all default fields
                        return collection;
                    })];
            }
            else {
                return [2 /*return*/, context.client.collection.fetchAll().then(function (collection) {
                        // Collection with all default fields
                        return collection;
                    })];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getBlogPosts(context, params, customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var articlesQuery;
        return __generator(this, function (_a) {
            articlesQuery = context.client.graphQLClient.query(function (root) {
                root.addConnection('articles', { args: { first: 20 } }, function (article) {
                    article.add('title');
                    article.add('handle');
                    article.add('url');
                    article.add('excerpt');
                    article.add('publishedAt');
                    article.addField('image', {}, function (image) {
                        image.add('id');
                        image.add('altText');
                        image.add('originalSrc');
                    });
                    article.addField('authorV2', {}, function (author) {
                        author.add('name');
                        author.add('email');
                    });
                });
            });
            // Call the send method with the custom query
            context.client.graphQLClient.send(articlesQuery).then(function (_a) {
                var model = _a.model, articles = _a.articles;
                if (model) {
                    return model.articles;
                }
            });
            return [2 /*return*/];
        });
    });
}

/* TODO: Fetch custom client directly, may be using context  */
var changePasswordMutation = function (context) {
    var customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');
    var customer = context.client.graphQLClient.variable('customer', 'CustomerUpdateInput!');
    return context.client.graphQLClient.mutation('customerUpdate', [customerAccessToken, customer], function (root) {
        root.add('customerUpdate', { args: { customerAccessToken: customerAccessToken, customer: customer } }, function (customer) {
            customer.add('customer', function (fields) {
                fields.add('id');
                fields.add('displayName');
                fields.add('email');
                fields.add('firstName');
                fields.add('lastName');
                fields.add('phone');
            });
            customer.add('customerAccessToken', function (token) {
                token.add('accessToken');
                token.add('expiresAt');
            });
            customer.add('customerUserErrors', function (error) {
                error.add('code');
                error.add('field');
                error.add('message');
            });
        });
    });
};
var editProfileMutation = function (context) {
    var customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');
    var customer = context.client.graphQLClient.variable('customer', 'CustomerUpdateInput!');
    return context.client.graphQLClient.mutation('customerUpdate', [customerAccessToken, customer], function (root) {
        root.add('customerUpdate', { args: { customerAccessToken: customerAccessToken, customer: customer } }, function (customer) {
            customer.add('customer', function (fields) {
                fields.add('id');
                fields.add('displayName');
                fields.add('email');
                fields.add('firstName');
                fields.add('lastName');
                fields.add('phone');
            });
            customer.add('customerAccessToken', function (token) {
                token.add('accessToken');
                token.add('expiresAt');
            });
            customer.add('customerUserErrors', function (error) {
                error.add('code');
                error.add('field');
                error.add('message');
            });
        });
    });
};
var signInMutation = function (context) {
    var input = context.client.graphQLClient.variable('input', 'CustomerAccessTokenCreateInput!');
    return context.client.graphQLClient.mutation('customerAccessTokenCreate', [input], function (root) {
        root.add('customerAccessTokenCreate', { args: { input: input } }, function (customer) {
            customer.add('customerAccessToken', function (token) {
                token.add('accessToken');
                token.add('expiresAt');
            });
            customer.add('customerUserErrors', function (error) {
                error.add('code');
                error.add('field');
                error.add('message');
            });
        });
    });
};
var signOutMutation = function (context) {
    var customerAccessToken = context.client.graphQLClient.variable('customerAccessToken', 'String!');
    return context.client.graphQLClient.mutation('customerAccessTokenDelete', [customerAccessToken], function (root) {
        root.add('customerAccessTokenDelete', { args: { customerAccessToken: customerAccessToken } }, function (customer) {
            customer.add('deletedAccessToken');
            customer.add('deletedCustomerAccessTokenId');
            customer.add('userErrors', function (error) {
                error.add('field');
                error.add('message');
            });
        });
    });
};
var signUpMutation = function (context) {
    var input = context.client.graphQLClient.variable('input', 'CustomerCreateInput!');
    return context.client.graphQLClient.mutation('customerCreate', [input], function (root) {
        root.add('customerCreate', { args: { input: input } }, function (customer) {
            customer.add('customer', function (token) {
                token.add('id');
            });
            customer.add('customerUserErrors', function (error) {
                error.add('code');
                error.add('field');
                error.add('message');
            });
        });
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function editProfile(context, params) {
    return __awaiter(this, void 0, void 0, function () {
        var token, profile, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = params.token, profile = params.profile;
                    data = {
                        customerAccessToken: token,
                        customer: profile
                    };
                    return [4 /*yield*/, context.client.graphQLClient.send(editProfileMutation(context), data).then(function (_a) {
                            var model = _a.model;
                            return model;
                        })];
                case 1: 
                // send user data to authenticate, return token if valid
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createCart(context, _params, _customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.client.checkout.create().then(function (checkout) {
                        // return checkOut ID
                        return checkout.id;
                    })];
                case 1: 
                // initiate the cart
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function addToCart(context, params, _customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var currentCart, product, quantity, checkoutID, lineItemsToAdd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentCart = params.currentCart, product = params.product, quantity = params.quantity;
                    checkoutID = currentCart.id;
                    lineItemsToAdd = [{
                            variantId: product.variantId,
                            quantity: quantity
                        }];
                    return [4 /*yield*/, context.client.checkout.addLineItems(checkoutID, lineItemsToAdd).then(function (checkout) { return checkout; })];
                case 1: 
                // Add an item to the checkout
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function signUp(context, params, customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        input: params
                    };
                    return [4 /*yield*/, context.client.graphQLClient.send(signUpMutation(context), data).then(function (_a) {
                            var model = _a.model;
                            return model;
                        })];
                case 1: 
                // send userdata to register
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function signIn(context, params, customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = params.username, password = params.password;
                    data = {
                        input: {
                            email: username,
                            password: password
                        }
                    };
                    return [4 /*yield*/, context.client.graphQLClient.send(signInMutation(context), data).then(function (_a) {
                            var model = _a.model;
                            return model;
                        })];
                case 1: 
                // send user data to authenticate, return token if valid
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function signOut(context, params) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        customerAccessToken: params
                    };
                    return [4 /*yield*/, context.client.graphQLClient.send(signOutMutation(context), data).then(function (_a) {
                            var model = _a.model;
                            return model;
                        })];
                case 1: 
                // Remove customer access token
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function changePassword(context, params) {
    return __awaiter(this, void 0, void 0, function () {
        var token, newPassword, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = params.token, newPassword = params.newPassword;
                    data = {
                        customerAccessToken: token,
                        customer: {
                            password: newPassword
                        }
                    };
                    return [4 /*yield*/, context.client.graphQLClient.send(changePasswordMutation(context), data).then(function (_a) {
                            var model = _a.model;
                            return model;
                        })];
                case 1: 
                // Remove customer access token
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

/* eslint-disable func-names */
var customerQuery = function (token, context) {
    return context.client.graphQLClient.query(function (root) {
        root.add('customer', {
            args: {
                customerAccessToken: token
            }
        }, function (customer) {
            customer.add('id');
            customer.add('displayName');
            customer.add('email');
            customer.add('firstName');
            customer.add('lastName');
            customer.add('phone');
            customer.add('lastIncompleteCheckout', function (lcheckout) {
                lcheckout.add('id');
            });
        });
    });
};
var ordersQuery = function (pages, token, context) {
    return context.client.graphQLClient.query(function (root) {
        root.add('customer', {
            args: {
                customerAccessToken: token
            }
        }, function (customer) {
            customer.add('id');
            customer.addConnection('orders', { args: { first: pages } }, function (order) {
                order.add('name');
                order.add('orderNumber');
                order.add('processedAt');
                order.add('financialStatus');
                order.add('fulfillmentStatus');
                order.add('currentTotalPrice', function (price) {
                    price.add('amount');
                    price.add('currencyCode');
                });
                order.add('currentTotalTax', function (tax) {
                    tax.add('amount');
                    tax.add('currencyCode');
                });
                order.add('currentSubtotalPrice', function (subtotal) {
                    subtotal.add('amount');
                    subtotal.add('currencyCode');
                });
                order.addConnection('lineItems', { args: { first: 100 } }, function (item) {
                    item.add('title');
                    item.add('quantity');
                    item.add('currentQuantity');
                    item.add('originalTotalPrice', function (price) {
                        price.add('amount');
                        price.add('currencyCode');
                    });
                    item.add('variant', function (price) {
                        price.add('sku');
                        price.add('title');
                        price.add('product', function (handle) {
                            handle.add('handle');
                        });
                    });
                });
            });
        });
    });
};
var addressesQuery = function (pages, token, context) {
    return context.client.graphQLClient.query(function (root) {
        root.add('customer', {
            args: {
                customerAccessToken: token
            }
        }, function (customer) {
            customer.add('id');
            customer.addConnection('addresses', { args: { first: 10 } }, function (address) {
                address.add('address1');
                address.add('address2');
                address.add('city');
                address.add('company');
                address.add('firstName');
                address.add('lastName');
                address.add('name');
                address.add('phone');
                address.add('province');
                address.add('provinceCode');
                address.add('zip');
                address.add('formattedArea');
            });
        });
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function fetchCustomer(context, params, customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.client.graphQLClient.send(customerQuery(params, context)).then(function (_a) {
                        var model = _a.model;
                        return model;
                    })];
                case 1: 
                // send user data to authenticate, return token if valid
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function fetchOrders(context, params, customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.client.graphQLClient.send(ordersQuery(10, params, context)).then(function (_a) {
                        var model = _a.model;
                        return model;
                    })];
                case 1:
                    orders = _a.sent();
                    return [2 /*return*/, orders];
            }
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function fetchAddresses(context, params, customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var addresses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.client.graphQLClient.send(addressesQuery(10, params, context)).then(function (_a) {
                        var model = _a.model;
                        if (model) {
                            return model.customer;
                        }
                    })];
                case 1:
                    addresses = _a.sent();
                    return [2 /*return*/, addresses];
            }
        });
    });
}

var ProductPriceFragment = "\n  fragment DefaultProductPrice on ProductPrice {\n    discounted {\n      value {\n        type\n        currencyCode\n        centAmount\n        fractionDigits\n      }\n      discount {\n        validFrom\n        validUntil\n        isActive\n        name(acceptLanguage: $acceptLanguage)\n      }\n    }\n    value {\n      type\n      currencyCode\n      centAmount\n      fractionDigits\n    }\n  }\n";
var AddressFragment = "\n  fragment DefaultAddress on Address {\n    id\n    title\n    firstName\n    lastName\n    streetName\n    streetNumber\n    postalCode\n    city\n    country\n    state\n    region\n    company\n    apartment\n    phone\n    mobile\n  }\n";
// TODO: Remove all address information and update PRO packages to use customQueries when this is implemented: https://github.com/DivanteLtd/vue-storefront/issues/5049
var CustomerFragment = "\n  " + AddressFragment + "\n  fragment DefaultCustomer on Customer {\n    version\n    firstName\n    lastName\n    email\n    addresses {\n      id\n    }\n    shippingAddresses {\n      ...DefaultAddress\n    }\n    billingAddresses {\n      ...DefaultAddress\n    }\n    defaultBillingAddressId\n    defaultShippingAddressId\n  }\n";
var LineItemFragment = "\n  " + ProductPriceFragment + "\n  fragment DefaultLineItem on LineItem {\n    id\n    productId\n    name(acceptLanguage: $acceptLanguage)\n    productSlug(acceptLanguage: $acceptLanguage)\n    quantity\n    discountedPricePerQuantity {\n      quantity\n      discountedPrice {\n        value {\n          centAmount\n        }\n        includedDiscounts {\n          discount {\n            name(acceptLanguage: $acceptLanguage)\n            isActive\n          }\n        }\n      }\n    }\n    variant {\n      id\n      sku\n      price(currency: \"USD\") {\n        tiers {\n          value {\n            centAmount\n          }\n        }\n        value {\n          centAmount\n        }\n        discounted {\n          value {\n            centAmount\n          }\n          discount {\n            isActive\n            name(acceptLanguage: $acceptLanguage)\n          }\n        }\n      }\n      images {\n        url\n        label\n      }\n      attributesRaw {\n        name\n        value\n        attributeDefinition {\n          type {\n            name\n          }\n          label(locale: $locale)\n        }\n      }\n    }\n    price {\n      ...DefaultProductPrice\n    }\n  }\n";
var ShippingMethodFragment = "\n  fragment DefaultShippingMethod on ShippingMethod {\n    id\n    version\n    name\n    description\n    isDefault\n    localizedDescription(acceptLanguage: $acceptLanguage)\n    zoneRates {\n      zone {\n        id\n        name\n      }\n      shippingRates {\n        freeAbove {\n          type\n          centAmount\n        }\n        isMatching\n        price {\n          centAmount\n        }\n      }\n    }\n  }\n";
var CartFragment = "\n  " + AddressFragment + "\n  " + CustomerFragment + "\n  " + LineItemFragment + "\n  " + ShippingMethodFragment + "\n  fragment DefaultCart on Cart {\n    id\n    customerId\n    customerEmail\n    lineItems {\n      ...DefaultLineItem\n    }\n    totalPrice {\n      centAmount\n    }\n    shippingAddress {\n      ...DefaultAddress\n    }\n    billingAddress {\n      ...DefaultAddress\n    }\n    customer {\n      ...DefaultCustomer\n    }\n    totalPrice {\n      centAmount\n    }\n    taxedPrice {\n      totalNet {\n        centAmount\n      }\n      totalGross {\n        centAmount\n      }\n    }\n    paymentInfo {\n      payments {\n        id\n      }\n    }\n    shippingInfo {\n      price {\n        centAmount\n      }\n      shippingMethod {\n        ...DefaultShippingMethod\n      }\n    }\n    discountCodes {\n      discountCode {\n        id\n        code\n        isActive\n        validFrom\n        validUntil\n        name(acceptLanguage: $acceptLanguage)\n      }\n    }\n    refusedGifts {\n      isActive\n      validFrom\n      validUntil\n      name(acceptLanguage: $acceptLanguage)\n    }\n    custom {\n      customFieldsRaw {\n        name\n        value\n      }\n    }\n    cartState\n    version\n  }\n";
var OrderFragment = "\n  " + AddressFragment + "\n  " + LineItemFragment + "\n  fragment DefaultOrder on Order {\n    lineItems {\n      ...DefaultLineItem\n    }\n    totalPrice {\n      centAmount\n    }\n    orderState\n    id\n    orderNumber\n    version\n    createdAt\n    customerEmail\n    shipmentState\n    paymentState\n    shippingAddress {\n      ...DefaultAddress\n    }\n    billingAddress {\n      ...DefaultAddress\n    }\n    cart {\n      id\n      version\n    }\n  }\n";

var basicProfile = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n\n  query getMe($locale: Locale!) {\n    me {\n      activeCart {\n        ...DefaultCart\n      }\n    }\n  }\n"], ["\n  ", "\n\n  query getMe($locale: Locale!) {\n    me {\n      activeCart {\n        ...DefaultCart\n      }\n    }\n  }\n"])), CartFragment);
var fullProfile = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n  ", "\n\n  query getMe($locale: Locale!) {\n    me {\n      activeCart {\n        ...DefaultCart\n      }\n      customer {\n        ...DefaultCustomer\n      }\n    }\n  }\n"], ["\n  ", "\n  ", "\n\n  query getMe($locale: Locale!) {\n    me {\n      activeCart {\n        ...DefaultCart\n      }\n      customer {\n        ...DefaultCustomer\n      }\n    }\n  }\n"])), CartFragment, CustomerFragment);
var templateObject_1, templateObject_2;

var getCustomQuery = function (customQueryFn, params) {
    var defaultQuery = params.defaultQuery, defaultVariables = params.defaultVariables;
    if (customQueryFn) {
        var _a = customQueryFn(defaultQuery, defaultVariables), query = _a.query, variables = _a.variables;
        return {
            query: query || defaultQuery,
            variables: variables || defaultVariables
        };
    }
    return { query: defaultQuery, variables: defaultVariables };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var getMe = function (_a, params, customQueryFn) {
    var config = _a.config, client = _a.client;
    if (params === void 0) { params = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var locale, acceptLanguage, customer, defaultQuery, defaultVariables, _b, query, variables;
        return __generator(this, function (_c) {
            locale = config.locale, acceptLanguage = config.acceptLanguage;
            customer = params.customer;
            defaultQuery = customer ? fullProfile : basicProfile;
            defaultVariables = {
                locale: locale,
                acceptLanguage: acceptLanguage
            };
            _b = getCustomQuery(customQueryFn, { defaultQuery: defaultQuery, defaultVariables: defaultVariables }), query = _b.query, variables = _b.variables;
            return [2 /*return*/, {}];
        });
    });
};

var isAnonymousSession = function (token) { var _a; return (_a = token === null || token === void 0 ? void 0 : token.scope) === null || _a === void 0 ? void 0 : _a.includes('anonymous_id'); };
var isUserSession = function (token) { var _a; return (_a = token === null || token === void 0 ? void 0 : token.scope) === null || _a === void 0 ? void 0 : _a.includes('customer_id'); };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var isGuest = function (context) {
    var client = context.client, config = context.config;
    if (config.handleIsGuest) {
        return config.handleIsGuest(context);
    }
    if (client.tokenProvider || context.isProxy) {
        var token = config.auth.onTokenRead();
        return !isAnonymousSession(token) && !isUserSession(token);
    }
    return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function checkOut(context, checkoutId, customQuery) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, context.client.checkout.fetch(checkoutId)];
        });
    });
}

(function (AttributeType) {
    AttributeType["STRING"] = "StringAttribute";
    AttributeType["DATE"] = "DateAttribute";
    AttributeType["DATETIME"] = "DateTimeAttribute";
    AttributeType["TIME"] = "TimeAttribute";
    AttributeType["NUMBER"] = "NumberAttribute";
    AttributeType["ENUM"] = "EnumAttribute";
    AttributeType["LOCALIZED_ENUM"] = "LocalizedEnumAttribute";
    AttributeType["LOCALIZED_STRING"] = "LocalizedStringAttribute";
    AttributeType["MONEY"] = "MoneyAttribute";
    AttributeType["BOOLEAN"] = "BooleanAttribute";
})(exports.AttributeType || (exports.AttributeType = {}));

var CustomClient = require('shopify-buy/index.unoptimized.umd.min.js');
var defaultSettings = {};
var cookies = {
    cartCookieName: 'vsf-cart'
};
var onSetup = function (settings) {
    return ({
        config: __assign(__assign({}, defaultSettings), settings),
        client: CustomClient.buildClient(settings.api),
        cookies: (settings.api).cookies || cookies
    });
};
var createApiClient = core.apiClientFactory({
    tag: 'shopify',
    onSetup: onSetup,
    api: {
        getProduct: getProduct,
        getCategory: getCategory,
        getBlogPosts: getBlogPosts,
        editProfile: editProfile,
        addToCart: addToCart,
        isGuest: isGuest,
        getMe: getMe,
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        changePassword: changePassword,
        fetchCustomer: fetchCustomer,
        fetchOrders: fetchOrders,
        fetchAddresses: fetchAddresses,
        createCart: createCart,
        checkOut: checkOut,
        cookies: cookies
    }
}).createApiClient;

exports.AddressFragment = AddressFragment;
exports.CartFragment = CartFragment;
exports.CustomerFragment = CustomerFragment;
exports.LineItemFragment = LineItemFragment;
exports.OrderFragment = OrderFragment;
exports.ProductPriceFragment = ProductPriceFragment;
exports.ShippingMethodFragment = ShippingMethodFragment;
exports.createApiClient = createApiClient;
exports.getCustomQuery = getCustomQuery;
//# sourceMappingURL=index.cjs.js.map
