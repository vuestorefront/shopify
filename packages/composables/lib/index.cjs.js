'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@vue-storefront/core');
var compositionApi = require('@vue/composition-api');
var shopifyApi = require('@vue-storefront/shopify-api');

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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

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

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/* istanbul ignore file */
var getBasketItemByProduct = function (_a) {
    var currentCart = _a.currentCart, product = _a.product;
    return currentCart.lineItems.find(function (item) { return item.variant.id === product.variants[0].id; });
};
var params = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    load: function (context, _a) {
        var customQuery = _a.customQuery;
        return __awaiter(void 0, void 0, void 0, function () {
            var existngCartId, checkoutId, plainResp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Mocked: loadCart');
                        existngCartId = context.$shopify.config.app.$cookies.get('cart_id');
                        if (!(existngCartId === undefined || existngCartId === '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, context.$shopify.api.createCart().then(function (checkout) {
                                return checkout;
                            })];
                    case 1:
                        existngCartId = _b.sent();
                        _b.label = 2;
                    case 2:
                        checkoutId = existngCartId;
                        return [4 /*yield*/, context.$shopify.api.checkOut(checkoutId).then(function (checkout) {
                                // Do something with the checkout
                                return checkout;
                            })];
                    case 3:
                        plainResp = _b.sent();
                        return [2 /*return*/, JSON.parse(JSON.stringify(plainResp))];
                }
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addItem: function (context, _a) {
        var currentCart = _a.currentCart, product = _a.product, quantity = _a.quantity, customQuery = _a.customQuery;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Mocked: addItem');
                        return [4 /*yield*/, context.$shopify.api.addToCart({ currentCart: currentCart, product: product, quantity: quantity, customQuery: customQuery }).then(function (checkout) {
                                // store cart id
                                context.$shopify.config.app.$cookies.set('cart_id', currentCart.id);
                                return JSON.parse(JSON.stringify(checkout));
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem: function (context, _a) {
        var currentCart = _a.currentCart, product = _a.product, customQuery = _a.customQuery;
        return __awaiter(void 0, void 0, void 0, function () {
            var checkoutID;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Mocked: removeFromCart');
                        checkoutID = currentCart.id;
                        return [4 /*yield*/, context.$shopify.client.checkout.removeLineItems(checkoutID, [product.id]).then(function (checkout) {
                                // return updated cart data
                                return JSON.parse(JSON.stringify(checkout));
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateItemQty: function (context, _a) {
        var currentCart = _a.currentCart, product = _a.product, quantity = _a.quantity, customQuery = _a.customQuery;
        return __awaiter(void 0, void 0, void 0, function () {
            var checkoutID;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Mocked: updateQuantity');
                        checkoutID = currentCart.id;
                        return [4 /*yield*/, context.$shopify.client.checkout.updateLineItems(checkoutID, { id: product.id, quantity: quantity }).then(function (checkout) {
                                // return updated cart data
                                return JSON.parse(JSON.stringify(checkout));
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clear: function (context, _a) {
        var currentCart = _a.currentCart;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                console.log('Mocked: clearCart');
                return [2 /*return*/, {}];
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applyCoupon: function (context, _a) {
        var currentCart = _a.currentCart, couponCode = _a.couponCode, customQuery = _a.customQuery;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                console.log('Mocked: applyCoupon');
                return [2 /*return*/, { updatedCart: {}, updatedCoupon: {} }];
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeCoupon: function (context, _a) {
        var currentCart = _a.currentCart, coupon = _a.coupon, customQuery = _a.customQuery;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                console.log('Mocked: removeCoupon');
                return [2 /*return*/, { updatedCart: {} }];
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isOnCart: function (context, _a) {
        var currentCart = _a.currentCart, product = _a.product;
        console.log('Mocked: isOnCart');
        return Boolean(currentCart && getBasketItemByProduct({ currentCart: currentCart, product: product }));
    }
};
var index = core.useCartFactory(params);

var params$1 = {
    categorySearch: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var customQuery, searchParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    customQuery = params.customQuery, searchParams = __rest(params, ["customQuery"]);
                    return [4 /*yield*/, context.$shopify.api.getCategory(searchParams, customQuery)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }
};
var index$1 = core.useCategoryFactory(params$1);

/* istanbul ignore file */
var PAYMENT_METHODS_MOCK = [
    {
        label: 'Visa Debit',
        value: 'debit'
    },
    {
        label: 'MasterCard',
        value: 'mastercard'
    },
    {
        label: 'Visa Electron',
        value: 'electron'
    },
    {
        label: 'Cash on delivery',
        value: 'cash'
    },
    {
        label: 'Check',
        value: 'check'
    }
];
var paymentMethods = compositionApi.ref(PAYMENT_METHODS_MOCK);
var shippingMethods = compositionApi.ref([]);
var personalDetails = compositionApi.ref({});
var shippingDetails = compositionApi.ref({});
var billingDetails = compositionApi.ref({});
var chosenPaymentMethod = compositionApi.ref('');
var chosenShippingMethod = compositionApi.ref({});
var placeOrder = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
// @todo CHECKOUT
var useCheckout = function () {
    return {
        paymentMethods: paymentMethods,
        shippingMethods: shippingMethods,
        personalDetails: personalDetails,
        shippingDetails: shippingDetails,
        billingDetails: billingDetails,
        chosenPaymentMethod: chosenPaymentMethod,
        chosenShippingMethod: chosenShippingMethod,
        placeOrder: placeOrder,
        loading: compositionApi.computed(function () { return false; })
    };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useContent() { }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var enhanceProduct = function (productResponse) {
    var enhancedProductResponse = productResponse.map(function (product) { return (__assign(__assign({}, product), { name: product.title, images: product === null || product === void 0 ? void 0 : product.images, price: {
            original: product.variants[0].compareAtPrice,
            current: product.variants[0].price
        }, available: product.variants[0].available, productType: product.productType, options: product.options, _id: product.id, variantId: product.variants[0].id, _description: product.description, _descriptionHtml: product.descriptionHtml, _categoriesRef: [], _slug: product.handle, _coverImage: product === null || product === void 0 ? void 0 : product.images[0], _mainPrice: product.variants[0].price })); });
    return enhancedProductResponse;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var enhanceProductVariation = function (productResponse) {
    var enhancedProductResponse = productResponse.map(function (variant) { return ({
        name: variant.product.title,
        images: variant.product.images,
        price: {
            original: variant.compareAtPrice,
            current: variant.price
        },
        available: variant.available,
        productType: variant.product.productType,
        options: variant.product.options,
        variantId: variant.id,
        _description: variant.product.description,
        _descriptionHtml: variant.product.descriptionHtml,
        _categoriesRef: [],
        _slug: variant.product.handle,
        _coverImage: variant.image,
        _mainPrice: variant.price
    }); });
    return enhancedProductResponse;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var getSortedProducts = function (productResponse, sortBy) {
    var sortKey = '_id';
    if (sortBy === 'title(asc)' || sortBy === 'title(dsc)') {
        sortKey = 'name';
    }
    else if ((sortBy === 'price-up') || (sortBy === 'price-down')) {
        sortKey = '_mainPrice';
    }
    return productResponse.sort(function (a, b) {
        var x = a[sortKey];
        var y = b[sortKey];
        if ((sortBy === 'price-down') || (sortBy === 'title(dsc)')) {
            return (((x < y) ? -1 : ((x > y) ? 1 : 0))) * -1;
        }
        return (((x < y) ? -1 : ((x > y) ? 1 : 0)));
    });
};

// TODO: move to the config file
var ITEMS_PER_PAGE = [20, 40, 100];
var factoryParams = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    search: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var itemsPerPage, categorySlug, categories, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemsPerPage = params.input.itemsPerPage;
                    categorySlug = params.input.categorySlug;
                    return [4 /*yield*/, context.$shopify.api.getCategory({ slug: categorySlug })];
                case 1:
                    categories = _a.sent();
                    products = enhanceProduct(categories.products);
                    return [2 /*return*/, {
                            products: products,
                            categories: categories,
                            total: categories.products.length,
                            perPageOptions: ITEMS_PER_PAGE,
                            itemsPerPage: itemsPerPage
                        }];
            }
        });
    }); }
};
var index$2 = core.useFacetFactory(factoryParams);

var params$2 = {
    productsSearch: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var customQuery, searchParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    customQuery = params.customQuery, searchParams = __rest(params, ["customQuery"]);
                    return [4 /*yield*/, context.$shopify.api.getProduct(searchParams, customQuery)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }
};
var index$3 = core.useProductFactory(params$2);

var params$3 = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchReviews: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Mocked: searchReviews');
            return [2 /*return*/, {}];
        });
    }); },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addReview: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Mocked: addReview');
            return [2 /*return*/, {}];
        });
    }); }
};
var index$4 = core.useReviewFactory(params$3);

/* istanbul ignore file */
var params$4 = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    load: function (context) { return __awaiter(void 0, void 0, void 0, function () {
        var token, result, customer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Mocked: loadUser');
                    token = context.$shopify.config.app.$cookies.get('token');
                    return [4 /*yield*/, context.$shopify.api.fetchCustomer(token)];
                case 1:
                    result = _a.sent();
                    customer = null;
                    if (result) {
                        customer = result.customer;
                        return [2 /*return*/, customer];
                    }
                    return [2 /*return*/, customer];
            }
        });
    }); },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logOut: function (context) { return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Mocked: logOut');
                    token = context.$shopify.config.app.$cookies.get('token');
                    context.$shopify.config.app.$cookies.remove('token');
                    return [4 /*yield*/, context.$shopify.api.signOut(token)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUser: function (context, _a) {
        var currentUser = _a.currentUser, updatedUserData = _a.updatedUserData;
        return __awaiter(void 0, void 0, void 0, function () {
            var token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Mocked: updateUser');
                        token = context.$shopify.config.app.$cookies.get('token');
                        return [4 /*yield*/, context.$shopify.api.editProfile({
                                token: token,
                                profile: { email: updatedUserData.email,
                                    firstName: updatedUserData.firstName,
                                    lastName: updatedUserData.lastName
                                }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, {}];
                }
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    register: function (context, _a) {
        var email = _a.email, password = _a.password, firstName = _a.firstName, lastName = _a.lastName;
        return __awaiter(void 0, void 0, void 0, function () {
            var result, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Mocked: register');
                        return [4 /*yield*/, context.$shopify.api.signUp({
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                password: password
                            })];
                    case 1:
                        result = _b.sent();
                        response = {
                            error: (result.customerCreate.customerUserErrors.length) ? result.customerCreate.customerUserErrors[0].message : ''
                        };
                        return [2 /*return*/, response];
                }
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logIn: function (context, _a) {
        var username = _a.username, password = _a.password;
        return __awaiter(void 0, void 0, void 0, function () {
            var result, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Mocked: logIn');
                        return [4 /*yield*/, context.$shopify.api.signIn({ username: username, password: password })];
                    case 1:
                        result = _b.sent();
                        response = {
                            token: (result.customerAccessTokenCreate.customerAccessToken) ? result.customerAccessTokenCreate.customerAccessToken.accessToken : null,
                            error: (result.customerAccessTokenCreate.customerUserErrors.length) ? result.customerAccessTokenCreate.customerUserErrors[0].message : ''
                        };
                        // store token in cookie
                        context.$shopify.config.app.$cookies.set('token', response.token);
                        return [2 /*return*/, response];
                }
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changePassword: function (context, _a) {
        var currentUser = _a.currentUser, currentPassword = _a.currentPassword, newPassword = _a.newPassword;
        return __awaiter(void 0, void 0, void 0, function () {
            var token, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Mocked: changePassword');
                        token = context.$shopify.config.app.$cookies.get('token');
                        return [4 /*yield*/, context.$shopify.api.changePassword(token, newPassword)];
                    case 1:
                        result = _b.sent();
                        token = result.customerUpdate.customerAccessToken.accessToken;
                        // store updated user token
                        context.$shopify.config.app.$cookies.set('token', token);
                        return [2 /*return*/, {}];
                }
            });
        });
    }
};
var index$5 = core.useUserFactory(params$4);

var addresses = [
    {
        id: 1,
        email: 'john@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        streetName: 'Warsawska',
        apartment: '24/193A',
        city: 'Phoenix',
        state: null,
        zipCode: '26-620',
        country: 'US',
        phoneNumber: '560123456',
        isDefault: true
    },
    {
        id: 2,
        email: 'havaka@gmail.com',
        firstName: 'Jonatan',
        lastName: 'Doe',
        streetName: 'Starachowicka',
        apartment: '20/193A',
        city: 'Atlanta',
        state: null,
        zipCode: '53-603',
        country: 'US',
        phoneNumber: '560123456',
        isDefault: false
    }
];
var billing = {
    addresses: addresses
};
var findBiggestId = function () { return addresses.reduce(function (highest, _a) {
    var id = _a.id;
    return Math.max(highest, id);
}, 0); };
var disableOldDefault = function () {
    var oldDefault = addresses.find(function (address) { return address.isDefault; });
    if (oldDefault) {
        oldDefault.isDefault = false;
    }
};
var sortDefaultAtTop = function (a, b) {
    if (a.isDefault) {
        return -1;
    }
    else if (b.isDefault) {
        return 1;
    }
    return 0;
};
var params$5 = {
    addAddress: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var newAddress;
        return __generator(this, function (_a) {
            console.log('Mocked: addAddress', params.address);
            newAddress = __assign(__assign({}, params.address), { id: findBiggestId() + 1 });
            if (params.address.isDefault) {
                disableOldDefault();
                addresses.unshift(newAddress);
            }
            else {
                addresses.push(newAddress);
            }
            return [2 /*return*/, Promise.resolve(billing)];
        });
    }); },
    deleteAddress: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var indexToRemove;
        return __generator(this, function (_a) {
            console.log('Mocked: deleteAddress', params);
            indexToRemove = addresses.findIndex(function (address) { return address.id === params.address.id; });
            if (indexToRemove < 0) {
                return [2 /*return*/, Promise.reject('This address does not exist')];
            }
            addresses.splice(indexToRemove, 1);
            return [2 /*return*/, Promise.resolve(billing)];
        });
    }); },
    updateAddress: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var indexToUpdate, isNewDefault;
        return __generator(this, function (_a) {
            console.log('Mocked: updateAddress', params);
            indexToUpdate = addresses.findIndex(function (address) { return address.id === params.address.id; });
            if (indexToUpdate < 0) {
                return [2 /*return*/, Promise.reject('This address does not exist')];
            }
            isNewDefault = params.address.isDefault && addresses[0].id !== params.address.id;
            if (isNewDefault) {
                disableOldDefault();
            }
            addresses[indexToUpdate] = params.address;
            if (isNewDefault) {
                addresses.sort(sortDefaultAtTop);
            }
            return [2 /*return*/, Promise.resolve(billing)];
        });
    }); },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    load: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var token, result, addresses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Mocked: addressesload');
                    token = context.$shopify.config.app.$cookies.get('token');
                    return [4 /*yield*/, context.$shopify.api.fetchAddresses(token)];
                case 1:
                    result = _a.sent();
                    addresses = {};
                    if (result) {
                        addresses = result;
                        return [2 /*return*/, addresses];
                    }
                    return [2 /*return*/, addresses];
            }
        });
    }); },
    setDefaultAddress: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var isDefault, indexToUpdate;
        return __generator(this, function (_a) {
            console.log('Mocked: setDefault');
            isDefault = function (id) { return addresses[0].id === id; };
            if (!isDefault(params.address.id)) {
                indexToUpdate = addresses.findIndex(function (address) { return address.id === params.address.id; });
                if (indexToUpdate < 0) {
                    return [2 /*return*/, Promise.reject('This address does not exist')];
                }
                disableOldDefault();
                addresses[indexToUpdate].isDefault = true;
                addresses.sort(sortDefaultAtTop);
            }
            return [2 /*return*/, Promise.resolve(billing)];
        });
    }); }
};
var index$6 = core.useUserBillingFactory(params$5);

