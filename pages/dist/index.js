"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var axios_hooks_1 = require("axios-hooks");
var layout_1 = require("../components/layout");
function Home() {
    var _a = axios_hooks_1["default"]("http://localhost:3000/api/folks/battle"), _b = _a[0], data = _b.data, loading = _b.loading, error = _b.error, refetch = _a[1];
    console.log("🚀 ~ file: App.js ~ line 14 ~ App ~ data", data);
    var _c = axios_hooks_1["default"]({
        url: "http://localhost:3000/api/folks/vote",
        method: "PUT"
    }, { manual: true }), _d = _c[0], putData = _d.data, putLoading = _d.loading, putError = _d.error, executePut = _c[1];
    var vote = function (person) {
        console.log("🚀 ~ file: App.js ~ line 15 ~ vote ~ person", person);
        executePut({
            data: { _id: person._id }
        });
        if (putData) {
            refetch();
        }
    };
    if (loading)
        return React.createElement("p", null, "Loading...");
    if (error)
        return React.createElement("p", null, "Error!");
    var withImages = data.map(function (person) {
        return person.hasOwnProperty("image");
    });
    console.log("🚀 ~ file: App.js ~ line 44 ~ App ~ withImages", withImages);
    var anyOfTheseHasFalse = withImages.some(function (person) { return false; });
    console.log("🚀 ~ file: App.js ~ line 46 ~ App ~ anyOfTheseHasFalse", anyOfTheseHasFalse);
    if (anyOfTheseHasFalse) {
        console.log("woah there, no image here.");
        refetch();
    }
    return (React.createElement(layout_1["default"], null,
        React.createElement("div", { className: "container is-widescreen  mx-4" },
            React.createElement("div", { className: "columns is-vcentered has-text-centered" }, data.length == 0 ? (React.createElement("div", null, "database empty")) : (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "column " },
                    console.log(data[0].image),
                    data[0].image && (React.createElement(React.Fragment, null,
                        " ",
                        React.createElement(image_1["default"], { onClick: function () { return vote(data[0]); }, alt: data[0].name, src: process.env.PUBLIC_URL + "/static/images/" + data[0].image, width: 400, height: 400, className: "img-battle" })))),
                React.createElement("div", { className: "column " },
                    React.createElement("div", { className: "tile is-child" }, data[1].image && (React.createElement(React.Fragment, null,
                        React.createElement(image_1["default"], { onClick: function () { return vote(data[1]); }, alt: data[1].name, src: process.env.PUBLIC_URL + "/static/images/" + data[1].image, width: 400, height: 400, className: "img-battle" })))))))))));
}
exports["default"] = Home;
