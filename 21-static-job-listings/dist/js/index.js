/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var $main = document.getElementById("main");
var $filter = document.getElementById("filter");
var $filterTags = document.getElementById("filterTags");
var $btnClearFilter = document.getElementById("btnClearFilter");
var tagsinFilter = [];

var updateFilterVisibility = function updateFilterVisibility() {
  if (tagsinFilter.length === 0) {
    $filter.classList.add("filter--hide");
  } else {
    $filter.classList.remove("filter--hide");
  }
};

var getCardsData = function getCardsData() {
  fetch("./data/data.json").then(function (response) {
    return response.json();
  }).then(function (data) {
    drawCardsInDOM(data);
  }).catch(function (e) {
    return console.log("ERROR", e);
  });
};

var drawCardsInDOM = function drawCardsInDOM(data) {
  var fragment = document.createDocumentFragment();

  var _iterator = _createForOfIteratorHelper(data),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var cardData = _step.value;
      // cardData
      var card = document.createElement("article");
      card.classList.add("card");
      if (cardData.featured) card.classList.add("card--featured"); // PRINCIPAL INFO

      var cardPrincipalInfo = document.createElement("div");
      cardPrincipalInfo.classList.add("card__principal-info"); // Logo

      var imgLogo = document.createElement("img");
      imgLogo.classList.add("card__logo");
      imgLogo.src = cardData.logo; // InfoText

      var infoText = document.createElement("div");
      infoText.classList.add("info-text"); // Info Header

      var infoHeader = document.createElement("div");
      infoHeader.classList.add("info-header"); // Company

      var company = document.createElement("h2");
      company.classList.add("company");
      company.textContent = cardData.company;
      infoHeader.appendChild(company); // New

      if (cardData.new) {
        var labelNew = document.createElement("span");
        labelNew.classList.add("label", "new");
        labelNew.textContent = "NEW!";
        infoHeader.appendChild(labelNew);
      } // Featured


      if (cardData.featured) {
        var labelFeatured = document.createElement("span");
        labelFeatured.classList.add("label", "featured");
        labelFeatured.textContent = "FEATURED";
        infoHeader.appendChild(labelFeatured);
      } // Info Body


      var infoBody = document.createElement("div");
      infoBody.classList.add("info-body"); // Position

      var position = document.createElement("h3");
      position.classList.add("position");
      position.textContent = cardData.position;
      infoBody.appendChild(position); // Deatils

      var details = document.createElement("ul");
      details.classList.add("details"); // Detials Item

      for (var _i = 0, _arr = [cardData.postedAt, cardData.contract, cardData.location]; _i < _arr.length; _i++) {
        var item = _arr[_i];
        var detailsItem = document.createElement("li");
        detailsItem.classList.add("details__item");
        detailsItem.textContent = item;
        details.appendChild(detailsItem);
      }

      infoBody.appendChild(details);
      infoText.appendChild(infoHeader);
      infoText.appendChild(infoBody);
      cardPrincipalInfo.appendChild(imgLogo);
      cardPrincipalInfo.appendChild(infoText); // cardPrincipalInfo.appendChild(infoHeader)
      // cardPrincipalInfo.appendChild(infoBody)
      // Tags

      var tags = document.createElement("ul");
      tags.classList.add("tags"); // Detials Item

      for (var _i2 = 0, _arr2 = [cardData.role, cardData.level].concat(_toConsumableArray(cardData.languages), _toConsumableArray(cardData.tools)); _i2 < _arr2.length; _i2++) {
        var _item = _arr2[_i2];
        var tagsItem = document.createElement("li");
        tagsItem.classList.add("tag");
        tagsItem.textContent = _item;
        tags.appendChild(tagsItem);
      } // card.appendChild(imgLogo)


      card.appendChild(cardPrincipalInfo);
      card.appendChild(tags);
      fragment.appendChild(card);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  $main.appendChild(fragment);
};

var addFilterTag = function addFilterTag(title) {
  var fragment = document.createDocumentFragment();
  var tagWithClose = document.createElement("li");
  tagWithClose.classList.add("tag--with-close");
  var tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = title;
  tagWithClose.appendChild(tag);
  fragment.appendChild(tagWithClose);
  $filterTags.appendChild(fragment); // Add to array

  tagsinFilter.push(title);
  updateFilterVisibility();
  updateCards();
};

var removeFilterTag = function removeFilterTag(tagNode) {
  var tagWithClose = tagNode.parentNode;
  tagWithClose.parentNode.removeChild(tagWithClose); // Remove From Array

  var index = tagsinFilter.indexOf(tagNode.textContent);
  tagsinFilter.splice(index, 1);
  updateFilterVisibility();
  updateCards();
};

var getTagsNameListFromCard = function getTagsNameListFromCard(card) {
  var tags = card.getElementsByClassName("tag");

  var tagsNamesList = _toConsumableArray(tags).map(function (tag) {
    return tag.textContent;
  });

  return tagsNamesList;
};

var checkCard = function checkCard(card) {
  var tagsNamesInCard = getTagsNameListFromCard(card);
  var included = tagsinFilter.every(function (r) {
    return tagsNamesInCard.includes(r);
  });
  return included;
};

var getFilteredCards = function getFilteredCards() {
  var $cards = document.querySelectorAll(".card");

  var cards = _toConsumableArray($cards);

  var cardsFiltered = cards.filter(function (card) {
    return checkCard(card);
  });
  return cardsFiltered;
};

var updateCards = function updateCards() {
  var cardsFiltered = getFilteredCards();
  var namesCardsFiltered = cardsFiltered.map(function (card) {
    return card.querySelector(".company").textContent;
  });
  var $cards = document.querySelectorAll(".card");

  var cards = _toConsumableArray($cards);

  cards.forEach(function (card) {
    var cardCompanyName = card.querySelector(".company").textContent;

    if (!namesCardsFiltered.includes(cardCompanyName)) {
      card.classList.add("card--hide");
    } else {
      card.classList.remove("card--hide");
    }
  });
}; // LISTENERS


$main.addEventListener("click", function (e) {
  if (e.target.classList.contains("tag")) {
    if (e.target.parentNode.className === "tag--with-close") {
      removeFilterTag(e.target);
    } else {
      if (!tagsinFilter.includes(e.target.textContent)) {
        addFilterTag(e.target.textContent);
      }
    }
  }
});
$btnClearFilter.addEventListener("click", function (e) {
  while ($filterTags.firstChild) {
    $filterTags.removeChild($filterTags.firstChild);
  }

  tagsinFilter = [];
  updateFilterVisibility();
  updateCards();
});
getCardsData();
updateFilterVisibility();
/******/ })()
;