/* istanbul ignore file */
var params$6 = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchOrders: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var token, result, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Mocked: searchOrders');
                    token = context.$shopify.config.app.$cookies.get('token');
                    return [4 /*yield*/, context.$shopify.api.fetchOrders(token)];
                case 1:
                    result = _a.sent();
                    orders = { data: [], total: 0 };
                    if (result) {
                        orders.data = result.customer.orders;
                        orders.total = result.customer.orders.length;
                        return [2 /*return*/, orders];
                    }
                    return [2 /*return*/, orders];
            }
        });
    }); }
};
var index$7 = core.useUserOrdersFactory(params$6);

var addresses$1 = [
    {
        id: 1,
        email: 'john@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        streetName: 'Warsawska',
        apartment: '24/193A',
        city: 'Phoenix',
        state: null,
        zipCode: '26-620',
        country: 'US',
        phoneNumber: '560123456',
        isDefault: true
    },
    {
        id: 2,
        email: 'havaka@gmail.com',
        firstName: 'Jonatan',
        lastName: 'Doe',
        streetName: 'Starachowicka',
        apartment: '20/193A',
        city: 'Atlanta',
        state: null,
        zipCode: '53-603',
        country: 'US',
        phoneNumber: '560123456',
        isDefault: false
    }
];
var shipping = {
    addresses: addresses$1
};
var findBiggestId$1 = function () { return addresses$1.reduce(function (highest, _a) {
    var id = _a.id;
    return Math.max(highest, id);
}, 0); };
var disableOldDefault$1 = function () {
    var oldDefault = addresses$1.find(function (address) { return address.isDefault; });
    if (oldDefault) {
        oldDefault.isDefault = false;
    }
};
var sortDefaultAtTop$1 = function (a, b) {
    if (a.isDefault) {
        return -1;
    }
    else if (b.isDefault) {
        return 1;
    }
    return 0;
};
var params$7 = {
    addAddress: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var newAddress;
        return __generator(this, function (_a) {
            console.log('Mocked: addAddress', params.address);
            newAddress = __assign(__assign({}, params.address), { id: findBiggestId$1() + 1 });
            if (params.address.isDefault) {
                disableOldDefault$1();
                addresses$1.unshift(newAddress);
            }
            else {
                addresses$1.push(newAddress);
            }
            return [2 /*return*/, Promise.resolve(shipping)];
        });
    }); },
    deleteAddress: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var indexToRemove;
        return __generator(this, function (_a) {
            console.log('Mocked: deleteAddress', params);
            indexToRemove = addresses$1.findIndex(function (address) { return address.id === params.address.id; });
            if (indexToRemove < 0) {
                return [2 /*return*/, Promise.reject('This address does not exist')];
            }
            addresses$1.splice(indexToRemove, 1);
            return [2 /*return*/, Promise.resolve(shipping)];
        });
    }); },
    updateAddress: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var indexToUpdate, isNewDefault;
        return __generator(this, function (_a) {
            console.log('Mocked: updateAddress', params);
            indexToUpdate = addresses$1.findIndex(function (address) { return address.id === params.address.id; });
            if (indexToUpdate < 0) {
                return [2 /*return*/, Promise.reject('This address does not exist')];
            }
            isNewDefault = params.address.isDefault && addresses$1[0].id !== params.address.id;
            if (isNewDefault) {
                disableOldDefault$1();
            }
            addresses$1[indexToUpdate] = params.address;
            if (isNewDefault) {
                addresses$1.sort(sortDefaultAtTop$1);
            }
            return [2 /*return*/, Promise.resolve(shipping)];
        });
    }); },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    load: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Mocked: load');
            return [2 /*return*/, Promise.resolve(shipping)];
        });
    }); },
    setDefaultAddress: function (context, params) { return __awaiter(void 0, void 0, void 0, function () {
        var isDefault, indexToUpdate;
        return __generator(this, function (_a) {
            console.log('Mocked: setDefault');
            isDefault = function (id) { return addresses$1[0].id === id; };
            if (!isDefault(params.address.id)) {
                indexToUpdate = addresses$1.findIndex(function (address) { return address.id === params.address.id; });
                if (indexToUpdate < 0) {
                    return [2 /*return*/, Promise.reject('This address does not exist')];
                }
                disableOldDefault$1();
                addresses$1[indexToUpdate].isDefault = true;
                addresses$1.sort(sortDefaultAtTop$1);
            }
            return [2 /*return*/, Promise.resolve(shipping)];
        });
    }); }
};
var index$8 = core.useUserShippingFactory(params$7);

var wishlist = compositionApi.ref(null);
var params$8 = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    load: function (context) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Mocked: loadWishlist');
            return [2 /*return*/, {}];
        });
    }); },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addItem: function (context, _a) {
        var currentWishlist = _a.currentWishlist, product = _a.product;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                console.log('Mocked: addToWishlist');
                return [2 /*return*/, {}];
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem: function (context, _a) {
        var currentWishlist = _a.currentWishlist, product = _a.product;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                console.log('Mocked: removeFromWishlist');
                return [2 /*return*/, {}];
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clear: function (context, _a) {
        var currentWishlist = _a.currentWishlist;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                console.log('Mocked: clearWishlist');
                return [2 /*return*/, {}];
            });
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isOnWishlist: function (context, _a) {
        var currentWishlist = _a.currentWishlist;
        console.log('Mocked: isOnWishlist');
        return false;
    }
};
var index$9 = core.useWishlistFactory(params$8);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var formatAttributeList = function (attributes) {
    return attributes.map(function (attr) {
        return {
            name: attr.name,
            value: attr.values,
            label: attr.name
        };
    });
};
var formatSelectedAttributeList = function (attributes) {
    return attributes.map(function (attr) {
        return {
            name: attr.name,
            value: attr.value,
            label: attr.name
        };
    });
};
var capitalize = function (s) {
    if (typeof s !== 'string')
        return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};
var getVariantByAttributes = function (products, attributes) {
    if (!products || products.length === 0) {
        return null;
    }
    var configurationKeys = Object.keys(attributes);
    return products.variants.find(function (variant) {
        var currentAttributes = formatSelectedAttributeList(variant.selectedOptions);
        return configurationKeys.every(function (attrName) {
            return currentAttributes.find(function (_a) {
                var name = _a.name, value = _a.value;
                return capitalize(attrName) === name && attributes[attrName] === value;
            });
        });
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartItems = function (cart) {
    return cart.lineItems;
    /*
    return [{
      id: '1',
      description: 'Some description',
      categoriesRef: [
        '1',
        '2'
      ],
      name: 'Black jacket',
      sku: 'black-jacket',
      images: [
        'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
      ],
      price: {
        original: 12.34,
        current: 10.00
      },
      qty: 1
    }];
  */
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartItemName = function (product) { return (product === null || product === void 0 ? void 0 : product.title) || 'Product\'s name'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartItemImage = function (product) { return (product === null || product === void 0 ? void 0 : product.variant.image.src) || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartItemPrice = function (product) {
    return {
        regular: (product === null || product === void 0 ? void 0 : product.variant.compareAtPrice) || 12,
        special: (product === null || product === void 0 ? void 0 : product.variant.price) || 10
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartItemQty = function (product) { return product === null || product === void 0 ? void 0 : product.quantity; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartItemAttributes = function (product, filterByAttributeName) {
    var formatAttedattributeList = formatSelectedAttributeList(product === null || product === void 0 ? void 0 : product.variant.selectedOptions);
    if (formatAttedattributeList.length) {
        var attribArr_1 = [];
        formatAttedattributeList.forEach(function (attr) {
            attribArr_1[attr.name] = attr.value;
        });
        return __assign({}, attribArr_1);
    }
    return {};
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartItemSku = function (product) { return (product === null || product === void 0 ? void 0 : product.variant.sku) || 'some-sku'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartTotals = function (cart) {
    return {
        total: parseFloat(cart.totalPrice),
        subtotal: parseFloat(cart.subtotalPrice)
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartShippingPrice = function (cart) { return 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCartTotalItems = function (cart) {
    if (cart) {
        return cart.lineItems.length;
    }
    return 0;
};
var getFormattedPrice = function (price) { return String(price); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCoupons = function (cart) { return []; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getDiscounts = function (cart) { return []; };
var cartGetters = {
    getTotals: getCartTotals,
    getShippingPrice: getCartShippingPrice,
    getItems: getCartItems,
    getItemName: getCartItemName,
    getItemImage: getCartItemImage,
    getItemPrice: getCartItemPrice,
    getItemQty: getCartItemQty,
    getItemAttributes: getCartItemAttributes,
    getItemSku: getCartItemSku,
    getFormattedPrice: getFormattedPrice,
    getTotalItems: getCartTotalItems,
    getCoupons: getCoupons,
    getDiscounts: getDiscounts
};

var itemToTree = function (category) {
    return {
        label: category.title,
        slug: category.handle,
        items: [],
        isCurrent: false
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCategoryTree = function (category) {
    if (category) {
        return itemToTree(category);
    }
    return {};
};
var categoryGetters = {
    getTree: getCategoryTree
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getShippingMethodId = function (shippingMethod) { return ''; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getShippingMethodName = function (shippingMethod) { return ''; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getShippingMethodDescription = function (shippingMethod) { return ''; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getShippingMethodPrice = function (shippingMethod) { return 0; };
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var getFormattedPrice$1 = function (price) { return String(price); };
var checkoutGetters = {
    getShippingMethodId: getShippingMethodId,
    getShippingMethodName: getShippingMethodName,
    getShippingMethodDescription: getShippingMethodDescription,
    getFormattedPrice: getFormattedPrice$1,
    getShippingMethodPrice: getShippingMethodPrice
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var buildBreadcrumbsList = function (rootCat, bc) {
    var newBc = __spreadArrays(bc, [{ text: rootCat.title, link: rootCat.handle }]);
    return rootCat.parent ? buildBreadcrumbsList(rootCat.parent, newBc) : newBc;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var buildBreadcrumbs = function (rootCat) {
    return buildBreadcrumbsList(rootCat, [])
        .reverse()
        .reduce(function (prev, curr, index) {
        var _a;
        return (__spreadArrays(prev, [
            __assign(__assign({}, curr), { link: (((_a = prev[index - 1]) === null || _a === void 0 ? void 0 : _a.link) || '') + "/" + curr.link })
        ]));
    }, []);
};
var filterFacets = function (criteria) { return function (f) { return criteria ? criteria.includes(f) : true; }; };
var createFacetsFromOptions = function (facets, filters, filterKey) {
    var _a;
    var options = ((_a = facets[filterKey]) === null || _a === void 0 ? void 0 : _a.options) || [];
    var selectedList = filters && filters[filterKey] ? filters[filterKey] : [];
    return options
        .map(function (_a) {
        var label = _a.label, value = _a.value;
        return ({
            type: 'attribute',
            id: label,
            attrName: filterKey,
            value: value,
            selected: selectedList.includes(value),
            count: null
        });
    });
};
var reduceForFacets = function (facets, filters) { return function (prev, curr) { return (__spreadArrays(prev, createFacetsFromOptions(facets, filters, curr))); }; };
var buildFacets = function (searchData, reduceFn, criteria) {
    if (!searchData.data) {
        return [];
    }
    var facets = searchData.data.facets, filters = searchData.input.filters;
    return Object.keys(facets)
        .filter(filterFacets(criteria))
        .reduce(reduceFn(facets, filters), []);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getAll = function (searchData, criteria) { return buildFacets(searchData, reduceForFacets, criteria); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getGrouped = function (searchData, criteria) { return []; };
// buildFacets(searchData, reduceForGroupedFacets, criteria);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getSortOptions = function (searchData) {
    var _a;
    var options = [
        { type: 'sort', id: 'latest', value: 'Latest', count: null },
        { type: 'sort', id: 'title(asc)', value: 'Title: A to Z', count: null },
        { type: 'sort', id: 'title(dsc)', value: 'Title: Z to A', count: null },
        { type: 'sort', id: 'price-up', value: 'Price: Low to high', count: null },
        { type: 'sort', id: 'price-down', value: 'Price: High to low', count: null }
    ].map(function (o) { return (__assign(__assign({}, o), { selected: o.id === searchData.input.sort })); });
    var selected = ((_a = options.find(function (o) { return o.id === searchData.input.sort; })) === null || _a === void 0 ? void 0 : _a.id) || 'latest';
    return { options: options, selected: selected };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCategoryTree$1 = function (searchData) {
    if (!searchData.data) {
        return {};
    }
    var allCats = searchData.data.categories;
    var formattedCats = [];
    for (var c = 0; c < allCats.length; c++) {
        formattedCats.push(getCategoryTree(searchData.data.categories[c]));
    }
    return formattedCats;
};
var identifyCurrentCat = function (searchData) {
    if (searchData.input === null) {
        return 0;
    }
    // fetch curren category slug
    var curCategoryPage = searchData.input.categorySlug;
    var allCategories = searchData.data.categories;
    var curCatIndex = 0;
    // fetch index from category array to generate link and title
    for (var i = 0; i < allCategories.length; i++) {
        // eslint-disable-next-line dot-notation
        if (allCategories[i]['handle'] === curCategoryPage) {
            curCatIndex = i;
            break;
        }
    }
    return curCatIndex;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProducts = function (searchData) {
    if (searchData.input === null || searchData.data === null) {
        return {};
    }
    var catProducts = [];
    var sortBy = searchData.input.sort;
    if (!Array.isArray(searchData.data.categories)) {
        catProducts = getSortedProducts(enhanceProduct(searchData.data.categories.products), sortBy);
    }
    else {
        var curCatIndex = identifyCurrentCat(searchData);
        catProducts = getSortedProducts(enhanceProduct(searchData.data.categories[curCatIndex].products), sortBy);
    }
    var products = enhanceProduct(catProducts);
    return products;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getPagination = function (searchData) {
    if (!searchData.data) {
        return {};
    }
    return {
        currentPage: searchData.input.page,
        totalPages: Math.ceil(searchData.data.categories.products.length / searchData.data.itemsPerPage),
        totalItems: searchData.data.categories.products.length,
        itemsPerPage: searchData.input.itemsPerPage,
        pageOptions: searchData.data.perPageOptions
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getBreadcrumbs = function (searchData) {
    if (!searchData.data) {
        return [];
    }
    return __spreadArrays([
        { text: 'Home', link: '/' }
    ], buildBreadcrumbs(searchData.data.categories).map(function (b) { return (__assign(__assign({}, b), { link: "/c" + b.link })); }));
};
var facetGetters = {
    getSortOptions: getSortOptions,
    getGrouped: getGrouped,
    getAll: getAll,
    getProducts: getProducts,
    getCategoryTree: getCategoryTree$1,
    getBreadcrumbs: getBreadcrumbs,
    getPagination: getPagination
};

// TODO: Add interfaces for some of the methods in core
// Product
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProductName = function (product) { return (product === null || product === void 0 ? void 0 : product.name) || 'Product\'s name'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProductSlug = function (product) {
    return product._slug;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProductPrice = function (product) {
    var _a, _b;
    return {
        regular: ((_a = product === null || product === void 0 ? void 0 : product.price) === null || _a === void 0 ? void 0 : _a.original) || 0,
        special: ((_b = product === null || product === void 0 ? void 0 : product.price) === null || _b === void 0 ? void 0 : _b.current) || 0
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProductGallery = function (product) {
    return (product ? product.images : [])
        .map(function (image) { return ({
        small: image.originalSrc,
        big: image.originalSrc,
        normal: image.originalSrc
    }); });
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var getProductCoverImage = function (product) {
    var _a;
    return ((_a = product === null || product === void 0 ? void 0 : product._coverImage) === null || _a === void 0 ? void 0 : _a.src) || '';
};
var getActiveVariantImage = function (product) {
    for (var i = 1; i < (product.images).length; i++) {
        if (product.images[i].originalSrc === product._coverImage.originalSrc) {
            return i;
        }
    }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProductFiltered = function (products, filters) {
    if (filters === void 0) { filters = {}; }
    if (!products) {
        return [];
    }
    // convert entire product response to productvariant interface
    if (filters.attributes && Object.keys(filters.attributes).length > 0) {
        var selectedVariant = getVariantByAttributes(products, filters.attributes);
        if (!selectedVariant) {
            selectedVariant = products.variants[0];
        }
        var selectedVariantArr = Array.isArray(selectedVariant) ? selectedVariant : [selectedVariant];
        return enhanceProductVariation(selectedVariantArr);
    }
    if (filters.master) {
        products = Array.isArray(products) ? products : [products];
    }
    return enhanceProduct(products);
};
var getSelectedVariant = function (product, attribs) {
    return attribs;
};
var getProductOptions = function (product) {
    var productOptions = product.options;
    return productOptions;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProductAttributes = function (products, filterByAttributeName) {
    var isSingleProduct = !Array.isArray(products);
    var productList = (isSingleProduct ? [products] : products);
    if (!products || productList.length === 0) {
        return {};
    }
    /* const formatAttributes = (products): AgnosticAttribute[] =>{
      return formatAttributeList(products.options);
    };*/
    var formatAttributes = function (product) {
        return formatAttributeList(product.options).filter(function (attribute) { return filterByAttributeName ? filterByAttributeName.includes(attribute.name) : attribute; });
    };
    var reduceToUniques = function (prev, curr) {
        var isAttributeExist = prev.some(function (el) { return el.name === curr.name && el.value === curr.value; });
        if (!isAttributeExist) {
            return __spreadArrays(prev, [curr]);
        }
        return prev;
    };
    var reduceByAttributeName = function (prev, curr) {
        var _a;
        return (__assign(__assign({}, prev), (_a = {}, _a[curr.name] = isSingleProduct ? curr.value : __spreadArrays((prev[curr.name] || []), [
            {
                value: curr.value,
                label: curr.label
            }
        ]), _a)));
    };
    return productList
        .map(function (product) { return formatAttributes(product); })
        .reduce(function (prev, curr) { return __spreadArrays(prev, curr); }, [])
        .reduce(reduceToUniques, [])
        .reduce(reduceByAttributeName, {});
};
var getProductDescription = function (product, isWantHtml) {
    if (product) {
        if (isWantHtml) {
            return product._descriptionHtml;
        }
        return product._description;
    }
};
var getProductCategoryIds = function (product) { var _a; return ((_a = product) === null || _a === void 0 ? void 0 : _a._categoriesRef) || ''; };
var getProductId = function (product) { var _a; return ((_a = product) === null || _a === void 0 ? void 0 : _a._id) || ''; };
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var getFormattedPrice$2 = function (price) { return String(price); };
var getProductStatus = function (product) {
    if (product && (product._availableForSale || product.available)) {
        return true;
    }
    return false;
};
var getBreadcrumbs$1 = function (product) {
    var breadCrumbs = [
        {
            text: 'Home',
            route: {
                link: '/'
            }
        }
    ];
    if (product && product.productType) {
        breadCrumbs.push({
            text: product.productType,
            route: {
                link: '#'
            }
        });
    }
    if (product && product.name) {
        breadCrumbs.push({
            text: getProductName(product),
            route: {
                link: '#'
            }
        });
    }
    return breadCrumbs;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProductTotalReviews = function (product) { return 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProductAverageRating = function (product) { return 0; };
var productGetters = {
    getName: getProductName,
    getSlug: getProductSlug,
    getPrice: getProductPrice,
    getGallery: getProductGallery,
    getCoverImage: getProductCoverImage,
    getVariantImage: getActiveVariantImage,
    getFiltered: getProductFiltered,
    getOptions: getProductOptions,
    getAttributes: getProductAttributes,
    getDescription: getProductDescription,
    getCategoryIds: getProductCategoryIds,
    getId: getProductId,
    getStatus: getProductStatus,
    getFormattedPrice: getFormattedPrice$2,
    getTotalReviews: getProductTotalReviews,
    getAverageRating: getProductAverageRating,
    getBreadcrumbs: getBreadcrumbs$1,
    getSelectedVariant: getSelectedVariant
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getItems = function (review) { return []; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getReviewId = function (item) { return ''; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getReviewAuthor = function (item) { return ''; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getReviewMessage = function (item) { return ''; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getReviewRating = function (item) { return 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getReviewDate = function (item) { return ''; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getTotalReviews = function (review) { return 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getAverageRating = function (review) { return 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getRatesCount = function (review) { return []; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getReviewsPage = function (review) { return 1; };
var reviewGetters = {
    getItems: getItems,
    getReviewId: getReviewId,
    getReviewAuthor: getReviewAuthor,
    getReviewMessage: getReviewMessage,
    getReviewRating: getReviewRating,
    getReviewDate: getReviewDate,
    getTotalReviews: getTotalReviews,
    getAverageRating: getAverageRating,
    getRatesCount: getRatesCount,
    getReviewsPage: getReviewsPage
};

/* istanbul ignore file */
var getUserFirstName = function (user) { return (user === null || user === void 0 ? void 0 : user.firstName) || ''; };
var getUserLastName = function (user) { return (user === null || user === void 0 ? void 0 : user.lastName) || ''; };
var getUserFullName = function (user) { return user ? user.firstName + " " + user.lastName : ''; };
var getUserEmailAddress = function (user) { return (user === null || user === void 0 ? void 0 : user.email) || ''; };
var userGetters = {
    getFirstName: getUserFirstName,
    getLastName: getUserLastName,
    getFullName: getUserFullName,
    getEmailAddress: getUserEmailAddress
};

var userGetters$1 = {
    getAddresses: function (shipping, criteria) {
        var addresses = shipping.addresses;
        if (!criteria || !Object.keys(criteria).length) {
            return addresses;
        }
        var entries = Object.entries(criteria);
        return shipping.addresses.filter(function (address) { return entries.every(function (_a) {
            var key = _a[0], value = _a[1];
            return address[key] === value;
        }); });
    },
    getDefault: function (shipping) { return shipping.addresses.find(function (address) { return address.isDefault; }); },
    getTotal: function (shipping) { return shipping.addresses.length; },
    getPostCode: function (address) { return address ? address.zipCode : ''; },
    getStreetName: function (address) { return address ? address.streetName : ''; },
    getStreetNumber: function (address) { return address ? address.streetNumber : ''; },
    getCity: function (address) { return address ? address.city : ''; },
    getFirstName: function (address) { return address ? address.firstName : ''; },
    getLastName: function (address) { return address ? address.lastName : ''; },
    getCountry: function (address) { return address ? address.country : ''; },
    getPhone: function (address) { return address ? address.phoneNumber : ''; },
    getEmail: function (address) { return address ? address.email : ''; },
    getProvince: function (address) { return address ? address.state : ''; },
    getCompanyName: function (address) { return address ? address.company : ''; },
    getTaxNumber: function (address) { return address ? address.taxId : ''; },
    getId: function (address) { return address ? address.id : ''; },
    getApartmentNumber: function (address) { return address ? address.apartment : ''; },
    isDefault: function (address) { return address ? address.isDefault : false; }
};

var userGetters$2 = {
    getAddresses: function (billing, criteria) {
        var addresses = billing.addresses;
        if (!criteria || !Object.keys(criteria).length) {
            return addresses;
        }
        var entries = Object.entries(criteria);
        return billing.addresses.filter(function (address) { return entries.every(function (_a) {
            var key = _a[0], value = _a[1];
            return address[key] === value;
        }); });
    },
    getDefault: function (billing) { return billing.addresses.find(function (address) { return address.isDefault; }); },
    getTotal: function (billing) { return billing.addresses.length; },
    getPostCode: function (address) { return address ? address.zipCode : ''; },
    getStreetName: function (address) { return address ? address.streetName : ''; },
    getStreetNumber: function (address) { return address ? address.apartment : ''; },
    getCity: function (address) { return address ? address.city : ''; },
    getFirstName: function (address) { return address ? address.firstName : ''; },
    getLastName: function (address) { return address ? address.lastName : ''; },
    getCountry: function (address) { return address ? address.country : ''; },
    getPhone: function (address) { return address ? address.phoneNumber : ''; },
    getEmail: function (address) { return address ? address.email : ''; },
    getProvince: function (address) { return address ? address.state : ''; },
    getCompanyName: function (address) { return address ? address.company : ''; },
    getTaxNumber: function (address) { return address ? address.taxId : ''; },
    getId: function (address) { return address ? address.id : ''; },
    getApartmentNumber: function (address) { return address ? address.apartment : ''; },
    isDefault: function (address) { return address ? address.isDefault : false; }
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* istanbul ignore file */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getDate = function (order) { return (order === null || order === void 0 ? void 0 : order.processedAt) || '123'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getId = function (order) { return (order === null || order === void 0 ? void 0 : order.orderNumber) || '123'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getStatus = function (order) { return (order === null || order === void 0 ? void 0 : order.fulfillmentStatus) || 'Failed'; };
var getPaymentStatus = function (order) { return (order === null || order === void 0 ? void 0 : order.financialStatus) || 'Pending'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getPrice = function (order) { return order.currentTotalPrice.amount || 0; };
var getSubtotalPrice = function (order) { return order.currentSubtotalPrice.amount || 0; };
var getTaxPrice = function (order) { return order.currentTotalTax.amount || 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getItems$1 = function (order) { return order.lineItems || []; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getItemSku = function (item) { return (item === null || item === void 0 ? void 0 : item.sku) || 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getItemName = function (item) { return (item === null || item === void 0 ? void 0 : item.title) || 0; };
var getItemId = function (item) { return (item === null || item === void 0 ? void 0 : item.variant.product.id) || ''; };
var getItemSlug = function (item) { return (item === null || item === void 0 ? void 0 : item.variant.product.handle) || ''; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getItemQty = function (item) { return (item === null || item === void 0 ? void 0 : item.quantity) || 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getItemPrice = function (item) { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.originalTotalPrice) === null || _a === void 0 ? void 0 : _a.amount) || 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getFormattedPrice$3 = function (price) { return String(price); };
var orderGetters = {
    getDate: getDate,
    getId: getId,
    getStatus: getStatus,
    getPaymentStatus: getPaymentStatus,
    getPrice: getPrice,
    getItems: getItems$1,
    getItemSku: getItemSku,
    getItemName: getItemName,
    getItemQty: getItemQty,
    getItemPrice: getItemPrice,
    getFormattedPrice: getFormattedPrice$3,
    getSubtotalPrice: getSubtotalPrice,
    getTaxPrice: getTaxPrice,
    getItemId: getItemId,
    getItemSlug: getItemSlug
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistItems = function (wishlist) { return [
    {
        _id: 1,
        _description: 'Some description',
        _categoriesRef: [
            '1',
            '2'
        ],
        name: 'Black jacket',
        sku: 'black-jacket',
        images: [
            'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
        ],
        price: {
            original: 12.34,
            current: 10.00
        },
        qty: 1
    }
]; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistItemName = function (product) { return (product === null || product === void 0 ? void 0 : product.name) || 'Product\'s name'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistItemImage = function (product) { return (product === null || product === void 0 ? void 0 : product.images[0]) || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistItemPrice = function (product) {
    var _a, _b;
    return {
        regular: ((_a = product === null || product === void 0 ? void 0 : product.price) === null || _a === void 0 ? void 0 : _a.original) || 12,
        special: ((_b = product === null || product === void 0 ? void 0 : product.price) === null || _b === void 0 ? void 0 : _b.current) || 10
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistItemQty = function (product) { return 1; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistItemAttributes = function (product, filterByAttributeName) { return ({ color: 'red' }); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistItemSku = function (product) { return (product === null || product === void 0 ? void 0 : product.sku) || 'some-sku'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistTotals = function (wishlist) {
    return {
        total: 10,
        subtotal: 10
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistShippingPrice = function (wishlist) { return 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getWishlistTotalItems = function (wishlist) { return 1; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getFormattedPrice$4 = function (price) { return String(price); };
var wishlistGetters = {
    getTotals: getWishlistTotals,
    getShippingPrice: getWishlistShippingPrice,
    getItems: getWishlistItems,
    getItemName: getWishlistItemName,
    getItemImage: getWishlistItemImage,
    getItemPrice: getWishlistItemPrice,
    getItemQty: getWishlistItemQty,
    getItemAttributes: getWishlistItemAttributes,
    getItemSku: getWishlistItemSku,
    getTotalItems: getWishlistTotalItems,
    getFormattedPrice: getFormattedPrice$4
};

/* istanbul ignore file */
var integrationPlugin = core.integrationPluginFactory(shopifyApi.createApiClient);

exports.cartGetters = cartGetters;
exports.categoryGetters = categoryGetters;
exports.checkoutGetters = checkoutGetters;
exports.facetGetters = facetGetters;
exports.integrationPlugin = integrationPlugin;
exports.orderGetters = orderGetters;
exports.productGetters = productGetters;
exports.reviewGetters = reviewGetters;
exports.useCart = index;
exports.useCategory = index$1;
exports.useCheckout = useCheckout;
exports.useContent = useContent;
exports.useFacet = index$2;
exports.useProduct = index$3;
exports.useReview = index$4;
exports.useUser = index$5;
exports.useUserBilling = index$6;
exports.useUserOrders = index$7;
exports.useUserShipping = index$8;
exports.useWishlist = index$9;
exports.userBillingGetters = userGetters$2;
exports.userGetters = userGetters;
exports.userShippingGetters = userGetters$1;
exports.wishlistGetters = wishlistGetters;
//# sourceMappingURL=index.cjs.js.map
